import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getLanguageCodes,
  createLanguageCode,
  deprecateLanguageCode,
  getLanguageCodeById,
  undeprecateLanguageCode,
  getStatusCodes,
} from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('user actions', () => {
  beforeEach(() => {
    Network.get = jest.fn(() => {});
    Network.post = jest.fn(() => {});
    store = mockStore({});
  });

  it('getCodes', () => {
    store.dispatch(getLanguageCodes(0, 10));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": Promise {},
          "type": "GET_LANGUAGE_CODES",
        },
      ]
    `);
  });

  it('createLanguageCode', () => {
    store.dispatch(createLanguageCode({ name: 'test', code: 'T', description: 'test description' }));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": Promise {},
          "type": "CREATE_LANGUAGE_CODE",
        },
      ]
    `);
  });

  it('deprecateLanguageCode', () => {
    store.dispatch(deprecateLanguageCode('id'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": Promise {},
          "type": "DEPRECATE_LANGUAGE_CODE",
        },
      ]
    `);
  });

  it('getLanguageCodyId', () => {
    store.dispatch(getLanguageCodeById('id'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": Promise {},
          "type": "GET_LANGUAGE_CODE_BY_ID",
        },
      ]
    `);
  });

  it('undeprecateLanguageCode', () => {
    store.dispatch(undeprecateLanguageCode('id'));
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": Promise {},
          "type": "UNDEPRECATE_LANGUAGE_CODE",
        },
      ]
    `);
  });

  it('getStatusCodes', () => {
    store.dispatch(getStatusCodes());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": Promise {},
          "type": "GET_STATUS_CODES",
        },
      ]
    `);
  });
});
