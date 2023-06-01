
  import { ORDERS_FEED_SUCCESS, ORDERS_FEED_ERROR, ORDERS_FEED_DISCONNECT, WS_GET_FEED_ORDERS, ORDERS_FEED_CONNECT, ORDERS_FEED_CLOSE } from './ws-action';
  import { TWSFeedOrdersActions } from './ws-action';
  import { TFeedOrdersData } from '../../types/feed-orders-types';
  
  type TWSState = {
    status: string;
    feedOrders: TFeedOrdersData | null;
    error?: string;
  }
  
  export const initialState: TWSState = {
    status: 'OFFLINE',
    feedOrders: null,
    error: ''
  };
  
  export const wsFeedReducer = (state = initialState, action: TWSFeedOrdersActions) => {    
    switch (action.type) {
        case ORDERS_FEED_CONNECT:
        return {
            ...state,
            status: 'CONNECTING...'
        };

        case ORDERS_FEED_SUCCESS:
            return {
            ...state,
            error: '',
            status: 'ONLINE'
        };

        case ORDERS_FEED_CLOSE:
            return {
            ...state,
            status: 'OFFLINE'
        };
  
        case ORDERS_FEED_ERROR:
            return {
            ...state,
            error: action.error,
        };
    
        case ORDERS_FEED_DISCONNECT:
            return {
            ...state,
            status: 'DISCONNECTED',
            feedOrders: null
        };
    
        case WS_GET_FEED_ORDERS:
            return {
            ...state,
            feedOrders: action.orders
        };
    
        default:
            return state;
        }
  };