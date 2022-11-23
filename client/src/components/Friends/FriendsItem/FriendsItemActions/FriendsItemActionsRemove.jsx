import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/authContext';
import { REMOVE_FROM_FRIENDS } from '../../../../requests/requests';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

export const FriendsItemActionsRemove = ({ data, setAdded, context }) => {
  const [errors, setErrors] = useState([]);
  const [removeFromFriends, { loading }] = useMutation(REMOVE_FROM_FRIENDS, {
    update(proxy, { data: { removeFromFriends: userData } }) {
      const filteredFriends = JSON.parse(userData.friends).filter((item) => {
        return item.email !== data.email;
      });

      context.removeFriend({ ...context.user, friends: JSON.stringify(filteredFriends) });
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { removeFromFriendsInput: { _id: context.user._id, friend: data._id } },
  });

  function buttonHandler() {
    setAdded(false);
    removeFromFriends();
  }

  return (
    <button className="friends__wrapper-item-action-btn" onClick={buttonHandler}>
      <PersonAddAltRoundedIcon sx={{ width: 20 }} />
    </button>
  );
};
