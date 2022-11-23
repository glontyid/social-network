const Post = require('../../models/Post');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

module.exports = {
  Mutation: {
    async createPost(_, { postInput: {content, author, userId, createdTo} }) {
      const newPost = new Post({
        userId: userId,
        content: content,
        author: author,
        createdAt: new Date().toISOString(),
        createdBy: createdTo,
        createdTo: userId
      });

      const res = await newPost.save();

      pubsub.publish('SUBSCRIBE_POST', {
        postCreated: {
          userId: userId,
          content: content,
          author: author,
          createdAt: new Date().toISOString(),
          createdBy: createdTo,
          createdTo: userId
        }
      })

      return {
        id: res.id,
        ...res._doc
      }
    }
  },
  Subscription: {
    postCreated: {
      subscribe: () => pubsub.asyncIterator(['SUBSCRIBE_POST'])
    }
  },
  Query: {
    getPost: async (_, {userId}) => {
      return await Post.find({userId: userId})
    }
  }
}