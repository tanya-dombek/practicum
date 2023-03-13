import React from 'react'
import styles from './burger-ingredients.module.css'
import PropTypes from 'prop-types';
 
function CaloriesDetails  ({amount, name}) {
    return ( 
        <div className={styles.spesificItem}>
            <p className='text text_type_main-default text_color_inactive'>{name}</p>
            <p className="text text_type_digits-default text_color_inactive">{amount}</p>
        </div>
    );
}

CaloriesDetails.propTypes = {
    amount: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
}
 
export default CaloriesDetails;