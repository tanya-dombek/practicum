import type { Middleware} from 'redux';
import { TWSActionTypes, TWSProfileActionTypes } from '../../types/feed-orders-types'; 
import { RootState } from '../root-reducer';

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware<{}, RootState> => {
    return (store => {
      let socket: WebSocket | null = null;
  
      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const { wsConnect, wsDisconnect, onOpen, onClose, onError, onFeedOrders } = wsActions;
                
        if (type === wsConnect) {
          socket = new WebSocket(action.url);
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


  export const socketMiddleware2 = (wsActions: TWSProfileActionTypes): Middleware<{}, RootState> => {
    return (store => {
      let socket: WebSocket | null = null;
      
  
      return next => action => {
        const { dispatch } = store;
        const { type } = action;
        const { wsConnect, wsDisconnect, onOpen, onClose, onError, onProfileOrders } = wsActions;
        
        if (type === wsConnect) {
          const accessToken = localStorage.getItem("accessToken");
          const token = accessToken?.replace('Bearer ', '');

          socket = new WebSocket(`${action.url}?token=${token}`);
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
  
            dispatch({ type: onProfileOrders, orders: parsedData });
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