import { useQuery } from '@apollo/react-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { GET_USER, GET_USER_MESSAGES } from '../../../requests/requests';
import { MessengerChatForm } from './MessengerChatFrom/MessengerChatForm';
import { MessengerChatItem } from './MessengerChatItem/MessengerChatItem';
import { MessengerChatWrapper } from './MessengerChatWrapper/MessengerChatWrapper';

export const MessengerChat = () => {
  const [changeData, setChangeData] = useState(false);
  const { email } = useParams();
  const context = useContext(AuthContext);
  const friend = useQuery(GET_USER, {
    variables: { email: email },
  });

  useEffect(() => {
    console.log(email);
    setChangeData(!changeData);
  }, [email]);

  return (
    <div className="messenger__chat d-flex flex-direction-column">
      {!friend.loading && <MessengerChatWrapper context={context} friend={friend} />}
      <div className="messenger__chat-form">
        {!friend.loading && <MessengerChatForm user={friend.data.getUser} context={context.user} />}
      </div>
    </div>
  );
};
