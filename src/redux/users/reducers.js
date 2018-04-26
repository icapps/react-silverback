import constants from './constants';
import defaultInitialState from '../defaultInitialState';
import { strings } from '../../utils/index';

const initialState = {
  userList: [],
  user: null,
  usersCount: 0,
  userRoles: [],
  isCreatePending: false,
  isUpdatePending: false,
  isUserUpdated: false,
  isCreateError: false,
  ...defaultInitialState,
};

const errorMessageHandling = payload => payload.errors[0].title || strings.GENERAL_ERROR;

const users = (state = initialState, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    //GET_USERS
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
        isCreateError: false,
        errorMessage: '',
        user: null,
        isUserUpdated: false,
      };
    case constants.GET_USERS_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
      };

    //GET_USER_BY_ID
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
        isCreateError: false,
        errorMessage: '',
      };
    case constants.GET_USERS_BY_ID_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
      };


    //UPDATE_USER
    case constants.UPDATE_USER_FULFILLED:
      return {
        ...state,
        user: payload.data,
        isUserUpdated: true,
        isPending: false,
        isUpdatePending: false,
      };
    case constants.UPDATE_USER_PENDING:
      return {
        ...state,
        isUpdatePending: true,
        isError: false,
        isUserUpdated: false,
        errorMessage: '',
      };
    case constants.UPDATE_USER_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
        isUpdatePending: false,
      };

    //CREATE_USER
    case constants.CREATE_USER_FULFILLED:
      return {
        ...state,
        user: payload.data,
        isCreateError: false,
        isCreatePending: false,
        isPending: false,
      };
    case constants.CREATE_USER_PENDING:
      return {
        ...state,
        isCreateError: false,
        isCreatePending: true,
        errorMessage: '',
      };
    case constants.CREATE_USER_REJECTED:
      return {
        ...state,
        isCreateError: true,
        isCreatePending: false,
        errorMessage: errorMessageHandling(payload),
      };

    //REMOVE_USER
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
        errorMessage: errorMessageHandling(payload),
      };

    //GET_USER_ROLES
    case constants.GET_USER_ROLES_FULFILLED:
      return {
        ...state,
        userRoles: payload.data,
        isPending: false,
      };
    case constants.GET_USER_ROLES_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_USER_ROLES_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
      };

    default:
      return state;
  }
};

export default users;
