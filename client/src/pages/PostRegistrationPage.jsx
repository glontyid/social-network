import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { UPDATE_USER } from '../requests/requests';
import { useForm } from '../utility/hooks';

export const PostRegistrationPage = () => {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function updateUserCallback() {
    updateUser();
  }

  const { onChange, onSubmit, values } = useForm(updateUserCallback, {
    email: context.user.email,
    firstName: 'Новый',
    lastName: 'Пользователь',
    city: 'Москва',
    birthday: '',
    friends: '',
    friendsRequests: '',
  });

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(proxy, { data: { updateUser: userData } }) {
      context.update(userData);
      navigate(`/profile/${context.user.email}`);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { updateInput: values },
  });

  return (
    <section className="content">
      <div className="registration">
        <h2 className="registration__title">Завершите регистрацию</h2>
        <form className="registration__form" onSubmit={(e) => e.preventDefault()}>
          <div className="registration__form-field">
            <label htmlFor="firstName">Имя</label>
            <input type="text" name="firstName" onChange={onChange} placeholder="Иван" />
          </div>
          <div className="registration__form-field">
            <label htmlFor="lastName">Фамилия</label>
            <input type="text" name="lastName" onChange={onChange} placeholder="Иванов" />
          </div>
          <div className="registration__form-field">
            <label htmlFor="city">Город</label>
            <input type="text" name="city" onChange={onChange} placeholder="Москва" />
          </div>
          <div className="registration__form-field">
            <label htmlFor="birthday">День рождения</label>
            <input type="date" name="birthday" onChange={onChange} />
          </div>
          <button type="submit" onClick={onSubmit}>
            Сохранить
          </button>
        </form>
        {errors.map((err) => window.alert(err.message))}
      </div>
    </section>
  );
};
