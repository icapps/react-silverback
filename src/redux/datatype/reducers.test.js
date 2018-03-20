import dataType from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  dataTypes: [],
  ...defaultInitialState,
};

describe('datatype reducer', () => {
  it('should return the initial state', () => {
    expect(dataType(undefined, {})).toMatchSnapshot();
  });

  it('should GET_DATA_TYPE_FULFILLED', () => {
    expect(
      dataType(initialState, {
        type: constants.GET_DATA_TYPE_FULFILLED,
      })
    ).toMatchSnapshot();
  });
  it('should GET_DATA_TYPE_PENDING', () => {
    expect(
      dataType(initialState, {
        type: constants.GET_DATA_TYPE_PENDING,
      })
    ).toMatchSnapshot();
  });
});
