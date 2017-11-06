import constants from './constants';
import { Network } from '../../utils';

export const getJoke = () => {
  return {
    type    : constants.GET_JOKE,
    payload : Network.get('/'),
  };
};
