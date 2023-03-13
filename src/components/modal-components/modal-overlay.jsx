import React from 'react';
import styles from './modal.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ handleClick }) {
    return (
        <div className={styles.overlay} onClick={handleClick}/>       
    )
}

ModalOverlay.propTypes = {
    handleClick: PropTypes.func.isRequired,
}

export default ModalOverlay;