import {combineReducers} from 'redux';
import user from './user/reducers';
import jokes from './jokes/reducers';

const rootReducer = combineReducers({
  user,
  jokes
});

export default rootReducer;
