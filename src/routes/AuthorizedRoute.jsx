import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigation } from '../redux/navigation/actions';
import { Spinner } from '../components';

class AuthorizedRoute extends Component {
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
});

const mapDispatchToProps = dispatch => ({
  toggleNavigation: () => dispatch(toggleNavigation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute);
