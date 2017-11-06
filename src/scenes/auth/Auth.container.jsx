import { connect } from 'react-redux';
import { loginUser, requestNewPassword, setUsername } from '../../redux/user/actions';
import LoginView from './Login.view';
import ForgotPasswordView from './ForgotPassword.view';

const mapStateToProps = state => ({
  loading    : state.isLoading,
  isLoggedIn : state.isLoggedIn,
  error      : state.user.error,
  errorMsg   : state.user.errorMsg,
});

const mapDispatchToProps = {
  loginUser,
  onChangeName       : setUsername,
  requestNewPassword,
};

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginView);
const ForgotPasswordPage = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordView);

export { LoginPage, ForgotPasswordPage };
