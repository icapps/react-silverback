import constants from './constants';
import { authService } from '../../services';

export const loginUser = (username, password) => {
  return {
    type: constants.LOGIN_USER,
    payload: authService.login(username, password),
  };
};

export const logoutUser = () => {
  return {
    type: constants.LOGOUT_USER,
  };
};

export const verifyForgotPassword = token => {
  return {
    type: constants.VERIFY_FORGOT_PASSWORD,
    payload: authService.verifyForgotPassword(token),
  };
};

export const confirmForgotPassword = (token, password) => {
  return {
    type: constants.CONFIRM_FORGOT_PASSWORD,
    payload: authService.confirmForgotPassword(token, password),
  };
};
