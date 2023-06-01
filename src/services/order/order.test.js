import { orderReducer, initialState } from './order-reducer';

describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle POST_ORDER_SUCCESS', () => {
    const action = {
      type: 'POST_ORDER_SUCCESS',
      orderNumber: '12345',
    };
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      orderFailed: false,
      orderNumber: '12345',
      openOrderModal: true,
    });
  });

  it('should handle POST_ORDER_FAILED', () => {
    const action = {type: 'POST_ORDER_FAILED'};
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      orderFailed: true,
    });
  });

  it('should handle CLOSE_ORDER_MODAL', () => {
    const action = {type: 'CLOSE_ORDER_MODAL'};
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      openOrderModal: false,
      orderNumber: null,
    });
  });

  it('should return the current state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION_TYPE'};
    expect(orderReducer(initialState, action)).toEqual(initialState);
  });
});