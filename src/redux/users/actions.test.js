import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getUsers } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUsers = require('../../mock/users.json');

describe('user actions', () => {
  it('getUsers', () => {
    Network.get = jest.fn(() => mockUsers);
    const store = mockStore({});
    store.dispatch(getUsers());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
