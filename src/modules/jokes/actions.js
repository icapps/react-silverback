import constants from './constants';

export const getJoke = () => {
  return {
    type: constants.GET_JOKE_REQUEST,
    payload: {joke: 'Tell me a joke'}
  };
}
