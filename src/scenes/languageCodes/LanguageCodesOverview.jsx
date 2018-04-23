import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import { getLanguageCodes, createLanguageCode, deprecateLanguageCode } from '../../redux/codes/actions';
import constants from '../../redux/codes/constants';

class LanguageCodesOverview extends Component {
  createLanguageCode = async languageCode => {
    return new Promise(async resolve => {
      const result = await this.props.createLanguageCode(languageCode);
      if (result.action && result.action.type === constants.CREATE_LANGUAGE_CODE_FULFILLED) {
        this.props.history.push(`${window.location.pathname}/${this.props.languageCode}`, this.props.languageCode);
        resolve(true);
      }
      resolve(false);
    });
  }

  render() {
    return (
      <Overview
        title={strings.LANGUAGE_CODES}
        keyword={strings.LANGUAGE_CODE}
        keys={[
          { id: identifiers.CODE, value: strings.CODE, isSortable: true },
          { id: identifiers.NAME, value: strings.NAME, isSortable: true },
          { id: identifiers.DEPRECATED, value: strings.DEPRECATED },
        ]}
        listItems={this.props.languageCodes.map(languageCode => { return { ...languageCode, deprecated: !!languageCode.deprecated }; })}
        history={this.props.history}
        paginationTotalCount={this.props.languageCodeCount}
        get={this.props.getLanguageCodes}
        createParameters={[
          { id: identifiers.NAME, label: strings.NAME, type: "text" },
          { id: identifiers.CODE, label: strings.CODE, type: "text" },
          { id: identifiers.DESCRIPTION, label: strings.DESCRIPTION, type: "text" },
        ]}
        create={this.createLanguageCode}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
        isCreatePending={this.props.isCreatePending}
        isCreateError={this.props.isCreateError}
        actions={[{
          id: identifiers.DEPRECATED,
          label: strings.DEPRECATE,
          handleAction: this.props.deprecateLanguageCode,
          primaryButtonText: strings.DEPRECATE,
          buttonClass: 'btn-danger',
          text: strings.DEPRECATE_TEXT,
        }]}
        deleteIdentifier={identifiers.NAME}
      />
    );
  }
}

LanguageCodesOverview.propTypes = {
  languageCode: PropTypes.string,
  languageCodes: PropTypes.array.isRequired,
  languageCodeCount: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getLanguageCodes: PropTypes.func.isRequired,
  isCreatePending: PropTypes.bool.isRequired,
  isCreateError: PropTypes.bool.isRequired,
  createLanguageCode: PropTypes.func.isRequired,
  deprecateLanguageCode: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  languageCode: state.codes.languageCode,
  languageCodes: state.codes.languageCodeList,
  languageCodeCount: state.codes.languageCodeCount,
  isError: state.codes.isError,
  errorMessage: state.codes.errorMessage,
  isCreatePending: state.codes.isCreatePending,
  isCreateError: state.codes.isCreateError,
});

const mapDispatchToProps = {
  getLanguageCodes,
  createLanguageCode,
  deprecateLanguageCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageCodesOverview);
