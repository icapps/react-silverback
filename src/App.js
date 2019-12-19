import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthorizedRoute from './routes/AuthorizedRoute';
import AuthorizedLayout from './routes/AuthorizedLayout';
import UnauthorizedRoute from './routes/UnauthorizedRoute';
import UnauthorizedLayout from './routes/UnauthorizedLayout';
import { Alerts } from './components/index';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Alerts />
        <BrowserRouter>
          <Switch>
            <UnauthorizedRoute path="/auth" component={UnauthorizedLayout} />
            <UnauthorizedRoute path="/forgot-password" component={UnauthorizedLayout} />
            <UnauthorizedRoute path="/choose-password" component={UnauthorizedLayout} />
            <AuthorizedRoute path="/" component={AuthorizedLayout} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
