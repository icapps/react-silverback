import versionControl from './reducers';
import constants from './constants';
import defaultInitialState from '../defaultInitialState';

const initialState = {
  build: '',
  version: '',
  ...defaultInitialState,
};

describe('versionControl reducer', () => {
  it('should return the initial state', () => {
    expect(versionControl(undefined, {})).toMatchSnapshot();
  });
  it('should GET_VERSION_FULFILLED', () => {
    expect(
      versionControl(initialState, {
        type: constants.GET_VERSION_FULFILLED,
        payload: { data: { build: 'v51', version: '1.0.1' }, meta: { totalCount: 10 } },
      })
    ).toMatchSnapshot();
  });
  it('should GET_VERSION_PENDING', () => {
    expect(
      versionControl(initialState, {
        type: constants.GET_VERSION_PENDING,
      })
    ).toMatchSnapshot();
  });
  it('should GET_VERSION_REJECTED', () => {
    expect(
      versionControl(initialState, {
        type: constants.GET_VERSION_REJECTED,
        payload: { errors: [{ detail: 'ErrorMessage' }] },
      })
    ).toMatchSnapshot();
  });
});
