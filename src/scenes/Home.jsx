import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername, logoutUser } from '../redux/user/actions';
import { Button } from '../components';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  logout = e => {
    this.props.logout(e.target.value);
    this.props.history.replace('/auth');
  };

  render() {
    return (
      <div className='app'>
        <p className='app-intro'>
          Do you want to change your username:&nbsp;&nbsp;&nbsp;
          <input type='text' onChange={e => this.props.changeUsername(e.target.value)} value={this.props.username} />
        </p>
        <p className='app-link'>{this.props.username.length >= 3 && <Button link='/jokes'>Let me laugh</Button>}</p>
        <p className='app-link'>
          <Button theme='secondary' onClickCallback={this.logout}>
            Logout
          </Button>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username : state.user.username,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    changeUsername : value => dispatch(setUsername(value)),
    logout         : () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
