import React, { Component } from 'react';
import logo from './logo.svg';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';
import * as userActions from './modules/user/actions';

class App extends Component {
  getName = () => {
    return 'Jasper Vercammen';
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.props.username}</h2>
        </div>
        <p className="App-intro">
          Please type in your name:
          <input type='text' onChange={(e) => this.props.dispatchers.setUsername(e.target.value)}/>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchers: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
