import React from 'react'
import { ReactComponent as CheckMarkIcon } from '../../utils/success-icon.svg'
import styles from'./burger-contructor.module.css'
import { useSelector } from '../../types/types';
 
function OrderDetails () {
    const orderNumber: number | null = useSelector(store => store.order.orderNumber);

    return ( 
        orderNumber ? (
            <div className={styles.modalItems}>
            <p className={`text text_type_digits-large ${styles.orderNumder}`} data-testid='order-number'>{orderNumber}</p>
            <p className="text text_type_main-medium pb-15 pt-8">идентификатор заказа</p>
            <CheckMarkIcon />
            <p className="text text_type_main-small pt-15 pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>) : (
            <div className={styles.modalItems}>
                <p className="text text_type_main-medium p-8">Создание заказа ...</p>
            </div>
        )
    );
    
}
 
export default OrderDetails ;