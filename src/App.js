import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthorizedRoute from './routes/AuthorizedRoute';
import AuthorizedLayout from './routes/AuthorizedLayout';
import UnauthorizedRoute from './routes/UnauthorizedRoute';
import UnauthorizedLayout from './routes/UnauthorizedLayout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <UnauthorizedRoute path='/auth' component={UnauthorizedLayout} />
          <UnauthorizedRoute path='/forgot-password' component={UnauthorizedLayout} />
          <UnauthorizedRoute path='/choose-password' component={UnauthorizedLayout} />
          <AuthorizedRoute path='/' component={AuthorizedLayout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
