import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay'
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Modal({ children, onClose, title }) {
useEffect(()=> {
    const handleEscapeBtn = (e) => {
        if (e.keyCode == 27) {
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
                <div className='modal pt-10 pb-15 pr-10 pl-10'>
                    <p className="text text_type_main-large titleIcon">
                        {title}
                        <div className='closeIcon'>
                            <CloseIcon onClick={onClose} type="primary"/>
                        </div>
                        
                    </p>
                    {children}
                </div>
            </>
        ),
        document.getElementById('portal')
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
}

export default Modal;
