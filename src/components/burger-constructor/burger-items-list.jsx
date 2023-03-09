import React, {Component} from 'react'
import './burger-contructor.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {data} from '../../utils/data';
import {normalaizedData} from './order-data';

const orderData = normalaizedData(data);
 
function BurgerItemsList () {
    return ( 
        <div className='pb-10 orderContainer pr-4 scrollBar custom-scroll'>
            {orderData.map((item, index) => {
                let addIcon;
                if (!item.isLocked) {
                    addIcon = <DragIcon type="primary" />
                }
                return <div className='ingredientIconContainer'>
                    {addIcon}
                    <ConstructorElement
                        type={item.type==='top' ? 'top' : item.type==='bottom' ? 'bottom' : undefined}
                        isLocked={item.isLocked}
                        text={item.text}
                        price={item.price}
                        thumbnail={item.thumbnail}
                        key={index}
                    />
                </div>
            })}
        </div>
        );
}
 
export default BurgerItemsList ;