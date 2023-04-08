import React, { useState} from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { Input, Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './pages.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../services/login/login-action';


export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apiData = useSelector(store => store.login);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({email: '', password: ''})

  const onIconClick = () => {
    setShowPassword(!showPassword);
  };

  let onSubmit = e => {
      e.preventDefault();
      dispatch(signIn(user));
      if (apiData.loginSuccessful) {navigate(-1)};
  };

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const linksStyle = `${styles.pagesLinks} text text_type_main-default`;

  return (
      <div className={styles.mainDiv}>
      <form onSubmit={onSubmit} className={styles.loginPage}>
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
          {apiData.errMsg && <p className={`${styles.errMsg} text text_type_main-default`}>{apiData.errMsg}</p>}
          <Button htmlType="submit" type="primary" size="large">Войти</Button>
          <div className={styles.toolTips}>
              <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
              <Link to={'/register'} className={linksStyle}>Зарегистрироваться</Link>
          </div>
          <div className={styles.toolTips}>
              <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
              <Link to={'/forgot-password'} className={linksStyle}>Восстановить пароль</Link>
          </div>
      </form>
      </div>
    );
}