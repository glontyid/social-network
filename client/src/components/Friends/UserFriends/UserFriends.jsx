import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { AuthContext } from '../../../context/authContext';
import { MyFriendsItem } from '../MyFriendsItem/MyFriendsItem';
import { GET_USER_FRIENDS } from '../../../requests/requests';

export const UserFriends = () => {
  const context = useContext(AuthContext);
  const userFriends = context.user.friends.length
    ? JSON.parse(context.user.friends).map((item) => {
        return item.email;
      })
    : [];
  const { loading, error, data } = useQuery(GET_USER_FRIENDS, {
    variables: { email: userFriends },
  });

  return (
    <div className="friends-container">
      {loading ? (
        <div>Загрузка</div>
      ) : (
        <div className="myfriends__wrapper">
          {data.getUserFriends.map((item, index) => {
            return <MyFriendsItem data={item} context={context} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};
