import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { strings } from '../../utils';
import { Button, BasicInput } from '../../components/index';
import './login.scss';
import { loginUser } from '../../redux/auth/actions';
import { Link } from 'react-router-dom';
import { regexes } from '../../constants';

const logo = require('../../assets/images/silverback.png');

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: {
        value: '',
        isValid: true,
        errorMessage: strings.LOGIN_EMAIL_REQUIRED,
      },
      password: {
        value: '',
        isValid: true,
        errorMessage: strings.LOGIN_PASSWORD_REQUIRED,
      },
    };
  }

  changeInput = event => {
    const value = event.target.value;
    if (event.target.id === 'email') {
      this.setState({
        email: {
          isValid: true,
          value: value,
        },
      });
    } else if (event.target.id === 'password') {
      this.setState({
        password: {
          isValid: true,
          value: value,
        },
      });
    }
  };

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
      } else {
        return {
          isValid: true,
          errorMessage: '',
        };
      }
    }
  };

  login = () => {
    const errorEmail = this.checkIfValid('email', this.state.email.value);
    const errorPassword = this.checkIfValid('password', this.state.password.value);
    this.setState(
      {
        email: {
          value: this.state.email.value,
          isValid: errorEmail.isValid,
          errorMessage: errorEmail.message,
        },
        password: {
          value: this.state.password.value,
          isValid: errorPassword.isValid,
          errorMessage: errorPassword.message,
        },
      },
      async () => {
        if (this.state.email.isValid && this.state.password.isValid) {
          await this.props.loginUser(this.state.email.value, this.state.password.value);
          if (this.props.isLoggedIn) {
            this.props.history.push('/');
          } else {
            this.setState({ password: { ...this.state.password, value: '' } });
          }
        }
      },
    );
  };

  render() {
    const { state } = this;
    return (
      <div className="login-container container">
        <main className="login">
          <div className="row">
            <div className="col-12 col-md-5 branding">
              <img src={logo} alt={strings.HEADER_TITLE} />
              <h2>{strings.HEADER_TITLE}</h2>
            </div>
            <div className="col-12 col-md-7">
              <BasicInput
                id="email"
                label={strings.EMAIL}
                value={state.email.value}
                handleChange={this.changeInput}
                isValid={state.email.isValid}
                errorMessage={state.email.errorMessage}
              />
              <BasicInput
                id="password"
                label={strings.PASSWORD}
                value={state.password.value}
                handleChange={this.changeInput}
                type="password"
                isValid={state.password.isValid}
                errorMessage={state.password.errorMessage}
                handleEnter={this.login}
              />
              <Button text={strings.LOGIN} handleClick={this.login} className="btn-primary" />
              <span className="forgot-password-link"></span>
              <Link to="/auth/forgot-password">{strings.FORGOT_PASSWORD_QUESTION}</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  messages: state.messages.messages,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
