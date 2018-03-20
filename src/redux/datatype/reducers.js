import constants from './constants';

const initialState = {
  dataTypes: [],
  isPending: false,
  isError: false,
  errorMessage: '',
};

const dataType = (state = initialState, action = {}) => {
  const { error, payload } = action;

  switch (action.type) {
    case constants.GET_DATA_TYPE_FULFILLED:
      return {
        ...state,
        dataTypes: payload,
        isPending: false,
      };
    case constants.GET_DATA_TYPE_PENDING:
      return {
        ...state,
        isPending: true,
        isError: false,
        errorMessage: '',
      };
    case constants.GET_DATA_TYPE_REJECTED:
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

export default dataType;
