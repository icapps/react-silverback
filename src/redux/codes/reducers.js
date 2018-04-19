import constants from './constants';
import defaultInitialState from '../defaultInitialState';
import { strings } from '../../utils/index';

const initialState = {
  languageCodeList: [],
  languageCodeCount: 0,
  ...defaultInitialState,
};

const errorMessageHandling = payload => payload.errors[0].detail || payload.errors[0].title || strings.GENERAL_ERROR;

const codes = (state = initialState, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    case constants.GET_LANGUAGE_CODES_FULFILLED:
      return {
        ...state,
        languageCodeList: payload.data,
        languageCodeCount: payload.meta.totalCount,
        isPending: false,
      };
    case constants.GET_LANGUAGE_CODES_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_LANGUAGE_CODES_REJECTED:
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

export default codes;
