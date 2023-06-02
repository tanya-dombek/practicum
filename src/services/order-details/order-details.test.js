import { orderDetailsReducer, initialState } from "./order-details-reducer";

describe('orderDetailsReducer', () => {
   const order = {
        _id: "647394ad8a4b62001c842441",
        ingredients: [
            "643d69a5c3f7b9001cfa093d",
            "643d69a5c3f7b9001cfa0943"
        ],
        owner: "644d80e445c6f2001be6ee7b",
        status: "done",
        name: "Space флюоресцентный бургер",
        createdAt: "2023-05-28T17:51:41.801Z",
        updatedAt: "2023-05-28T17:51:41.868Z",
        number: 5905,
        __v: 0
    }

  it('should return the initial state', () => {
    expect(orderDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle GET_ORDER_DETAILS_SUCCESS', () => {
    const action = { type: 'GET_ORDER_DETAILS_SUCCESS', orderDetails: order };
    expect(orderDetailsReducer(initialState, action)).toEqual({
        ...initialState,
        orderDetailsFailed: false,
        orderDetails: order
    });
  });

  it('should handle GET_ORDER_DETAILS_FAILED', () => {
    const action = { type: 'GET_ORDER_DETAILS_FAILED' };
    expect(orderDetailsReducer(initialState, action)).toEqual({
        ...initialState,
        orderDetailsFailed: true,
    });
  });

  it('should return the initial state for unknown action types', () => {
    const action = {type: 'UNKNOWN_ACTION'};

    expect(orderDetailsReducer(initialState, action)).toEqual(initialState);
  });
});