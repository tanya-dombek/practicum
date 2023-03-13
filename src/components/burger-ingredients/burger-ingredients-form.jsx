import React, {useState} from 'react'
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsComponent from './ingredients-component'
import { ingredientPropTypes } from '../../utils/types'
import Modal from '../modal-components/modal'
import IngredientDetails from './ingredient-ditails';
 
function BurgerIngredients ({ingredientData}) {
    const bunIngredients = ingredientData.filter(item => item.type === 'bun');
    const sauceIngredients = ingredientData.filter(item => item.type === 'sauce');
    const mainIngredients = ingredientData.filter(item => item.type === 'main');

    const [isOpen, setIsOpen] = useState(false);
    const [currentIngredient, setCurrentIngredient] = useState(null);

    const toggleModal = (ingredient) => {
        setIsOpen(!isOpen);
        setCurrentIngredient(ingredient);
      };

    const setCurrent = () => {

    }
    return ( 
        <div className={styles.ingredientsContainer}>
            <p className={`text text_type_main-large ${styles.mainP} pt-10 pb-5`}>Соберите бургер</p>
            <div className={styles.flexContent}>
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
            <div className={`${styles.scrollBar} custom-scroll`}>
                <div className="text text_type_main-medium pt-10 pb-6">Булки</div>
                <div className={`pl-4 pr-4 ${styles.ingredientsGroup}`}>
                    {bunIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}
                        onToggleModal={() => toggleModal(item)} />
                    ))}
                </div>
                    
                <div className="text text_type_main-medium pt-10 pb-6">Соусы</div>
                <div className={`pl-4 pr-4 ${styles.ingredientsGroup}`}>
                    {sauceIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}
                        onToggleModal={() => toggleModal(item)} />
                    ))}
                </div>
                <div className="text text_type_main-medium pt-10 pb-6">Начинки</div>
                <div className={`pl-4 pr-4 ${styles.ingredientsGroup}`}>
                    {mainIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}
                        onToggleModal={() => toggleModal(item)} />
                    ))}
                </div>
            </div>
            {isOpen && (<Modal onClose={toggleModal} title='Детали ингредиента'>
                <IngredientDetails ingredientInfo={currentIngredient}/>
            </Modal>)}
        </div>
    );
}

IngredientsComponent.propTypes = {
    ingredientData: ingredientPropTypes
}
 
export default BurgerIngredients ;