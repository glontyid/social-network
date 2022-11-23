import './styles/App.scss';
import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import Header from './components/Header/Header';
import AsideMenu from './components/AsideMenu/AsideMenu';
import { PostRegistrationPage } from './pages/PostRegistrationPage';
import { FriendsPage } from './pages/FriendsPage';
import { MessagesPage } from './pages/MessagesPage';
import { EditProfilePage } from './pages/EditProfilePage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthContext } from './context/authContext';

function App() {
  const context = useContext(AuthContext);

  if (context.user === null) {
    return (
      <div className="app">
      <Header />
      <div className="app-body">
        <div></div>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <AsideMenu />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<ProfilePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/registration" element={<RegistrationPage/>}/>
            <Route path="/postregistration" element={<PostRegistrationPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}>
              <Route path="/profile:email" element={<ProfilePage />}/>
            </Route>
            <Route path="/edit" element={<EditProfilePage/>}/>
            <Route path="/friends" element={<FriendsPage/>}>
              <Route path=":my" element={<FriendsPage/>}/>
            </Route>
            <Route path="/messenger/*" element={<MessagesPage/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
