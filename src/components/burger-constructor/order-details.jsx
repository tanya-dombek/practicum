import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import { ReactComponent as CheckMarkIcon } from '../../utils/success-icon.svg'
import styles from'./burger-contructor.module.css'

 
function OrderDetails () {
    return ( 
        <div className={styles.modalItems}>
            <p className={`text text_type_digits-large ${styles.orderNumder}`}>034536</p>
            <p className="text text_type_main-medium pb-15 pt-8">идентификатор заказа</p>
            <CheckMarkIcon />
            <p className="text text_type_main-small pt-15 pb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    );
    
}
 
export default OrderDetails ;