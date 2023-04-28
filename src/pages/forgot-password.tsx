import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import styles from './pages.module.css';
import { useDispatch, useSelector } from '../types/types';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { postForgotPassword } from '../services/forgot-password/forgot-password-action';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const apiData = useSelector(store => store.forgotPassword);
  const [email, setEmail] = useState<string>('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postForgotPassword(email));
  };

  if (apiData.resetPasswordWasSent) {
    return (
      <Navigate
        to={'/reset-password'}
      />
    );
  };

  const linksStyle: string = `${styles.pagesLinks} text text_type_main-default`;

  return (
    <div className={styles.mainDiv}>
    <form onSubmit={onSubmit} className={styles.loginPage}>
        <p className='text text_type_main-medium'>Восстановление пароля</p>
        <EmailInput
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder={'Укажите e-mail'}
            name={'email'}
            isIcon={false}
            extraClass="ml-1"/>
        {apiData.errMsg && <p className={`${styles.errMsg} text text_type_main-default`}>{apiData.errMsg}</p>}
        <Button htmlType="submit" type="primary" size="large">Восстановить</Button>
        <div className={styles.toolTips}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link to={'/login'} className={linksStyle}>Войти</Link>
        </div>
    </form>
    </div>
  );
}