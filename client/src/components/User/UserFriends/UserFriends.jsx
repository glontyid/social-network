import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { UserFriendsItem } from './UserFriendsItem/UserFriendsItem';
import { GET_USER_FRIENDS } from '../../../requests/requests';

export const UserFriends = ({ user }) => {
  const userFriends = user.friends.length
    ? JSON.parse(user.friends).map((friend) => friend.email)
    : [];
  const { loading, error, data } = useQuery(GET_USER_FRIENDS, {
    variables: { email: userFriends },
  });

  if (!loading) {
    return (
      <div className="profile__friends container">
        <div className="profile__friends-title d-flext justify-content-start align-items-center">
          Друзья <span className="profile__friends-title-length">{data.getUserFriends.length}</span>
        </div>
        <div className="profile__friends-wrapper">
          {data.getUserFriends.map((item, index) => (
            <UserFriendsItem key={index} user={item} />
          ))}
        </div>
      </div>
    );
  }
};
