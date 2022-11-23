import React from 'react';

export const MyFriendsItem = ({ data, context }) => {
  const userFriends = context.user.friends.length ? JSON.parse(context.user.friends) : [];
  const isConfirmedFriend = userFriends.find((friend) => friend.email === data.email).success;

  return (
    <div className="myfriends__wrapper-item">
      <div className="myfriends__wrapper-item_avatar">
        <img src={data.avatar} alt={data.email} />
      </div>
      <div className="myfriends__wrapper-item-footer d-flex justify-content-sb align-items-start">
        <div className="myfriends__wrapper-item-content d-flex flex-direction-column justify-content-center align-items-start">
          <div className="myfriends__wrapper-item_name">
            {data.firstName} {data.lastName}
          </div>
          <div className="myfriends__wrapper-item_commonFriends">
            {isConfirmedFriend ? 'Подтвержден' : 'Необходимо подтверждение от пользователя'}
          </div>
        </div>
      </div>
    </div>
  );
};
