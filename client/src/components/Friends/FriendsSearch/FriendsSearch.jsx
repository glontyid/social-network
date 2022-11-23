import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

export const FriendsSearch = () => {
  return (
    <div className="friends__search">
      <div className="friends__search-title">Поиск друзей</div>
      <div className="friends__search-form">
        <SearchIcon className="friends__search-form_icon" />
        <input type="text" className="friends__search-form_input" placeholder="Введите запрос" />
      </div>
    </div>
  );
};
