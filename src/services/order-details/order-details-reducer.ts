import { GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_FAILED, TOrderDetailsAction } from './order-details-action';
import { TOrder } from '../../types/feed-orders-types';

type TInitialState = {
  orderDetails: TOrder | null;
  orderDetailsFailed: boolean;
}

const initialState: TInitialState = {
    orderDetails: null,
    orderDetailsFailed: false,
  };

  export const orderDetailsReducer = (state = initialState, action: TOrderDetailsAction): TInitialState => {
    switch (action.type) {
      case GET_ORDER_DETAILS_SUCCESS: {
        return { ...state, orderDetailsFailed: false, orderDetails: action.orderDetails };
      }
      case GET_ORDER_DETAILS_FAILED: {
        return { ...state, orderDetailsFailed: true };
      }
      default: {
        return state;
      }
    }
};