import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  isLoggedIn: true,
  ...defaultInitialState,
};

const auth = (state = initialState, action = {}) => {
  const error = action.error;

  switch (action.type) {
    case constants.LOGIN_USER_FULFILLED:
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
        errorMessage: error.message,
      };

    case constants.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default auth;
