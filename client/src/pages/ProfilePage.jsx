import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserDetails } from '../components/User/UserDetails/UserDetails';
import { UserFriends } from '../components/User/UserFriends/UserFriends';
import { UserTable } from '../components/User/UserTable/UserTable';
import { AuthContext } from '../context/authContext';
import { User } from '../components/User/User';

export const ProfilePage = () => {
  const { email } = useParams();
  const context = useContext(AuthContext);

  if (context.email !== email) {
    return <User currentUser={context.user} userEmail={email} />;
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__left">
          <div className="profile__avatar container">
            <img src={context.user.avatar} alt={context.user.avatar} />
          </div>
          <div className="profile__actions">
            <Link to="/edit">Редактировать профиль</Link>
          </div>
          <UserFriends user={context.user} />
        </div>
        <div className="profile__right">
          <UserDetails user={context.user} />
          <UserTable currentUser={context.user} user={context.user} />
        </div>
      </div>
    </section>
  );
};
