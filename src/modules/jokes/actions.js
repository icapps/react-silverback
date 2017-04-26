import fetch from 'isomorphic-fetch';
import constants from './constants';

export const getJokeRequest = () => {
  return {
    type: constants.GET_JOKE_REQUEST
  };
}

export const getJokeLoaded = (joke) => {
  return {
    type: constants.GET_JOKE_LOADED,
    payload: {joke}
  };
}

export const getJokeFailed = (error) => {
  return {
    type: constants.GET_JOKE_FAILED,
    payload: {error}
  };
}

export const getJoke = () => {
  return dispatch => {
    dispatch(getJokeRequest());

    return fetch('https://icanhazdadjoke.com/', {
      method: 'GET',
      headers: {
        accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        dispatch(getJokeLoaded(json.joke))
      }).catch(error =>
        dispatch(getJokeFailed(error.message))
      )
  }
}
