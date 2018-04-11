import { Network } from '../utils';

export const get = async () => {
  const result = await Network.get('/version');
  return result;
};
