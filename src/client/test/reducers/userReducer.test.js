import userReducer from '../../reducers/userReducer';
import types from '../../actions/actionTypes';

describe('reducer test', () => {
  const initialState = {
    isProcessing: false,
    isAuthenticated: !!localStorage.getItem('x-access-token'),
    generalError: '',
    userData: {},
    cheatSheets: [],
    searchData: null
  };

  describe('initial state', () => {
    it('should return initial state', done => {
      expect(userReducer(undefined, {})).toEqual(initialState);
      done();
    });
  });

  it('should set processing loader to true when passed IS_PROCESSING', done => {
    const action = {
      type: types.IS_PROCESSING,
      bool: true
    };

    const newState = userReducer(initialState, action);
    expect(newState.isProcessing).toEqual(true);
    expect(newState.userData).toEqual({});
    expect(newState.generalError).toEqual('');
    done();
  });

  it('should log out user when passed LOG_OUT', done => {
    const action = {
      type: types.LOG_OUT_SUCCESS
    };

    const newState = userReducer(initialState, action);
    expect(newState.userData).toEqual({});
    done();
  });

  it('should give errors when passed GENERAL_ERROR', done => {
    const action = {
      type: types.GENERAL_ERROR
    };

    const newState = userReducer(initialState, action);
    expect(newState.userData).toEqual({});
    expect(newState.isAuthenticated).toEqual(false);
    done();
  });

  it('should populate user object when passed LOGIN_SUCCESS', done => {
    const action = {
      type: types.LOGIN_SUCCESS,
      userData: {
        email: 'email@gmail.com'
      }
    };

    const newState = userReducer(initialState, action);
    expect(newState.isProcessing).toEqual(false);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.generalError).toEqual('');
    done();
  });

  it('should populate user object when passed SIGNUP_SUCCESS', done => {
    const action = {
      type: types.SIGNUP_SUCCESS,
      userData: {
        email: 'email@gmail.com'
      }
    };

    const newState = userReducer(initialState, action);
    expect(newState.isProcessing).toEqual(false);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.generalError).toEqual('');
    done();
  });

  it('should populate cheats array when passed FETCH_GIT_CHEAT', done => {
    const action = {
      type: types.FETCH_GIT_CHEAT,
      payload: [{}]
    };

    const newState = userReducer(initialState, action);
    expect(newState.isProcessing).toEqual(false);
    expect(newState.cheatSheets).toEqual([{}]);
    expect(newState.searchData).toEqual(null);
    expect(newState.generalError).toEqual('');
    done();
  });

  it('should return searchData array when passed SEARCH_RESPONSE', done => {
    const action = {
      type: types.SEARCH_GIT_CHEAT,
      searchData: [{}]
    };

    const newState = userReducer(initialState, action);
    expect(newState.isProcessing).toEqual(false);
    expect(newState.cheatSheets).toEqual([]);
    expect(newState.searchData).toEqual([{}]);
    expect(newState.generalError).toEqual('');
    done();
  });
});
