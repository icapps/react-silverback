import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { strings } from '../../utils';
import { Button, BasicInput } from '../../components/index';
import './login.css';
import { loginUser } from '../../redux/auth/actions';
import { Link } from 'react-router-dom';
import { regexes } from '../../constants';

const logo = require('../../assets/images/silverback.png');

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: { value: '', isValid: true, errorMessage: strings.LOGIN_EMAIL_REQUIRED },
      password: { value: '', isValid: true, errorMessage: strings.LOGIN_PASSWORD_REQUIRED },
      showErrorMessage: false,
    };
  }

  changeInput = event => {
    this.setState({ showErrorMessage: false });
    const value = event.target.value;
    const errorState = this.checkIfValid(event.target.id, value);
    if (event.target.id === 'email') {
      this.setState({
        email: {
          value: value,
          isValid: errorState.isValid,
          errorMessage: errorState.message,
        },
      });
    } else if (event.target.id === 'password'){
      this.setState({
        password: {
          value: value,
          isValid: errorState.isValid,
          errorMessage: errorState.message,
        },
      });
    }
  }

  checkIfValid = (field, value) => {
    if (field === 'email') {
      if (value === '') {
        return {
          isValid: false,
          message: strings.LOGIN_EMAIL_REQUIRED,
        };
      } else if (!regexes.EMAIL.test(value)) {
        return {
          isValid: false,
          message: strings.LOGIN_EMAIL_VALIDATION,
        };
      } else {
        return {
          isValid: true,
          errorMessage: '',
        };
      }
    } else if (field === 'password') {
      if (value === '') {
        return {
          isValid: false,
          message: strings.LOGIN_PASSWORD_REQUIRED,
        };
      } else if (value.length < 6) {
        return {
          isValid: false,
          message: strings.LOGIN_PASSWORD_LENGTH,
        };
      } else {
        return {
          isValid: true,
          errorMessage: '',
        };
      }
    }
  }

  login = async () => {
    const errorEmail = this.checkIfValid('email', this.state.email.value);
    this.setState({
      email: {
        value: this.state.email.value,
        isValid: errorEmail.isValid,
        errorMessage: errorEmail.message,
      },
    });
    const errorPassword = this.checkIfValid('password', this.state.password.value);
    this.setState({
      password: {
        value: this.state.password.value,
        isValid: errorPassword.isValid,
        errorMessage: errorPassword.message,
      },
    });
    if (this.state.email.isValid && this.state.password.isValid) {
      await this.props.loginUser(this.state.email.value, this.state.password.value);
      if (this.props.isLoggedIn) {
        this.props.history.push('/');
      } else {
        this.setState({ password: { ...this.state.password, value: '' }, showErrorMessage: true });
      }
    }
  }

  render() {
    const { props, state } = this;
    return (
      <div className="login-container container">
        {(props.isError && state.showErrorMessage) && <div className="alert alert-danger text-center" role="alert">{props.errorMessage}</div>}
        <main className='login'>
          <div className="row">
            <div className="col-12 col-md-5 branding">
              <img src={logo} alt={strings.HEADER_TITLE} />
              <h2>{strings.HEADER_TITLE}</h2>
            </div>
            <div className="col-12 col-md-7">
              <BasicInput id="email" label={strings.EMAIL} value={state.email.value} handleChange={this.changeInput} isValid={state.email.isValid} errorMessage={state.email.errorMessage} />
              <BasicInput id="password" label={strings.PASSWORD} value={state.password.value} handleChange={this.changeInput} type="password" isValid={state.password.isValid} errorMessage={state.password.errorMessage} handleEnter={this.login} />
              <Button text={strings.LOGIN} handleClick={this.login} className="btn-primary" />
              <span className="forgot-password-link" ></span><Link to="/auth/forgot-password">{strings.FORGOT_PASSWORD_QUESTION}</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isError: state.auth.isError,
  errorMessage: state.auth.errorMessage,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
