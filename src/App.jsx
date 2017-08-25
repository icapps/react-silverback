import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthorizedRoute from './routes/AuthorizedRoute';
import AuthorizedLayout from './routes/AuthorizedLayout';
import UnauthorizedLayout from './routes/UnauthorizedLayout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/auth' component={UnauthorizedLayout} />
          <AuthorizedRoute path='/' component={AuthorizedLayout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
