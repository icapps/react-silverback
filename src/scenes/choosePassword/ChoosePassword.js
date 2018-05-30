import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { verifyForgotPassword, confirmForgotPassword } from '../../redux/auth/actions';
import { Spinner, BasicInput, Button } from '../../components';
import './choosePassword.css';
import { identifiers } from '../../constants/index';
import { strings } from '../../utils/index';
import ForgotPassword from '../forgotPassword/ForgotPassword';

class ChoosePassword extends React.Component {
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
    const isGettingStartedScreen = window.location.pathname === '/choose-password';
    
    if (props.isPending) { return <Spinner hasContainer={false} />; };
    if (props.isPasswordConfirmed) {
      return (
        <div className="choose-password-container container">
          <main className="choose-password choose-password-succes">
            <h3>{isGettingStartedScreen ? strings.GETTING_STARTED_SUCCES : strings.FORGOT_PASSWORD_SUCCES}</h3>
            <p>{isGettingStartedScreen ? strings.GETTING_STARTED_SUCCES_TEXT : strings.FORGOT_PASSWORD_SUCCES_TEXT}</p>
          </main>
        </div>
      );
    };
    if (props.isError) {
      return (
        <ForgotPassword {...this.props} />
      );
    };
    return (
      <div className="choose-password-container container">
        <main className="choose-password">
          <h3>{isGettingStartedScreen ? strings.GETTING_STARTED : strings.FORGOT_PASSWORD}</h3>
          <div className="password-input">
            <BasicInput id={identifiers.PASSWORD} label={isGettingStartedScreen ? strings.PASSWORD : strings.NEW_PASSWORD} value={state.password.value} handleChange={this.handleChange} type="password" isValid={state.password.isValid} errorMessage={state.password.errorMessage} />
            <BasicInput id={identifiers.REPEAT_PASSWORD} label={isGettingStartedScreen ? strings.REPEAT_PASSWORD : strings.REPEAT_NEW_PASSWORD} value={state.repeatPassword.value} handleChange={this.handleChange} type="password" isValid={state.repeatPassword.isValid} errorMessage={state.repeatPassword.errorMessage} handleEnter={this.handleClick} />
          </div>
          <Button className="btn-primary" text={strings.FORGOT_PASSWORD_BUTTON} handleClick={this.handleClick} />
        </main>
      </div>
    );
  }
}

ChoosePassword.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePassword);
