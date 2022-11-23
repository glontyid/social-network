const messagesResolvers = require('./messages');
const usersResolvers = require('./users');
const postsResolvers = require('./posts');

module.exports = {
  Query: {
    ...messagesResolvers.Query,
    ...postsResolvers.Query,
    ...usersResolvers.Query
  },
  Mutation: {
    ...messagesResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...usersResolvers.Mutation
  },
  Subscription: {
    ...messagesResolvers.Subscription,
    ...postsResolvers.Subscription,
    ...usersResolvers.Subscription
  }
}