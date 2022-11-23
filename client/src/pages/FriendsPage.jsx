import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FriendsItem } from '../components/Friends/FriendsItem/FriendsItem';
import { FriendsSearch } from '../components/Friends/FriendsSearch/FriendsSearch';
import { FriendsSideBar } from '../components/Friends/FriendsSideBar/FriendsSideBar';
import { useParams } from 'react-router-dom';
import { UserFriends } from '../components/Friends/UserFriends/UserFriends';
import { GET_ALL_USERS } from '../requests/requests';
import { AuthContext } from '../context/authContext';
import { FriendsRequests } from '../components/Friends/FriendsRequests/FriendsRequests';

export const FriendsPage = () => {
  const context = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const queryParams = useParams();

  const components = () => {
    if (queryParams.my === 'my') {
      return <UserFriends />;
    } else if (queryParams.my === 'requests') {
      return <FriendsRequests />;
    } else {
      return (
        <div className="friends__wrapper">
          {loading ? (
            <div>Загрузка</div>
          ) : (
            data.getUsers
              .filter((item) => item.email !== context.user.email)
              .map((item, index) => {
                return <FriendsItem data={item} key={index} context={context} />;
              })
          )}
        </div>
      );
    }
  };

  return (
    <div className="friends-page">
      <section className="friends">
        <FriendsSearch />
        {components()}
      </section>
      <FriendsSideBar />
    </div>
  );
};
