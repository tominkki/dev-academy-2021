import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/type-defs';
import resolvers from './graphql/resolvers';
import router from './app';
import { PORT } from './utils/config';

const app = express();
app.use(express.json());
app.use('/api', router);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app, path: '/api/graphql' });
const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server ready at localhost:${PORT}/api`);
  console.log(`GraphQl server ready at localhost:${PORT}${server.graphqlPath}`);
});
