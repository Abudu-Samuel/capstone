import axios from 'axios';
import jwt from 'jsonwebtoken';
import types from './actionTypes';

const isProcessing = bool => ({
  type: types.IS_PROCESSING,
  bool
});

const loginSuccess = payload => ({
  type: types.LOGIN_SUCCESS,
  payload
});

const signupSuccess = payload => ({
  type: types.SIGNUP_SUCCESS,
  payload
});

const generalError = error => ({
  type: types.GENERAL_ERROR,
  error
});

export const userLogin = payload => dispatch => {
  dispatch(isProcessing(true));
  return axios
    .post('/api/login', payload)
    .then(response => {
      dispatch(loginSuccess(jwt.decode(response.data.payload)));
      localStorage.setItem('x-access-token', response.data.payload);
      dispatch(isProcessing(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isProcessing(false));
    });
};

export const userSignup = payload => dispatch => {
  dispatch(isProcessing(true));
  return axios
    .post('/api/signup', payload)
    .then(response => {
      dispatch(signupSuccess(jwt.decode(response.data.payload)));
      localStorage.setItem('x-access-token', response.data.payload);
      dispatch(isProcessing(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isProcessing(false));
    });
};
