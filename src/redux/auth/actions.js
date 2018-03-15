import constants from './constants';
import { loginService } from '../../services';

export const loginUser = (username, password) => {
  return {
    type: constants.LOGIN_USER,
    payload: loginService.login(username, password),
  };
};

export const logoutUser = () => {
  return {
    type: constants.LOGOUT_USER,
  };
};
