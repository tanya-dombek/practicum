import type { Middleware} from 'redux';
import { TWSActionTypes } from '../../types/feed-orders-types'; 
import { RootState } from '../root-reducer';
import { ORDERS_PROFILE_CONNECT } from './ws-action';

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware<{}, RootState> => {
    return (store => {
      let socket: WebSocket | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const { wsConnect, wsDisconnect, onOpen, onClose, onError, onFeedOrders } = wsActions;
        
        if (type === wsConnect) {
          let url = action.url;
    
          if (type === ORDERS_PROFILE_CONNECT) {
            const accessToken = localStorage.getItem("accessToken");
            const token = accessToken?.replace('Bearer ', '');
            url += `?token=${token}`;
          }
    
          socket = new WebSocket(url);
        }
        
        if (socket) {
          
          socket.onopen = event => {
            dispatch({ type: onOpen });
            next(action);
          };
          
          socket.onerror = event => {
            dispatch({ type: onError, error: 'error' });
          };
          
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
  
            dispatch({ type: onFeedOrders, orders: parsedData });
          };          
  
          socket.onclose = event => {
            dispatch({ type: onClose });
          };
                    
          if (type === wsDisconnect) {
            socket.close();
            socket = null;
          }
        }
  
        next(action);
      };
    }) as Middleware;
  };