import constants from './constants';

export const setUsername = (username) => {
  return {
    type: constants.SET_USERNAME,
    payload: { username },
  };
};

export const loginUser = (username, password) => {
  return {
    type: constants.LOGIN_USER,
    payload: { username, password },
  };
};

export const logoutUser = () => {
  return {
    type: constants.LOGOUT_USER,
  };
};

export const requestNewPassword = (email) => {
  return {
    type: constants.FORGOT_PASSWORD,
    payload: { email },
  };
};
