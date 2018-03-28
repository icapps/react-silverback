import constants from './constants';
import { userService } from '../../services';

export const getUsers = (page, limit, sortField, sortOrder) => {
  return {
    type: constants.GET_USERS,
    payload: userService.get(page, limit, sortField, sortOrder),
  };
};

export const getUsersById = id => {
  return {
    type: constants.GET_USERS_BY_ID,
    payload: userService.getById(id),
  };
};

export const updateUser = (id, user) => {
  return {
    type: constants.UPDATE_USER,
    payload: userService.update(id, user),
  };
};
