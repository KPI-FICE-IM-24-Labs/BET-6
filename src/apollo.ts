import { readFileSync } from 'fs';
import path from 'node:path';
import e from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers';

const typeDefs = readFileSync(path.resolve(__dirname, 'graphql', 'schema.graphql'), 'utf-8');

export const startApolloServer = async (app: e.Express) => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};
