import React, {useEffect, useState} from 'react'
import styles from './burger-ingredients.module.css'
import { useLocation, Link } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientsComponent from './ingredients-component'
import { useSelector } from '../../types/types';
import { useInView } from 'react-intersection-observer';
import { TIngredientData } from '../../types/types';

 
const BurgerIngredients = () => {
    let location = useLocation();
    
    const bunIngredients: TIngredientData[] = useSelector(store => store.ingredients.ingredients.filter((item: TIngredientData) => item.type === 'bun'));
    const sauceIngredients: TIngredientData[] = useSelector(store => store.ingredients.ingredients.filter((item: TIngredientData) => item.type === 'sauce'));
    const mainIngredients: TIngredientData[] = useSelector(store => store.ingredients.ingredients.filter((item: TIngredientData) => item.type === 'main'));

    const [activeTab, setActiveTab] = useState<string>('one');
    const [bunRef, bunInView] = useInView({ threshold: 0 });
    const [sauceRef, sauceInView] = useInView({ threshold: 0 });
    const [mainRef, mainInView] = useInView({ threshold: 0 });

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
                    {bunIngredients.map((item: TIngredientData) => (
                        <Link key={item._id} to={`/ingredients/${item._id}`} state={{ background: location }} className={styles.ingredientsLink}>
                            <IngredientsComponent key={item._id} ingredientData={[item]}/>
                        </Link>
                    ))}
                </div>
                    
                <div ref={sauceRef} className="text text_type_main-medium pt-10 pb-6">Соусы</div>
                <div className={`pl-4 pr-4 ${styles.ingredientsGroup}`}>
                    {sauceIngredients.map((item: TIngredientData) => (
                        <Link key={item._id} to={`/ingredients/${item._id}`} state={{ background: location }} className={styles.ingredientsLink}>
                            <IngredientsComponent key={item._id} ingredientData={[item]}/>
                        </Link>
                    ))}
                </div>
                <div ref={mainRef} className="text text_type_main-medium pt-10 pb-6">Начинки</div>
                <div className={`pl-4 pr-4 ${styles.ingredientsGroup}`}>
                    {mainIngredients.map((item: TIngredientData) => (
                        <Link key={item._id} to={`/ingredients/${item._id}`} state={{ background: location }} className={styles.ingredientsLink}>
                            <IngredientsComponent key={item._id} ingredientData={[item]}/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default BurgerIngredients ;