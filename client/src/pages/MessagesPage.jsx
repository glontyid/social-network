import React, { useRef, useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MessengerChat } from '../components/Messenger/MessengerChat/MessengerChat';
import { MessengerFriends } from '../components/Messenger/MessengerFriends/MessengerFriends';

export const MessagesPage = () => {
  return (
    <div className="messenger">
      <div className="messenger__wrapper">
        <div className="messenger__left">
          <MessengerFriends />
        </div>
        <div className="messenger__right">
          <Routes>
            <Route path=":email" element={<MessengerChat />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
