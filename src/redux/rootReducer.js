import { combineReducers } from 'redux';
import auth from './auth/reducers';
import navigation from './navigation/reducers';
import dataType from './datatype/reducers';
import users from './users/reducers';
import codes from './codes/reducers';

const rootReducer = combineReducers({
  auth,
  navigation,
  dataType,
  users,
  codes,
});

export default rootReducer;
