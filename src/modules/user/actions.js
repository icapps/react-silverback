import constants from './constants';

export const setUsername = (username) => {
  return {
    type: constants.SET_USERNAME,
    payload: {username}
  };
};
