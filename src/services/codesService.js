import { Network } from '../utils';

export const getLanguageCodes = async (page, limit, sortField, sortOrder, search = '') => {
  const pagination = `?offset=${page}&limit=${limit}`;
  const sort = (sortField && sortField !== '') ? `&sortField=${sortField}&sortOrder=${sortOrder}` : '';
  const filter = (search !== '') ? `&search=${search}` : '';
  const result = await Network.get(`/meta/codes/languages${pagination}${sort}${filter}`);
  return result;
};

export const createLanguageCode = async (languageCode) => {
  const result = await Network.post(`/meta/codes/languages`, languageCode);
  return result;
};

export const deprecateLanguageCode = async (languageCodeId) => {
  const result = await Network.post(`/meta/codes/${languageCodeId}/deprecate`);
  return result;
};
