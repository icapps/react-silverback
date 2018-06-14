import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import { getLanguageCodes, createLanguageCode, deprecateLanguageCode, undeprecateLanguageCode, setSort } from '../../redux/codes/actions';
import constants from '../../redux/codes/constants';
import { setMessage } from '../../redux/messages/actions';

class LanguageCodesOverview extends Component {
  createLanguageCode = async languageCode => {
    return new Promise(async resolve => {
      const result = await this.props.createLanguageCode(languageCode);
      if (result.action && result.action.type === constants.CREATE_LANGUAGE_CODE_FULFILLED) {
        this.props.history.push(`${window.location.pathname}/${this.props.languageCode.id}`, this.props.languageCode.id);
        this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.NEW_CODE_CREATED });
        resolve(true);
      }
      resolve(false);
    });
  }

  getCodesSorted = (page, limit, sortField, sortOrder, search = '') => {
    if (sortField && sortOrder) {
      this.props.setSort(sortField, sortOrder);
    }
    this.props.getLanguageCodes(page, limit, sortField || this.props.sortField, sortOrder || this.props.sortOrder, search);
  }

  render() {
    return (
      <Overview
        title={strings.LANGUAGE_CODES}
        keyword={strings.LANGUAGE_CODE}
        keys={[
          { id: identifiers.CODE, value: strings.CODE, isSortable: true, sorter: identifiers.CODE, width: 4},
          { id: identifiers.NAME, value: strings.NAME, isSortable: true, sorter: identifiers.NAME, width: 4},
          { id: identifiers.DEPRECATED, value: strings.DEPRECATED, isSortable: true, sorter: identifiers.DEPRECATED, width: 2},
        ]}
        listItems={this.props.languageCodes.map(languageCode => { return { ...languageCode, deprecated: !!languageCode.deprecated, active: !languageCode.deprecated }; })}
        history={this.props.history}
        paginationTotalCount={this.props.languageCodeCount}
        get={this.getCodesSorted}
        createParameters={[
          { id: identifiers.CODE, label: strings.CODE, type: "text" },
          { id: identifiers.NAME, label: strings.NAME, type: "text" },
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
          buttonClass: 'btn-deprecate-list btn-deprecate',
          primaryButtonClassName: 'btn-danger',
          text: strings.DEPRECATE_TEXT,
          successMessage: strings.DEPRECATED_SUCCESS,
          actionClassName: 'success',
        },
        {
          id: identifiers.UNDEPRECATED,
          label: strings.UNDEPRECATE,
          handleAction: this.props.undeprecateLanguageCode,
          primaryButtonText: strings.UNDEPRECATE,
          buttonClass: 'btn-deprecate-list btn-undeprecate',
          primaryButtonClassName: 'btn-info',
          text: strings.UNDEPRECATE_TEXT,
          successMessage: strings.UNDEPRECATED_SUCCESS,
          actionClassName: 'success',
        }]}
        deleteIdentifier={identifiers.NAME}
        sortField={this.props.sortField}
        sortOrder={this.props.sortOrder}
        setMessage={this.props.setMessage}
      />
    );
  }
}

LanguageCodesOverview.propTypes = {
  languageCode: PropTypes.object,
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
  sortField: state.codes.sortField,
  sortOrder: state.codes.sortOrder,
});

const mapDispatchToProps = {
  getLanguageCodes,
  createLanguageCode,
  deprecateLanguageCode,
  undeprecateLanguageCode,
  setSort,
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageCodesOverview);
