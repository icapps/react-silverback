import constants from './constants';

const initialState = {
  username: '',
  email: '',
  isLoggedIn: false,
  pending: false,
  error: false,
  errorMsg: '',
};

const user = (state = initialState, action = {}) => {
  const payload = action.payload;

  switch (action.type) {
    case constants.SET_USERNAME:
      const { username } = payload;

      return {
        ...state,
        username,
      };

    case constants.LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
      };

    case constants.LOGOUT_USER:
      return initialState;

    default:
      return state;
  }
};

export default user;
