import constants from './constants';
import { dataTypeService } from '../../services';

export const getDataType = (page, limit, sortField, sortOrder) => {
  return {
    type: constants.GET_DATA_TYPE,
    payload: dataTypeService.get(page, limit, sortField, sortOrder),
  };
};
