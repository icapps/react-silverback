import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigation } from '../redux/navigation/actions';
import { Spinner } from '../components';
import { getVersion } from '../redux/versionControl/actions';
import { getMe, logoutUser } from '../redux/auth/actions';
import { clearMessages } from '../redux/messages/actions';

class AuthorizedRoute extends Component {
  constructor(props) {
    super(props);
    this.props.history.listen(() => {
      this.props.clearMessages();
    });
  }

  componentDidMount() {
    if(localStorage.getItem('LOGGED_IN')){
      this.props.getVersion();
      this.props.getMe();
    }
  }

  render() {
    const { component: Component, isPending, ...otherProps } = this.props;
    return (
      <Route
        {...otherProps}
        render={() => {
          if (isPending) return <Spinner />;
          return localStorage.getItem('LOGGED_IN') ? <Component {...this.props} /> : <Redirect to='/auth/login' />;
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isPending: state.auth.isPending,
  isNavigationShown: state.navigation.isNavigationShown,
  build: state.versionControl.build,
  version: state.versionControl.version,
  email: state.auth.email,
});

const mapDispatchToProps = {
  toggleNavigation,
  getVersion,
  logoutUser,
  getMe,
  clearMessages,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute));
