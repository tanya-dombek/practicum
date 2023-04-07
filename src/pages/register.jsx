import React, { useState, useEffect, useCallback } from 'react';
import { Navigate, Link } from 'react-router-dom';
import styles from './pages.module.css';
import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { postRegistration } from '../services/register/register-action';

export function RegistrationPage() {
  const dispatch = useDispatch();
  const registrationSuccessful = useSelector(store => store.registration.registrationSuccessful);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({name: '', email: '', password: ''})

  const onIconClick = () => {
    setShowPassword(!showPassword);
  }

  const handleClick = useCallback(() => {
    dispatch(postRegistration(user));
  }, [dispatch, user]);

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
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (registrationSuccessful) {
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
        <p className='text text_type_main-medium'>Регистрация</p>
        <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => handleChange(e)}
            value={user.name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            extraClass="ml-1"/>
        <EmailInput
            onChange={e => handleChange(e)}
            value={user.email}
            name={'email'}
            isIcon={false}
            extraClass="ml-1"/>
        <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={e => handleChange(e)}
            icon={'ShowIcon'}
            value={user.password}
            name={'password'}
            error={false}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            extraClass="ml-1"/>
        <Button htmlType="button" type="primary" size="large" onClick={e => handleClick(e)}>Зарегистрироваться</Button>
        <div className={styles.toolTips}>
            <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
            <Link to={'/login'} className={linksStyle}>Войти</Link>
        </div>
    </div>
    </div>
  );
}