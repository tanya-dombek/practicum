import React from 'react';
import './modal.css';
import PropTypes from 'prop-types';

function ModalOverlay({ handleClick }) {
    console.log('handleClick', handleClick);
    return (
        <div className='overlay' onClick={handleClick}/>       
    )
}

ModalOverlay.propTypes = {
    handleClick: PropTypes.func.isRequired,
}

export default ModalOverlay;