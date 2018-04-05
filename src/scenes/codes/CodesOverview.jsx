import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { strings } from '../../utils';
import { getCodes } from '../../redux/codes/actions';

class CodesOverview extends Component {
  render() {
    return (
      <Overview
        title={strings.CODES}
        keys={[
          { id: 'value', value: strings.CODE, isSortable: true },
        ]}
        listItems={this.props.codes}
        history={this.props.history}
        paginationTotalCount={this.props.codesCount}
        get={this.props.getCodes}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
      />
    );
  }
}

const mapStateToProps = state => ({
  codes: state.codes.codesList,
  codesCount: state.codes.codesCount,
  isError: state.codes.isError,
  errorMessage: state.users.errorMessage,
});

const mapDispatchToProps = {
  getCodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CodesOverview);
