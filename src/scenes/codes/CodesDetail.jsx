import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Detail, EmptyDetail } from '../../components';
import { strings } from '../../utils';
import { getCodes } from '../../redux/codes/actions';

class CodeDetail extends Component {
  componentDidMount() {
    this.props.getCodes(0, 100);
  }

  render() {
    const code = this.props.codes.find(code => code.id === window.location.pathname.split('/')[2]);
    if (this.props.isPending) return (
      <main className="spinner-container col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
        <div className="spinner" />
      </main>);
    if (code) return (
      <Detail
        dataType={strings.CODE}
        title={code.value}
        id={code.id}
        inputItems={[]}
        history={this.props.history}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
      />);
    return <EmptyDetail history={this.props.history} />;
  }
}

const mapStateToProps = state => ({
  codes: state.codes.codesList,
  isError: state.codes.isError,
  errorMessage: state.users.errorMessage,
  isPending: state.codes.isPending,
});

const mapDispatchToProps = {
  getCodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeDetail);
