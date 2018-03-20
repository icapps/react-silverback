import { combineReducers } from 'redux';
import auth from './auth/reducers';
import navigation from './navigation/reducers';
import dataType from './datatype/reducers';

const rootReducer = combineReducers({
  auth,
  navigation,
  dataType,
});

export default rootReducer;
