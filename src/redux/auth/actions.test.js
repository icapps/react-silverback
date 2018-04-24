import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginUser, logoutUser, verifyForgotPassword, confirmForgotPassword , forgotPassword} from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  beforeEach(() => {
    Network.get = jest.fn(() => { });
    Network.post = jest.fn(() => { });
    Network.put = jest.fn(() => { });
  });

  it('loginUser', () => {
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
  it('forgotPassword', () => {
    const store = mockStore({});
    store.dispatch(forgotPassword('test@test.test'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
  it('verifyForgotPassword', () => {
    const store = mockStore({});
    store.dispatch(verifyForgotPassword('123'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
  it('confirmForgotPassword', () => {
    const store = mockStore({});
    store.dispatch(confirmForgotPassword('123', 'test123'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
