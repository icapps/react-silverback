import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../scenes/Home';
import Jokes from '../scenes/jokes/Jokes';
import { Navbar } from '../components';

const AuthorizedLayout = (props) => {
  return (
    <div className='auth-layout'>
      <Navbar username={props.username} />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/jokes' component={Jokes} />

        <Redirect to='/' />
      </Switch>
    </div>
  );
};

export default connect((state) => ({ username: state.user.username }))(AuthorizedLayout);
