import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import { getCodeTypes } from '../../redux/codes/actions';

class CodeTypeOverview extends Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      limit: 10,
      sortField: null,
      sortOrder: null,
    };
  }
  componentDidMount() {
    this.props.getCodeTypes(this.state.page, this.state.limit);
  }

  sortItems = (sortField, sortOrder) => {
    this.props.getCodeTypes(this.state.page, this.state.limit, sortField, sortOrder);
    this.setState({ sortField, sortOrder });
  }

  handlePagination = (page, limit) => {
    this.props.getCodeTypes(page, limit, this.state.sortField, this.state.sortOrder);
    this.setState({ page, limit });
  };

  render() {
    return (
      <Overview
        title={strings.CODES}
        keys={[
          { id: identifiers.CODE, value: strings.CODE_TYPE, isSortable: true },
        ]}
        listItems={this.props.codeTypes}
        sortItems={this.sortItems}
        history={this.props.history}
        paginationTotalCount={this.props.codeTypeCount}
        handlePagination={this.handlePagination}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
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
