import constants from './constants';
import { codesService } from '../../services';

export const getCodeTypes = (page, limit, sortField, sortOrder) => {
  return {
    type: constants.GET_CODE_TYPES,
    payload: codesService.getCodeTypes(page, limit, sortField, sortOrder),
  };
};

export const getCodes = (page, limit, sortField, sortOrder) => {
  return {
    type: constants.GET_CODES,
    payload: codesService.getCodes(page, limit, sortField, sortOrder),
  };
};

