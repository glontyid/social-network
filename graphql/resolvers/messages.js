const Message = require('../../models/Message');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

module.exports = {
  Mutation: {
    async createMessage(_, { messageInput: {text, createdBy, createdFor} }) {
      const newMessage = new Message({
        text: text,
        createdBy: createdBy,
        createdFor: createdFor,
        createdAt: Date.parse(new Date().toISOString()),
      });

      const res = await newMessage.save();

      pubsub.publish('SUBSCRIBE_MESSAGES', {
        messageCreated: {
          text: text,
          createdBy: createdBy,
          createdFor: createdFor,
          createdAt: Date.parse(new Date().toISOString()),
        }
      })

      return {
        id: res.id,
        ...res._doc
      }
    }
  },
  Subscription: {
    messageCreated: {
      subscribe: () => pubsub.asyncIterator(['SUBSCRIBE_MESSAGES'])
    }
  },
  Query: {
    getMessage: async (_, { createdBy, createdFor }) => {
      const createdByMessages = await Message.find({ 
        createdBy,
        createdFor
      });
      const createdForMessages = await Message.find({ 
        createdFor: createdBy,
        CreatedBy: createdFor
      });

      const concatMessagesWithSortByTime = createdByMessages
      .concat(createdForMessages)
      .filter(item => {
        return item.createdFor === createdBy && item.createdBy === createdFor || item.createdFor === createdFor && item.createdBy === createdBy
      })
      .sort((a, b) => {
        return a.createdAt - b.createdAt
      })

      return concatMessagesWithSortByTime
    }
  }
}