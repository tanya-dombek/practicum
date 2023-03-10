import React from 'react'
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
import CaloriesDetails from './calories-details';
import { ingredientPropTypes } from '../../utils/types'
 
function IngredientDetails  ({ingredientInfo}) {
    return ( 
        <div className={styles.modalItems}>
           <img srcSet={ingredientInfo.image_large} alt={ingredientInfo.name} />
            <p className="text text_type_main-medium pt-4 pb-8">{ingredientInfo.name}</p>
            <div className={styles.caloriesDiv}>
                <CaloriesDetails amount={ingredientInfo.calories} name='Калории,ккал'/>
                <CaloriesDetails amount={ingredientInfo.proteins} name='Белки, г'/>
                <CaloriesDetails amount={ingredientInfo.fat} name='Жиры, г'/>
                <CaloriesDetails amount={ingredientInfo.carbohydrates} name='Углеводы, г'/>
            </div>
        </div>
    );
}

IngredientDetails.propTypes = {
    ingredientData: ingredientPropTypes
}
 
export default IngredientDetails;