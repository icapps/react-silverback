import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

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
});

export default connect(mapStateToProps)(AuthorizedRoute);
