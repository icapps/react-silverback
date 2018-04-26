import { Network } from '../utils';

export const getLanguageCodes = async (page, limit, sortField, sortOrder, search = '') => {
  const pagination = `?offset=${page}&limit=${limit}`;
  const sort = (sortField && sortField !== '') ? `&sortField=${sortField}&sortOrder=${sortOrder}` : '';
  const filter = (search !== '') ? `&search=${search}` : '';
  const result = await Network.get(`/meta/codesByType/languages/all${pagination}${sort}${filter}`);
  return result;
};

export const getLanguageCodeById = async id => {
  const result = await Network.get(`/meta/codes/${id}`);
  return result;
};

export const createLanguageCode = async (languageCode) => {
  const newLanguageCode = { code: languageCode.code, name: languageCode.name };
  if (languageCode.description !== '') {
    newLanguageCode.description = languageCode.description;
  }
  const result = await Network.post(`/meta/codes/languages`, newLanguageCode);
  return result;
};

export const deprecateLanguageCode = async (languageCodeId) => {
  const result = await Network.post(`/meta/codes/${languageCodeId}/deprecate`);
  return result;
};
