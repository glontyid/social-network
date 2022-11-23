import { NavLink } from 'react-router-dom';
import React from 'react';

export const FriendsSideBar = () => {
  return (
    <section className="friends__sideBar d-flex flex-direction-column">
      <NavLink
        to="/friends"
        className={({ isActive }) =>
          isActive ? 'friends__sideBar-link active' : 'friends__sideBar-link'
        }>
        Поиск друзей
      </NavLink>
      <NavLink
        to="/friends/my"
        className={({ isActive }) =>
          isActive ? 'friends__sideBar-link active' : 'friends__sideBar-link'
        }>
        Мои друзья
      </NavLink>
      <NavLink
        to="/friends/requests"
        className={({ isActive }) =>
          isActive ? 'friends__sideBar-link active' : 'friends__sideBar-link'
        }>
        Заявки в друзья
      </NavLink>
    </section>
  );
};
