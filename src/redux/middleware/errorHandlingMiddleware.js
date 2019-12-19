import messageConstants from '../messages/constants';
import authConstants from '../auth/constants';
import { identifiers } from '../../constants';
import { strings } from '../../utils';

const errorHandlingMiddleware = () => {
  return store => next => action => {
    if (action.type.includes('REJECTED')) {
      if (action.payload.errors[0].status === 401) {
        store.dispatch({
          type: authConstants.LOGOUT_USER_FORCE,
        });
      } else {
        store.dispatch({
          type: messageConstants.SET_MESSAGE,
          payload: {
            type: identifiers.MESSAGE_DANGER,
            text: action.payload.errors[0].title || strings.GENERAL_ERROR,
          },
        });
      }
    }
    return next(action);
  };
};

export default errorHandlingMiddleware;
