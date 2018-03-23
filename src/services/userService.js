import { Network } from '../utils';

export const get = async (sortField, sortOrder) => {
  const sort = (sortField && sortField !== '') ? `?sortField=${sortField}&sortOrder=${sortOrder}` : '';
  const result = await Network.get(`/users${sort}`);
  return result.data;
};

