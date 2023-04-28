import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import styles from './pages.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { postResetPassword } from '../services/reset-password/reset-password-action';
import { RootState } from '../services/root-reducer';
import { TResetPasswordType } from '../types/types';

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const apiData = useSelector((store: RootState) => store.resetPassword);
  const [newData, setNewData] = useState<TResetPasswordType>({password: '', code: ''})
  
  const onIconClick = () => {
    setShowPassword(!showPassword);
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postResetPassword(newData));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  if (apiData.resetPasswordSuccessful) {
    return (
      <Navigate
        to={'/profile'}
      />
    );
  }

  const linksStyle: string = `${styles.pagesLinks} text text_type_main-default`;

  return (
    <div className={styles.mainDiv}>
    <form onSubmit={onSubmit} className={styles.loginPage}>
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
        {apiData.errMsg && <p className={`${styles.errMsg} text text_type_main-default`}>{apiData.errMsg}</p>}
        <Button htmlType="submit" type="primary" size="large">Сохранить</Button>
        <div className={styles.toolTips}>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
            <Link to={'/login'} className={linksStyle}>Войти</Link>
        </div>
    </form>
    </div>
  );
}