
import messageConstants from '../messages/constants';
import { identifiers } from '../../constants';
import { strings } from '../../utils';

const errorHandlingMiddleware = () => {
  return store => next => action => {
    if(action.type.includes('REJECTED') || action.type.includes('SUCCESS')) {
      store.dispatch({
        type: messageConstants.SET_MESSAGE,
        payload: {
          type: identifiers.MESSAGE_DANGER,
          text: action.payload.errors[0].title || strings.GENERAL_ERROR,
        },
      });
    }
    return next(action);
  };
};

export default errorHandlingMiddleware;
