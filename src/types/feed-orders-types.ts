import { ORDERS_FEED_CLOSE, ORDERS_FEED_CONNECT, ORDERS_FEED_DISCONNECT, ORDERS_FEED_ERROR, ORDERS_FEED_SUCCESS, WS_GET_FEED_ORDERS,
  ORDERS_PROFILE_SUCCESS, ORDERS_PROFILE_ERROR, ORDERS_PROFILE_DISCONNECT, WS_GET_PROFILE_ORDERS, ORDERS_PROFILE_CONNECT, ORDERS_PROFILE_CLOSE } from "../services/middleware/ws-action";

export type TWSActionTypes = {
    wsConnect: string,
    wsDisconnect: string,
    onOpen: string,
    onClose: string,
    onError: string,
    onFeedOrders: string,
};

export type TOrder = {
    ingredients: string[];
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export type TFeedOrdersData = {
  orders: Array<TOrder>;
  success: boolean;
  total: number;
  totalToday: number;
}
  