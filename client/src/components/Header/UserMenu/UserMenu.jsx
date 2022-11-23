import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UserMenu({ logout, user }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate('/');
    setAnchorEl(null);
  };

  return (
    <div className="userMenu">
      {user ? (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ padding: 0 }}>
            <div className="userMenu__content d-flex justify-content-start align-items-center">
              <div className="userMenu__content-avatar">
                <img src={user.avatar} alt="аватар" />
              </div>
              <div className="userMenu__content-name">{user.firstName + ' ' + user.lastName}</div>
            </div>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            <MenuItem onClick={handleClose}>
              <Link to="/edit">Редактировать</Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Link to="/">Выйти</Link>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Link to="/">
          <button>Войти</button>
        </Link>
      )}
    </div>
  );
}
