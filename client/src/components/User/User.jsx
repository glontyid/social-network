import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { UserDetails } from './UserDetails/UserDetails';
import { UserFriends } from './UserFriends/UserFriends';
import { UserTable } from './UserTable/UserTable';
import { GET_USER } from '../../requests/requests';
import { Link } from 'react-router-dom';

export const User = ({ currentUser, userEmail }) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { email: userEmail },
  });

  if (!loading) {
    return (
      <section className="profile">
        <div className="profile__container">
          <div className="profile__left">
            <div className="profile__avatar container">
              <img src={data.getUser.avatar} alt={data.getUser.avatar} />
            </div>
            <div className="profile__actions">
              {currentUser.email !== userEmail ? (
                <Link to={`/messenger/${userEmail}`}>Отправить сообщение</Link>
              ) : (
                <Link to="/edit">Редактировать профиль</Link>
              )}
            </div>
            <UserFriends user={data.getUser} />
          </div>
          <div className="profile__right">
            <UserDetails user={data.getUser} />
            <UserTable currentUser={currentUser} user={data.getUser} userEmail={userEmail} />
          </div>
        </div>
      </section>
    );
  }

  return <section className="profile">Загрузка...</section>;
};
