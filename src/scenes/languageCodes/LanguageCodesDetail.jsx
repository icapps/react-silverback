import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Detail, EmptyDetail, Spinner } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import constants from '../../redux/codes/constants';
import { getLanguageCodeById, createLanguageCode, deprecateLanguageCode } from '../../redux/codes/actions';

class LanguageCodeDetail extends Component {
  componentDidMount() {
    this.props.getLanguageCodeById(window.location.pathname.split('/')[2]);
  }

  createLanguageCode = async languageCode => {
    return new Promise(async resolve => {
      const result = await this.props.createLanguageCode(languageCode);
      if (result.action && result.action.type === constants.CREATE_LANGUAGE_CODE_FULFILLED) {
        this.props.history.replace(`${window.location.pathname}/${this.props.languageCode}`, this.props.languageCode);
        resolve(true);
      }
      resolve(false);
    });
  }

  deprecateLanguageCode = async id => {
    const result = await this.props.deprecateLanguageCode(id);
    if (result.action && result.action.type === constants.DEPRECATE_LANGUAGE_CODE_FULFILLED) {
      this.props.getLanguageCodeById(window.location.pathname.split('/')[2]);
    }
  }

  render() {
    if (this.props.isPending) return (<Spinner className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" />);
    if (this.props.code) return (
      <Detail
        title={this.props.code.name}
        keyword={strings.LANGUAGE_CODE}
        id={this.props.code.id}
        inputItems={[
          { id: identifiers.CODE, label: strings.CODE, value: this.props.code.code, isEditable: false },
          { id: identifiers.NAME, label: strings.NAME, value: this.props.code.name, isEditable: false },
          { id: identifiers.DESCRIPTION, label: strings.DESCRIPTION, value: this.props.code.description, isEditable: false },
          { id: identifiers.ACTIVE, label: strings.ACTIVE, value: !this.props.code.deprecated, type: "boolean", isEditable: false },
        ]}
        history={this.props.history}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
        create={this.createLanguageCode}
        createParameters={[
          { id: identifiers.CODE, label: strings.CODE, type: "text" },
          { id: identifiers.NAME, label: strings.NAME, type: "text" },
          { id: identifiers.DESCRIPTION, label: strings.DESCRIPTION, type: "text" },
        ]}
        isCreatePending={this.props.isCreatePending}
        isCreateError={this.props.isCreateError}
        deprecate={this.deprecateLanguageCode}
      />);
    return <EmptyDetail history={this.props.history} />;
  }
}

LanguageCodeDetail.propTypes = {
  languageCodes: PropTypes.object,
  isPending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getLanguageCodes: PropTypes.func.isRequired,
  isCreatePending: PropTypes.bool.isRequired,
  isCreateError: PropTypes.bool.isRequired,
  createLanguageCode: PropTypes.func.isRequired,
  deprecateLanguageCode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  code: state.codes.languageCode,
  isError: state.codes.isError,
  errorMessage: state.users.errorMessage,
  isPending: state.codes.isPending,
  isCreatePending: state.codes.isCreatePending,
  isCreateError: state.codes.isCreateError,
});

const mapDispatchToProps = {
  getLanguageCodeById,
  createLanguageCode,
  deprecateLanguageCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageCodeDetail);
