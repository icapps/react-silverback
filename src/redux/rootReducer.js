import { combineReducers } from 'redux';
import auth from './auth/reducers';
import navigation from './navigation/reducers';
import dataType from './datatype/reducers';
import users from './users/reducers';

const rootReducer = combineReducers({
  auth,
  navigation,
  dataType,
  users,
});

export default rootReducer;
