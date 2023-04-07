import React, { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './pages.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../services/login/login-action';


export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginSuccessful = useSelector(store => store.login.loginSuccessful);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({email: '', password: ''})

  const onIconClick = () => {
    setShowPassword(!showPassword);
  }

  let login = useCallback(
    e => {
      e.preventDefault();
      dispatch(signIn(user));
      if (loginSuccessful) {navigate(-1)};
    }, [user, dispatch, navigate, loginSuccessful]
  );

  useEffect(()=> {
    const handleEscapeBtn = (e) => {
        if (e.key === 'Enter') {
          login(e);
        }
    };
    document.addEventListener('keydown', handleEscapeBtn);
    return()=> {
        document.removeEventListener('keydown', handleEscapeBtn);
    };
  }, [login])

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const linksStyle = `${styles.pagesLinks} text text_type_main-default`;

  return (
      <div className={styles.mainDiv}>
      <div className={styles.loginPage}>
          <p className='text text_type_main-medium'>Вход</p>
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
          <Button htmlType="button" type="primary" size="large" onClick={login}>Войти</Button>
          <div className={styles.toolTips}>
              <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
              <Link to={'/register'} className={linksStyle}>Зарегистрироваться</Link>
          </div>
          <div className={styles.toolTips}>
              <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
              <Link to={'/forgot-password'} className={linksStyle}>Восстановить пароль</Link>
          </div>
      </div>
      </div>
    );
}