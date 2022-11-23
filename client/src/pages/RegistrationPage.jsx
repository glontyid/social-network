import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useForm } from '../utility/hooks';
import { useMutation } from '@apollo/react-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../requests/requests';

export const RegistrationPage = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  function registerUserCallback() {
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: 'Новый',
    lastName: 'Пользователь',
    city: 'Москва',
    birthday: '',
    friends: '',
    friendsRequests: '',
    avatar: '',
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate('/postregistration');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <section className="content">
      <div className="registration">
        <h2 className="registration__title">Регистрация</h2>
        <form className="registration__form" onSubmit={(e) => e.preventDefault()}>
          <div className="registration__form-field">
            <label htmlFor="username">Логин</label>
            <input type="text" name="username" onChange={onChange} />
          </div>
          <div className="registration__form-field">
            <label htmlFor="email">Эмейл</label>
            <input type="text" name="email" onChange={onChange} />
          </div>
          <div className="registration__form-field">
            <label htmlFor="password">Пароль</label>
            <input type="password" name="password" onChange={onChange} />
          </div>
          <div className="registration__form-field">
            <label htmlFor="password">Подтвердите пароль</label>
            <input type="password" name="confirmPassword" onChange={onChange} />
          </div>
          <button type="submit" onClick={onSubmit}>
            Зарегистрироваться
          </button>
        </form>
        <div className="registration__subform">
          <Link to="/login" className="registration__subform-link">
            Есть аккаунт? Войти
          </Link>
        </div>
        {errors.map((err) => window.alert(err.message))}
      </div>
    </section>
  );
};
