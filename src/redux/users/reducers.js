import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  userList: [],
  ...defaultInitialState,
};

const users = (state = initialState, action = {}) => {
  const { error, payload } = action;

  switch (action.type) {
    case constants.GET_USERS_FULFILLED:
      return {
        ...state,
        userList: payload,
        isPending: false,
      };
    case constants.GET_USERS_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_USERS_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: error.message,
      };
    default:
      return state;
  }
};

export default users;
