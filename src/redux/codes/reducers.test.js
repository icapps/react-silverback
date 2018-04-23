import codes from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  languageCodeList: [],
  languageCodeCount: 0,
  ...defaultInitialState,
};

describe('codes reducer', () => {
  it('should return the initial state', () => {
    expect(codes(undefined, {})).toMatchSnapshot();
  });
  it('should GET_LANGUAGE_CODES_FULFILLED', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODES_FULFILLED,
        payload: { data: {}, meta: { totalCount: 10 } },
      })
    ).toMatchSnapshot();
  });
  it('should GET_LANGUAGE_CODES_PENDING', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODES_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should GET_LANGUAGE_CODES_REJECTED', () => {
    expect(
      codes(initialState, {
        type: constants.GET_LANGUAGE_CODES_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });

  it('should CREATE_LANGUAGE_CODE_FULFILLED', () => {
    expect(
      codes(initialState, {
        type: constants.CREATE_LANGUAGE_CODE_FULFILLED,
        payload: { data: { id: 'id' } },
      })
    ).toMatchSnapshot();
  });
  it('should CREATE_LANGUAGE_CODE_PENDING', () => {
    expect(
      codes(initialState, {
        type: constants.CREATE_LANGUAGE_CODE_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should CREATE_LANGUAGE_CODE_REJECTED', () => {
    expect(
      codes(initialState, {
        type: constants.CREATE_LANGUAGE_CODE_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });
});
