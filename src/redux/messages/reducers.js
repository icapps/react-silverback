import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  messages: [],
  ...defaultInitialState,
};

const messages = (state = initialState, action = {}) => {
  switch (action.type) {
    // SET MESSAGE
    case constants.SET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, { ...action.payload, id: new Date().getTime() }],
      };
    // CLEAR MESSAGES
    case constants.CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    default:
      return state;
  }
};

export default messages;
