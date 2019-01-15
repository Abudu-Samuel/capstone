import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Route from './Routes';
import '../../public/style.css';
import configureStore from './store/config';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Route />
  </Provider>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
