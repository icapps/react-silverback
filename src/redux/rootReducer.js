import { combineReducers } from 'redux';
import auth from './auth/reducers';
import navigation from './navigation/reducers';

const rootReducer = combineReducers({
  auth,
  navigation,
});

export default rootReducer;
