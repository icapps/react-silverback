import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getUsers, getUsersById, createUser } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUsers = require('../../mock/users.json');

describe('user actions', () => {
  beforeEach(() => {
    Network.get = jest.fn(() => mockUsers);
    Network.post = jest.fn(() => { });
  });

  it('getUsers', () => {
    const store = mockStore({});
    store.dispatch(getUsers());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('getUsersById', () => {
    const store = mockStore({});
    store.dispatch(getUsersById());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('createUser', () => {
    const store = mockStore({});
    store.dispatch(createUser('123', { username: 'test' }));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
