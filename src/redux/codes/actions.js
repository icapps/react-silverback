import constants from './constants';
import { codesService } from '../../services';

export const getLanguageCodes = (page, limit, sortField, sortOrder) => {
  return {
    type: constants.GET_LANGUAGE_CODES,
    payload: codesService.getLanguageCodes(page, limit, sortField, sortOrder),
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

