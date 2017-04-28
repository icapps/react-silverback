import React, { Component } from 'react';
import {Router, Route, browserHistory} from 'react-router';
import Home from './scenes/Home';
import Jokes from './scenes/jokes/Jokes';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        {/* Each route is defined with Route */}
        <Route path='/' component={Home} />
        <Route path='/jokes' component={Jokes} />
      </Router>
    );
  }
}

export default App;
