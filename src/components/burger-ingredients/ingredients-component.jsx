import React, {useState} from 'react'
import PropTypes from 'prop-types';
import './burger-ingredients.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import Modal from '../modal_components/modal'
import IngredientDetails from './ingredient-ditails';

function IngredientsComponent ({ingredientData}) {
    const ingredient = ingredientData[0];
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

      const addIcon =
      ingredient.count && ingredient.count !== '0' ? (
        <Counter count={ingredient.count} size="default" extraClass="m-1" />
      ) : null;
      console.log(isOpen);

    return ( 
        <div className='ingredientContainerStyle' onClick={toggleModal}>
            {addIcon}
            <img srcSet={ingredient.image_large} className='imgChanges' alt='ingredient'/>
            <div className='ingredientStyle'>
                <p className="text text_type_digits-default">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default textAlign">{ingredient.name}</p>
            {isOpen && <Modal onClose={toggleModal} title='Детали ингредиента'>
                <IngredientDetails ingredientInfo={ingredient}/>
            </Modal>}
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
 
export default IngredientsComponent ;