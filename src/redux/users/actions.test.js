import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getUsers, getUsersById, removeUser } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUsers = require('../../mock/users.json');

describe('user actions', () => {
  beforeEach(() => {
    Network.get = jest.fn(() => mockUsers);
    Network.delete = jest.fn(() => { });
  });

  it('getUsers', () => {
    const store = mockStore({});
    store.dispatch(getUsers(0, 10));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('getUsersById', () => {
    const store = mockStore({});
    store.dispatch(getUsersById('11111'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('removeUser', () => {
    const store = mockStore({});
    store.dispatch(removeUser('1111'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
