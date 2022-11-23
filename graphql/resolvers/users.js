const User = require('../../models/User');
const { PubSub } = require('graphql-subscriptions');
const { ApolloError } = require('apollo-server-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pubsub = new PubSub();

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        throw new ApolloError(`Пользователь с почтой ${email} уже существует`, 'USER_ALREADY_EXISTS')
      }

      var encryptedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword
      })

      const token = jwt.sign(
        {
          user_id: newUser._id, email
        },
        'SUPER_SAFE_STRING',
        {
          expiresIn: '2h'
        }
      );

      newUser.token = token;

      const res = await newUser.save();

      return {
        id: res.id,
        ...res._doc
      }
    },
    async loginUser(_, { loginInput: { email, password } }) {
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          {
            user_id: user._id, email
          },
          'SUPER_SAFE_STRING',
          {
            expiresIn: '2h'
          }
        );

        user.token = token;

        return {
          id: user.id,
          ...user._doc
        }
      } else {
        throw new ApolloError('Некорректный пароль', 'INCORRECT_PASSWORD')
      }
    },
    async updateUser(_, { updateInput: { email, firstName, lastName, city, birthday } }) {
      const user = await User.findOne({ email });
      
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.city = city;
        user.birthday = birthday;
      }

      const res = await user.save();

      pubsub.publish('USER_UPDATED', {
        userUpdated: {
          firstName: firstName,
          lastName: lastName,
          city: city,
          birthday: user.birthday
        }
      })

      return {
        id: res.id,
        ...res._doc
      }
    },
    async addToFriends(_, { addToFriendsInput: { _id, friend } }) {
      const _user = await User.findById({ _id });
      const _friend = await User.findById({ _id: friend });
      
      if (_user && _friend) {
        const userFriends = _user.friends.length ? JSON.parse(_user.friends) : [];
        const friendsRequests = _friend.friendsRequests.length ? JSON.parse(_friend.friendsRequests) : [];

        _user.friends = JSON.stringify([...userFriends, {id: _friend._id, email: _friend.email, success: false}]);
        _friend.friendsRequests = JSON.stringify([...friendsRequests, {id: _user._id, email: _user.email, success: false}]);
      }

      const res = await _user.save();
      await _friend.save();

      // pubsub.publish('USER_UPDATED', {
      //   userUpdated: {
      //     friends: friend
      //   }
      // })

      return {
        id: res.id,
        ...res._doc
      }
    },
    async confirmFriend(_, { confirmFriend: { _id, friend } }) {
      const _user = await User.findById({ _id });
      const _friend = await User.findById({ _id: friend });
      
      if (_user && _friend) {
        const userFriendList= _user.friends.length ? JSON.parse(_user.friends) : [];
        const userFriendsRequestsList = _user.friendsRequests.length ? JSON.parse(_user.friendsRequests) : [];
        let friendFriendList = _friend.friends.length ? JSON.parse(_friend.friends) : [];

        friendFriendList.forEach(item => {
          if (item.email === _user.email) {
            item.success = true
          }
        });

        _user.friends = JSON.stringify([...userFriendList, {id: _friend._id, email: _friend.email, success: true}]);
        _user.friendsRequests = JSON.stringify(userFriendsRequestsList.filter(item => {
          return item.email !== _friend.email
        }));
        _friend.friends = JSON.stringify([...friendFriendList]);
      }

      const res = await _user.save();
      await _friend.save();

      // pubsub.publish('USER_UPDATED', {
      //   userUpdated: {
      //     friends: friend
      //   }
      // })

      return {
        id: res.id,
        ...res._doc
      }
    },
    async removeFromFriends(_, { removeFromFriendsInput: { _id, friend } }) {
      const _user = await User.findById({ _id });
      const _friend = await User.findById({ _id: friend });
      
      if (_user && _friend) {
        const userFriendList= _user.friends.length ? JSON.parse(_user.friends) : [];
        let friendFriendList = _friend.friends.length ? JSON.parse(_friend.friends) : [];

        const filteredUserFriendList = userFriendList.filter(item => {
          return item.email !== _friend.email
        })

        const filteredFriendFriendList = friendFriendList.filter(item => {
          return item.email !== _user.email
        })

        _user.friends = JSON.stringify(filteredUserFriendList);
        _friend.friends = JSON.stringify(filteredFriendFriendList);
      }

      const res = await _user.save();
      await _friend.save();

      // pubsub.publish('USER_UPDATED', {
      //   userUpdated: {
      //     friends: friend
      //   }
      // })

      return {
        id: res.id,
        ...res._doc
      }
    },
    async changeUserData(_, { changeUserDataInput: { email, firstName, lastName, city, birthday, avatar } }) {
      const user = await User.findOne({ email });
      
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
        user.city = city;
        user.birthday = birthday;
        user.avatar = avatar;
      }

      const res = await user.save();

      pubsub.publish('USER_UPDATED', {
        userUpdated: {
          firstName: firstName,
          lastName: lastName,
          city: city,
          birthday: birthday,
          avatar: avatar,
        }
      })

      return {
        id: res.id,
        ...res._doc
      }
    }
  },
  Subscription: {
    userUpdated: {
      subscribe: () => pubsub.asyncIterator(['USER_UPDATED'])
    },
  },
  Query: {
    user: async (_, {ID}) => {
      return await User.findById(ID)
    },
    getUsers: async () => {
      return await User.find({})
    },
    getUser: async (_, { email }) => {
      return await User.findOne({email});
    },
    getUserById: async (_, {_id}) => {
      return await User.findById(_id)
    },
    getUserFriends: async (_, { email }) => {
      return await User.find({email});
    }
  }
}