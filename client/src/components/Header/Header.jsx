import React, { useContext } from 'react';
import NotificationBar from './NotificationBar/NotificationBar';
import UserMenu from './UserMenu/UserMenu';
import SearchBar from './SearchBar/SearchBar';
import { AuthContext } from '../../context/authContext';

const Header = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <div className="header-container">
      <section className="header">
        <div className="header__logo">LOGO</div>
        <div className="header__bars d-flex align-items-center justify-content-sb">
          <SearchBar />
          <NotificationBar />
        </div>
        <div className="header__menu d-flex align-items-center justify-content-end">
          <UserMenu login={login} logout={logout} user={user} />
        </div>
      </section>
    </div>
  );
};

export default Header;
