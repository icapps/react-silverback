import constants from './constants';
import { userService } from '../../services';

export const getUsers = (page, limit, sortField, sortOrder) => {
  return {
    type: constants.GET_USERS,
    payload: userService.get(page, limit, sortField, sortOrder),
  };
};
