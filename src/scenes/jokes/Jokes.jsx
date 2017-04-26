import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as jokesActions from '../../modules/jokes/actions';
import NavBar from '../../components/navbar/NavBar';

import './jokes.css';

class Jokes extends Component {
  render() {
    return (
      <div className="app">
        <NavBar username={this.props.username} />

        <p className="app-jokes">
          <button onClick={this.props.dispatchers.getJoke}>Tell me a joke!</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchers: {
      getJoke: () => dispatch(jokesActions.getJoke())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jokes);
