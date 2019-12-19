import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getVersion } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('versionControl actions', () => {
  beforeEach(() => {
    Network.get = jest.fn(() => {});
  });

  it('getVersion', () => {
    const store = mockStore({});
    store.dispatch(getVersion());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchInlineSnapshot(`
      Array [
        Object {
          "payload": Promise {},
          "type": "GET_VERSION",
        },
      ]
    `);
  });
});
