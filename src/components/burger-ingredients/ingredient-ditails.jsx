import React from 'react'
import './burger-ingredients.css'
import PropTypes from 'prop-types';
import CaloriesDetails from './calories-details';
 
function IngredientDetails  ({ingredientInfo}) {
    return ( 
        <div className='modalItems'>
           <img srcSet={ingredientInfo.image_large} alt={''} />
            <p className="text text_type_main-medium pt-4 pb-8">{ingredientInfo.name}</p>
            <div className='caloriesDiv'>
                <CaloriesDetails amount={ingredientInfo.calories} name='Калории,ккал'/>
                <CaloriesDetails amount={ingredientInfo.proteins} name='Белки, г'/>
                <CaloriesDetails amount={ingredientInfo.fat} name='Жиры, г'/>
                <CaloriesDetails amount={ingredientInfo.carbohydrates} name='Углеводы, г'/>
            </div>
            
        </div>
        );
    
}

IngredientDetails.propTypes = {
    ingredientData: PropTypes.objectOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
    }))
}
 
export default IngredientDetails;