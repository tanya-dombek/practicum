import React, {useState, useEffect} from 'react'
import styles from'./burger-contructor.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal-components/modal';
import OrderDetails from './order-details'

 
function ComponentsInfo () {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

    return ( 
        <div className={`${styles.priceOrderContainer} pr-4`}>
            <div className={`pr-10 ${styles.priceIconContainer}`}>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={toggleModal}>
                Оформить заказ
            </Button>
            {isOpen && (<Modal open = {isOpen} onClose={toggleModal} title=''>
                <OrderDetails/>
            </Modal>)}
        </div>
    );
    
}
 
export default ComponentsInfo ;