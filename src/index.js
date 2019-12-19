import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import createStore from './redux/createStore';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
