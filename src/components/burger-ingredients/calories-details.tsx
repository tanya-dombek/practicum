import React, {FC} from 'react'
import styles from './burger-ingredients.module.css'
 
type TCaloriesDetailsType = {
    amount: number;
    name: string;
  }

const CaloriesDetails: FC<TCaloriesDetailsType> = ({amount, name}) => {
    return ( 
        <div className={styles.spesificItem}>
            <p className='text text_type_main-default text_color_inactive'>{name}</p>
            <p className="text text_type_digits-default text_color_inactive">{amount}</p>
        </div>
    );
}
 
export default CaloriesDetails;