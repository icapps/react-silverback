import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { toggleNavigation} from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth actions', () => {
  it('loginUser', () => {
    const store = mockStore({});
    store.dispatch(toggleNavigation());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
