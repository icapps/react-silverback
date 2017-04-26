import constants from './constants';

const initialState = {
  joke: '',
  loading: false,
  error: false
};

const user = (state = initialState, action = {}) => {
  const payload = action.payload;

  switch (action.type) {
    case constants.GET_JOKE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };

    case constants.GET_JOKE_FAILED:
      return {
        ...state,
        loading: true,
        joke: '',
        error: false
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

export default user;