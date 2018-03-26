import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginUser, logoutUser } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockLogin = require('../../mock/login.json');

describe('auth actions', () => {
  it('loginUser', () => {
    Network.post = jest.fn(() => mockLogin);
    const store = mockStore({});
    store.dispatch(loginUser('test', 'test123'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
  it('logoutUser', () => {
    const store = mockStore({});
    store.dispatch(logoutUser());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
