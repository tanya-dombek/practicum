import { POST_ORDER_FAILED, POST_ORDER_SUCCESS, CLOSE_ORDER_MODAL, TOrderAction } from "./order-action";

type TInitialState = {
  orderNumber: number | null;
  orderFailed: boolean;
  openOrderModal: boolean;
}

const initialState: TInitialState = {
    orderNumber: null,
    orderFailed: false,
    openOrderModal: false,
  };

  export const orderReducer = (state = initialState, action: TOrderAction): TInitialState => {
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