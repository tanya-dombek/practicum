import React, {} from 'react'
import styles from'./burger-contructor.module.css'
import BurgerItemsList from './burger-items-list';
import ComponentsInfo from './burger-price-order'
 
function BurgerConstructor () {
    return ( 
        <div className={`${styles.constructorContainer} pt-25 pl-4 pr-4`}>
            <BurgerItemsList/>
            <ComponentsInfo/>
        </div>
    );
    
}

 
export default BurgerConstructor ;