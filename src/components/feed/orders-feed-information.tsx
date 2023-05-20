import React, {FC} from 'react';
import styles from './orders-feed.module.css'

type TOrdersFeedInfo = {
  total: number;
  totalToday: number;
  readyOrders: number[] | null;
  inprogressOrders: number[] | null;
}

export const OrdersFeedInfo: FC<TOrdersFeedInfo> = ({total, totalToday, readyOrders, inprogressOrders}) => {

  return ( 
    <div>
      <div className={styles.statusContainer}>
        <div>
          <p className={`${styles.orderHeader} text_type_main-medium`}>Готовы:</p>
          <div className={styles.columnsContainer}>
            {[0, 1, 2, 3, 4].map((column) => (
              <div key={column}>
                {readyOrders?.map((number, index) => {
                  if (index >= column * 10 && index < (column + 1) * 10) {
                    return <p className={`${styles.readyOrder} text_type_digits-default`} key={index}>{number}</p>;
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className={`${styles.orderHeader} text_type_main-medium`}>В работе:</p>
          <div className={styles.columnsContainer}>
            {[0, 1, 2, 3, 4].map((column) => (
              <div key={column}>
                {inprogressOrders?.map((number, index) => {
                  if (index >= column * 10 && index < (column + 1) * 10) {
                    return <p className={`${styles.pendingOrder} text_type_digits-default`} key={index}>{number}</p>;
                  }
                  return null;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className={`${styles.zeroMargin} text_type_main-medium`}>Выполнено за все время:</p>
      <p className="text text_type_digits-large mb-15">{total}</p>
      <p className={`${styles.zeroMargin} text_type_main-medium`}>Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">{totalToday}</p>
    </div>
);
}