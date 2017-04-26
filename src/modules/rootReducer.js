import {combineReducers} from 'redux';
import user from './user/reducers';

 const rootReducer = combineReducers({
  user
});

export default rootReducer;