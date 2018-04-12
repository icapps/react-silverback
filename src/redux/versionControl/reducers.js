import constants from './constants';
import defaultInitialState from '../defaultInitialState';
import { strings } from '../../utils/index';

const initialState = {
  build: '',
  version: '',
  ...defaultInitialState,
};

const errorMessageHandling = payload => payload.errors[0].detail || payload.errors[0].title || strings.GENERAL_ERROR;

const versionControl = (state = initialState, action = {}) => {
  const { payload } = action;

  switch (action.type) {
    case constants.GET_VERSION_FULFILLED:
      return {
        ...state,
        build: payload.data.build,
        version: payload.data.version,
        isPending: false,
      };
    case constants.GET_VERSION_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_VERSION_REJECTED:
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

export default versionControl;
