import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Detail, EmptyDetail, Spinner } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import constants from '../../redux/codes/constants';
import { getLanguageCodes , createLanguageCode} from '../../redux/codes/actions';

class LanguageCodeDetail extends Component {
  componentDidMount() {
    this.props.getLanguageCodes(0, 100);
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

  render() {
    const code = this.props.languageCode.find(code => code.id === window.location.pathname.split('/')[2]);
    if (this.props.isPending) return (<Spinner className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" />);
    if (code) return (
      <Detail
        title={code.name}
        keyword={strings.LANGUAGE_CODE}
        id={code.id}
        inputItems={[
          { id: identifiers.CODE, label: strings.CODE, value: code.code, isEditable: false },
          { id: identifiers.NAME, label: strings.NAME, value: code.name, isEditable: false },
          { id: identifiers.DESCRIPTION, label: strings.DESCRIPTION, value: code.description, isEditable: false  },
          { id: identifiers.DEPRECATED, label: strings.DEPRECATED, value: code.deprecated, isEditable: false  },
        ]}
        history={this.props.history}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
        create={this.createLanguageCode}
        createParameters={[
          { id: identifiers.NAME, label: strings.NAME, type: "text" },
          { id: identifiers.CODE, label: strings.CODE, type: "text"  },
          { id: identifiers.DESCRIPTION, label: strings.DESCRIPTION, type: "text"  },
        ]}
        isCreatePending={this.props.isCreatePending}
        isCreateError={this.props.isCreateError}
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
};

const mapStateToProps = state => ({
  languageCode: state.codes.languageCodeList,
  isError: state.codes.isError,
  errorMessage: state.users.errorMessage,
  isPending: state.codes.isPending,
  isCreatePending: state.codes.isCreatePending,
  isCreateError: state.codes.isCreateError,
});

const mapDispatchToProps = {
  getLanguageCodes,
  createLanguageCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageCodeDetail);
