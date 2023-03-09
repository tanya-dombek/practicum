import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import './header.css';
 
function HeaderButton ({active, name, icon}) {
    const isActive = active ? 'text text_type_main-default ml-2' : 'text text_type_main-default text_color_inactive ml-2'
    return (
        <Button htmlType="button" type="secondary" size="small" style={{ display: 'flex' }} >
            {icon}
            <p className={isActive}>
                {name}
            </p>
        </Button>
    );
    
}

HeaderButton.propTypes = {
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
}
 
export default HeaderButton;