import React, {useEffect, useMemo} from 'react'
import styles from './orders-feed.module.css'
import { useDispatch, useSelector } from '../../types/types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../../services/order-details/order-details-action';

export const OrderFeedDetails = () => {
    const dispatch = useDispatch();
    let { number } = useParams();

    const orderInfo = useSelector((store) => store.orderDetails.orderDetails);
    const ingredients = useSelector((store) => store.ingredients.ingredients);
    
    const price = orderInfo?.ingredients.map((id) => {
        const ingredient = ingredients.find((item) => item._id === id);
        return ingredient ? ingredient.price : 0;
    }).reduce((a, b) => a + b);
    
    const usedIngredients = orderInfo?.ingredients.map(id => ingredients.find(item => item._id === id));
    
    const date = orderInfo ? new Date(orderInfo.createdAt).toLocaleString() : '';
    const seenBuns: Record<string, boolean> = {};

    if (usedIngredients) {
        for (let i = 0; i < usedIngredients.length; i++) {
            const item = usedIngredients[i];
      
            if (item && item.type === 'bun') {
                if (seenBuns[item.name]) {
                    usedIngredients.splice(i, 1);
                    i--;
                } else {
                    seenBuns[item.name] = true;
                }
            }
        }
    }
    
    useEffect(() => {   
        dispatch(getOrderDetails(number));
    }, [dispatch, number]);

    const statusInfo = useMemo(() => {
        switch (orderInfo?.status) {
          case 'done':
            return { status: 'Выполнен', color: '#00CCCC' };
          case 'pending':
            return { status: 'Готовится', color: '#F2F2F3' };
          case 'created':
            return { status: 'Создан', color: '#F2F2F3' };
          default:
            return { status: '', color: '#F2F2F3' };
        }
      }, [orderInfo]);
      
    return ( 
        orderInfo && (<div className={styles.modalItems}>
            <div className={styles.numberAndName}>
                <span className='text_type_digits-default'>{`#${orderInfo.number}`}</span>
                <span className={`${styles.cardTitle} text text_type_main-medium`}>{orderInfo.name}</span>
            </div>
            {statusInfo && (
                <p style={{ color: statusInfo.color }} className='text_type_main-default mb-15 mt-3'>{statusInfo.status}</p>
            )}
            <p className='text text_type_main-medium'>{'Состав:'}</p>
            <div className={`${styles.modalScrollBar} ${styles.displayGrid} custom-scroll mt-6`}>
                {usedIngredients && (usedIngredients.map((ingredient, index) => (
                    <div className={styles.bigModalContainer} key={index}>
                        <div className={styles.smallModalContainer}>
                            <img srcSet={ingredient?.image_mobile}  className={styles.ingredientsIlustration} alt={'ingredient'} />
                            <p className={`${styles.maxNameWidth} text text_type_main-default`}>{ingredient?.name}</p>
                        </div>
                        <div className={styles.smallModalContainer}>
                            <span className='text_type_digits-default'>{ingredient ? ingredient.type === 'bun'? `2 x ${ingredient.price}` : `1 x ${ingredient.price}` : ''}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                )))}
            </div>
            <div className={`${styles.bigModalContainer} mt-10`}>
                <span className='text_type_main-default text_color_inactive'>{date}</span>
                <div className={styles.smallModalContainer}>
                    <span className='text_type_digits-default'>{price}</span>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>)
    )
}