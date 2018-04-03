import users from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  codes: [],
  codesCount: 0,
  codeTypes: [],
  codeTypeCount: 0,
  ...defaultInitialState,
};

describe('codes reducer', () => {
  it('should return the initial state', () => {
    expect(users(undefined, {})).toMatchSnapshot();
  });
  //GET_CODE_TYPES
  it('should GET_CODE_TYPES_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.GET_CODE_TYPES_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      })
    ).toMatchSnapshot();
  });
  it('should GET_CODE_TYPES_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.GET_CODE_TYPES_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should GET_CODE_TYPES_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.GET_CODE_TYPES_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });
  //GET_CODES
  it('should GET_CODES_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.GET_CODES_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      })
    ).toMatchSnapshot();
  });
  it('should GET_CODES_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.GET_CODES_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should GET_CODES_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.GET_CODES_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });
});
