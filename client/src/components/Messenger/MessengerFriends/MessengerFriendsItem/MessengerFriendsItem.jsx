import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const MessengerFriendsItem = ({ data, context }) => {
  return (
    <NavLink
      to={`${data.email}`}
      className={({ isActive }) => (isActive ? 'messenger__friends-active' : '')}>
      <div className="messenger__friends-item d-flex">
        <div className="messenger__friends-item__avatar d-flex">
          <img src={data.avatar} alt="аватар" />
        </div>
        <div className="messenger__friends-item__content d-flex flex-direction-column justify-content-sb">
          <div className="d-flex justify-content-sb">
            <div className="messenger__friends-item__username">
              {data.firstName} {data.lastName}
            </div>
            <div className="messenger__friends-item__message-time">11 ноя</div>
          </div>
          <div className="messenger__friends-item__message-text d-flex justify-content-start">
            последнее сообщение
          </div>
        </div>
      </div>
    </NavLink>
  );
};
