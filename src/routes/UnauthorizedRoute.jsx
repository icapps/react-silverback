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
          if (props.match.path === '/forgot-password') {
            return <Component {...this.props} />;
          }
          return !localStorage.getItem('ACCESS_TOKEN') ? <Component {...this.props} /> : <Redirect to='/' />;
        }}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toggleNavigation: () => dispatch(toggleNavigation()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizedRoute);
