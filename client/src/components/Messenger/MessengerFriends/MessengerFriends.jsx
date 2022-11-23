import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { GET_USER_FRIENDS } from '../../../requests/requests';
import { MessengerFriendsItem } from './MessengerFriendsItem/MessengerFriendsItem';

export const MessengerFriends = () => {
  const context = useContext(AuthContext);
  const userFriends = context.user.friends.length
    ? JSON.parse(context.user.friends).map((item) => {
        return item.email;
      })
    : [];
  const { loading, error, data } = useQuery(GET_USER_FRIENDS, {
    variables: { email: userFriends },
  });

  if (!userFriends.length) {
    return (
      <div className="messenger__friends-empty d-flex justify-content-center align-items-center">
        <span>
          Добавьте{' '}
          <Link to="/friends" className="messenger__friends-empty-link">
            друзей
          </Link>{' '}
          чтобы начать общаться
        </span>
      </div>
    );
  }

  return (
    <div className="messenger__friends">
      {loading ? (
        <div>Загрузка</div>
      ) : (
        <div className="messenger__friends-wrapper">
          {data.getUserFriends.map((item, index) => {
            return <MessengerFriendsItem data={item} context={context} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};
