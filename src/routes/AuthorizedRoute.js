import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigation } from '../redux/navigation/actions';
import { Spinner } from '../components';
import { getVersion } from '../redux/versionControl/actions';
import { getMe } from '../redux/auth/actions';
import { logoutUser } from '../redux/auth/actions';

class AuthorizedRoute extends Component {
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
        render={props => {
          if (isPending) return <Spinner />;
          return localStorage.getItem('ACCESS_TOKEN') ? <Component {...this.props} /> : <Redirect to='/auth/login' />;
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

const mapDispatchToProps = dispatch => ({
  toggleNavigation: () => dispatch(toggleNavigation()),
  getVersion: () => dispatch(getVersion()),
  logout: () => dispatch(logoutUser()),
  getMe: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute);
