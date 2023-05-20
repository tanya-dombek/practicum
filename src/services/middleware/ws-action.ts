import { TFeedOrdersData } from "../../types/feed-orders-types";
export const ORDERS_FEED_CONNECT: 'ORDERS_FEED_CONNECT' = 'ORDERS_FEED_CONNECT';
export const ORDERS_FEED_CLOSE: 'ORDERS_FEED_CLOSE' = 'ORDERS_FEED_CLOSE';
export const ORDERS_FEED_SUCCESS: 'ORDERS_FEED_SUCCESS' = 'ORDERS_FEED_SUCCESS';
export const ORDERS_FEED_ERROR: 'ORDERS_FEED_ERROR' = 'ORDERS_FEED_ERROR';
export const ORDERS_FEED_DISCONNECT: 'ORDERS_FEED_DISCONNECT' = 'ORDERS_FEED_DISCONNECT';
export const WS_GET_FEED_ORDERS: 'WS_GET_FEED_ORDERS' = 'WS_GET_FEED_ORDERS';

export const ORDERS_PROFILE_CONNECT: 'ORDERS_PROFILE_CONNECT' = 'ORDERS_PROFILE_CONNECT';
export const ORDERS_PROFILE_CLOSE: 'ORDERS_PROFILE_CLOSE' = 'ORDERS_PROFILE_CLOSE';
export const ORDERS_PROFILE_SUCCESS: 'ORDERS_PROFILE_SUCCESS' = 'ORDERS_PROFILE_SUCCESS';
export const ORDERS_PROFILE_ERROR: 'ORDERS_PROFILE_ERROR' = 'ORDERS_PROFILE_ERROR';
export const ORDERS_PROFILE_DISCONNECT: 'ORDERS_PROFILE_DISCONNECT' = 'ORDERS_PROFILE_DISCONNECT';
export const WS_GET_PROFILE_ORDERS: 'WS_GET_PROFILE_ORDERS' = 'WS_GET_PROFILE_ORDERS';

export type TWSFeedOrdersActions =
  | { type: typeof ORDERS_FEED_CONNECT, url: string }
  | { type: typeof ORDERS_FEED_CLOSE }
  | { type: typeof ORDERS_FEED_ERROR, error?: string }
  | { type: typeof ORDERS_FEED_SUCCESS }
  | { type: typeof ORDERS_FEED_DISCONNECT }
  | { type: typeof WS_GET_FEED_ORDERS, orders: TFeedOrdersData | null };

export type TWSProfileOrdersActions =
| { type: typeof ORDERS_PROFILE_CONNECT, url: string }
| { type: typeof ORDERS_PROFILE_CLOSE }
| { type: typeof ORDERS_PROFILE_ERROR, error?: string }
| { type: typeof ORDERS_PROFILE_SUCCESS }
| { type: typeof ORDERS_PROFILE_DISCONNECT }
| { type: typeof WS_GET_PROFILE_ORDERS, orders: TFeedOrdersData | null };