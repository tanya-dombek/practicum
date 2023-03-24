import React from 'react'
import styles from'./burger-contructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from "react-dnd";
import { useSelector, useDispatch, useMemo } from 'react-redux';
import { getSelectedBun, getSelectedIngredient, updateIngredientsConstructor} from '../../services/constructor/constructor-action';
import { INCREASE_COUNTER, DECREASE_COUNTER} from '../../services/ingredients/ingredients-action';
import IngredientsConstructorList from './ingredients-constructor';
 
function BurgerItemsList () {
    const dispatch = useDispatch();
    const selectedIngredients = useSelector(store => store.cart.selectedIngredients);
    const selectedBun = useSelector(store => store.cart.selectedBun);

    const addBun = (item) => {
        dispatch(getSelectedBun(item));
        dispatch({type: INCREASE_COUNTER, item})
        if (selectedBun._id) {
            dispatch({type: DECREASE_COUNTER, item: selectedBun})
        }
    }

    const addIngredient = (item) => {
        dispatch(getSelectedIngredient(item, selectedIngredients));
        dispatch({type: INCREASE_COUNTER, item})
    }

    const moveIngredient = (dragIndex, hoverIndex) => {
        dispatch(updateIngredientsConstructor(dragIndex, hoverIndex, selectedIngredients));
    }

    const [{isHover}, dropBunTarget] = useDrop({
        accept: "bun",
        drop(item) {
            addBun(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const [{isOver}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            addIngredient(item);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    });

    const [{isHoverBottom}, dropBunBottomTarget] = useDrop({
        accept: "bun",
        drop(item) {
          addBun(item);
        },
        collect: monitor => ({
          isHoverBottom: monitor.isOver(),
        })
      });
      
    const borderBunColor = isHover || isHoverBottom ? '#730dd3' : 'transparent';
    const borderIngredientColor = isOver ? '#730dd3' : 'transparent';

    return ( 
        <div className={`pb-10 ${styles.orderContainer} pr-4 ${styles.scrollBar} custom-scroll`}>
            <div ref={dropBunTarget} style={{borderColor: borderBunColor}} className={styles.borderBun}>
                {selectedBun.name ? (<ConstructorElement  type='top' isLocked={true} price={selectedBun.price} thumbnail={selectedBun.image_mobile}
                text={`${selectedBun.name} (верх)`}/>) :
                (<div className={styles.emptyIngredientContainer} style={{borderRadius: '88px 88px 40px 40px'}}>Выберите булки</div>)}
            </div>
            <div ref={dropTarget} style={{borderColor: borderIngredientColor}} className={styles.borderIngredient}>
                {selectedIngredients.length !== 0 ? selectedIngredients.map((item, index) => {
                    return (<IngredientsConstructorList item={item} key={item.key} moveIngredient={moveIngredient} id={item.key} index={index}/>)
                }) : (<div className={`${styles.emptyIngredientContainer} ml-10`} style={{borderRadius: '40px'}}>Выберите ингредиенты</div>)}
            </div>
            <div ref={dropBunBottomTarget} style={{borderColor: borderBunColor}} className={styles.borderBun}>
            {selectedBun.name ? (<ConstructorElement  type='bottom' isLocked={true} price={selectedBun.price} thumbnail={selectedBun.image_mobile}
                text={`${selectedBun.name} (низ)`}/>) :
                (<div className={styles.emptyIngredientContainer} style={{borderRadius: '40px 40px 88px 88px'}}>Выберите булки</div>)}
            </div>
        </div>
    );
}
 
export default BurgerItemsList ;