import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getUsers } from '../../redux/users/actions';
import { strings } from '../../utils';

class UserOverview extends Component {
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
    console.log('CDM');
    this.props.getUsers(this.state.page, this.state.limit);
  }

  sortItems = (sortField, sortOrder) => {
    console.log('sort');
    this.props.getUsers(this.state.page, this.state.limit, sortField, sortOrder);
    this.setState({ sortField, sortOrder });
  }

  handlePagination = (page, limit) => {
    console.log('pagination');
    this.props.getUsers(page, limit, this.state.sortField, this.state.sortOrder);
    this.setState({ page, limit });
  };

  render() {
    return (
      <Overview
        title={strings.USERS}
        keys={[
          { id: strings.EMAIL, value: strings.EMAIL, isSortable: true },
          { id: strings.FIRST_NAME, value: strings.FIRST_NAME, isSortable: true },
          { id: strings.LAST_NAME, value: strings.LAST_NAME, isSortable: true },
          { id: strings.HAS_ACCESS, value: strings.HAS_ACCESS, isSortable: false },
          { id: strings.ROLE, value: strings.ROLE, isSortable: false },
        ]}
        listItems={this.props.users}
        removeItem={() => { }}
        sortItems={this.sortItems}
        history={this.props.history}
        paginationTotalCount={this.props.usersCount}
        handlePagination={this.handlePagination}
      />
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.userList,
  usersCount: state.users.usersCount,
});

const mapDispatchToProps = {
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
