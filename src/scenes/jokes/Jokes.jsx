import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as jokesActions from '../../modules/jokes/actions';
import NavBar from '../../components/navbar/NavBar';

import './jokes.css';

class Jokes extends Component {
  render() {
    return (
      <div className="app">
        <NavBar username={this.props.username} />

        <p className="app-jokes">
          <button onClick={() => this.props.dispatchers.getJoke('NmbFtH69hFd')}>Tell me a joke!</button>
        </p>
        {this.props.joke && (
        <p className="app-joke">
          {this.props.joke}
        </p>)}

        {this.props.error && (
          <p className="app-joke-error">
            {this.props.errorMsg}
          </p>)}

          <p>
            <Link to='/'>Take me home</Link>
          </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    joke: state.jokes.joke,
    error: state.jokes.error,
    errorMsg: state.jokes.errorMsg
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchers: {
      getJoke: (a) => dispatch(jokesActions.getJoke(a))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jokes);
