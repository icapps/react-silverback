import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import { getCodes } from '../../redux/codes/actions';

class CodesOverview extends Component {
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
    this.props.getCodes(this.state.page, this.state.limit);
  }

  sortItems = (sortField, sortOrder) => {
    this.props.getCodes(this.state.page, this.state.limit, sortField, sortOrder);
    this.setState({ sortField, sortOrder });
  }

  handlePagination = (page, limit) => {
    this.props.getCodes(page, limit, this.state.sortField, this.state.sortOrder);
    this.setState({ page, limit });
  };

  render() {
    return (
      <Overview
        title={strings.CODES}
        keys={[
          { id: identifiers.VALUE, value: strings.CODE, isSortable: true },
        ]}
        listItems={this.props.codes}
        sortItems={this.sortItems}
        history={this.props.history}
        paginationTotalCount={this.props.codesCount}
        handlePagination={this.handlePagination}
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
