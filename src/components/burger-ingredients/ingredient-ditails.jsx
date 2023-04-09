import React, {useEffect, useState} from 'react'
import styles from './burger-ingredients.module.css'
import CaloriesDetails from './calories-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

 
function IngredientDetails  () {
    const [ingredientInfo, setIngredientInfo] = useState(null);
    const ingredients = useSelector(store => store.ingredients.ingredients);
    let { id } = useParams();

    useEffect(
        () => {
            setIngredientInfo(ingredients.find(item => item._id === id));
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