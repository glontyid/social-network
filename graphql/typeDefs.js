const { gql } = require('apollo-server');

module.exports = gql`
  type Message {
    text: String,
    createdBy: String,
    createdAt: String,
    createdFor: String,
  }

  type Post {
    userId: String,
    content: String,
    author: String,
    createdAt: String,
    createdBy: String,
    createdTo: String,
  }

  input MessageInput {
    text: String,
    createdBy: String,
    createdFor: ID,
  }

  input PostInput {
    userId: ID,
    author: String,
    content: String
    createdBy: String,
    createdTo: String
  }

  type User {
    _id: ID,
    username: String,
    email: String,
    password: String,
    token: String,
    firstName: String,
    lastName: String,
    city: String,
    birthday: String,
    avatar: String,
    friends: String,
    friendsRequests: String
  }

  input RegisterInput {
    username: String,
    email: String,
    password: String,
    confirmPassword: String,
    firstName: String,
    lastName: String,
    city: String,
    avatar: String,
    birthday: String,
    friends: String,
    friendsRequests: String,
  }

  input LoginInput {
    email: String,
    password: String
  }

  input UpdateUserInput {
    email: String,
    firstName: String,
    lastName: String,
    city: String,
    birthday: String,
    friends: String,
    friendsRequests: String,
    avatar: String
  }

  input changeUserDataInput {
    email: String,
    firstName: String,
    lastName: String,
    city: String,
    avatar: String,
    birthday: String,
    friends: String,
    friendsRequests: String,
  }

  input addToFriendsInput {
    _id: ID!,
    friend: ID,
  }

  input confirmFriend {
    _id: ID!,
    friend: ID,
  }

  input removeFromFriendsInput {
    _id: ID!,
    friend: ID,
  }

  input getUserFriends {
    email: [String]
  }

  type Query {
    user(id: ID!): User
    getUsers: [User]
    getUser(email: String): User
    getUserById(_id: ID!): User
    getUserFriends(email: [String]): [User]
    getPost(userId: String): [Post]
    getMessage(createdFor: String!, createdBy: String!): [Message]! 
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!
    createPost(postInput: PostInput): Post!
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    updateUser(updateInput: UpdateUserInput): User
    changeUserData(changeUserDataInput: changeUserDataInput): User
    addToFriends(addToFriendsInput: addToFriendsInput): User
    confirmFriend(confirmFriend: confirmFriend): User
    removeFromFriends(removeFromFriendsInput: removeFromFriendsInput): User
  }

  type Subscription {
    messageCreated: Message,
    postCreated: Post,
    userUpdated: User
  }
`