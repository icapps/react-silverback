import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../scenes/login/Login';

const UnauthorizedLayout = (props) => {
  return (
    <div className='unauth-layout'>
      <section className='unauth-action-view'>
        <Switch>
          <Route path='/auth/login' exact component={Login} />
          <Redirect to='/auth/login' />
        </Switch>
      </section>
    </div>
  );
};

export default UnauthorizedLayout;
