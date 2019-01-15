import types from '../actions/actionTypes';

const initialState = {
  isProcessing: false,
  isAuthenticated: false,
  generalError: '',
  userData: {}
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

    default:
      return state;
  }
};
