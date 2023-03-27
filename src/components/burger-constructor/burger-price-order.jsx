import React, {useMemo} from 'react'
import styles from'./burger-contructor.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal-components/modal';
import OrderDetails from './order-details'
import { useSelector, useDispatch } from 'react-redux';
import { getOrderData, CLOSE_ORDER_MODAL } from '../../services/order/order-action';
import {RESET_CONSTRUCTOR} from '../../services/constructor/constructor-action';
import {RESET_COUNTER} from '../../services/ingredients/ingredients-action';

 
function ComponentsInfo () {
    const dispatch = useDispatch();
    const { selectedIngredients, selectedBun } = useSelector(store => store.cart);
    const isOpen = useSelector(store => store.order.openOrderModal);

    const totalPrice = useMemo(() => {
        return selectedIngredients.reduce((acc, item) => acc + item.price, 0) + (selectedBun ? (selectedBun.price*2) : 0);
    }, [selectedIngredients, selectedBun]);

    const orderIdArray = (bun, ingredients) => {
        let idArray = [];
        idArray.unshift(bun._id);
        ingredients.forEach(item => {
            idArray.push(item._id);
        })
        idArray.push(bun._id);
        return idArray
    }

    const openModal = () => {
        dispatch(getOrderData(orderIdArray(selectedBun, selectedIngredients)))
    };

    const closeModal = () => {
        dispatch({type: CLOSE_ORDER_MODAL});
        dispatch({type: RESET_CONSTRUCTOR});
        dispatch({type: RESET_COUNTER});
    };

    return ( 
        <div className={`${styles.priceOrderContainer} pr-4`}>
            <div className={`pr-10 ${styles.priceIconContainer}`}>
                <p className="text text_type_digits-medium">{totalPrice}</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={openModal} disabled={selectedIngredients.length===0 || !selectedBun}>
                Оформить заказ
            </Button>
            {isOpen && (<Modal open = {isOpen} onClose={closeModal} title=''>
                <OrderDetails/>
            </Modal>)}
        </div>
    );
    
}
 
export default ComponentsInfo ;