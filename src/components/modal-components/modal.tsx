import React, {useEffect, FC} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay'
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModalType = {
    children: React.ReactElement;
    onClose: () => void;
    title: string;
  }

const Modal: FC<TModalType> = ({ children, onClose, title }) => {
    useEffect(()=> {
        const handleEscapeBtn = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscapeBtn);
        return()=> {
            document.removeEventListener('keydown', handleEscapeBtn);
        };
    }, [])
    
    return ReactDOM.createPortal(
        (
            <>
                <ModalOverlay handleClick={onClose}/>
                <div className={`${styles.modal} pt-10 pb-15 pr-10 pl-10`}>
                    <p className={`text text_type_main-large ${styles.titleIcon}`}>
                        {title}
                        <span className={styles.closeIcon}>
                            <CloseIcon onClick={onClose} type="primary"/>
                        </span>
                    </p>
                    {children}
                </div>
            </>
        ),
        document.getElementById('portal')!
    );
}

export default Modal;
