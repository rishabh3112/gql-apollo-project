import { ApolloServer, gql } from "apollo-server";

import {
  addDestination,
  getPaginatedDestinations,
  readDestinationById,
  removeDestination,
  updateDestinationById,
} from "./db.js";

const typeDefs = gql`
  type Destination {
    id: ID!
    name: String!
    description: String!
    location: String
    rating: Int
    favorite: Boolean
  }

  input DestinationDTO {
    name: String
    location: String
    rating: Int
    description: String
  }

  type Query {
    getDestinationById(id: ID!): Destination
    destinations(page: Int!, size: Int!): [Destination]
  }

  type Mutation {
    createDestination(task: DestinationDTO!): Boolean
    updateDestination(id: ID!, task: DestinationDTO!): Boolean
    deleteDestination(id: ID!): Destination
    markFavorite(id: ID!, status: Boolean): Boolean
  }
`;

const resolvers = {
  Query: {
    getDestinationById: (root, args) => readDestinationById(args.id),
    destinations: (root, { page, size }) =>
      getPaginatedDestinations(page, size),
  },
  Mutation: {
    createDestination: (root, { task }) => addDestination(task),
    updateDestination: (root, { task, id }) => updateDestinationById(id, task),
    deleteDestination: (root, { id }) => removeDestination(id),
    updateStatus: (root, { id, status }) =>
      updateDestinationById(id, { favorite: status }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server endpoint: ${url}`);
});
