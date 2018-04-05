import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { strings } from '../../utils';
import { getCodeTypes } from '../../redux/codes/actions';

class CodeTypeOverview extends Component {
  render() {
    return (
      <Overview
        title={strings.CODES}
        keys={[
          { id: 'code', value: strings.CODE_TYPE, isSortable: true },
        ]}
        listItems={this.props.codeTypes}
        history={this.props.history}
        paginationTotalCount={this.props.codeTypeCount}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
        get={this.props.getCodeTypes}
      />
    );
  }
}

const mapStateToProps = state => ({
  codeTypes: state.codes.codeTypes,
  codeTypeCount: state.codes.codeTypeCount,
  isError: state.codes.isError,
  errorMessage: state.users.errorMessage,
});

const mapDispatchToProps = {
  getCodeTypes,
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeTypeOverview);
