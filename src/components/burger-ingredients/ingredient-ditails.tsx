import React, {useEffect, useState, FC} from 'react'
import styles from './burger-ingredients.module.css'
import CaloriesDetails from './calories-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../types/types';
import { TIngredientData } from '../../types/types';
 
const IngredientDetails = () => {
    const [ingredientInfo, setIngredientInfo] = useState<TIngredientData | null>(null);
    const ingredients: TIngredientData[] = useSelector(store => store.ingredients.ingredients);
    let { id } = useParams();

    useEffect(
        () => {
            setIngredientInfo(ingredients.find((item: TIngredientData) => item._id === id) ?? null);
        }, [id, setIngredientInfo, ingredients]
    );

    return ( 
        ingredientInfo && (<div className={styles.modalItems}>
           <img srcSet={ingredientInfo.image_large} alt={ingredientInfo.name} />
            <p className="text text_type_main-medium pt-4 pb-8">{ingredientInfo.name}</p>
            <div className={styles.caloriesDiv}>
                <CaloriesDetails amount={ingredientInfo.calories} name='Калории,ккал'/>
                <CaloriesDetails amount={ingredientInfo.proteins} name='Белки, г'/>
                <CaloriesDetails amount={ingredientInfo.fat} name='Жиры, г'/>
                <CaloriesDetails amount={ingredientInfo.carbohydrates} name='Углеводы, г'/>
            </div>
        </div>
        )
    )
}
 
export default IngredientDetails;