import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Overview } from '../../components';
import { getUsers, createUser, removeUser } from '../../redux/users/actions';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import constants from '../../redux/users/constants';

class UserOverview extends Component {
  createUser = async user => {
    return new Promise(async resolve => {
      const result = await this.props.createUser(user);
      if (result.action && result.action.type === constants.CREATE_USER_FULFILLED) {
        this.props.history.push(`${window.location.pathname}/${this.props.user.id}`, this.props.user.id);
        resolve(true);
      }
      resolve(false);
    });
  }

  render() {
    return (
      <Overview
        title={strings.USERS}
        keyword={strings.USER}
        keys={[
          { id: identifiers.EMAIL, value: strings.EMAIL, isSortable: true },
          { id: identifiers.FIRST_NAME, value: strings.FIRST_NAME, isSortable: true },
          { id: identifiers.LAST_NAME, value: strings.LAST_NAME, isSortable: true },
          { id: identifiers.HAS_ACCESS, value: strings.HAS_ACCESS, isSortable: false },
          { id: identifiers.ROLE, value: strings.ROLE, isSortable: false },
        ]}
        listItems={this.props.users}
        history={this.props.history}
        paginationTotalCount={this.props.usersCount}
        createParameters={[
          { id: identifiers.EMAIL, label: strings.EMAIL, type: "text" },
          { id: identifiers.FIRST_NAME, label: strings.FIRST_NAME, type: "text" },
          { id: identifiers.LAST_NAME, label: strings.LAST_NAME, type: "text" },
          //{ id: identifiers.PASSWORD, label: strings.PASSWORD, type: "password" },
          { id: identifiers.ROLE, label: strings.ROLE, type: "text" },
          { id: identifiers.HAS_ACCESS, label: strings.HAS_ACCESS, type: "boolean" },
        ]}
        create={this.createUser}
        removeItem={this.props.removeUser}
        isError={this.props.isError}
        get={this.props.getUsers}
        errorMessage={this.props.errorMessage}
        deleteIdentifier={identifiers.EMAIL}
        isCreatePending={this.props.isCreatePending}
        isCreateError={this.props.isCreateError}
      />
    );
  }
}

UserOverview.propTypes = {
  user: PropTypes.object,
  usersCount: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
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
  isCreatePending: state.users.isCreatePending,
  isCreateError: state.users.isCreateError,
  isError: state.users.isError,
  errorMessage: state.users.errorMessage,
});

const mapDispatchToProps = {
  getUsers,
  createUser,
  removeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOverview);
