import React from 'react';
import { formatDate } from '../../../utility/helpers';

export const UserDetails = ({ user }) => {
  return (
    <div className="profile__details container">
      <h3 className="profile__details-name">
        {user.lastName} {user.firstName}
      </h3>
      <div className="profile__details-content">
        {user.birthday && (
          <div className="profile__details-content_field">
            <div className="profile__details-content_field-label">День рождения:</div>
            <div className="profile__details-content_field-value">{formatDate(user.birthday)}</div>
          </div>
        )}
        <div className="profile__details-content_field">
          <div className="profile__details-content_field-label">Город:</div>
          <div className="profile__details-content_field-value">{user.city}</div>
        </div>
        <div className="profile__details-content_field">
          <div className="profile__details-content_field-label">Эмейл:</div>
          <div className="profile__details-content_field-value">{user.email}</div>
        </div>
      </div>
    </div>
  );
};
