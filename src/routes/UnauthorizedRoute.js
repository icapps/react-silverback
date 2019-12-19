import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleNavigation } from '../redux/navigation/actions';

class AuthorizedRoute extends Component {
  render() {
    const { component: Component, ...otherProps } = this.props;
    return (
      <Route
        {...otherProps}
        render={props => {
          if (props.match.path === '/forgot-password' || props.match.path === '/choose-password') {
            return <Component {...this.props} />;
          }
          return !localStorage.getItem('LOGGED_IN') ? <Component {...this.props} /> : <Redirect to="/" />;
        }}
      />
    );
  }
}

const mapDispatchToProps = {
  toggleNavigation,
};

export default connect(null, mapDispatchToProps)(AuthorizedRoute);
