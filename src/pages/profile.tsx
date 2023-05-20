import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './pages.module.css';
import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from '../types/types';
import { signOut } from '../services/logout/logout-action';
import { changeUserInfo } from '../services/user/user-action';
import { TUserType } from '../types/types';
import _ from 'lodash';
import { OrdersFeed } from '../components/feed/orders-feed';
import { ORDERS_PROFILE_CONNECT, ORDERS_PROFILE_DISCONNECT } from '../services/middleware/ws-action';

export const PROFILE_ORDERS_SERVER_URL = 'wss://norma.nomoreparties.space/orders';

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [origUser, setOrigUser] = useState<TUserType | null>(useSelector(store => store.user.user))
  const [user, setUser] = useState<TUserType | null>(useSelector(store => store.user.user))
  const ordersProfile = useSelector(store => store.profileOrders.profileOrders);
  const [password, setPassword] = useState<string>('')
  const [disable, setDisable] = useState<boolean>(true)

  const onIconClick = () => {
    setDisable(!disable);
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    dispatch(signOut());
    dispatch({ type: ORDERS_PROFILE_DISCONNECT })
  };

  const resetChanges = () => {
    setPassword('');
    setUser(origUser);
  };

  const handleSubmit  = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      dispatch(changeUserInfo(user, password));
    }
    setOrigUser(user);
    setPassword('');
  };

  useEffect(() => {
    if (user) {
      dispatch({ type: ORDERS_PROFILE_CONNECT, url: PROFILE_ORDERS_SERVER_URL });
    }

    return () => {
      dispatch({ type: ORDERS_PROFILE_DISCONNECT });
    };
  }, [dispatch, user]);

  if (!user) {
    navigate('/login');
  }

  const diff = _.omitBy(user, (value, key) => origUser?.[key] === value);
  const activeTabStyle: string = `text text_type_main-large ${styles.activeTabLink}`;
  const tabStyle: string = `text text_type_main-large text_color_inactive ${styles.tabLink}`;

  return (
    <div className={styles.mainDiv}>
      <div className={styles.profileNavLinks}>
        <NavLink to='/profile' className={isActive('/profile') ? activeTabStyle : tabStyle}>Профиль</NavLink>
        <NavLink to='/profile/orders' className={isActive('/profile/orders') ? activeTabStyle : tabStyle}>История заказов</NavLink>
        <NavLink to='' onClick={handleClick} className={`text text_type_main-large text_color_inactive ${styles.tabLink}`}>Выход</NavLink>
        <p style={{maxWidth: '350px'}} className="text text_type_main-default text_color_inactive">
          {isActive('/profile') ? 'В этом разделе вы можете изменить свои персональные данные' : 'В этом разделе вы можете посмотреть свою историю заказов'}
          </p>
      </div>
    {isActive('/profile') ? (<form onSubmit={handleSubmit} className={styles.loginPage}>
        <Input
          type={'text'}
          name={'name'}
          placeholder={'Имя'}
          value={user?.name ?? ''}
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
          value={user?.email ?? ''}
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
    </form>) : (
      <div>
        {ordersProfile && (<OrdersFeed orders={ordersProfile.orders} profile={true}/>)}
      </div>
    )}
    </div>
  );
}