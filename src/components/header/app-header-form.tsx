import React, {FC} from 'react'
import styles from './header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
    const activeTabStyle: string = `text text_type_main-default ${styles.tabLink}`;
    const tabStyle: string = `text text_type_main-default text_color_inactive ${styles.tabLink}`;

    return ( 
        <header className={styles.header}>
            <section className={styles.section}>
                <div className={styles.buttonGroup}>
                    <NavLink to='/' className={({isActive}) => isActive ? activeTabStyle : tabStyle}>
                        {({ isActive }) => (<>
                            <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                            <span>Конструктор</span></>
                        )}
                    </NavLink>
                    <NavLink to='/orders' className={({isActive}) => isActive ? activeTabStyle : tabStyle}>
                        {({ isActive }) => (<>
                            <ListIcon  type={isActive ? 'primary' : 'secondary'} />
                            <span>Список заказов</span></>
                        )}
                    </NavLink>
                </div>
                <NavLink to='/'>
                    <Logo/>
                </NavLink>
                <NavLink to='/profile' className={({isActive}) => isActive ? activeTabStyle : tabStyle}>
                    {({ isActive }) => (<>
                        <ProfileIcon  type={isActive ? 'primary' : 'secondary'} />
                        <span>Личный кабинет</span></>
                    )}
                </NavLink>
            </section>
        </header>
    );
    
}

export default AppHeader;