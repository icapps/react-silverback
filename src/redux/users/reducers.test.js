import users from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  userList: [],
  user: null,
  usersCount: 0,
  ...defaultInitialState,
};

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(users(undefined, {})).toMatchSnapshot();
  });

  it('should GET_USERS_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      })
    ).toMatchSnapshot();
  });
  it('should GET_USERS_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should GET_USERS_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });

  // GET_USERS_BY_ID
  it('should GET_USERS_BY_ID_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_BY_ID_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      })
    ).toMatchSnapshot();
  });
  it('should GET_USERS_BY_ID_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_BY_ID_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should GET_USERS_BY_ID_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.GET_USERS_BY_ID_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });

  //CREATE_USER
  it('should CREATE_USER_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.CREATE_USER_FULFILLED,
        payload: { data: { user: 'test' }, meta: { totalCount: 10 } },
      })
    ).toMatchSnapshot();
  });
  it('should CREATE_USER_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.CREATE_USER_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should CREATE_USER_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.CREATE_USER_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });
  // UPDATE_USER
  it('should UPDATE_USER_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.UPDATE_USER_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      })
    ).toMatchSnapshot();
  });
  it('should UPDATE_USER_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.UPDATE_USER_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should UPDATE_USER_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.UPDATE_USER_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });

  //REMOVE_USER
  it('should REMOVE_USER_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.REMOVE_USER_FULFILLED,
      })
    ).toMatchSnapshot();
  });
  it('should REMOVE_USER_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.REMOVE_USER_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should REMOVE_USER_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.REMOVE_USER_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });
});
