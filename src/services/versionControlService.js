import { Network } from '../utils';

export const get = async () => {
  const result = await Network.get('/config/version');
  return result;
};
