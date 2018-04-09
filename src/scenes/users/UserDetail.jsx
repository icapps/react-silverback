import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Detail, EmptyDetail, Spinner } from '../../components';
import { getUsersById, createUser, removeUser, updateUser } from '../../redux/users/actions';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import constants from '../../redux/users/constants';

class UserDetail extends Component {
  componentDidMount() {
    this.props.getUsersById(window.location.pathname.split('/')[2]);
  }

  createUser = async user => {
    const result = await this.props.createUser(user);
    if (result.action && result.action.type === constants.CREATE_USER_FULFILLED) {
      this.props.history.replace(`/${window.location.pathname.split('/')[1]}/${this.props.user.id}`, this.props.user.id);
    }
  }

  updateUser = (id, user) => {
    this.props.updateUser(id, user);
  }

  render() {
    if (this.props.isPending) return (<Spinner className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" />);
    if (this.props.user) return (
      <Detail
        dataType={strings.USERS}
        keyword={strings.USER}
        title={this.props.user.email}
        id={this.props.user.id}
        inputItems={[
          { id: identifiers.EMAIL, value: this.props.user.email, label: strings.EMAIL, type: "text" },
          { id: identifiers.FIRST_NAME, value: this.props.user.firstName, label: strings.FIRST_NAME, type: "text" },
          { id: identifiers.LAST_NAME, value: this.props.user.lastName, label: strings.LAST_NAME, type: "text" },
          { id: identifiers.ROLE, value: this.props.user.role, label: strings.ROLE, type: "text" },
          { id: identifiers.HAS_ACCESS, value: this.props.user.hasAccess, label: strings.HAS_ACCESS, type: "boolean" },
        ]}
        history={this.props.history}
        createParameters={[
          { id: identifiers.EMAIL, label: strings.EMAIL, type: "text" },
          { id: identifiers.FIRST_NAME, label: strings.FIRST_NAME, type: "text" },
          { id: identifiers.LAST_NAME, label: strings.LAST_NAME, type: "text" },
          { id: identifiers.PASSWORD, label: strings.PASSWORD, type: "password" },
          { id: identifiers.ROLE, label: strings.ROLE, type: "text" },
          { id: identifiers.HAS_ACCESS, label: strings.HAS_ACCESS, type: "boolean" },
        ]}
        create={this.createUser}
        remove={this.props.removeUser}
        update={this.updateUser}
        isUpdated={this.props.isUserUpdated}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
      />);
    return <EmptyDetail history={this.props.history} />;
  }
}

UserDetail.propTypes = {
  user: PropTypes.object,
  isUserUpdated: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  getUsersById: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.users.user,
  isUserUpdated: state.users.isUserUpdated,
  isError: state.users.isError,
  errorMessage: state.users.errorMessage,
  isPending: state.users.isPending,
});

const mapDispatchToProps = {
  getUsersById,
  createUser,
  updateUser,
  removeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
