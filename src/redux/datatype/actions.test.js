import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getDataType } from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('datatype actions', () => {
  it('getDataType', () => {
    const store = mockStore({});
    store.dispatch(getDataType());
    const expectedActions = store.getActions();
    expect(expectedActions).toMatchSnapshot();
  });
});
