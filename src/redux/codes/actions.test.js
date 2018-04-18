import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getLanguageCodes, createLanguageCode } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user actions', () => {
  beforeEach(() => {
    Network.get = jest.fn(() => { });
    Network.post = jest.fn(() => { });
  });

  it('getCodes', () => {
    const store = mockStore({});
    store.dispatch(getLanguageCodes(0, 10));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('createLanguageCode', () => {
    const store = mockStore({});
    store.dispatch(createLanguageCode({ name: "test", code: "T", description: "test description" }));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
