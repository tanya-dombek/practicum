import { wsFeedReducer, initialState } from './ws-reducer';

describe('wsFeedReducer', () => {
  const orders = {
    orders: [],
    success: true,
    total: 100,
    totalToday: 10
  }
  it('should return the initial state', () => {
    expect(wsFeedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ORDERS_FEED_CONNECT', () => {
    const action = { type: 'ORDERS_FEED_CONNECT' };
    expect(wsFeedReducer(initialState, action)).toEqual({
      ...initialState,
      status: 'CONNECTING...'
    });
  });

  it('should handle ORDERS_FEED_SUCCESS', () => {
    const action = { type: 'ORDERS_FEED_SUCCESS' };
    expect(wsFeedReducer(initialState, action)).toEqual({
      ...initialState,
      error: '',
      status: 'ONLINE'
    });
  });

  it('should handle ORDERS_FEED_CLOSE', () => {
    const action = { type: 'ORDERS_FEED_CLOSE' };
    expect(wsFeedReducer(initialState, action)).toEqual({
      ...initialState,
      status: 'OFFLINE'
    });
  });

  it('should handle ORDERS_FEED_ERROR', () => {
    const error = 'Error message';
    const action = { type: 'ORDERS_FEED_ERROR', error };
    expect(wsFeedReducer(initialState, action)).toEqual({
      ...initialState,
      error
    });
  });

  it('should handle ORDERS_FEED_DISCONNECT', () => {
    const action = { type: 'ORDERS_FEED_DISCONNECT' };
    expect(wsFeedReducer(initialState, action)).toEqual({
      ...initialState,
      status: 'DISCONNECTED',
      feedOrders: null
    });
  });

  it('should handle WS_GET_FEED_ORDERS', () => {
    const action = { type: 'WS_GET_FEED_ORDERS', orders };
    expect(wsFeedReducer(initialState, action)).toEqual({
      ...initialState,
      feedOrders: orders
    });
  });

  it('should return the initial state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};
    expect(wsFeedReducer(initialState, action)).toEqual(initialState);
  });
});