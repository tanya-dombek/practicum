import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/root-reducer';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { ORDERS_FEED_CONNECT as connect, ORDERS_FEED_DISCONNECT as disconnect,
  ORDERS_FEED_SUCCESS as wsOpen, ORDERS_FEED_CLOSE as wsClose, ORDERS_FEED_ERROR as wsError,
  WS_GET_FEED_ORDERS as wsFeedOrders } from '././services/middleware/ws-action';
  import {ORDERS_PROFILE_SUCCESS, ORDERS_PROFILE_ERROR, ORDERS_PROFILE_DISCONNECT, WS_GET_PROFILE_ORDERS, ORDERS_PROFILE_CONNECT, ORDERS_PROFILE_CLOSE} from '././services/middleware/ws-action';
  import { socketMiddleware, socketMiddleware2 } from './services/middleware/socket-middleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const feedOrdersMiddleware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onFeedOrders: wsFeedOrders,
})

const feedOrdersMiddleware2 = socketMiddleware2({
  wsConnect: ORDERS_PROFILE_CONNECT,
  wsDisconnect: ORDERS_PROFILE_DISCONNECT,
  onOpen: ORDERS_PROFILE_SUCCESS,
  onClose: ORDERS_PROFILE_CLOSE,
  onError: ORDERS_PROFILE_ERROR,
  onProfileOrders: WS_GET_PROFILE_ORDERS,
})

const enhancer = composeEnhancers(applyMiddleware(thunk, feedOrdersMiddleware, feedOrdersMiddleware2));
const store = createStore(rootReducer, enhancer);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  );
};
