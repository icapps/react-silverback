import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Detail, EmptyDetail, Spinner } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import constants from '../../redux/codes/constants';
import { getLanguageCodeById, createLanguageCode, deprecateLanguageCode, undeprecateLanguageCode } from '../../redux/codes/actions';
import { setMessage } from '../../redux/messages/actions';

class LanguageCodeDetail extends Component {
  componentDidMount() {
    this.props.getLanguageCodeById(this.props.location.state);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.props.getLanguageCodeById(this.props.location.state);
    }
  }

  createLanguageCode = async languageCode => {
    return new Promise(async resolve => {
      const result = await this.props.createLanguageCode(languageCode);
      if (result.action && result.action.type === constants.CREATE_LANGUAGE_CODE_FULFILLED) {
        this.props.history.replace(`/${window.location.pathname.split('/')[1]}/${this.props.code.id}`, this.props.code.id);
        this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.NEW_CODE_CREATED });
        resolve(true);
      }
      resolve(false);
    });
  }

  deprecateLanguageCode = async id => {
    const result = await this.props.deprecateLanguageCode(id);
    if (result.action && result.action.type === constants.DEPRECATE_LANGUAGE_CODE_FULFILLED) {
      this.props.getLanguageCodeById(this.props.location.state);
      this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.formatString(strings.DEPRECATED_SUCCESS, { item: <b>{this.props.code.name}</b> }) });
    }
  }

  undeprecateLanguageCode = async id => {
    const result = await this.props.undeprecateLanguageCode(id);
    if (result.action && result.action.type === constants.UNDEPRECATE_LANGUAGE_CODE_FULFILLED) {
      this.props.getLanguageCodeById(this.props.location.state);
      this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.formatString(strings.UNDEPRECATED_SUCCESS, { item: <b>{this.props.code.name}</b> }) });
    }
  }

  render() {
    const { props } = this;
    if (this.props.isPending) return (<Spinner className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" />);
    if (props.code) return (
      <Detail
        title={props.code.name}
        keyword={strings.LANGUAGE_CODE}
        id={props.code.id}
        inputItems={[
          { id: identifiers.CREATED_AT, label: strings.CREATED_AT, value: format(new Date(props.code.createdAt), 'DD-MM-YYYY'), type: "plain", isEditable: false },
          { id: identifiers.CODE, label: strings.CODE, value: props.code.code, isEditable: false },
          { id: identifiers.NAME, label: strings.NAME, value: props.code.name, isEditable: false },
          { id: identifiers.DESCRIPTION, label: strings.DESCRIPTION, value: props.code.description, isEditable: false },
        ]}
        history={props.history}
        isError={props.isError}
        errorMessage={props.errorMessage}
        create={this.createLanguageCode}
        createParameters={[
          { id: identifiers.CODE, label: strings.CODE, type: "text" },
          { id: identifiers.NAME, label: strings.NAME, type: "text" },
          { id: identifiers.DESCRIPTION, label: strings.DESCRIPTION, type: "text" },
        ]}
        isCreatePending={props.isCreatePending}
        isCreateError={props.isCreateError}
        deprecate={this.deprecateLanguageCode}
        undeprecate={this.undeprecateLanguageCode}
        isDeprecated={props.code.deprecated}
        setMessage={this.props.setMessage}
      />);
    return <EmptyDetail history={props.history} />;
  }
}

LanguageCodeDetail.propTypes = {
  code: PropTypes.object,
  isPending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getLanguageCodeById: PropTypes.func.isRequired,
  isCreatePending: PropTypes.bool.isRequired,
  isCreateError: PropTypes.bool.isRequired,
  createLanguageCode: PropTypes.func.isRequired,
  deprecateLanguageCode: PropTypes.func.isRequired,
  undeprecateLanguageCode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  code: state.codes.languageCode,
  isError: state.codes.isError,
  errorMessage: state.codes.errorMessage,
  isPending: state.codes.isPending,
  isCreatePending: state.codes.isCreatePending,
  isCreateError: state.codes.isCreateError,
});

const mapDispatchToProps = {
  getLanguageCodeById,
  createLanguageCode,
  deprecateLanguageCode,
  undeprecateLanguageCode,
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageCodeDetail);
