import constants from './constants';
import { codesService } from '../../services';

export const getLanguageCodes = (page, limit, sortField, sortOrder, search) => {
  return {
    type: constants.GET_LANGUAGE_CODES,
    payload: codesService.getLanguageCodes(page, limit, sortField, sortOrder, search),
  };
};

export const getLanguageCodeById = id => {
  return {
    type: constants.GET_LANGUAGE_CODE_BY_ID,
    payload: codesService.getLanguageCodeById(id),
  };
};

export const createLanguageCode = languageCode => {
  return {
    type: constants.CREATE_LANGUAGE_CODE,
    payload: codesService.createLanguageCode(languageCode),
  };
};

export const deprecateLanguageCode = languageCodeId => {
  return {
    type: constants.DEPRECATE_LANGUAGE_CODE,
    payload: codesService.deprecateLanguageCode(languageCodeId),
  };
};

export const undeprecateLanguageCode = languageCodeId => {
  return {
    type: constants.UNDEPRECATE_LANGUAGE_CODE,
    payload: codesService.undeprecateLanguageCode(languageCodeId),
  };
};

export const setSort = (sortField, sortOrder) => {
  return {
    type: constants.SET_CODES_SORT,
    payload: {sortField, sortOrder},
  };
};

export const getStatusCodes = () => {
  return {
    type: constants.GET_STATUS_CODES,
    payload: codesService.getStatusCodes(),
  };
};