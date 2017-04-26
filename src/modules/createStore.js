import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './rootReducer';

const logger = createLogger({
  collapsed: true,
  logger: console
});

const devTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;

const createStoreWithMiddleware = compose(applyMiddleware(
  thunkMiddleware,
  logger
), devTools)(createStore)

export default function configureStore(initialState = {}) {
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer');
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}