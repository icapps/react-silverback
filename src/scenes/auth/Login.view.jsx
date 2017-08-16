import React, { Component } from 'react';
import { Button } from '../../components';

import './Login.style.css';

class LoginView extends Component {
  onLoginUser = () => {
    this.props.loginUser();
    this.props.history.push('/');
  };

  render() {
    return (
      <div className='login-view'>
        <h1 className='title'>Login</h1>
        <label htmlFor='username'>Username</label>
        <input type='text' placeholder='Your username' id='username' onChange={(e) => this.props.onChangeName(e.target.value)} />
        <div className='actions'>
          <Button onClickCallback={this.onLoginUser}>login</Button>
        </div>
      </div>
    );
  }
}

export default LoginView;
