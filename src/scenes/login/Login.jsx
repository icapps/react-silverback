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
    };
  }

  changeInput = event => {
    this.setState({ [event.target.id]: { ...this.state[event.target.id], value: event.target.value } });
  }

  login = async () => {
    await this.setState({
      email: {
        ...this.state.email,
        isValid: this.state.email.value !== '' && regexes.EMAIL.test(this.state.email.value),
        errorMessage: this.state.email.value !== '' ? strings.LOGIN_EMAIL_VALIDATION : strings.LOGIN_EMAIL_REQUIRED,
      },
      password: {
        ...this.state.password,
        isValid: this.state.password.value !== '',
      },
    });
    if (this.state.email.isValid && this.state.password.isValid) {
      await this.props.loginUser(this.state.email.value, this.state.password.value);
      if (this.props.isLoggedIn) {
        this.props.history.push('/');
      } else {
        this.setState({ password: { ...this.state.password, value: '' } });
      }
    }
  }

  render() {
    const { props, state } = this;
    const showErrorMessage = state.email.isValid && state.password.isValid;
    return (
      <div className="login-container container">
        {(props.isError && showErrorMessage) && <div className="alert alert-danger text-center" role="alert"> {props.errorMessage} </div>}
        <main className='login'>
          <div className="row">
            <div className="col-12 col-md-5 branding">
              <img src={logo} alt={strings.HEADER_TITLE} />
              <h2>{strings.HEADER_TITLE}</h2>
            </div>
            <div className="col-12 col-md-7">
              <BasicInput id="email" label={strings.EMAIL} value={state.email.value} handleChange={this.changeInput} isValid={state.email.isValid} errorMessage={state.email.errorMessage} />
              <BasicInput id="password" label={strings.PASSWORD} value={state.password.value} handleChange={this.changeInput} type="password" isValid={state.password.isValid} errorMessage={state.password.errorMessage} />
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
