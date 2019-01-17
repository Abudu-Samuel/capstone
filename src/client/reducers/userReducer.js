import types from '../actions/actionTypes';

const initialState = {
  isProcessing: false,
  isAuthenticated: !!localStorage.getItem('x-access-token'),
  generalError: '',
  userData: {},
  cheatSheets: [],
  searchData: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.IS_PROCESSING:
      return {
        ...state,
        isProcessing: action.bool
      };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        generalError: ''
      };

    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        generalError: ''
      };

    case types.GENERAL_ERROR:
      return {
        ...state,
        generalError: action.error
      };

    case types.LOG_OUT_SUCCESS:
      return {
        ...state,
        userData: {}
      };

    case types.FETCH_GIT_CHEAT:
      return {
        ...state,
        cheatSheets: action.payload
      };

    case types.SEARCH_GIT_CHEAT:
      return {
        ...state,
        searchData: [...action.searchData]
      };

    default:
      return state;
  }
};
