import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Detail, EmptyDetail, Spinner } from '../../components';
import { strings } from '../../utils';
import { getLanguageCodes } from '../../redux/codes/actions';
import {identifiers} from '../../constants';

class LanguageCodeDetail extends Component {
  componentDidMount() {
    this.props.getLanguageCodes(0, 100);
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
          { id: identifiers.CODE, label: strings.CODE, value: code.code },
          { id: identifiers.NAME, label: strings.NAME, value: code.name },
        ]} history={this.props.history}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
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
};

const mapStateToProps = state => ({
  languageCode: state.codes.languageCodeList,
  isError: state.codes.isError,
  errorMessage: state.users.errorMessage,
  isPending: state.codes.isPending,
});

const mapDispatchToProps = {
  getLanguageCodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageCodeDetail);
