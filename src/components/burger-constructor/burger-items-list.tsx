import React, {FC} from 'react'
import styles from'./burger-contructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';
import { getSelectedBun, getSelectedIngredient, updateIngredientsConstructor} from '../../services/constructor/constructor-action';
import { INCREASE_COUNTER, DECREASE_COUNTER} from '../../services/ingredients/ingredients-action';
import IngredientsConstructorList from './ingredients-constructor';
import { RootState } from '../../services/root-reducer';
import { TIngredientData } from '../../types/types';
 
const BurgerItemsList = () => {
    const dispatch = useDispatch();
    const {selectedIngredients, selectedBun}: { selectedIngredients: TIngredientData[], selectedBun: TIngredientData } = useSelector((store: RootState) => store.cart);

    const addBun = (item: TIngredientData) => {
        dispatch(getSelectedBun(item));
        dispatch({type: INCREASE_COUNTER, item})
        if (selectedBun) {
            dispatch({type: DECREASE_COUNTER, item: selectedBun})
        }
    }

    const addIngredient = (item: TIngredientData) => {
        dispatch(getSelectedIngredient(item));
        dispatch({type: INCREASE_COUNTER, item})
    }

    const moveIngredient = (dragIndex: number, hoverIndex: number) => {
        dispatch(updateIngredientsConstructor(dragIndex, hoverIndex));
    }

    const [{isHover}, dropBunTarget] = useDrop({
        accept: "bun",
        drop(item: TIngredientData) {
            addBun(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const [{isOver}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: TIngredientData) {
            addIngredient(item);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    });

    const [{isHoverBottom}, dropBunBottomTarget] = useDrop({
        accept: "bun",
        drop(item: TIngredientData) {
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
                {selectedBun ? (<ConstructorElement  type='top' isLocked={true} price={selectedBun.price} thumbnail={selectedBun.image_mobile}
                text={`${selectedBun.name} (верх)`}/>) :
                (<div className={`${styles.emptyIngredientContainer} ${styles.emptyTopContainer}`}>Выберите булки</div>)}
            </div>
            <div ref={dropTarget} style={{borderColor: borderIngredientColor}} className={styles.borderIngredient}>
                {selectedIngredients.length !== 0 ? selectedIngredients.map((item: TIngredientData, index: number) => {
                    return (<IngredientsConstructorList item={item} key={item.key} moveIngredient={moveIngredient} id={item.key} index={index}/>)
                }) : (<div className={`${styles.emptyIngredientContainer} ${styles.emptyMiddleContainer} ml-10`}>Выберите ингредиенты</div>)}
            </div>
            <div ref={dropBunBottomTarget} style={{borderColor: borderBunColor}} className={styles.borderBun}>
            {selectedBun ? (<ConstructorElement  type='bottom' isLocked={true} price={selectedBun.price} thumbnail={selectedBun.image_mobile}
                text={`${selectedBun.name} (низ)`}/>) :
                (<div className={`${styles.emptyIngredientContainer} ${styles.emptyBottomContainer}`}>Выберите булки</div>)}
            </div>
        </div>
    );
}
 
export default BurgerItemsList ;