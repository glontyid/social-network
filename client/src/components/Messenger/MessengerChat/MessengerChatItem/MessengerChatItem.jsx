import React from 'react';

export const MessengerChatItem = ({ messageData, user, context }) => {
  const createdDate = new Date(Number(messageData.createdAt)).toLocaleTimeString().slice(0, -3);

  return (
    <section className="messenger__chat-item d-flex align-items-center">
      <div className="messenger__chat-item__avatar d-flex">
        <img
          src={messageData.createdBy === user._id ? `${user.avatar}` : `${context.avatar}`}
          alt=""
        />
      </div>
      <div className="messenger__chat-item__content">
        <div className="messenger__chat-item__content-wrapper d-flex">
          <div className="messenger__chat-item__username">
            {messageData.createdBy === user._id
              ? `${user.firstName} ${user.lastName}`
              : `${context.firstName} ${context.lastName}`}
          </div>
          <div className="messenger__chat-item__time">{createdDate}</div>
        </div>
        <div className="messenger__chat-item__message">{messageData.text}</div>
      </div>
    </section>
  );
};
