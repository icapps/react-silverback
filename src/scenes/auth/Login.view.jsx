import React, {Component} from 'react';
import {Button} from '../../components';

import './Login.style.css';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onLoginUser = async () => {
    await this.props.loginUser(this.state.username, this.state.password);
    this.props.history.push('/');
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className='login-view'>
        <h1 className='title'>Login</h1>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' placeholder='Your username' id='username' onChange={this.onChange} />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' placeholder='Your password' id='password' onChange={this.onChange} />

        {this.props.error && <span className='error'>{this.props.errorMsg}</span>}
        <div className='actions'>
          <Button onClickCallback={this.onLoginUser}>login</Button>
        </div>
      </div>
    );
  }
}

export default LoginView;
