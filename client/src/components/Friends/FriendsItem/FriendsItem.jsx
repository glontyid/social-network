import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FriendsItemActionsAdd } from './FriendsItemActions/FriendsItemActionsAdd';
import { FriendsItemActionsRemove } from './FriendsItemActions/FriendsItemActionsRemove';
import TimerIcon from '@mui/icons-material/Timer';

export const FriendsItem = ({ data, context }) => {
  const [added, setAdded] = useState(false);
  const friends = context.user.friends.length ? JSON.parse(context.user.friends) : [];
  const hasFriends = context.user.friends.length
    ? JSON.parse(context.user.friends).some((item) => {
        return item.email.indexOf(data.email) > -1;
      })
    : false;

  const confirmedFriend = friends.some((item) => {
    if (item.email === data.email) {
      return item.success;
    }

    return false;
  });

  const inFriendRequest = data.friendsRequests.length
    ? JSON.parse(data.friendsRequests).find((item) => {
        return !item.success;
      })
    : [];

  function actionButtons() {
    if (!added && !hasFriends) {
      return (
        <FriendsItemActionsAdd data={data} added={added} setAdded={setAdded} context={context} />
      );
    } else if (!confirmedFriend && inFriendRequest) {
      return (
        <button className="friends__wrapper-item-action-btn">
          <TimerIcon sx={{ width: 20, color: '#71aaeb' }} />
        </button>
      );
    } else {
      return (
        <FriendsItemActionsRemove data={data} added={added} setAdded={setAdded} context={context} />
      );
    }
  }

  return (
    <div className="friends__wrapper-item">
      <div className="friends__wrapper-item_avatar d-flex">
        <img src={data.avatar} alt={data.email} />
      </div>
      <div className="friends__wrapper-item-footer d-flex justify-content-sb align-items-center">
        <div className="friends__wrapper-item-content d-flex flex-direction-column justify-content-center align-items-start">
          <Link to={`/profile/${data.email}`} className="friends__wrapper-item_name">
            {data.firstName} {data.lastName}
          </Link>
        </div>
        <div className="friends__wrapper-item-action">{actionButtons()}</div>
      </div>
    </div>
  );
};
