import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getDataType } from './actions';
import { Network } from '../../utils/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockDatatypes = require('../../mock/datatype.json');

describe('datatype actions', () => {
  it('getDataType', () => {
    Network.get = jest.fn(() => mockDatatypes);
    const store = mockStore({});
    store.dispatch(getDataType());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
