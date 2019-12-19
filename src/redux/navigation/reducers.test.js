import navigation from './reducers';
import constants from './constants';

const initialState = {
  isNavigationShown: false,
};

describe('navigation reducer', () => {
  it('should TOGGLE_NAVIGATION', () => {
    expect(
      navigation(initialState, {
        type: constants.TOGGLE_NAVIGATION,
      }),
    ).toMatchInlineSnapshot(`
      Object {
        "isNavigationShown": true,
      }
    `);
  });
});
