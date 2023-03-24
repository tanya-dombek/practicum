import { POST_ORDER_FAILED, POST_ORDER_REQUEST, POST_ORDER_SUCCESS, OPEN_ORDER_MODAL } from "./order-action";

const initialState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
    openOrderModal: false,
  };

  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true
        };
      }
      case POST_ORDER_SUCCESS: {
        return { ...state, orderFailed: false, orderNumber: action.orderNumber, orderRequest: false };
      }
      case POST_ORDER_FAILED: {
        return { ...state, orderFailed: true, orderRequest: false };
      }
      case OPEN_ORDER_MODAL: {
        return {
          ...state,
          openOrderModal: !state.openOrderModal
        };
      }
      default: {
        return state;
      }
    }
};