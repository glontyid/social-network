const express = require('express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('../graphql/typeDefs');
const resolvers = require('../graphql/resolvers/index');

const _mongoDB = "mongodb+srv://testuser:testuser123@cluster0.gmnqe.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4000;

(async function () {
  const app = express();
  const cors = require('cors');
  app.use(cors());
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: '/graphql' }
  );

  const server = new ApolloServer({
    schema,
    context: ({req}) => ({req}),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            }
          }
        }
      }
    ]
  });

  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect(_mongoDB, {useNewUrlParser: true}).then(() => {
    console.log('MongoDB connected');

    httpServer.listen(PORT, () => {
      console.log("Server is running on " + PORT)
    })
  });
})();