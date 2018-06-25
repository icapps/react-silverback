import constants from './constants';
import { userService } from '../../services';

export const getUsers = (page, limit, sortField, sortOrder, search) => {
  return {
    type: constants.GET_USERS,
    payload: userService.get(page, limit, sortField, sortOrder, search),
  };
};

export const getUsersById = id => {
  return {
    type: constants.GET_USERS_BY_ID,
    payload: userService.getById(id),
  };
};

export const createUser = (user, changePassword) => {
  return {
    type: constants.CREATE_USER,
    payload: userService.create(user, changePassword),
  };
};

export const updateUser = (id, user) => {
  return {
    type: constants.UPDATE_USER,
    payload: userService.update(id, user),
  };
};

export const removeUser = id => {
  return {
    type: constants.REMOVE_USER,
    payload: userService.remove(id),
  };
};

export const getUserRoles = () => {
  return {
    type: constants.GET_USER_ROLES,
    payload: userService.getUserRoles(),
  };
};

export const setSort = (sortField, sortOrder) => {
  return {
    type: constants.SET_USERS_SORT,
    payload: {sortField, sortOrder},
  };
};

