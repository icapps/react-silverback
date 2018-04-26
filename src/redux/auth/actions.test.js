import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginUser, logoutUser, verifyForgotPassword, confirmForgotPassword, forgotPassword } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('auth actions', () => {
  beforeEach(() => {
    store = mockStore({});
    Network.get = jest.fn(() => { });
    Network.post = jest.fn(() => { });
    Network.put = jest.fn(() => { });
  });

  it('loginUser', () => {
    store.dispatch(loginUser('test', 'test123'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
  it('logoutUser', () => {
    store.dispatch(logoutUser());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
  it('forgotPassword', () => {
    store.dispatch(forgotPassword('test@test.test'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
  it('verifyForgotPassword', () => {
    store.dispatch(verifyForgotPassword('123'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
  it('confirmForgotPassword', () => {
    store.dispatch(confirmForgotPassword('123', 'test123'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
