import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getUsers, createUser, removeUser } from '../../redux/users/actions';
import { strings } from '../../utils';
import constants from '../../redux/users/constants';

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

  createUser = async user => {
    const result = await this.props.createUser(user);
    if (result.action && result.action.type === constants.CREATE_USER_FULFILLED) {
      this.props.history.push(`${window.location.pathname}/${this.props.user.id}`, this.props.user.id);
    }
  }

  removeUser = async user => {
    const result = await this.props.removeUser(user);
    if (result.action && result.action.type === constants.REMOVE_USER_FULFILLED) {
      this.props.getUsers(this.state.page, this.state.limit, this.state.sortField, this.state.sortOrder);
    }
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
        sortItems={this.sortItems}
        history={this.props.history}
        paginationTotalCount={this.props.usersCount}
        handlePagination={this.handlePagination}
        createParameters={[
          { id: strings.EMAIL_ID, label: strings.EMAIL, type: "text" },
          { id: strings.FIRST_NAME_ID, label: strings.FIRST_NAME, type: "text" },
          { id: strings.LAST_NAME_ID, label: strings.LAST_NAME, type: "text" },
          { id: strings.PASSWORD_ID, label: strings.PASSWORD, type: "password" },
          { id: strings.ROLE_ID, label: strings.ROLE, type: "text" },
          { id: strings.HAS_ACCESS_ID, label: strings.HAS_ACCESS, type: "boolean" },
        ]}
        create={this.createUser}
        removeItem={this.removeUser}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
      />
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.userList,
  usersCount: state.users.usersCount,
  user: state.users.user,
  isError: state.users.isError,
  errorMessage: state.users.errorMessage,
});

const mapDispatchToProps = {
  getUsers,
  createUser,
  removeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
