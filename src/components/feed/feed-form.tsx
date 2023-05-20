import React, { useEffect } from 'react';
import styles from './orders-feed.module.css'
import { OrdersFeed } from './orders-feed';
import { OrdersFeedInfo } from './orders-feed-information';
import { useDispatch, useSelector } from '../../types/types';
import { ORDERS_FEED_CONNECT, ORDERS_FEED_DISCONNECT } from '../../services/middleware/ws-action';
import { useLocation } from 'react-router-dom';

export const FEED_ORDERS_SERVER_URL = 'wss://norma.nomoreparties.space/orders/all';

export function FeedForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const ordersFeed = useSelector(store => store.feedOrders.feedOrders);  
  
  const readyOrders = ordersFeed ? ordersFeed.orders
    .filter(order => order.status === 'done')
    .map(order => order.number)
    : null;

  const inprogressOrders = ordersFeed ? ordersFeed.orders
    .filter(order => order.status === 'pending')
    .map(order => order.number)
    : null;  
  
    useEffect(() => { 
      dispatch({ type: ORDERS_FEED_CONNECT, url: FEED_ORDERS_SERVER_URL });
  
      return () => {
        if (location.pathname === '/feed') {
          dispatch({ type: ORDERS_FEED_DISCONNECT });
        }
      };
    }, [dispatch, location.pathname]);
  
  return ( 
    <main className={styles.feedGroupe}>
      {ordersFeed && (
        <>
          <OrdersFeed orders={ordersFeed.orders} profile={false}/>
          <OrdersFeedInfo total={ordersFeed.total} totalToday={ordersFeed.totalToday} readyOrders={readyOrders} inprogressOrders={inprogressOrders}/>
        </>
      )}
    </main>
);
}