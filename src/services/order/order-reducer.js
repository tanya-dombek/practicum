import { POST_ORDER_FAILED, POST_ORDER_SUCCESS, CLOSE_ORDER_MODAL } from "./order-action";

const initialState = {
    orderNumber: null,
    orderFailed: false,
    openOrderModal: false,
  };

  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_ORDER_SUCCESS: {
        return { ...state, orderFailed: false, orderNumber: action.orderNumber, openOrderModal: action.orderNumber ? true : false};
      }
      case POST_ORDER_FAILED: {
        return { ...state, orderFailed: true };
      }
      case CLOSE_ORDER_MODAL: {
        return {
          ...state,
          openOrderModal: false,
          orderNumber: null
        };
      }
      default: {
        return state;
      }
    }
};