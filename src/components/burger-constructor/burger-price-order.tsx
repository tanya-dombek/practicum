import React, {useMemo, useState} from 'react'
import styles from'./burger-contructor.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal-components/modal';
import OrderDetails from './order-details'
import { useDispatch, useSelector } from '../../types/types';
import { getOrderData, CLOSE_ORDER_MODAL } from '../../services/order/order-action';
import {RESET_CONSTRUCTOR} from '../../services/constructor/constructor-action';
import {RESET_COUNTER} from '../../services/ingredients/ingredients-action';
import { useNavigate  } from 'react-router-dom';
import { TIngredientData, TUserType } from '../../types/types';

const ComponentsInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user: TUserType | null = useSelector(store => store.user.user)
    const {selectedIngredients, selectedBun}: { selectedIngredients: TIngredientData[], selectedBun: TIngredientData | null } = useSelector(store => store.cart);
        
    const [isOpen, setIsOpen] = useState(false);

    const totalPrice = useMemo(() => {
        return selectedIngredients.reduce((acc: number, item: TIngredientData) => acc + item.price, 0) + (selectedBun ? (selectedBun.price*2) : 0);
    }, [selectedIngredients, selectedBun]);

    const orderIdArray = (bun: TIngredientData | null, ingredients: TIngredientData[]) => {
        let idArray: string[] = [];
        if (bun) {
            idArray.unshift(bun._id);
        }
        ingredients.forEach((item: TIngredientData) => {
            idArray.push(item._id);
        })
        if (bun) {
            idArray.push(bun._id);
        }
        return idArray
    }

    const openModal = () => {
        if (!user) {
            navigate('/login');
          } else {
            setIsOpen(true);
            dispatch(getOrderData(orderIdArray(selectedBun, selectedIngredients)))
          }
    };

    const closeModal = () => {
        setIsOpen(false);
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
            <Button htmlType="button" type="primary" size="medium" onClick={openModal} disabled={selectedIngredients.length===0 || !selectedBun} data-testid='create-order-btn'>
                Оформить заказ
            </Button>
            {isOpen && (<Modal onClose={closeModal} title=''>
                <OrderDetails/>
            </Modal>)}
        </div>
    );
    
}
 
export default ComponentsInfo ;