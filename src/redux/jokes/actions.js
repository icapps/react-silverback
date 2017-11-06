import fetch from 'isomorphic-fetch';
import constants from './constants';

export const getJoke = () => {
  return {
    type    : constants.GET_JOKE,
    payload : fetch(process.env.REACT_APP_API_HOST, {
      method  : 'GET',
      headers : {
        accept : 'application/json',
      },
    }).then(response => response.json()),
  };
};
