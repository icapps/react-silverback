import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import createStore from './modules/createStore';
import './index.scss';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
 document.getElementById('root')
);
