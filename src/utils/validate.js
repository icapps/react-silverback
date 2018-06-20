
import strings from './localization';
import { regexes } from '../constants';

export function validate(type, value) {
  if (type === 'email') {
    if (value === '') {
      return {
        isValid: false,
        errorMessage: strings.LOGIN_EMAIL_REQUIRED,
      };
    } else if (!regexes.EMAIL.test(value)) {
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
  } else if (type === 'password') {
    if (value === '') {
      return {
        isValid: false,
        errorMessage: strings.LOGIN_PASSWORD_REQUIRED,
      };
    } else if (value.length < 6) {
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
  } else if (type === 'text') {
    if (value === '') {
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
  }
}