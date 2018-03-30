import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  userList: [],
  user: null,
  usersCount: 0,
  ...defaultInitialState,
};

const users = (state = initialState, action = {}) => {
  const { error, payload } = action;

  switch (action.type) {
    case constants.GET_USERS_FULFILLED:
      return {
        ...state,
        userList: payload.data,
        usersCount: payload.meta.totalCount,
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
    case constants.GET_USERS_BY_ID_FULFILLED:
      return {
        ...state,
        user: payload.data,
        isPending: false,
      };
    case constants.GET_USERS_BY_ID_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_USERS_BY_ID_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: error.message,
      };
    case constants.REMOVE_USER_FULFILLED:
      return {
        ...state,
        user: null,
        isPending: false,
      };
    case constants.REMOVE_USER_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.REMOVE_USER_REJECTED:
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
