import React from 'react';
import ReactDOM from 'react-dom';
import toastr from 'toastr';
import { Provider } from 'react-redux';
import Route from './Routes';
import '../../public/style.css';
import configureStore from './store/config';
import 'toastr/build/toastr.min.css';

const store = configureStore();

toastr.options = {
  showMethod: 'slideDown',
  hideMethod: 'slideUp',
  closeMethod: 'slideUp',
  progressBar: true,
  closeButton: true,
  hideDuration: 500,
  positionClass: 'toast-bottom-right',
  timeOut: 1500
};

ReactDOM.render(
  <Provider store={store}>
    <Route />
  </Provider>,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();
