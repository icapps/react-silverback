import constants from './constants';

const initialState = {
  joke: '',
  loading: false,
  error: false,
  errorMsg: ''
};

const jokes = (state = initialState, action = {}) => {
  const payload = action.payload;
  const error = action.error;

  switch (action.type) {
    case constants.GET_JOKE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };

    case constants.GET_JOKE_FAILED:
      const {message} = error;

      return {
        ...state,
        loading: false,
        joke: '',
        error: true,
        errorMsg: message
      };

    case constants.GET_JOKE_LOADED:
      const {joke} = payload;

      return {
        ...state,
        loading: false,
        joke
      };
    default:
      return state;
  }
};

export default jokes;
