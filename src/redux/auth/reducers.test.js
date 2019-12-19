import auth from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  isLoggedIn: false,
  ...defaultInitialState,
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toMatchSnapshot();
  });

  it('should LOGIN_USER_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.LOGIN_USER_FULFILLED,
        payload: { data: {}, meta: {} },
      }),
    ).toMatchSnapshot();
  });
  it('should LOGIN_USER_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.LOGIN_USER_PENDING,
      }),
    ).toMatchSnapshot();
  });
  //FORGOT_PASSWORD
  it('should FORGOT_PASSWORD_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.FORGOT_PASSWORD_FULFILLED,
        payload: { data: {}, meta: {} },
      }),
    ).toMatchSnapshot();
  });
  it('should FORGOT_PASSWORD_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.FORGOT_PASSWORD_PENDING,
      }),
    ).toMatchSnapshot();
  });
  it('should FORGOT_PASSWORD_REJECTED', () => {
    expect(
      auth(initialState, {
        type: constants.FORGOT_PASSWORD_REJECTED,
        payload: { errors: [{ title: 'error' }] },
      }),
    ).toMatchSnapshot();
  });
  //VERIFY_FORGOT_PASSWORD
  it('should VERIFY_FORGOT_PASSWORD_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.VERIFY_FORGOT_PASSWORD_FULFILLED,
        payload: { data: {}, meta: {} },
      }),
    ).toMatchSnapshot();
  });
  it('should VERIFY_FORGOT_PASSWORD_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.VERIFY_FORGOT_PASSWORD_PENDING,
      }),
    ).toMatchSnapshot();
  });
  it('should VERIFY_FORGOT_PASSWORD_REJECTED', () => {
    expect(
      auth(initialState, {
        type: constants.VERIFY_FORGOT_PASSWORD_REJECTED,
        payload: { errors: [{ title: 'error' }] },
      }),
    ).toMatchSnapshot();
  });
  //CONFIRM_FORGOT_PASSWORD
  it('should CONFIRM_FORGOT_PASSWORD_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.CONFIRM_FORGOT_PASSWORD_FULFILLED,
        payload: { data: {}, meta: {} },
      }),
    ).toMatchSnapshot();
  });
  it('should CONFIRM_FORGOT_PASSWORD_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.CONFIRM_FORGOT_PASSWORD_PENDING,
      }),
    ).toMatchSnapshot();
  });
  it('should CONFIRM_FORGOT_PASSWORD_REJECTED', () => {
    expect(
      auth(initialState, {
        type: constants.CONFIRM_FORGOT_PASSWORD_REJECTED,
        payload: { errors: [{ title: 'error' }] },
      }),
    ).toMatchSnapshot();
  });
  //LOGOUT_USER
  it('should LOGOUT_USER', () => {
    expect(
      auth(initialState, {
        type: constants.LOGOUT_USER,
      }),
    ).toMatchSnapshot();
  });
});
