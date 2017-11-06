import constants from './constants';

const initialState = {
  username   : '',
  email      : '',
  isLoggedIn : false,
  pending    : false,
  error      : false,
  errorMsg   : '',
};

const user = (state = initialState, action = {}) => {
  const payload = action.payload;
  const error = action.error;

  switch (action.type) {
    case constants.SET_USERNAME:
      const { username } = payload;

      return {
        ...state,
        username,
      };

    case constants.LOGIN_USER_FULFILLED:
      return {
        ...state,
        username   : action.payload.username,
        isLoggedIn : true,
      };

    case constants.LOGIN_USER_REJECTED:
      return {
        ...state,
        isLoggedIn : false,
        error      : true,
        errorMsg   : error.message,
      };

    case constants.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default user;
