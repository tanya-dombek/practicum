import { wsProfileReducer, initialState } from './ws-profile-reducer';

describe('wsProfileReducer', () => {
  const orders = {
    orders: [],
    success: true,
    total: 100,
    totalToday: 10
  }
  it('should return the initial state', () => {
    expect(wsProfileReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ORDERS_PROFILE_CONNECT', () => {
    const action = { type: 'ORDERS_PROFILE_CONNECT' };
    expect(wsProfileReducer(initialState, action)).toEqual({
      ...initialState,
      status: 'CONNECTING...'
    });
  });

  it('should handle ORDERS_PROFILE_SUCCESS', () => {
    const action = { type: 'ORDERS_PROFILE_SUCCESS' };
    expect(wsProfileReducer(initialState, action)).toEqual({
      ...initialState,
      error: '',
      status: 'ONLINE'
    });
  });

  it('should handle ORDERS_PROFILE_CLOSE', () => {
    const action = { type: 'ORDERS_PROFILE_CLOSE' };
    expect(wsProfileReducer(initialState, action)).toEqual({
      ...initialState,
      status: 'OFFLINE'
    });
  });

  it('should handle ORDERS_PROFILE_ERROR', () => {
    const error = 'Error message';
    const action = { type: 'ORDERS_PROFILE_ERROR', error };
    expect(wsProfileReducer(initialState, action)).toEqual({
      ...initialState,
      error
    });
  });

  it('should handle ORDERS_PROFILE_DISCONNECT', () => {
    const action = { type: 'ORDERS_PROFILE_DISCONNECT' };
    expect(wsProfileReducer(initialState, action)).toEqual({
      ...initialState,
      status: 'DISCONNECTED',
      profileOrders: null
    });
  });

  it('should handle WS_GET_PROFILE_ORDERS', () => {
    const action = { type: 'WS_GET_PROFILE_ORDERS', orders };
    expect(wsProfileReducer(initialState, action)).toEqual({
      ...initialState,
      profileOrders: orders
    });
  });

  it('should return the initial state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};
    expect(wsProfileReducer(initialState, action)).toEqual(initialState);
  });
});