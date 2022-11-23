import React from 'react';
import { Link } from 'react-router-dom';

export const UserFriendsItem = ({ user }) => {
  return (
    <Link
      to={user.email}
      className="profile__friends-wrapper-item d-flex flex-direction-column justify-content-center align-items-center">
      <div className="profile__friends-wrapper-item_avatar d-flex">
        <img src={user.avatar} alt="" />
      </div>
      <div className="profile__friends-wrapper-item_name">
        {user.firstName.length > 6 ? user.firstName.substr(0, 6) + '...' : user.firstName}
      </div>
    </Link>
  );
};
