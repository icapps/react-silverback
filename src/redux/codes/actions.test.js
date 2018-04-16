import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getLanguageCodes } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user actions', () => {
  beforeEach(() => {
    Network.get = jest.fn(() => { });
  });

  it('getCodes', () => {
    const store = mockStore({});
    store.dispatch(getLanguageCodes(0, 10));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
