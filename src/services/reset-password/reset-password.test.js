import { resetPasswordReducer, initialState } from "./reset-password-reducer";

describe('resetPasswordReducer', () => {
  it('should return the initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    const action = { type: 'RESET_PASSWORD_SUCCESS' };
    expect(resetPasswordReducer(initialState, action)).toEqual({
        ...initialState, resetPasswordSuccessful: true
    });
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    const action = { type: 'RESET_PASSWORD_FAILED', errMsg: 'Reset password failed' };
    expect(resetPasswordReducer(initialState, action)).toEqual({
        ...initialState,
        resetPasswordSuccessful: false,
        errMsg: 'Reset password failed',
    });
  });

  it('should return the initial state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};

    expect(resetPasswordReducer(initialState, action)).toEqual(initialState);
  });
});