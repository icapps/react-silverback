import auth from './reducers';
import constants from './constants';

const initialState = {
  isLoggedIn: false,
  isPending: false,
  isError: false,
  errorMessage: '',
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toMatchSnapshot();
  });

  it('should LOGIN_USER_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.LOGIN_USER_FULFILLED,
      })
    ).toMatchSnapshot();
  });
  it('should LOGIN_USER_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.LOGIN_USER_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should LOGOUT_USER', () => {
    expect(
      auth(initialState, {
        type: constants.LOGOUT_USER,
      })
    ).toMatchSnapshot();
  });
});