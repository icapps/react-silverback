import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../scenes/login/Login';

const UnauthorizedLayout = (props) => {
  return (
    <div className='unauth-layout'>
        <Switch>
          <Route path='/auth/login' exact component={Login} />
          <Redirect to='/auth/login' />
        </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
