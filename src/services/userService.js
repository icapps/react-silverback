import { Network } from '../utils';

export const get = async (page, limit, sortField, sortOrder) => {
  const pagination = `?offset=${page}&limit=${limit}`;
  const sort = (sortField && sortField !== '') ? `&sortField=${sortField}&sortOrder=${sortOrder}` : '';
  const result = await Network.get(`/users${pagination}${sort}`);
  return result;
};

export const getById = async id => {
  const result = await Network.get(`/users/${id}`);
  return result;
};

export const create = async (user) => {
  const result = await Network.post('/users', user);
  return result;
};

export const remove = async id => {
  const result = await Network.delete(`/users/${id}`);
  return result;
};

export const update = async (id, user) => {
  const result = await Network.patch(`/users/${id}`, user);
  return result;
};
