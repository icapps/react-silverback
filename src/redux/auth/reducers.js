import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  isLoggedIn: false,
  ...defaultInitialState,
};

const auth = (state = initialState, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    case constants.LOGIN_USER_FULFILLED:
      localStorage.setItem('ACCESS_TOKEN', payload.data.accessToken);
      localStorage.setItem('REFRESH_TOKEN', payload.data.refreshToken);
      return {
        ...state,
        isLoggedIn: true,
        isPending: false,
      };
    case constants.LOGIN_USER_PENDING:
      return {
        ...state,
        isLoggedIn: false,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.LOGIN_USER_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: payload.errors[0].detail,
      };

    case constants.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default auth;
