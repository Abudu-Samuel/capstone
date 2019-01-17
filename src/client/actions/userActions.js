import axios from 'axios';
import jwt from 'jsonwebtoken';
import types from './actionTypes';
import toast from '../helpers/toast';

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

const logoutSuccess = () => ({
  type: types.LOG_OUT_SUCCESS
});

const fetchCheatSuccess = payload => ({
  type: types.FETCH_GIT_CHEAT,
  payload
});

export const userLogin = payload => dispatch => {
  dispatch(isProcessing(true));
  return axios
    .post('/api/login', payload)
    .then(response => {
      dispatch(loginSuccess(jwt.decode(response.data.payload)));
      localStorage.setItem('x-access-token', response.data.payload);
      toast('success', response.data.message);
      dispatch(isProcessing(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      toast('error', error.response.data.message);
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

export const userLogout = () => dispatch => {
  localStorage.removeItem('x-access-token');
  toast('success', 'You are logged out');
  dispatch(logoutSuccess({}));
};

export const fetchAllGitCheat = () => dispatch => {
  dispatch(isProcessing(true));
  return axios
    .get('/api/cheats', {
      headers: {
        'x-access-token': localStorage.getItem('x-access-token')
      }
    })
    .then(response => {
      dispatch(fetchCheatSuccess(response.data.payload));
      dispatch(isProcessing(false));
    })
    .catch(error => {
      dispatch(generalError(error.response.data.message));
      dispatch(isProcessing(false));
    });
};

export const searchGitCheat = searchKeywords => (dispatch, getState) => {
  const searchCheat = getState().user.cheatSheets.filter(
    category =>
      category.name.includes(searchKeywords) ||
      category.cheats
        .map(cheat => cheat.description.toLowerCase())
        .some(description => description.includes(searchKeywords)) ||
      category.cheats
        .map(cheat => cheat.command.toLowerCase())
        .some(command => command.includes(searchKeywords))
  );
  return dispatch({
    type: types.SEARCH_GIT_CHEAT,
    searchData: searchCheat
  });
};
