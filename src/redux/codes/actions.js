import constants from './constants';
import { codesService } from '../../services';

export const getLanguageCodes = (page, limit, sortField, sortOrder) => {
  return {
    type: constants.GET_LANGUAGE_CODES,
    payload: codesService.getLanguageCodes(page, limit, sortField, sortOrder),
  };
};

