import React, {FC, useEffect, useState} from 'react';
import styles from './order-cards.module.css';
import { IngredientsIllustrations } from './ingredients-illustrations';
import { useSelector } from '../../types/types';
import { TOrder } from '../../types/feed-orders-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderCard = {
    order: TOrder;
    profile: boolean;
};

export const OrderCard: FC<TOrderCard> = ({order, profile}) => {
    
    const [statusInfo, setStatusInfo] = useState<{ status: string; color: string }>({
        status: '',
        color: '#F2F2F3',
      });

    
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    
    const images = order.ingredients.map((id) => {
        const ingredient = ingredients.find((item) => item._id === id);
        return ingredient ? ingredient.image_mobile : '';
    });

    const price = order.ingredients.map((id) => {
        const ingredient = ingredients.find((item) => item._id === id);
        return ingredient ? ingredient.price : 0;
    }).reduce((a, b) => a + b);
    
    const date = new Date(order.createdAt).toLocaleString();

    useEffect(() => {
        switch (order?.status) {
          case 'done':
            setStatusInfo({ status: 'Выполнен', color: '#00CCCC' });
            break;
          case 'pending':
            setStatusInfo({ status: 'Готовится', color: '#F2F2F3' });
            break;
          case 'created':
            setStatusInfo({ status: 'Создан', color: '#F2F2F3' });
            break;
          default:
            break;
        }
      }, [order]);

    if (images.includes('')) {
        return null;
    }
    
  return ( 
    <div className={statusInfo ? styles.cardContainer : styles.emptyCardContainer}>
        <div className={styles.idAndDate}>
            <span className='text_type_digits-default'>{`#${order.number}`}</span>
            <span className='text_type_main-default text_color_inactive'>{date}</span>
        </div>
        <span className={`${styles.cardTitle} text_type_main-medium`}>{order.name}</span>
        {statusInfo && profile && (
                <p style={{ color: statusInfo.color }} className='text_type_main-default'>{statusInfo.status}</p>
            )}
        <div className={styles.ingredientsImg}>
            <IngredientsIllustrations images={images}/>
            <div className={styles.priceIcon}>
              <p className='text_type_digits-default'>{price}</p>
              <CurrencyIcon type="primary" />
            </div>
        </div>
    </div>
);
}