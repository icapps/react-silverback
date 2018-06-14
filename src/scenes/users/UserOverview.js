import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getUsers, createUser, removeUser, getUserRoles, setSort } from '../../redux/users/actions';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import constants from '../../redux/users/constants';
import { setMessage } from '../../redux/messages/actions';

class UserOverview extends Component {
  createUser = async (user, changePassword) => {
    return new Promise(async resolve => {
      const result = await this.props.createUser(user, changePassword);
      if (result.action && result.action.type === constants.CREATE_USER_FULFILLED) {
        this.props.history.push(`${window.location.pathname}/${this.props.user.id}`, this.props.user.id);
        this.props.setMessage({ type: identifiers.MESSAGE_SUCCESS, text: strings.NEW_USER_CREATED });
        resolve(true);
      }
      resolve(false);
    });
  }

  componentDidMount() {
    this.props.getUserRoles();
  }
  
  getUsersSorted = (page, limit, sortField, sortOrder, search = '') => {
    if (sortField && sortOrder) {
      this.props.setSort(sortField, sortOrder);
    }
    this.props.getUsers(page, limit, sortField || this.props.sortField, sortOrder || this.props.sortOrder, search);
  }

  render() {
    return (
      <Overview
        title={strings.USERS}
        keyword={strings.USER}
        keys={[
          { id: identifiers.EMAIL, value: strings.EMAIL, isSortable: true, sorter: identifiers.EMAIL, width: 4},
          { id: identifiers.FIRST_NAME, value: strings.FIRST_NAME, isSortable: true, sorter: identifiers.FIRST_NAME, width: 2},
          { id: identifiers.LAST_NAME, value: strings.LAST_NAME, isSortable: true, sorter: identifiers.LAST_NAME, width: 3},
          { id: identifiers.ROLE_NAME, value: strings.ROLE, isSortable: true, sorter: identifiers.ROLE, width: 1},
          { id: identifiers.HAS_ACCESS, value: strings.IS_ACTIVE, isSortable: true, sorter: identifiers.HAS_ACCESS, width: 1},   
        ]}
        listItems={this.props.users}
        history={this.props.history}
        paginationTotalCount={this.props.usersCount}
        createParameters={[
          { id: identifiers.EMAIL, label: strings.EMAIL, type: "email" },
          { id: identifiers.FIRST_NAME, label: strings.FIRST_NAME, type: "text" },
          { id: identifiers.LAST_NAME, label: strings.LAST_NAME, type: "text" },
          { id: identifiers.ROLE, label: strings.ROLE, type: "select", options: this.props.userRoles.map(role => ({ key: role.code, text: role.name })) },
          { id: identifiers.HAS_ACCESS, label: strings.IS_ACTIVE, type: "boolean", value: true },
          { id: identifiers.PASSWORD, label: strings.PASSWORD, type: "password" },
        ]}
        create={this.createUser}
        removeItem={this.props.removeUser}
        isError={this.props.isError}
        get={this.getUsersSorted}
        errorMessage={this.props.errorMessage}
        deleteIdentifier={identifiers.EMAIL}
        isCreatePending={this.props.isCreatePending}
        isCreateError={this.props.isCreateError}
        sortField={this.props.sortField}
        sortOrder={this.props.sortOrder}
        setMessage={this.props.setMessage}
        email={this.props.email}
      />
    );
  }
}

UserOverview.propTypes = {
  user: PropTypes.object,
  usersCount: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUsers: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  isCreateError: PropTypes.bool.isRequired,
  isCreatePending: PropTypes.bool.isRequired, 
};

const mapStateToProps = state => ({
  users: state.users.userList,
  usersCount: state.users.usersCount,
  user: state.users.user,
  userRoles: state.users.userRoles,
  isCreatePending: state.users.isCreatePending,
  isCreateError: state.users.isCreateError,
  sortField: state.users.sortField,
  sortOrder: state.users.sortOrder,
  email: state.auth.email,
});

const mapDispatchToProps = {
  getUsers,
  createUser,
  removeUser,
  getUserRoles,
  setSort,
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
