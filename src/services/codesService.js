import { Network } from '../utils';

export const getLanguageCodes = async (page, limit, sortField, sortOrder) => {
  const pagination = `?offset=${page}&limit=${limit}`;
  const sort = (sortField && sortField !== '') ? `&sortField=${sortField}&sortOrder=${sortOrder}` : '';
  const result = await Network.get(`/meta/codes/languages${pagination}${sort}`);
  return result;
};
