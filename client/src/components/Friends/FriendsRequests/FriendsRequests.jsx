import { useQuery } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/authContext';
import { GET_USER_FRIENDS } from '../../../requests/requests';
import { FriendsRequestsItem } from './FriendsRequestsItem/FriendsRequestsItem';

export const FriendsRequests = () => {
  const context = useContext(AuthContext);
  const userFriends = context.user.friendsRequests.length
    ? JSON.parse(context.user.friendsRequests).map((friend) => friend.email)
    : [];
  const { loading, error, data } = useQuery(GET_USER_FRIENDS, {
    variables: { email: userFriends },
  });

  return (
    <div className="friends__wrapper">
      {loading ? (
        <div>Загрузка</div>
      ) : (
        data.getUserFriends.map((item, index) => (
          <FriendsRequestsItem
            data={item}
            authorizedUser={context.user}
            context={context}
            key={index}
          />
        ))
      )}
    </div>
  );
};
