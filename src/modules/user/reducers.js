import constants from './constants';

const initialState = {
  username: '',
  email: '',
  loggedIn: false
};

const user = (state = initialState, action = {}) => {
  const payload = action.payload;

  switch (action.type) {
    case constants.SET_USERNAME:
      const {username} = payload;

      return {
        ...state,
        username,
      };

   default:
      return state;
  }
};

export default user;
