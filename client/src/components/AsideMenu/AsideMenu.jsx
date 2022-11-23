import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextsmsIcon from '@mui/icons-material/Textsms';
import PeopleIcon from '@mui/icons-material/People';

const AsideMenu = () => {
  return (
    <div className="asideMenu">
      <ul>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? 'asideMenu__link active' : 'asideMenu__link')}>
            <AccountCircleIcon sx={{ width: 19, height: 19 }} className="asideMenu__link-icon" />
            Моя страница
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/friends"
            className={({ isActive }) => (isActive ? 'asideMenu__link active' : 'asideMenu__link')}>
            <PeopleIcon sx={{ width: 19, height: 19 }} className="asideMenu__link-icon" />
            Друзья
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/messenger"
            className={({ isActive }) => (isActive ? 'asideMenu__link active' : 'asideMenu__link')}>
            <TextsmsIcon sx={{ width: 19, height: 19 }} className="asideMenu__link-icon" />
            Мессенджер
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AsideMenu;
