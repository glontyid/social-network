import { useMutation } from '@apollo/react-hooks';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/authContext';
import { ADD_TO_FRIENDS } from '../../../../requests/requests';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

export const FriendsItemActionsAdd = ({ data, setAdded, context }) => {
  const [errors, setErrors] = useState([]);
  const [addToFriends, { loading }] = useMutation(ADD_TO_FRIENDS, {
    update(proxy, { data: { addToFriends: userData } }) {
      context.addFriend({ ...context.user, friends: userData.friends });
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { addToFriendsInput: { _id: context.user._id, friend: data._id } },
  });

  function buttonHandler() {
    setAdded(true);
    addToFriends();
  }

  return (
    <button className="friends__wrapper-item-action-btn" onClick={buttonHandler}>
      <PersonAddAltOutlinedIcon sx={{ width: 20 }} />
    </button>
  );
};
