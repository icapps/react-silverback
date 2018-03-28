import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Detail, EmptyDetail } from '../../components';
import { getUsersById, updateUser } from '../../redux/users/actions';
import { strings } from '../../utils';

class UserDetail extends Component {
  componentDidMount() {
    this.props.getUsersById(window.location.pathname.split('/')[2]);
  }

  updateUser = (id, user) => {
    this.props.updateUser(id, user);
  }

  render() {
    return this.props.user ? <Detail
      dataType={strings.USERS}
      title={this.props.user.email}
      id={this.props.user.id}
      inputItems={[
        { id: strings.EMAIL_ID, value: this.props.user.email, label: strings.EMAIL, type: "text" },
        { id: strings.FIRST_NAME_ID, value: this.props.user.firstName, label: strings.FIRST_NAME, type: "text" },
        { id: strings.LAST_NAME_ID, value: this.props.user.lastName, label: strings.LAST_NAME, type: "text" },
        { id: strings.HAS_ACCESS_ID, value: this.props.user.hasAccess, label: strings.HAS_ACCESS, type: "boolean" },
      ]}
      history={this.props.history}
      update={this.updateUser}
      isUpdated={this.props.isUserUpdated}
      isError={this.props.isError}
      errorMessage={this.props.errorMessage}
    /> : <EmptyDetail history={this.props.history} />;
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
  isUserUpdated: state.users.isUserUpdated,
  isError: state.users.isError,
  errorMessage: state.users.errorMessage,
});

const mapDispatchToProps = {
  getUsersById,
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
