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
    name: String
    description: String
    favorite: Boolean
  }

  input DestinationDTO {
    name: String
    description: String
  }

  type Query {
    getDestinationById(id: ID!): Destination
    tasks(page: Int!, size: Int!): [Destination]
  }

  type Mutation {
    createDestination(task: DestinationDTO!): Boolean
    updateDestination(id: ID!, task: DestinationDTO!): Boolean
    deleteDestination(id: ID!): Destination
    updateStatus(id: ID!, status: Boolean): Boolean
  }
`;

const resolvers = {
  Query: {
    getDestinationById: (root, args) => readDestinationById(args.id),
    tasks: (root, { page, size }) => getPaginatedDestinations(page, size),
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
