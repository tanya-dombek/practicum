import React, {FC} from 'react';
import styles from './modal.module.css';

type TModalOverlayType = {
    handleClick: () => void;
  }

const ModalOverlay: FC<TModalOverlayType> = ({ handleClick }) => {
    return (
        <div className={styles.overlay} onClick={handleClick} data-testid='modal-overlay'/>       
    )
}

export default ModalOverlay;