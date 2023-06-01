import { forgotPasswordReducer, initialState } from "./forgot-password-reducer";

describe('forgotPasswordReducer', () => {
  it('should return the initial state', () => {
    expect(forgotPasswordReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const action = {type: 'FORGOT_PASSWORD_SUCCESS'};

    expect(forgotPasswordReducer(initialState, action)).toEqual({
      ...initialState,
      resetPasswordWasSent: true,
    });
  });

  it('should handle FORGOT_PASSWORD_FAILED', () => {
    const action = {
      type: 'FORGOT_PASSWORD_FAILED',
      errMsg: 'Password reset failed',
    };

    expect(forgotPasswordReducer(initialState, action)).toEqual({
      resetPasswordWasSent: false,
      errMsg: 'Password reset failed',
    });
  });

  it('should return the initial state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};

    expect(forgotPasswordReducer(initialState, action)).toEqual(initialState);
  });
});