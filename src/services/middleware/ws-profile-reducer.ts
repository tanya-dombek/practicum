import { ORDERS_PROFILE_SUCCESS, ORDERS_PROFILE_ERROR, ORDERS_PROFILE_DISCONNECT, WS_GET_PROFILE_ORDERS, ORDERS_PROFILE_CONNECT, ORDERS_PROFILE_CLOSE } from './ws-action';
  import { TWSProfileOrdersActions } from './ws-action';
  import { TFeedOrdersData } from '../../types/feed-orders-types';
  
  type TWSState = {
    status: string;
    profileOrders: TFeedOrdersData | null;
    error?: string;
  }
  
  export const initialState: TWSState = {
    status: 'OFFLINE',
    profileOrders: null,
    error: ''
  };
  
  export const wsProfileReducer = (state = initialState, action: TWSProfileOrdersActions) => {    
    switch (action.type) {
        case ORDERS_PROFILE_CONNECT:
        return {
            ...state,
            status: 'CONNECTING...'
        };

        case ORDERS_PROFILE_SUCCESS:
            return {
            ...state,
            error: '',
            status: 'ONLINE'
        };

        case ORDERS_PROFILE_CLOSE:
            return {
            ...state,
            status: 'OFFLINE'
        };
  
        case ORDERS_PROFILE_ERROR:
            return {
            ...state,
            error: action.error,
        };
    
        case ORDERS_PROFILE_DISCONNECT:
            return {
            ...state,
            status: 'DISCONNECTED',
            profileOrders: null
        };
    
        case WS_GET_PROFILE_ORDERS:
            return {
            ...state,
            profileOrders: action.orders
        };
    
        default:
            return state;
        }
  };