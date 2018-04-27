import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getLanguageCodes, createLanguageCode, deprecateLanguageCode, getLanguageCodeById, undeprecateLanguageCode } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('user actions', () => {
  beforeEach(() => {
    Network.get = jest.fn(() => { });
    Network.post = jest.fn(() => { });
    store = mockStore({});
  });

  it('getCodes', () => {
    store.dispatch(getLanguageCodes(0, 10));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('createLanguageCode', () => {
    store.dispatch(createLanguageCode({ name: 'test', code: 'T', description: 'test description' }));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('deprecateLanguageCode', () => {
    store.dispatch(deprecateLanguageCode('id'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('getLanguageCodyId', () => {
    store.dispatch(getLanguageCodeById('id'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });

  it('undeprecateLanguageCode', () => {
    store.dispatch(undeprecateLanguageCode('id'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
