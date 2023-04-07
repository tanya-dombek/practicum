import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Link } from 'react-router-dom';
import styles from './pages.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { postForgotPassword } from '../services/forgot-password/forgot-password-action';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const resetPasswordWasSent = useSelector(store => store.forgotPassword.resetPasswordWasSent);
  const [value, setValue] = useState('')

  const handleClick = useCallback(() => {
    dispatch(postForgotPassword(value));
  }, [dispatch, value]);

  useEffect(()=> {
    const handleEscapeBtn = (e) => {
        if (e.key === 'Enter') {
          handleClick();
        }
    };
    document.addEventListener('keydown', handleEscapeBtn);
    return()=> {
        document.removeEventListener('keydown', handleEscapeBtn);
    };
  }, [handleClick])

  if (resetPasswordWasSent) {
    return (
      <Navigate
        to={'/reset-password'}
      />
    );
  }

  const linksStyle = `${styles.pagesLinks} text text_type_main-default`;

  return (
    <div className={styles.mainDiv}>
    <div className={styles.loginPage}>
        <p className='text text_type_main-medium'>Восстановление пароля</p>
        <EmailInput
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder={'Укажите e-mail'}
            name={'email'}
            isIcon={false}
            extraClass="ml-1"/>
        <Button htmlType="button" type="primary" size="large" onClick={e => handleClick(e)}>Восстановить</Button>
        <div className={styles.toolTips}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link to={'/login'} className={linksStyle}>Войти</Link>
        </div>
    </div>
    </div>
  );
}