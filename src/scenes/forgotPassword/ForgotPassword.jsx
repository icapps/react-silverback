import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './forgotPassword.css';
import { strings } from '../../utils';
import { BasicInput, Button } from '../../components';
import { forgotPassword } from '../../redux/auth/actions';
import constants from '../../redux/auth/constants';
import { regexes } from '../../constants';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: { value: '', isValid: true, errorMessage: strings.LOGIN_EMAIL_REQUIRED },
      isForgotPasswordSent: false,
    };
  }

  handleChange = event => this.setState({ email: { ...this.state.email, value: event.target.value } });

  handleForgotPassword = async () => {
    await this.setState({
      email: {
        ...this.state.email,
        isValid: this.state.email.value !== '' && regexes.email.test(this.state.email.value),
        errorMessage: this.state.email.value !== '' ? strings.LOGIN_EMAIL_VALIDATION : strings.LOGIN_EMAIL_REQUIRED,
      },
    });
    if (this.state.email.isValid) {
      const result = await this.props.forgotPassword(this.state.email.value);
      if (result.action && result.action.type === constants.FORGOT_PASSWORD_FULFILLED) {
        this.setState({ isForgotPasswordSent: true });
      }
    }
  }

  goBackToLogin = () => {
    this.props.history.goBack();
  }

  render() {
    const { props, state } = this;
    if (state.isForgotPasswordSent) return (
      <div className="forgot-password-container container">
        {props.isError && <div className="alert alert-danger text-center" role="alert"> {props.errorMessage} </div>}
        <main className='forgot-password'>
          <h2>{strings.RESET_PASSWORD}</h2>
          <p className="forgot-password-succes-text">{strings.formatString(strings.RESET_PASSWORD_TEXT, { email: state.email.value !== '' ? <span>state.email.value</span> : 'you' })}</p>
          <Button className="btn-primary" text={strings.GO_BACK_TO_LOGIN} handleClick={this.goBackToLogin} />
        </main>
      </div>
    );
    return (
      <div className="forgot-password-container container">
        {props.isError && <div className="alert alert-danger text-center" role="alert"> {props.errorMessage} </div>}
        <main className='forgot-password'>
          <h2>{strings.FORGOT_PASSWORD_QUESTION}</h2>
          <p>{strings.FORGOT_PASSWORD_TEXT}</p>
          <BasicInput id="email" label={strings.EMAIL} value={state.email.value} handleChange={this.handleChange} isValid={state.email.isValid} errorMessage={state.email.errorMessage} />
          <Button className="btn-primary" text={strings.RETRIEVE_PASSWORD} handleClick={this.handleForgotPassword} />
        </main>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isError: state.auth.isError,
  errorMessage: state.auth.errorMessage,
});

const mapDispatchToProps = {
  forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
