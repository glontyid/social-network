import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { CHANGE_USER_DATA } from '../requests/requests';
import { useForm } from '../utility/hooks';

export const EditProfilePage = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function updateUserCallback() {
    changeUserData();
  }

  const { onChange, onSubmit, values } = useForm(updateUserCallback, {
    email: context.user.email,
    firstName: context.user.firstName,
    lastName: context.user.lastName,
    city: context.user.city,
    avatar: context.user.avatar || '',
    birthday: context.user.birthday || '',
    friends: context.user.friends,
    friendsRequests: context.user.friendsRequests,
  });

  const [changeUserData, { loading }] = useMutation(CHANGE_USER_DATA, {
    update(proxy, { data: { changeUserData: userData } }) {
      context.update(userData);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { changeUserDataInput: values },
  });

  return (
    <section className="content">
      <div className="registration">
        <h2 className="registration__title">Редактировать профиль</h2>
        <form className="registration__form" onSubmit={(e) => e.preventDefault()}>
          <div className="registration__form-field">
            <label htmlFor="firstName">Имя</label>
            <input
              type="text"
              name="firstName"
              onChange={onChange}
              placeholder="Иван"
              defaultValue={context.user.firstName}
            />
          </div>
          <div className="registration__form-field">
            <label htmlFor="lastName">Фамилия</label>
            <input
              type="text"
              name="lastName"
              onChange={onChange}
              placeholder="Иванов"
              defaultValue={context.user.lastName}
            />
          </div>
          {/* <div className="registration__form-field">
            <label htmlFor="email">Эмейл</label>
            <input type="text" name="email" onChange={onChange} placeholder={context.user.email} />
          </div> */}
          <div className="registration__form-field">
            <label htmlFor="city">Город</label>
            <input
              type="text"
              name="city"
              onChange={onChange}
              placeholder="Москва"
              defaultValue={context.user.city}
            />
          </div>
          <div className="registration__form-field">
            <label htmlFor="birthday">День рождения</label>
            <input
              type="date"
              name="birthday"
              onChange={onChange}
              defaultValue={context.user.birthday}
            />
          </div>
          <div className="registration__form-field">
            <label htmlFor="avatar">Аватар</label>
            <input
              type="text"
              name="avatar"
              onChange={onChange}
              defaultValue={context.user.avatar}
            />
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
