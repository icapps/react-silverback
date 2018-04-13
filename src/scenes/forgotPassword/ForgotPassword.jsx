import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { verifyForgotPassword, confirmForgotPassword } from '../../redux/auth/actions';
import { Spinner, BasicInput, Button } from '../../components';
import './forgotPassword.css';

class ForgotPassword extends React.Component {
  componentDidMount() {
    this.props.verifyForgotPassword(window.location.pathname.split('/')[3]);
  }

  render() {
    if (this.props.isPending) return <Spinner hasContainer={false} />;
    return (
      <div className="forgot-password-container container">
        <main className='forgot-password'>
          <h3>Forgot password</h3>
          <BasicInput />
          <Button />
        </main>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  isPending: PropTypes.bool.isRequired,
  verifyForgotPassword: PropTypes.func.isRequired,
  confirmForgotPassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isPending: state.auth.isPending,
});

const mapDispatchToProps = {
  verifyForgotPassword,
  confirmForgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
