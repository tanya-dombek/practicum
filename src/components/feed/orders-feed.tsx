import React, {FC} from 'react';
import styles from './orders-feed.module.css'
import { OrderCard } from '../order-cards/order-card';
import { TOrder } from '../../types/feed-orders-types';
import { Link, useLocation } from 'react-router-dom';

type TOrderFeed = {
  orders: Array<TOrder>;
  profile: boolean;
};

export const OrdersFeed: FC<TOrderFeed> = ({orders, profile}) => {
  let location = useLocation();
  
  return ( 
    <div className={styles.feedContainer}>
        {!profile && <p className={`text text_type_main-large ${styles.mainP} pt-10 pb-5`}>Лента заказов</p>}
        {orders && orders.length !== 0 ? (
          <ul className={`${styles.scrollBar} custom-scroll ${styles.ulContainer}`}>
            {orders.map((order) => (
                <li key={order.number}>
                  <Link key={order._id} to={profile ? `/profile/orders/${order.number}` : `/feed/${order.number}`} state={{ background: location }} className={styles.ingredientsLink}>
                    <OrderCard key={order._id} order={order} profile={profile}/>
                  </Link>
                </li>
              ))}
          </ul>
          ) : (
            <div className={styles.cardContainer}>
              <span className={`${styles.cardTitle} text_type_main-medium`}>{'Заказов пока нет'}</span>
            </div>
          )
        }
    </div>
);
}