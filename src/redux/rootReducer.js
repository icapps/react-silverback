import { combineReducers } from 'redux';
import auth from './auth/reducers';
import navigation from './navigation/reducers';
import users from './users/reducers';
import codes from './codes/reducers';
import versionControl from './versionControl/reducers';
import messages from './messages/reducers';

const rootReducer = combineReducers({
  auth,
  navigation,
  users,
  codes,
  versionControl,
  messages,
});

export default rootReducer;
