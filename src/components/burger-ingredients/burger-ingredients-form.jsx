import React, {useState} from 'react'
import './burger-ingredients.css'
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsComponent from './ingredients-component'
 
function BurgerIngredients ({ingredientsData}) {
    const bunIngredients = ingredientsData.filter(item => item.type === 'bun');
    const sauceIngredients = ingredientsData.filter(item => item.type === 'sauce');
    const mainIngredients = ingredientsData.filter(item => item.type === 'main');
    

    const setCurrent = () => {

    }
    return ( 
        <div className='ingredientsContainer'>
            <p className="text text_type_main-large mainP pt-10 pb-5">Соберите бургер</p>
            <div className='flexContent'>
                <Tab value="one" active={true} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={false} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={false} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className='scrollBar custom-scroll'>
                <div className="text text_type_main-medium pt-10 pb-6">Булки</div>
                <div className='pl-4 pr-4 ingredientsGroup'>
                    {bunIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}/>
                    ))}
                </div>
                    
                <div className="text text_type_main-medium pt-10 pb-6">Соусы</div>
                <div className='pl-4 pr-4 ingredientsGroup'>
                    {sauceIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}/>
                    ))}
                </div>
                <div className="text text_type_main-medium pt-10 pb-6">Начинки</div>
                <div className='pl-4 pr-4 ingredientsGroup'>
                    {mainIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}/>
                    ))}
                </div>
            </div>
            
        </div>
        );
    
}

IngredientsComponent.propTypes = {
    ingredientData: PropTypes.arrayOf(PropTypes.shape({
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
 
export default BurgerIngredients ;