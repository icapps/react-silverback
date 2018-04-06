import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Detail, EmptyDetail } from '../../components';
import { strings } from '../../utils';
import { getCodeTypes } from '../../redux/codes/actions';

class CodeTypeDetail extends Component {
  componentDidMount() {
    this.props.getCodeTypes(0, 100);
  }

  render() {
    const codeType = this.props.codeTypes.find(codetype => codetype.id === window.location.pathname.split('/')[2]);
    if (this.props.isPending) return (
      <main className="spinner-container col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <div className="spinner" />
      </main>);
    if (codeType) return (
      <Detail
        dataType={strings.CODE_TYPE}
        title={codeType.code}
        id={codeType.id}
        inputItems={[]}
        history={this.props.history}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
      />);
    return <EmptyDetail history={this.props.history} />;
  }
}

CodeTypeDetail.propTypes = {
  codeTypes: PropTypes.object.isRequired,
  isPending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getCodeTypes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  codeTypes: state.codes.codeTypes,
  isError: state.codes.isError,
  errorMessage: state.codes.errorMessage,
  isPending: state.codes.isPending,
});

const mapDispatchToProps = {
  getCodeTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeTypeDetail);
