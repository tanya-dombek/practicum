import React, {FC} from 'react'
import styles from './burger-ingredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from "react-dnd";
import { TIngredientData } from '../../types/types';

type TIngredientsComponentType = {
    ingredientData: TIngredientData[];
    onToggleModal: (item: TIngredientData) => void;
  }

const IngredientsComponent: FC<TIngredientsComponentType> = ({ingredientData, onToggleModal}) => {
    const ingredient: TIngredientData = ingredientData[0];

    const [{}, dragRef]: any = useDrag({
        type: ingredient.type === "bun" ? "bun" : "ingredient",
        item: ingredient,
    });

    const addIcon = ingredient.count && ingredient.count !== 0 ? (
    <Counter count={ingredient.count} size="default" extraClass="m-1" />
    ) : null;

    return ( 
        <div className={styles.ingredientContainerStyle} onClick={() => onToggleModal(ingredient)} ref={dragRef}>
            {addIcon}
            <img srcSet={ingredient.image_large} className={styles.imgChanges} alt={ingredient.name}/>
            <div className={styles.ingredientStyle}>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`text text_type_main-default ${styles.textAlign}`}>{ingredient.name}</p>
        </div>
    );
}
 
export default IngredientsComponent ;