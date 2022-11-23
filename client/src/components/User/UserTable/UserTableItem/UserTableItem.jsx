import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { GET_USER_BY_ID } from '../../../../requests/requests';
import { Link } from 'react-router-dom';

export const UserTableItem = ({ post }) => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: post.createdBy },
  });

  if (!loading) {
    const { firstName, lastName, avatar, email } = data.getUserById;
    const newDate = new Date(post.createdAt).toLocaleString();

    return (
      <div className="profile__table-item">
        <div className="profile__table-item_header d-flex justify-content-start align-items-center">
          <div className="profile__table-item_header-avatar">
            <img src={avatar} alt={avatar} />
          </div>
          <div className="profile__table-item_header-wrapper">
            <div className="profile__table-item_header-author">
              <Link to={`${email}`}>
                {lastName} {firstName}
              </Link>
            </div>
            <div className="profile__table-item_header-time">{newDate}</div>
          </div>
        </div>
        <div className="profile__table-item_body">{post.content}</div>
      </div>
    );
  }
};
