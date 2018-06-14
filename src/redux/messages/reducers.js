import messageConstants from './constants';
import authConstants from '../auth/constants';
import usersConstants from '../users/constants';
import defaultInitialState from '../defaultInitialState';
import { strings } from '../../utils';
import { identifiers } from '../../constants';

const initialState = {
  messages: [],
  ...defaultInitialState,
};

const getMessageId = () => new Date().getTime();

const errorMessageHandling = payload => payload.errors[0].title || strings.GENERAL_ERROR;
const messages = (state = initialState, action = {}) => {
  const { payload } = action;
  switch (action.type) {
    // SET MESSAGE
    case messageConstants.SET_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages, 
          { ...action.payload, id: getMessageId() },
        ],
      };
    // CLEAR MESSAGES
    case messageConstants.CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };
    // LOGIN USER REJECTED
    case authConstants.LOGIN_USER_REJECTED:
      return {
        ...state,
        messages: [
          ...state.messages, 
          { text: errorMessageHandling(payload), type: identifiers.MESSAGE_DANGER, id: getMessageId() },
        ],
      };
    // UPDATE USER REJECTED
    case usersConstants.UPDATE_USER_REJECTED:
      return {
        ...state,
        messages: [
          ...state.messages, 
          { text: errorMessageHandling(payload), type: identifiers.MESSAGE_DANGER, id: getMessageId() },
        ],
      };
    default:
      return state;
  }
};

export default messages;
