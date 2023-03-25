import React, {useEffect, useState} from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsComponent from './ingredients-component'
import Modal from '../modal-components/modal'
import IngredientDetails from './ingredient-ditails';
import { useSelector, useDispatch } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { getIgredientDetails, OPEN_MODAL, CLOSE_MODAL } from '../../services/ingredient-details/ingredient-details-action';
 
function BurgerIngredients () {
    const dispatch = useDispatch();
    const bunIngredients = useSelector(store => store.ingredients.ingredients.filter(item => item.type === 'bun'));
    const sauceIngredients = useSelector(store => store.ingredients.ingredients.filter(item => item.type === 'sauce'));
    const mainIngredients = useSelector(store => store.ingredients.ingredients.filter(item => item.type === 'main'));

    const currentIngredient = useSelector(store => store.details.currentIngredient);
    const isOpen = useSelector(store => store.details.openModal);

    const [activeTab, setActiveTab] = useState('one');
    const [bunRef, bunInView] = useInView({ threshold: 0 });
    const [sauceRef, sauceInView] = useInView({ threshold: 0 });
    const [mainRef, mainInView] = useInView({ threshold: 0 });

    const openModal = (ingredient) => {
        dispatch(getIgredientDetails(ingredient))
        dispatch({type: OPEN_MODAL})
    };

    const closeModal = () => {
        // dispatch(getIgredientDetails(ingredient))
        dispatch({type: CLOSE_MODAL})
    };

    useEffect(() => {
        if (bunInView) {
          setActiveTab('one');
        } else if (sauceInView) {
          setActiveTab('two');
        } else if (mainInView) {
          setActiveTab('three');
        }
      }, [bunInView, sauceInView, mainInView]);

    return ( 
        <div className={styles.ingredientsContainer}>
            <p className={`text text_type_main-large ${styles.mainP} pt-10 pb-5`}>Соберите бургер</p>
            <div className={styles.flexContent}>
                <Tab value="one" active={activeTab === 'one'} onClick={() => setActiveTab('one')}>
                    Булки
                </Tab>
                <Tab value="two" active={activeTab === 'two'} onClick={() => setActiveTab('two')} >
                    Соусы
                </Tab>
                <Tab value="three" active={activeTab === 'three'} onClick={() => setActiveTab('three')} >
                    Начинки
                </Tab>
            </div>
            <div className={`${styles.scrollBar} custom-scroll`}>
                <div ref={bunRef} className="text text_type_main-medium pt-10 pb-6">Булки</div>
                <div className={`pl-4 pr-4 ${styles.ingredientsGroup}`}>
                    {bunIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}
                        onToggleModal={() => openModal(item)}/>
                    ))}
                </div>
                    
                <div ref={sauceRef} className="text text_type_main-medium pt-10 pb-6">Соусы</div>
                <div className={`pl-4 pr-4 ${styles.ingredientsGroup}`}>
                    {sauceIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}
                        onToggleModal={() => openModal(item)}/>
                    ))}
                </div>
                <div ref={mainRef} className="text text_type_main-medium pt-10 pb-6">Начинки</div>
                <div className={`pl-4 pr-4 ${styles.ingredientsGroup}`}>
                    {mainIngredients.map((item) => (
                        <IngredientsComponent key={item._id} ingredientData={[item]}
                        onToggleModal={() => openModal(item)}/>
                    ))}
                </div>
            </div>
            {isOpen && (<Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails ingredientInfo={currentIngredient}/>
            </Modal>)}
        </div>
    );
}
 
export default BurgerIngredients ;