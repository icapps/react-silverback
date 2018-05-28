import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import { Detail, EmptyDetail, Spinner, Modal } from '../../components';
import { getUsersById, createUser, removeUser, updateUser, getUserRoles } from '../../redux/users/actions';
import { forgotPassword } from '../../redux/auth/actions';
import { strings } from '../../utils';
import { identifiers } from '../../constants';
import constants from '../../redux/users/constants';
import './userDetail.css';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForgotPasswordMessage: false,
    };
  }
  componentDidMount() {
    this.props.getUsersById(this.props.location.state);
    this.props.getUserRoles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.state !== this.props.location.state) {
      this.props.getUsersById(this.props.location.state);
      this.props.getUserRoles();
    }
  }

  createUser = async (user, changePassword) => {
    return new Promise(async resolve => {
      const result = await this.props.createUser(user, changePassword);
      if (result.action && result.action.type === constants.CREATE_USER_FULFILLED) {
        this.props.history.replace(`/${window.location.pathname.split('/')[1]}/${this.props.user.id}`, this.props.user.id);
        resolve(true);
      }
      resolve(false);
    });
  }

  updateUser = async (id, user) => {
    return this.props.updateUser(id, user);
  }

  forgotPassword = async () => {
    const result = await this.props.forgotPassword(this.props.user.email);
    if (result.action && result.action.type.includes('FULFILLED')) {
      this.setState({ showForgotPasswordMessage: true });
    }
    return true;
  }
  
  render() {
    const userRolesMapped = this.props.userRoles.map(role => ({ key: role.code, text: role.name }));
    if (this.props.isPending) {
      return (<Spinner className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3" />);
    }
    if (this.props.user) {
      return (
        <Detail
        keyword={strings.USER}
        title={this.props.user.email}
        id={this.props.user.id}
        inputItems={[
          { id: identifiers.CREATED_AT, value: format(new Date(this.props.user.createdAt), 'DD-MM-YYYY'), label: strings.CREATED_AT, type: "plain", isEditable: false },
          { id: identifiers.UPDATED_AT, value: format(new Date(this.props.user.updatedAt), 'DD-MM-YYYY'), label: strings.UPDATED_AT, type: "plain", isEditable: false },
          { id: identifiers.EMAIL, value: this.props.user.email, label: strings.EMAIL, type: "text", isEditable: true },
          { id: identifiers.FIRST_NAME, value: this.props.user.firstName, label: strings.FIRST_NAME, type: "text", isEditable: true },
          { id: identifiers.LAST_NAME, value: this.props.user.lastName, label: strings.LAST_NAME, type: "text", isEditable: true },
          { id: identifiers.ROLE, value: this.props.user.role.code, label: strings.ROLE, type: "select", options: userRolesMapped, isEditable: true },
          { id: identifiers.HAS_ACCESS, value: this.props.user.hasAccess, label: strings.IS_ACTIVE, type: "boolean", isEditable: true },
          { id: identifiers.REGISTRATION_COMPLETED, value: this.props.user.registrationCompleted, label: strings.REGISTRATION_COMPLETED, type: "plain", isEditable: false },
          { id: identifiers.PASSWORD, value: strings.PASSWORD, label: strings.PASSWORD, type: "password", isEditable: false },
        ]}
        history={this.props.history}
        createParameters={[
          { id: identifiers.EMAIL, label: strings.EMAIL, type: "text" },
          { id: identifiers.FIRST_NAME, label: strings.FIRST_NAME, type: "text" },
          { id: identifiers.LAST_NAME, label: strings.LAST_NAME, type: "text" },
          { id: identifiers.ROLE, label: strings.ROLE, type: "select", options: userRolesMapped },
          { id: identifiers.HAS_ACCESS, label: strings.IS_ACTIVE, type: "boolean", defaultValue: true },
          { id: identifiers.PASSWORD, label: strings.PASSWORD, type: "password" },
        ]}
        create={this.createUser}
        remove={this.props.removeUser}
        update={this.updateUser}
        isUpdatePending={this.props.isUpdatePending}
        isUpdated={this.props.isUserUpdated}
        isError={this.props.isError}
        errorMessage={this.props.errorMessage}
        isCreatePending={this.props.isCreatePending}
        isCreateError={this.props.isCreateError}
        isForgotPasswordSuccessful={this.state.showForgotPasswordMessage}
      >
        <Modal
          id="reset-password"
          modalButtonText={strings.RESET_PASSWORD_FOR_THIS_USER}
          handlePrimaryButton={this.forgotPassword}
          primaryButtonText={strings.RESET}
          secondaryButtonText={strings.CANCEL}
          modalButtonClassName="btn-light forgot-password-btn"
          secondaryButtonClassName="btn-light"
          primaryButtonClassName="btn-primary"
        >
          <p>{strings.RESET_PASSWORD_FOR_THIS_USER_TEXT}</p>
        </Modal>
      </Detail>
      );
    } else {
      return <EmptyDetail history={this.props.history} />;
    }
  }
}

UserDetail.propTypes = {
  user: PropTypes.object,
  isUserUpdated: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isUpdatePending: PropTypes.bool.isRequired,
  getUsersById: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  isCreateError: PropTypes.bool.isRequired,
  isCreatePending: PropTypes.bool.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  isForgotPasswordPending: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.users.user,
  userRoles: state.users.userRoles,
  isUserUpdated: state.users.isUserUpdated,
  isCreateError: state.users.isCreateError,
  isError: state.users.isError,
  errorMessage: state.users.errorMessage,
  isPending: state.users.isPending,
  isCreatePending: state.users.isCreatePending,
  isUpdatePending: state.users.isUpdatePending,
  isForgotPasswordPending: state.auth.isForgotPasswordPending,
});

const mapDispatchToProps = {
  getUsersById,
  createUser,
  updateUser,
  removeUser,
  getUserRoles,
  forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
