import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginUser, logoutUser } from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
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
});
