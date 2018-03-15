import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigation } from '../redux/navigation/actions';

class AuthorizedRoute extends Component {
  render() {
    const { component: Component, isPending, isLoggedIn, ...otherProps } = this.props;
    return (
      <Route
        {...otherProps}
        render={props => {
          if (isPending) return <div>Loading...</div>;
          return isLoggedIn ? <Component {...this.props} /> : <Redirect to='/auth/login' />;
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isPending: state.auth.isPending,
  isLoggedIn: state.auth.isLoggedIn,
  isNavigationShown: state.navigation.isNavigationShown,
});

const mapDispatchToProps = dispatch => ({
  toggleNavigation: () => dispatch(toggleNavigation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute);
