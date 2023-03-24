import React from 'react'
import styles from'./burger-contructor.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal-components/modal';
import OrderDetails from './order-details'
import { useSelector, useDispatch } from 'react-redux';
import { OPEN_ORDER_MODAL, getOrderData } from '../../services/order/order-action';

 
function ComponentsInfo () {
    const dispatch = useDispatch();
    const { selectedIngredients, selectedBun } = useSelector(store => store.cart);
    const totalPrice = selectedIngredients.reduce((acc, item) => acc + item.price, 0) + (selectedBun.price ? (selectedBun.price*2) : 0);
    const isOpen = useSelector(store => store.order.openOrderModal);

    const orderIdArray = (bun, ingredients) => {
        let idArray = [];
        idArray.unshift(bun._id);
        ingredients.forEach(item => {
            idArray.push(item._id);
        })
        idArray.push(bun._id);
        return idArray
    }

    const toggleModal = () => {
        dispatch(getOrderData(orderIdArray(selectedBun, selectedIngredients)))
        dispatch({type: OPEN_ORDER_MODAL})
    };

    return ( 
        <div className={`${styles.priceOrderContainer} pr-4`}>
            <div className={`pr-10 ${styles.priceIconContainer}`}>
                <p className="text text_type_digits-medium">{totalPrice}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={toggleModal} disabled={selectedIngredients.length===0 && !selectedBun.price}>
                Оформить заказ
            </Button>
            {isOpen && (<Modal open = {isOpen} onClose={toggleModal} title=''>
                <OrderDetails/>
            </Modal>)}
        </div>
    );
    
}
 
export default ComponentsInfo ;