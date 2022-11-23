import { useQuery, useSubscription } from '@apollo/react-hooks';
import React, { useEffect, useState } from 'react';
import { GET_USER_MESSAGES, SUBSCRIBE_MESSAGES } from '../../../../requests/requests';
import { MessengerChatItem } from '../MessengerChatItem/MessengerChatItem';

export const MessengerChatWrapper = ({ context, friend }) => {
  const [messages, setMessages] = useState([]);
  const {
    loading,
    error,
    data = [],
    refetch,
  } = useQuery(GET_USER_MESSAGES, {
    variables: { createdBy: context.user._id, createdFor: friend.data.getUser._id },
  });

  const { isNewData = data, isLoading = loading } = useSubscription(SUBSCRIBE_MESSAGES, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;

      if (!isLoading) setMessages([...isNewData.getMessage, message]);
    },
    onError({ graphQLErrors }) {
      console.log(graphQLErrors);
    },
  });

  useEffect(() => {
    setMessages(data.getMessage);
    refetch();
  }, [messages]);

  return (
    <div className="d-flex flex-direction-column" style={{ height: 'calc(100% - 60px)' }}>
      <div className="messenger__chat-title">{`${friend.data.getUser.firstName} ${friend.data.getUser.lastName}`}</div>
      <div className="d-flex flex-direction-column messenger__chat-wrapper">
        {!loading &&
          !friend.loading &&
          data.getMessage.map((item, index) => (
            <MessengerChatItem
              messageData={item}
              user={friend.data.getUser}
              context={context.user}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};
