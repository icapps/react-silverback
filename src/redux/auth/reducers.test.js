import auth from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  isLoggedIn: false,
  ...defaultInitialState,
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(auth(undefined, {})).toMatchInlineSnapshot(`
      Object {
        "email": "",
        "errorMessage": "",
        "isError": false,
        "isForgotPasswordPending": false,
        "isLoggedIn": false,
        "isPasswordConfirmed": false,
        "isPasswordVerified": false,
        "isPending": false,
      }
    `);
  });

  it('should LOGIN_USER_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.LOGIN_USER_FULFILLED,
        payload: { data: {}, meta: {} },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isLoggedIn": true,
        "isPending": false,
      }
    `);
  });
  it('should LOGIN_USER_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.LOGIN_USER_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isLoggedIn": false,
        "isPending": true,
      }
    `);
  });
  //FORGOT_PASSWORD
  it('should FORGOT_PASSWORD_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.FORGOT_PASSWORD_FULFILLED,
        payload: { data: {}, meta: {} },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isForgotPasswordPending": false,
        "isLoggedIn": false,
        "isPending": false,
      }
    `);
  });
  it('should FORGOT_PASSWORD_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.FORGOT_PASSWORD_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isForgotPasswordPending": true,
        "isLoggedIn": false,
        "isPending": false,
      }
    `);
  });
  it('should FORGOT_PASSWORD_REJECTED', () => {
    expect(
      auth(initialState, {
        type: constants.FORGOT_PASSWORD_REJECTED,
        payload: { errors: [{ title: 'error' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "error",
        "isError": true,
        "isForgotPasswordPending": false,
        "isLoggedIn": false,
        "isPending": false,
      }
    `);
  });
  //VERIFY_FORGOT_PASSWORD
  it('should VERIFY_FORGOT_PASSWORD_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.VERIFY_FORGOT_PASSWORD_FULFILLED,
        payload: { data: {}, meta: {} },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isLoggedIn": false,
        "isPasswordVerified": true,
        "isPending": false,
      }
    `);
  });
  it('should VERIFY_FORGOT_PASSWORD_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.VERIFY_FORGOT_PASSWORD_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isLoggedIn": false,
        "isPasswordVerified": false,
        "isPending": true,
      }
    `);
  });
  it('should VERIFY_FORGOT_PASSWORD_REJECTED', () => {
    expect(
      auth(initialState, {
        type: constants.VERIFY_FORGOT_PASSWORD_REJECTED,
        payload: { errors: [{ title: 'error' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "error",
        "isError": true,
        "isLoggedIn": false,
        "isPending": false,
      }
    `);
  });
  //CONFIRM_FORGOT_PASSWORD
  it('should CONFIRM_FORGOT_PASSWORD_FULFILLED', () => {
    expect(
      auth(initialState, {
        type: constants.CONFIRM_FORGOT_PASSWORD_FULFILLED,
        payload: { data: {}, meta: {} },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isLoggedIn": false,
        "isPasswordConfirmed": true,
        "isPending": false,
      }
    `);
  });
  it('should CONFIRM_FORGOT_PASSWORD_PENDING', () => {
    expect(
      auth(initialState, {
        type: constants.CONFIRM_FORGOT_PASSWORD_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isLoggedIn": false,
        "isPasswordConfirmed": false,
        "isPending": true,
      }
    `);
  });
  it('should CONFIRM_FORGOT_PASSWORD_REJECTED', () => {
    expect(
      auth(initialState, {
        type: constants.CONFIRM_FORGOT_PASSWORD_REJECTED,
        payload: { errors: [{ title: 'error' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "error",
        "isError": true,
        "isLoggedIn": false,
        "isPending": false,
      }
    `);
  });
  //LOGOUT_USER
  it('should LOGOUT_USER', () => {
    expect(
      auth(initialState, {
        type: constants.LOGOUT_USER,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isLoggedIn": false,
        "isPending": false,
      }
    `);
  });
});
