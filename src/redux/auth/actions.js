import constants from './constants';
import { authService } from '../../services';

export const loginUser = (email, password) => {
  return {
    type: constants.LOGIN_USER,
    payload: authService.login(email, password),
  };
};

export const getMe = () => {
  return {
    type: constants.GET_ME,
    payload: authService.getMe(),
  };
};

export const logoutUser = () => {
  return {
    type: constants.LOGOUT_USER,
    payload: authService.logout(),
  };
};

export const forgotPassword = email => {
  return {
    type: constants.FORGOT_PASSWORD,
    payload: authService.forgotPassword(email),
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
