import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
}

if (localStorage.getItem('token')) {
  const decodedToken = jwtDecode(localStorage.getItem('token'));
  const userData = localStorage.getItem('userData')

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  } else {
    initialState.user = {...JSON.parse(userData)};
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  update: (userData) => {},
  logoun: () => {}
});

function authReducer(state, action) {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    case 'UPDATE':
      return {
        ...state,
        user: action.payload
      }
    case 'ADD_FRIEND':
      return {
        ...state,
        user: {...state.user, friendsRequests: action.payload.friendsRequests}
      }
    case 'CONFIRM_FRIEND':
      return {
        ...state,
        user: {...state.user, friends: action.payload.friends}
      }
    case 'REMOVE_FRIEND':
      return {
        ...state,
        user: {...state.user, friends: action.payload.friends}
      }
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch({
      type: 'LOGIN',
      payload: userData
    })
  }

  function logout() {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  }

  const update = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData))
    dispatch({
      type: 'UPDATE',
      payload: userData
    })
  }

  const addFriend = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData))
    dispatch({
      type: 'ADD_FRIEND',
      payload: userData
    })
  }

  const confirmFriend = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData))
    dispatch({
      type: 'CONFIRM_FRIEND',
      payload: userData
    })
  }

  const removeFriend = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData))
    dispatch({
      type: 'REMOVE_FRIEND',
      payload: userData
    })
  }

  return (
    <AuthContext.Provider
      value={{user: state.user, login, logout, update, addFriend, confirmFriend, removeFriend}}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider };

