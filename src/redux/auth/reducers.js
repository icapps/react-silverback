import constants from './constants';
import defaultInitialState from '../defaultInitialState';
import { strings } from '../../utils';

const initialState = {
  isLoggedIn: false,
  isPasswordVerified: false,
  isPasswordConfirmed: false,
  isForgotPasswordPending: false,
  email: '',
  ...defaultInitialState,
};

const errorMessageHandling = payload => payload.errors[0].title || strings.GENERAL_ERROR;
const auth = (state = initialState, action = {}) => {
  const { payload } = action;

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
        errorMessage: errorMessageHandling(payload),
      };

    // GET_ME
    case constants.GET_ME_FULFILLED:
      return {
        ...state,
        email: action.payload.data.email,
        isPending: false,
      };
    case constants.GET_ME_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_ME_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
      };

    // FORGOT_PASSWORD
    case constants.FORGOT_PASSWORD_FULFILLED:
      return {
        ...state,
        isForgotPasswordPending: false,
      };
    case constants.FORGOT_PASSWORD_PENDING:
      return {
        ...state,
        isForgotPasswordPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.FORGOT_PASSWORD_REJECTED:
      return {
        ...state,
        isForgotPasswordPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
      };
    // VERIFY_FORGOT_PASSWORD
    case constants.VERIFY_FORGOT_PASSWORD_FULFILLED:
      return {
        ...state,
        isPasswordVerified: true,
        isPending: false,
      };
    case constants.VERIFY_FORGOT_PASSWORD_PENDING:
      return {
        ...state,
        isPasswordVerified: false,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.VERIFY_FORGOT_PASSWORD_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
      };
    // CONFIRM_FORGOT_PASSWORD
    case constants.CONFIRM_FORGOT_PASSWORD_FULFILLED:
      return {
        ...state,
        isPasswordConfirmed: true,
        isPending: false,
      };
    case constants.CONFIRM_FORGOT_PASSWORD_PENDING:
      return {
        ...state,
        isPasswordConfirmed: false,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.CONFIRM_FORGOT_PASSWORD_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
      };
    // LOGOUT_USER
    case constants.LOGOUT_USER_PENDING:
      return initialState;
    default:
      return state;
  }
};

export default auth;
