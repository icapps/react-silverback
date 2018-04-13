import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import { getLanguageCodes } from '../../redux/codes/actions';

class LanguageCodesOverview extends Component {
  render() {
    return (
      <Overview
        title={strings.LANGUAGE_CODES}
        keys={[
          { id: identifiers.VALUE, value: strings.CODE, isSortable: true },
        ]}
        listItems={this.props.languageCode}
        history={this.props.history}
        paginationTotalCount={this.props.languageCodeCount}
        get={this.props.getLanguageCodes}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
      />
    );
  }
}

LanguageCodesOverview.propTypes = {
  languageCode: PropTypes.array.isRequired,
  languageCodeCount: PropTypes.number.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getLanguageCodes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  languageCode: state.codes.languageCodeList,
  languageCodeCount: state.codes.languageCodeCount,
  isError: state.codes.isError,
  errorMessage: state.users.errorMessage,
});

const mapDispatchToProps = {
  getLanguageCodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageCodesOverview);
