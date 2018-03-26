import constants from './constants';
import { userService } from '../../services';

export const getUsers = (sortField, sortOrder) => {
  return {
    type: constants.GET_USERS,
    payload: userService.get(sortField, sortOrder),
  };
};
