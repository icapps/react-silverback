import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import AuthorizedRoute from './routes/AuthorizedRoute';
import AuthorizedLayout from './routes/AuthorizedLayout';
import UnauthorizedRoute from './routes/UnauthorizedRoute';
import UnauthorizedLayout from './routes/UnauthorizedLayout';
import { connect } from 'react-redux';
import { Alert } from './components/index';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className='alert-container'>
          {this.props.messages.map(message => <Alert text={message.text} type={message.type} key={message.id} />)}
        </div>
        <BrowserRouter>
          <Switch>
            <UnauthorizedRoute path='/auth' component={UnauthorizedLayout} />
            <UnauthorizedRoute path='/forgot-password' component={UnauthorizedLayout} />
            <UnauthorizedRoute path='/choose-password' component={UnauthorizedLayout} />
            <AuthorizedRoute path='/' component={AuthorizedLayout} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messages,
});

export default connect(mapStateToProps)(App);
