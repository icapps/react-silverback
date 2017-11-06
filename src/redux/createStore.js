import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from './middleware/promiseMiddleware';
import rootReducer from './rootReducer';

const middleware = [ thunkMiddleware, promiseMiddleware() ];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed : true,
    logger    : console,
    colors    : {
      title     : action => {
        if (action.type.endsWith('FULFILLED')) return '#006400';
        if (action.type.endsWith('REJECTED')) return '#B31B1B';
        return '#222222';
      },
      prevState : () => '#9E9E9E',
      action    : () => '#03A9F4',
      nextState : () => '#4CAF50',
      error     : () => '#F20404',
    },
  });
  middleware.push(logger);
}

// If you want devTools, change 'window=undefined' in 'window=object'
const devTools = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f;

const createStoreWithMiddleware = compose(applyMiddleware(...middleware), devTools)(createStore);

export default function configureStore(initialState = {}) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
