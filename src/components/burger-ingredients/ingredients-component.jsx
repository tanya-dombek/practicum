import React, {useState} from 'react'
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientPropTypes } from '../../utils/types'

function IngredientsComponent ({ingredientData, onToggleModal}) {
    const ingredient = ingredientData[0];

    const addIcon =
    ingredient.count && ingredient.count !== '0' ? (
    <Counter count={ingredient.count} size="default" extraClass="m-1" />
    ) : null;

    return ( 
        <div className={styles.ingredientContainerStyle} onClick={onToggleModal}>
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

IngredientsComponent.propTypes = {
    ingredientData: ingredientPropTypes,
    onToggleModal: PropTypes.func.isRequired
}
 
export default IngredientsComponent ;