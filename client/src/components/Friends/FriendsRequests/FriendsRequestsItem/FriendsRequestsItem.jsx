import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useMutation } from '@apollo/react-hooks';
import { CONFIRM_FRIEND } from '../../../../requests/requests';

export const FriendsRequestsItem = ({ data, authorizedUser, context }) => {
  const [added, setAdded] = useState(false);
  const [errors, setErrors] = useState([]);
  const userFriends = authorizedUser.friends ? JSON.parse(authorizedUser.friends) : [];
  const confirmedUser = userFriends
    .filter((item) => {
      return item.id === data._id;
    })
    .map((item) => item.success)[0];

  const [confirmFriend, { loading }] = useMutation(CONFIRM_FRIEND, {
    update(proxy, { data: { confirmFriend: userData } }) {
      context.confirmFriend({ ...context.user, friends: userData.friends });
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { confirmFriend: { _id: authorizedUser._id, friend: data._id } },
  });

  const confirmFriendHandler = () => {
    setAdded(!added);
    confirmFriend();
  };

  if (!confirmedUser) {
    return (
      <div className="friends__wrapper-item">
        <div className="friends__wrapper-item_avatar">
          <img src={data.avatar} alt={data.email} />
        </div>
        <div className="friends__wrapper-item-footer d-flex justify-content-sb align-items-center">
          <div className="friends__wrapper-item-content d-flex flex-direction-column justify-content-center align-items-start">
            <Link to={`/profile/${data.email}`} className="friends__wrapper-item_name">
              {data.firstName} {data.lastName}
            </Link>
            <div className="friends__wrapper-item_commonFriends">
              {!confirmedUser ? `Принять?` : 'Ожидает подтверждения'}
            </div>
          </div>
          <div className="friends__wrapper-item-action">
            <button className="friends__wrapper-item-action-btn" onClick={confirmFriendHandler}>
              {!confirmedUser ? <PersonAddAltOutlinedIcon sx={{ width: 20 }} /> : false}
            </button>
          </div>
        </div>
      </div>
    );
  }
};
