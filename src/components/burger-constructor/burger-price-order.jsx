import React, {useState, useEffect} from 'react'
import './burger-contructor.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal_components/modal';
import OrderDetails from './order-details'

 
function ComponentsInfo () {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };
      const orderNumber = 34536;

    return ( 
        <div className='priceOrderContainer pr-4'>
            <div className='pr-10 priceIconContainer'>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="medium" onClick={toggleModal}>
                Оформить заказ
            </Button>
            {isOpen && <Modal open = {isOpen} onClose={toggleModal} title=''>
                <OrderDetails orderNumber={orderNumber}/>
            </Modal>}
        </div>
        );
    
}
 
export default ComponentsInfo ;