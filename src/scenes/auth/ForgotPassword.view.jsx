import React, { Component } from 'react';
import { Button } from '../../components';

class ForgotPasswordView extends Component {
  render() {
    return (
      <div className="forgot-password-view">
        <Button link="/">Request new password</Button>
      </div>
    );
  }
}

export default ForgotPasswordView;
