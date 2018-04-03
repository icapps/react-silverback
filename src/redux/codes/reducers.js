import constants from './constants';
import defaultInitialState from '../defaultInitialState';
import { strings } from '../../utils/index';

const initialState = {
  codesList: [],
  codesCount: 0,
  codeTypes: [],
  codeTypeCount: 0,
  ...defaultInitialState,
};

const errorMessageHandling = payload => payload.errors[0].detail || payload.errors[0].title || strings.GENERAL_ERROR;

const codes = (state = initialState, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    //GET_CODE_TYPES
    case constants.GET_CODE_TYPES_FULFILLED:
      return {
        ...state,
        codeTypes: payload.data,
        codeTypeCount: payload.meta.totalCount,
        isPending: false,
      };
    case constants.GET_CODE_TYPES_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_CODE_TYPES_REJECTED:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: errorMessageHandling(payload),
      };
    //GET_CODES
    case constants.GET_CODES_FULFILLED:
      return {
        ...state,
        codesList: payload.data,
        codesCount: payload.meta.totalCount,
        isPending: false,
      };
    case constants.GET_CODES_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_CODES_REJECTED:
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
