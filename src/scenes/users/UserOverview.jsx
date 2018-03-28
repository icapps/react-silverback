import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getUsers , createUser} from '../../redux/users/actions';
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
    this.props.getUsers(this.state.page, this.state.limit);
  }

  createUser = (id, user) => {
    this.props.createUser(id, user);
  }

  sortItems = (sortField, sortOrder) => {
    this.props.getUsers(this.state.page, this.state.limit, sortField, sortOrder);
    this.setState({ sortField, sortOrder });
  }

  handlePagination = (page, limit) => {
    this.props.getUsers(page, limit, this.state.sortField, this.state.sortOrder);
    this.setState({ page, limit });
  };

  render() {
    return (
      <Overview
        title={strings.USERS}
        keys={[
          { id: strings.EMAIL_ID, value: strings.EMAIL, isSortable: true },
          { id: strings.FIRST_NAME_ID, value: strings.FIRST_NAME, isSortable: true },
          { id: strings.LAST_NAME_ID, value: strings.LAST_NAME, isSortable: true },
          { id: strings.HAS_ACCESS_ID, value: strings.HAS_ACCESS, isSortable: false },
          { id: strings.ROLE_ID, value: strings.ROLE, isSortable: false },
        ]}
        listItems={this.props.users}
        removeItem={() => { }}
        sortItems={this.sortItems}
        history={this.props.history}
        paginationTotalCount={this.props.usersCount}
        handlePagination={this.handlePagination}
        createParameters={[
          { id: strings.EMAIL_ID, label: strings.EMAIL, type: "text" },
          { id: strings.FIRST_NAME_ID, label: strings.FIRST_NAME, type: "text" },
          { id: strings.LAST_NAME_ID, label: strings.LAST_NAME, type: "text" },
          { id: strings.HAS_ACCESS_ID, label: strings.HAS_ACCESS, type: "boolean" },
        ]}
        create={this.createUser}
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
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
