import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/authContext';
import { LOGIN_USER } from '../requests/requests';

export const LoginPage = () => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <div className="login">
      <h2 className="login__title">Авторизоваться</h2>
      <form className="login__form" onSubmit={(e) => e.preventDefault()}>
        <div className="login__form-field">
          <label htmlFor="username">Эмейл</label>
          <input type="text" name="email" onChange={onChange} />
        </div>
        <div className="login__form-field">
          <label htmlFor="password">Пароль</label>
          <input type="password" name="password" onChange={onChange} />
        </div>
        <button type="submit" onClick={onSubmit}>
          войти
        </button>
      </form>
      <div className="login__subform">
        <Link to="/registration" className="login__subform-link">
          Нет аккаунта? Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
