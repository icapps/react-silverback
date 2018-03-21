import { Network } from '../utils';

export const get = async (sortField, sortOrder) => {
  const sort = (sortField && sortField !== '') ? `?sortField=${sortField}&sortOrder=${sortOrder}` : '';
  const result = await Network.get(`/datatype${sort}`);
  return result.data;
};

