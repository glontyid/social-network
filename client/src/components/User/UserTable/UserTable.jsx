import React, { useState, useEffect } from 'react';
import { UserTableItem } from './UserTableItem/UserTableItem';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { GET_USER_POSTS, SUBSCRIBE_POST } from '../../../requests/requests';
import { UserTableForm } from './UserTableForm/UserTableForm';

export const UserTable = ({ currentUser, user, userEmail }) => {
  const [posts, setPosts] = useState([]);
  const {
    loading,
    error,
    data = [],
    refetch,
  } = useQuery(GET_USER_POSTS, {
    variables: { userId: user._id },
  });

  const { isNewData = data, isLoading = loading } = useSubscription(SUBSCRIBE_POST, {
    onSubscriptionData: (data) => {
      const post = data.subscriptionData.data.postCreated;

      if (!isLoading) setPosts([...isNewData.getPost, post]);
    },
    onError({ graphQLErrors }) {
      console.log(graphQLErrors);
    },
  });

  useEffect(() => {
    setPosts(data.getPost);
    refetch();
  }, [loading, userEmail]);

  return (
    <div className="profile__table container">
      <div className="profile__table-title">Все записи</div>
      <div className="profile__table-content">
        {posts &&
          posts.map((item, index) => {
            return <UserTableItem user={user} post={item} key={index} />;
          })}
      </div>
      <UserTableForm currentUser={currentUser} user={user} setPosts={setPosts} posts={posts} />
    </div>
  );
};
