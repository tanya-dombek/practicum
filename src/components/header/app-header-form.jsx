import React, {Component} from 'react'
import './header.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderButton from './header-buttons';

const HeaderTabs = ['Конструктор', 'Список заказов', 'Личный кабинет']

function AppHeader () {

    let burgerIcon = <BurgerIcon type="primary" />;
    let listIcon = <ListIcon  type="secondary" />;
    let profileIcon = <ProfileIcon  type="secondary" />;
    return ( 
        <header className='header'>
            <section className='section'>
                <div className='buttonGroup'>
                    <HeaderButton icon={burgerIcon} name={HeaderTabs[0]} active={true}/>
                    <HeaderButton icon={listIcon} name={HeaderTabs[1]} active={false}/>
                </div>
                <Logo/>
                <HeaderButton icon={profileIcon} name={HeaderTabs[2]} active={false}/>
            </section>
        </header>
        );
    
}
 
export default AppHeader;