import { logoutReducer, initialState } from "./logout-reducer";

describe('logoutReducer', () => {
  it('should return the initial state', () => {
    expect(logoutReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const action = { type: 'LOGOUT_SUCCESS' };
    expect(logoutReducer(initialState, action)).toEqual({
        ...initialState, logoutSuccessful: true
    });
  });

  it('should handle LOGOUT_FAILED', () => {
    const action = { type: 'LOGOUT_FAILED' };
    expect(logoutReducer(initialState, action)).toEqual({
        ...initialState,
        logoutSuccessful: false,
    });
  });

  it('should return the initial state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};

    expect(logoutReducer(initialState, action)).toEqual(initialState);
  });
});