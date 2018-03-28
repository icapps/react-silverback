import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Detail, EmptyDetail } from '../../components';
import { getUsersById , createUser} from '../../redux/users/actions';
import { strings } from '../../utils';

class UserDetail extends Component {
  componentDidMount() {
    this.props.getUsersById(window.location.pathname.split('/')[2]);
  }

  createUser = (id, user) => {
    this.props.createUser(id, user);
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
      createParameters={[
        { id: strings.EMAIL_ID, label: strings.EMAIL, type: "text" },
        { id: strings.FIRST_NAME_ID, label: strings.FIRST_NAME, type: "text" },
        { id: strings.LAST_NAME_ID, label: strings.LAST_NAME, type: "text" },
        { id: strings.HAS_ACCESS_ID, label: strings.HAS_ACCESS, type: "boolean" },
      ]}
      create={this.createUser}
    /> : <EmptyDetail history={this.props.history} />;
  }
}

const mapStateToProps = state => ({
  user: state.users.user,
});

const mapDispatchToProps = {
  getUsersById,
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
