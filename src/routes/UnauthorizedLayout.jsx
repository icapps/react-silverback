import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../scenes/login/Login';
import ForgotPassword from '../scenes/forgotPassword/ForgotPassword';

const UnauthorizedLayout = (props) => {
  return (
    <div className='unauth-layout'>
        <Switch>
          <Route path='/auth/login' exact component={Login} />
          <Route path='/forgot-password' exact component={ForgotPassword} />
          <Redirect to='/auth/login' />
        </Switch>
    </div>
  );
};

export default UnauthorizedLayout;
