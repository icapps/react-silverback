import constants from './constants';

export const setMessage = (message) => {
  return {
    type: constants.SET_MESSAGE,
    payload: message,
  };
};

export const clearMessages = () => {
  return {
    type: constants.CLEAR_MESSAGES,
  };
};

