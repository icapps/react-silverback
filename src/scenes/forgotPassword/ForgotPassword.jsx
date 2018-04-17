import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { verifyForgotPassword, confirmForgotPassword } from '../../redux/auth/actions';
import { Spinner, BasicInput, Button } from '../../components';
import './forgotPassword.css';
import { identifiers } from '../../constants/index';
import { strings } from '../../utils/index';

class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      password: { value: '', isValid: true, errorMessage: strings.FIELD_REQUIRED },
      repeatPassword: { value: '', isValid: true, errorMessage: strings.REPEAT_NEW_PASSWORD_ERROR },
      isSubmitted: false,
    };
  }

  componentDidMount() {
    this.props.verifyForgotPassword(this.token);
  }

  token = window.location.search.split('=')[1];

  handleChange = event => {
    if (event.target.id === identifiers.PASSWORD) {
      this.setState({ [event.target.id]: { value: event.target.value, isValid: event.target.value !== '' || !this.state.isSubmitted, errorMessage: strings.FIELD_REQUIRED } });
    } else {
      this.setState({ [event.target.id]: { value: event.target.value, isValid: !this.state.isSubmitted || this.state.password.value === event.target.value, errorMessage: strings.REPEAT_NEW_PASSWORD_ERROR } });
    }
  }

  handleClick = () => {
    this.setState({
      isSubmitted: true,
      password: { ...this.state.password, isValid: this.state.password.value !== '' },
      repeatPassword: { ...this.state.repeatPassword, isValid: this.state.password.value === this.state.repeatPassword.value && this.state.repeatPassword.value !== '' },
    },
      () => {
        if (this.state.password.isValid && this.state.repeatPassword.isValid) {
          this.props.confirmForgotPassword(this.token, this.state.password.value);
        }
      });
  }

  render() {
    const { props, state } = this;

    if (props.isPending) { return <Spinner hasContainer={false} />; };
    if (props.isPasswordConfirmed) {
      return (
        <div className="forgot-password-container container">
          <main className="forgot-password forgot-password-succes">
            <h3>{strings.FORGOT_PASSWORD_SUCCES}</h3>
            <p>{strings.FORGOT_PASSWORD_SUCCES_TEXT}</p>
          </main>
        </div>
      );
    };
    if (props.isError) {
      return (
        <div className="forgot-password-container container">
          <main className="forgot-password forgot-password-failed">
            <h3 className="text-danger">{strings.FORGOT_PASSWORD}</h3>
            <p>{strings.FORGOT_PASSWORD_ERROR}</p>
          </main>
        </div>
      );
    };
    return (
      <div className="forgot-password-container container">
        <main className="forgot-password">
          <h3>{strings.FORGOT_PASSWORD}</h3>
          <div className="password-input">
            <BasicInput id={identifiers.PASSWORD} label={strings.NEW_PASSWORD} value={state.password.value} handleChange={this.handleChange} type="password" isValid={state.password.isValid} errorMessage={state.password.errorMessage} />
            <BasicInput id={identifiers.REPEAT_PASSWORD} label={strings.REPEAT_NEW_PASSWORD} value={state.repeatPassword.value} handleChange={this.handleChange} type="password" isValid={state.repeatPassword.isValid} errorMessage={state.repeatPassword.errorMessage} />
          </div>
          <Button className="btn-primary" text={strings.FORGOT_PASSWORD_BUTTON} handleClick={this.handleClick} />
        </main>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  isPending: PropTypes.bool.isRequired,
  verifyForgotPassword: PropTypes.func.isRequired,
  confirmForgotPassword: PropTypes.func.isRequired,
  isError: PropTypes.bool.isRequired,
  isPasswordConfirmed: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isPending: state.auth.isPending,
  isError: state.auth.isError,
  isPasswordConfirmed: state.auth.isPasswordConfirmed,
});

const mapDispatchToProps = {
  verifyForgotPassword,
  confirmForgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
