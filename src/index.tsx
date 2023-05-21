import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/root-reducer';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { ORDERS_FEED_CONNECT, ORDERS_FEED_DISCONNECT, ORDERS_FEED_SUCCESS, ORDERS_FEED_CLOSE, ORDERS_FEED_ERROR, WS_GET_FEED_ORDERS } from '././services/middleware/ws-action';
import {ORDERS_PROFILE_SUCCESS, ORDERS_PROFILE_ERROR, ORDERS_PROFILE_DISCONNECT, WS_GET_PROFILE_ORDERS, ORDERS_PROFILE_CONNECT, ORDERS_PROFILE_CLOSE} from '././services/middleware/ws-action';
import { socketMiddleware } from './services/middleware/socket-middleware';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const feedOrdersMiddleware = socketMiddleware({
  wsConnect: ORDERS_FEED_CONNECT,
  wsDisconnect: ORDERS_FEED_DISCONNECT,
  onOpen: ORDERS_FEED_SUCCESS,
  onClose: ORDERS_FEED_CLOSE,
  onError: ORDERS_FEED_ERROR,
  onFeedOrders: WS_GET_FEED_ORDERS,
})

const profileFeedOrdersMiddleware = socketMiddleware({
  wsConnect: ORDERS_PROFILE_CONNECT,
  wsDisconnect: ORDERS_PROFILE_DISCONNECT,
  onOpen: ORDERS_PROFILE_SUCCESS,
  onClose: ORDERS_PROFILE_CLOSE,
  onError: ORDERS_PROFILE_ERROR,
  onFeedOrders: WS_GET_PROFILE_ORDERS,
})

const enhancer = composeEnhancers(applyMiddleware(thunk, feedOrdersMiddleware, profileFeedOrdersMiddleware));
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
