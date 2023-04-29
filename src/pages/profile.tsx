import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './pages.module.css';
import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../types/types';
import { signOut } from '../services/logout/logout-action';
import { changeUserInfo } from '../services/user/user-action';
import { TUserType } from '../types/types';
import _ from 'lodash';

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [origUser, setOrigUser] = useState<TUserType>(useSelector(store => store.user.user))
  const [user, setUser] = useState<TUserType>(useSelector(store => store.user.user))
  const [password, setPassword] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)

  const onIconClick = () => {
    setDisable(!disable);
  }

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    dispatch(signOut());
  };

  const resetChanges = () => {
    setPassword('');
    setUser(origUser);
  };

  const handleSubmit  = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeUserInfo(user, password));
    setOrigUser(user);
    setPassword('');
  };

  if (!user) {
    navigate('/login');
  }

  const diff = _.omitBy(user, (value, key) => origUser[key] === value);
  const activeTabStyle: string = `text text_type_main-large ${styles.activeTabLink}`;
  const tabStyle: string = `text text_type_main-large text_color_inactive ${styles.tabLink}`;

  return (
    <div className={styles.mainDiv}>
      <div className={styles.profileNavLinks}>
        <NavLink to='/profile' className={({isActive}) => isActive ? activeTabStyle : tabStyle}>Профиль</NavLink>
        <NavLink to='/profile/orders' className={({isActive}) => isActive ? activeTabStyle : tabStyle}>История заказов</NavLink>
        <NavLink to='' onClick={handleClick} className={`text text_type_main-large text_color_inactive ${styles.tabLink}`}>Выход</NavLink>
        <p style={{maxWidth: '350px'}} className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
    <form onSubmit={handleSubmit} className={styles.loginPage}>
        <Input
          type={'text'}
          name={'name'}
          placeholder={'Имя'}
          value={user.name}
          onChange={e => handleProfileChange(e)}
          onIconClick={onIconClick}
          icon={'EditIcon'}
          error={false}
          disabled={disable}
          errorText={'Ошибка'}
          extraClass={`${styles.inputExtraClass} ml-1`}/>
        <EmailInput
          onChange={e => handleProfileChange(e)}
          isIcon={true}
          value={user.email}
          name={'email'}
          extraClass="ml-1"/>
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => handlePasswordChange(e)}
          onIconClick={onIconClick}
          icon={'EditIcon'}
          value={password}
          name={'password'}
          error={false}
          disabled={disable}
          errorText={'Ошибка'}
          extraClass="ml-1"/>
        {(!_.isEmpty(diff) || password !== '') && (
          <div className={styles.toolTips}>
            <Button htmlType="button" type="secondary" size="large" onClick={resetChanges}>Отменить</Button>
            <Button htmlType="submit" type="primary" size="large">Сохранить</Button>
          </div>
        )}
    </form>
    </div>
  );
}