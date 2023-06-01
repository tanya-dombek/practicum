import { registrationReducer, initialState } from "./register-reducer";

describe('registrationReducer', () => {
  it('should return the initial state', () => {
    expect(registrationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REGISTER_SUCCESS', () => {
    const action = { type: 'REGISTER_SUCCESS' };
    expect(registrationReducer(initialState, action)).toEqual({
        ...initialState, registrationSuccessful: true
    });
  });

  it('should handle REGISTER_FAILED', () => {
    const action = { type: 'REGISTER_FAILED', errMsg: 'Register failed' };
    expect(registrationReducer(initialState, action)).toEqual({
        ...initialState,
        registrationSuccessful: false,
        errMsg: 'Register failed',
    });
  });

  it('should return the initial state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};

    expect(registrationReducer(initialState, action)).toEqual(initialState);
  });
});