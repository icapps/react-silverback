import users from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  dataTypes: [],
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
});
