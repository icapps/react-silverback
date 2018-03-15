import constants from './constants';

const initialState = {
  isNavigationShown: false,
};

const navigation = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.TOGGLE_NAVIGATION:
      return {
        ...state,
        isNavigationShown: !state.isNavigationShown,
      };
    default:
      return state;
  }
};

export default navigation;
