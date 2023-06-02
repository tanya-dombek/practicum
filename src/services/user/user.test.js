import { userReducer, initialState } from "./user-reducer";

describe('userReducer', () => {
  const user = { name: 'John', email: 'john@example.com' };
  
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_USER_SUCCESS', () => {
    const action = { type: 'GET_USER_SUCCESS' };
    expect(userReducer(initialState, action)).toEqual({ ...initialState, getUserSuccessful: true });
  });

  it('should handle GET_USER_FAILED', () => {
    const action = { type: 'GET_USER_FAILED' };
    expect(userReducer(initialState, action)).toEqual({ ...initialState, getUserSuccessful: false });
  });

  it('should handle PATCH_USER_SUCCESS', () => {
    const action = { type: 'PATCH_USER_SUCCESS' };
    expect(userReducer(initialState, action)).toEqual({ ...initialState, updateUserSuccessful: true });
  });

  it('should handle PATCH_USER_FAILED', () => {
    const action = { type: 'PATCH_USER_FAILED' };
    expect(userReducer(initialState, action)).toEqual({ ...initialState, updateUserSuccessful: false });
  });

  it('should handle SET_USER', () => {
    const action = { type: 'SET_USER', user };
    expect(userReducer(initialState, action)).toEqual({ ...initialState, user });
  });

  it('should return the same state for unknown action types', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    expect(userReducer(initialState, action)).toEqual(initialState);
  });
});