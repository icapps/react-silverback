import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage, ForgotPasswordPage } from '../scenes/auth/Auth.container';

const UnauthorizedLayout = (props) => {
  return (
    <div className='unauth-layout'>
      <section className='unauth-action-view'>
        <Switch>
          <Route path='/auth/login' exact component={LoginPage} />
          <Route path='/auth/forgot-password' component={ForgotPasswordPage} />
          {/* <Route path='/auth/register' component={Registerpage} /> */}
          <Redirect to='/auth/login' />
        </Switch>
      </section>
    </div>
  );
};

export default UnauthorizedLayout;
