import {
  userLogin,
  userLogout,
  userSignup,
  searchGitCheat,
  fetchAllGitCheat
} from '../../actions/userActions';
import types from '../../actions/actionTypes';
import userMockedData from '../__mock__/userMockedData';

describe('user actions', () => {
  let store;
  beforeEach(() => {
    moxios.install();
    store = storeMock({});
  });
  afterEach(() => moxios.uninstall());

  it('should logout user', () => {
    const expectedActions = [
      {
        type: types.LOG_OUT_SUCCESS
      }
    ];
    store.dispatch(userLogout());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should login user', async done => {
    moxios.stubRequest('/api/login', {
      status: 200,
      response: userMockedData.loginResponse
    });

    const expectedActions = [
      { type: types.IS_PROCESSING, bool: true },
      {
        type: types.LOGIN_SUCCESS,
        payload: userMockedData.user
      },
      { type: types.IS_PROCESSING, bool: false }
    ];

    await store.dispatch(userLogin(userMockedData.loginData));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should signup user', async done => {
    moxios.stubRequest('/api/signup', {
      status: 201,
      response: userMockedData.signUpResponse
    });

    const expectedActions = [
      { type: types.IS_PROCESSING, bool: true },
      {
        type: types.SIGNUP_SUCCESS,
        payload: userMockedData.user
      },
      { type: types.IS_PROCESSING, bool: false }
    ];

    await store.dispatch(userSignup(userMockedData.loginData));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should not login user with invalid data', async done => {
    moxios.stubRequest('/api/login', {
      status: 400,
      response: userMockedData.authErrorResponse
    });

    const expectedActions = [
      { type: types.IS_PROCESSING, bool: true },
      {
        type: types.GENERAL_ERROR,
        error: 'Invalid email or password'
      },
      { type: types.IS_PROCESSING, bool: false }
    ];

    await store.dispatch(userLogin(userMockedData.invalidLoginData));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should not signup user with invalid data', async done => {
    moxios.stubRequest('/api/signup', {
      status: 400,
      response: userMockedData.authErrorResponse
    });

    const expectedActions = [
      { type: types.IS_PROCESSING, bool: true },
      {
        type: types.GENERAL_ERROR,
        error: 'Invalid email or password'
      },
      { type: types.IS_PROCESSING, bool: false }
    ];

    await store.dispatch(userSignup(userMockedData.signupData));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should fetch all git cheats', async done => {
    moxios.stubRequest('/api/cheats', {
      status: 200,
      response: userMockedData.cheatsResponse
    });

    const expectedActions = [
      { type: types.IS_PROCESSING, bool: true },
      {
        type: types.FETCH_GIT_CHEAT,
        payload: []
      },
      { type: types.IS_PROCESSING, bool: false }
    ];

    await store.dispatch(fetchAllGitCheat());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should not fetch all git cheats', async done => {
    moxios.stubRequest('/api/cheats', {
      status: 500,
      response: userMockedData.cheatsErrorResponse
    });

    const expectedActions = [
      { type: types.IS_PROCESSING, bool: true },
      {
        type: types.GENERAL_ERROR,
        error: 'Oops!. An error occurred'
      },
      { type: types.IS_PROCESSING, bool: false }
    ];

    await store.dispatch(fetchAllGitCheat());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it('should return `SEARCH_RESPONSE` when search word matches the `category name`', async done => {
    const state = {
      user: {
        cheatSheets: [
          {
            name: 'install git'
          }
        ]
      }
    };

    store = storeMock(state);

    const expectedActions = [
      { type: types.SEARCH_GIT_CHEAT, searchData: state.user.cheatSheets }
    ];

    await store.dispatch(searchGitCheat('install git'));
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });

  it(
    'should return `SEARCH_RESPONSE` when search word does not matche the `category name`,' +
    'matches the `description`',
    async done => {
      const state = {
        user: {
          cheatSheets: [
            {
              name: 'install git',
              cheats: [
                {
                  description: 'push'
                }
              ]
            }
          ]
        }
      };

      store = storeMock(state);

      const expectedActions = [
        {
          type: types.SEARCH_GIT_CHEAT,
          searchData: state.user.cheatSheets
        }
      ];

      await store.dispatch(searchGitCheat('push'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }
  );

  it(
    'should return `SEARCH_RESPONSE` when search word does not matche the `category name`,' +
    'and the `description` but matches the `command`',
    async done => {
      const state = {
        user: {
          cheatSheets: [
            {
              name: 'install git',
              cheats: [
                {
                  description: 'push',
                  command: 'pull'
                }
              ]
            }
          ]
        }
      };

      store = storeMock(state);

      const expectedActions = [
        {
          type: types.SEARCH_GIT_CHEAT,
          searchData: state.user.cheatSheets
        }
      ];

      await store.dispatch(searchGitCheat('pull'));
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }
  );
});
