import constants from './constants';
import { dataTypeService } from '../../services';

export const getDataType = (sortField, sortOrder) => {
  return {
    type: constants.GET_DATA_TYPE,
    payload: dataTypeService.get(sortField, sortOrder),
  };
};
