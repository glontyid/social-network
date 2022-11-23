import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NotificationBar = () => {
  return (
    <div className="header__notification-bar">
      <NotificationsIcon sx={{ color: '#fff', cursor: 'pointer' }} />
    </div>
  );
};

export default NotificationBar;
