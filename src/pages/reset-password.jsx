import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Link } from 'react-router-dom';
import styles from './pages.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { postResetPassword } from '../services/reset-password/reset-password-action';


export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const resetPasswordSuccessful = useSelector(store => store.resetPassword.resetPasswordSuccessful);
  const [newData, setNewData] = useState({password: '', code: ''})
  
  const onIconClick = () => {
    setShowPassword(!showPassword);
  }

  const handleClick = useCallback(() => {
    dispatch(postResetPassword(newData));
  }, [dispatch, newData]);

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

  const handleChange = e => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  if (resetPasswordSuccessful) {
    return (
      <Navigate
        to={'/profile'}
      />
    );
  }

  const linksStyle = `${styles.pagesLinks} text text_type_main-default`;

  return (
    <div className={styles.mainDiv}>
    <div className={styles.loginPage}>
        <p className='text text_type_main-medium'>Восстановление пароля</p>
        <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={e => handleChange(e)}
            icon={'ShowIcon'}
            value={newData.password}
            name={'password'}
            error={false}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            extraClass="ml-1"/>
        <Input
          type={'text'}
          name="code"
          placeholder={'Введите код из письма'}
          onChange={e => handleChange(e)}
          value={newData.code}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"/>
        <Button htmlType="button" type="primary" size="large" onClick={e => handleClick(e)}>Сохранить</Button>
        <div className={styles.toolTips}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link to={'/login'} className={linksStyle}>Войти</Link>
        </div>
    </div>
    </div>
  );
}