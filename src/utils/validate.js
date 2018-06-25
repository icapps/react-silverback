
import strings from './localization';
import { regexes, validation } from '../constants';

export function validate(type, value) {
  switch(type) {
    case 'email':
      if (isEmpty(value)) {
        return {
          isValid: false,
          errorMessage: strings.LOGIN_EMAIL_REQUIRED,
        };
      } else if (isEmailRegex(value)) {
        return {
          isValid: false,
          errorMessage: strings.LOGIN_EMAIL_VALIDATION,
        };
      } else {
        return {
          isValid: true,
          errorMessage: '',
        };
      }
    case 'password':
      if (isEmpty(value)) {
        return {
          isValid: false,
          errorMessage: strings.LOGIN_PASSWORD_REQUIRED,
        };
      } else if (value.length < validation.PASSWORD_LENGTH) {
        return {
          isValid: false,
          errorMessage: strings.PASSWORD_LENGTH,
        };
      } else {
        return {
          isValid: true,
          errorMessage: '',
        };
      }
    case 'text':
      if (isEmpty(value)) {
        return {
          isValid: false,
          errorMessage: strings.FIELD_REQUIRED,
        };
      } else {
        return {
          isValid: true,
          errorMessage: '',
        };
      }
    default:
      return {
        isValid: true,
        errorMessage: '',
      };
  }
}

function isEmpty(value) {
  return !value || value.trim() === '';
}

function isEmailRegex(value) {
  return !regexes.EMAIL.test(value);
}