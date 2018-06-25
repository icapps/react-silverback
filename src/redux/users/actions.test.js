import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getUsers, getUsersById, createUser, updateUser, removeUser, getUserRoles} from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUsers = require('../../mock/users.json');
let store;

describe('user actions', () => {
  beforeEach(() => {
    store = mockStore({});
    Network.get = jest.fn(() => mockUsers);
    Network.post = jest.fn(() => { });
    Network.patch = jest.fn(() => { });
    Network.delete = jest.fn(() => { });
  });

  it('getUsers', () => {
    store.dispatch(getUsers(0, 10));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('getUsersById', () => {
    store.dispatch(getUsersById('11111'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('removeUser', () => {
    store.dispatch(removeUser('1111'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('createUser', () => {
    store.dispatch(createUser({ username: 'test' }));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('updateUser', () => {
    store.dispatch(updateUser('123', {}));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('getUserRoles', () => {
    store.dispatch(getUserRoles());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
