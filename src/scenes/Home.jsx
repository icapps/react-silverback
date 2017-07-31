import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../modules/user/actions';
import NavBar from '../components/navbar/NavBar';
import Button from '../components/button/Button';
import './home.scss';

class Home extends Component {
  render() {
    return (
      <div className='app'>
        <NavBar username={this.props.username} />
        <p className='app-intro'>
          Please type in your name:&nbsp;&nbsp;&nbsp;
          <input
            type='text'
            onChange={e => this.props.dispatchers.setUsername(e.target.value)}
          />
        </p>
        <p className='app-link'>
          {this.props.username.length >= 3 &&
            <Button link='/jokes'>Let me laugh</Button>}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username
  };
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchers: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
