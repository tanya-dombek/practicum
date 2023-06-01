import { loginReducer, initialState } from "./login-reducer";

describe('loginReducer', () => {
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = { type: 'LOGIN_SUCCESS' };
    expect(loginReducer(initialState, action)).toEqual({
        ...initialState, loginSuccessful: true
    });
  });

  it('should handle LOGIN_FAILED', () => {
    const action = { type: 'LOGIN_FAILED', errMsg: 'Login failed' };
    expect(loginReducer(initialState, action)).toEqual({
        ...initialState,
        loginSuccessful: false,
        errMsg: 'Login failed'
    });
  });

  it('should handle SET_AUTH', () => {
    const action = { type: 'SET_AUTH', isAuthChecked: true };
    expect(loginReducer(initialState, action)).toEqual({
        ...initialState,
        isAuthChecked: true
    });
  });

  it('should return the initial state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};

    expect(loginReducer(initialState, action)).toEqual(initialState);
  });
});