import { combineReducers } from 'redux';
import auth from './auth/reducers';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
