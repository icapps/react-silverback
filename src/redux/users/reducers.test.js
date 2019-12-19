import users from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  userList: [],
  user: null,
  usersCount: 0,
  isUpdatePending: false,
  isUserUpdated: false,
  ...defaultInitialState,
};

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(users(undefined, {})).toMatchInlineSnapshot(`
      Object {
        "deletedUser": "",
        "errorMessage": "",
        "isCreateError": false,
        "isCreatePending": false,
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "sortField": "email",
        "sortOrder": "asc",
        "user": null,
        "userList": Array [],
        "userRoles": Array [],
        "usersCount": 0,
      }
    `);
  });

  it('should GET_USERS_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Object {},
        "usersCount": 10,
      }
    `);
  });
  it('should GET_USERS_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isCreateError": false,
        "isError": false,
        "isPending": true,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should GET_USERS_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });

  // GET_USERS_BY_ID
  it('should GET_USERS_BY_ID_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_BY_ID_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": Object {},
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should GET_USERS_BY_ID_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_BY_ID_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isCreateError": false,
        "isError": false,
        "isPending": true,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should GET_USERS_BY_ID_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_BY_ID_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });

  //CREATE_USER
  it('should CREATE_USER_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.CREATE_USER_FULFILLED,
        payload: { data: { user: 'test' }, meta: { totalCount: 10 } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isCreateError": false,
        "isCreatePending": false,
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": Object {
          "user": "test",
        },
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should CREATE_USER_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.CREATE_USER_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isCreateError": false,
        "isCreatePending": true,
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should CREATE_USER_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.CREATE_USER_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isCreateError": true,
        "isCreatePending": false,
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  // UPDATE_USER
  it('should UPDATE_USER_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.UPDATE_USER_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": true,
        "user": Object {},
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should UPDATE_USER_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.UPDATE_USER_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "isUpdatePending": true,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should UPDATE_USER_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.UPDATE_USER_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });

  //REMOVE_USER
  it('should REMOVE_USER_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.REMOVE_USER_FULFILLED,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "deletedUser": null,
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should REMOVE_USER_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.REMOVE_USER_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": true,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should REMOVE_USER_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.REMOVE_USER_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });

  //
  it('should GET_USER_ROLES_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USER_ROLES_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "userRoles": Object {},
        "usersCount": 0,
      }
    `);
  });
  it('should GET_USER_ROLES_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.GET_USER_ROLES_PENDING,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": true,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should GET_USER_ROLES_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USER_ROLES_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "Something went wrong!",
        "isError": true,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
  it('should RESET_DELETED_USER', () => {
    expect(
      users(initialState, {
        type: constants.RESET_DELETED_USER,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "errorMessage": "",
        "isError": false,
        "isPending": false,
        "isUpdatePending": false,
        "isUserUpdated": false,
        "user": null,
        "userList": Array [],
        "usersCount": 0,
      }
    `);
  });
});
