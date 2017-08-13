import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './scenes/Home';
import Jokes from './scenes/jokes/Jokes';
import {Navbar} from './components';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Navbar />
        <Route path='/' exact component={Home} />
        <Route path='/jokes' exact component={Jokes} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
