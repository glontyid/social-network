import gql from "graphql-tag";

export const GET_USER = gql`
  query GetUser($email: String) {
    getUser(email: $email) {
      _id
      email
      firstName
      lastName
      city
      birthday
      avatar
      friends
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(_id: $id) {
      _id
      username
      email
      password
      token
      firstName
      lastName
      city
      birthday
      avatar
      friends
    }
  }
`

export const GET_USER_FRIENDS = gql`
  query GetUserFriends($email: [String]) {
    getUserFriends(email: $email) {
      _id
      email
      firstName
      lastName
      avatar
      friends
      friendsRequests
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getUsers {
    getUsers {
      _id
      email
      firstName
      lastName
      avatar
      friends
      friendsRequests
    }
  }
`;

export const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      token
      username
      firstName
      lastName
      city
      avatar
      birthday
      token
      friends
      friendsRequests
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      _id
      email
      username
      firstName
      lastName
      city
      avatar
      birthday
      token
      friends
      friendsRequests
    }
  }
`;

export const CHANGE_USER_DATA = gql`
  mutation Mutation($changeUserDataInput: changeUserDataInput) {
    changeUserData(changeUserDataInput: $changeUserDataInput) {
      avatar
      birthday
      city
      email
      firstName
      lastName
      friends
      friendsRequests
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation($updateInput: UpdateUserInput) {
    updateUser(updateInput: $updateInput) {
      email
      firstName
      lastName
      city
      avatar
      birthday
      friends
      friendsRequests
    }
  }
`;

export const GET_USER_POSTS = gql`
  query GetPost($userId: String) {
    getPost(userId: $userId) {
      createdTo
      createdBy
      createdAt
      content
    }
  }
`

export const GET_USER_MESSAGES = gql`
  query GetMessage($createdFor: String!, $createdBy: String!) {
    getMessage(createdFor: $createdFor, createdBy: $createdBy) {
      text
      createdBy
      createdAt
      createdFor
    }
  }
`

export const CREATE_POST = gql`
  mutation Mutation($postInput: PostInput) {
    createPost(postInput: $postInput) {
      userId
      author
      content
      createdAt
      createdBy
      createdTo
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation Mutation($messageInput: MessageInput) {
    createMessage(messageInput: $messageInput) {
      createdAt
      createdBy
      createdFor
      text
    }
  }
`

export const SUBSCRIBE_POST = gql`
  subscription PostCreated {
    postCreated {
      userId
      content
      author
      createdAt
      createdBy
      createdTo
    }
  }
`

export const SUBSCRIBE_MESSAGES = gql`
  subscription messageCreated {
    messageCreated {
      createdBy
      createdFor
      createdAt
      text
    }
  }
`

export const ADD_TO_FRIENDS = gql`
  mutation Mutation($addToFriendsInput: addToFriendsInput) {
    addToFriends(addToFriendsInput: $addToFriendsInput) {
      friends
    }
  }
`;

export const CONFIRM_FRIEND = gql`
  mutation Mutation($confirmFriend: confirmFriend) {
    confirmFriend(confirmFriend: $confirmFriend) {
      friends
    }
  }
`;

export const REMOVE_FROM_FRIENDS = gql`
  mutation Mutation($removeFromFriendsInput: removeFromFriendsInput) {
    removeFromFriends(removeFromFriendsInput: $removeFromFriendsInput) {
      friends
    }
  }
`;