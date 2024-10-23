import { ApolloServer, gql } from "apollo-server";
import {
  addTask,
  getPaginatedTasks,
  readTaskById,
  removeTask,
  updateTaskById,
} from "./db.js";

const typeDefs = gql`
  type Task {
    id: ID!
    name: String
    description: String
    completed: Boolean
  }

  input TaskDTO {
    name: String
    description: String
  }

  type Query {
    getTaskById(id: ID!): Task
    tasks(page: Int!, size: Int!): [Task]
  }

  type Mutation {
    createTask(task: TaskDTO!): Boolean
    updateTask(id: ID!, task: TaskDTO!): Boolean
    deleteTask(id: ID!): Task
    updateStatus(id: ID!, status: Boolean): Boolean
  }
`;

const resolvers = {
  Query: {
    getTaskById: (root, args) => readTaskById(args.id),
    tasks: (root, { page, size }) => getPaginatedTasks(page, size),
  },
  Mutation: {
    createTask: (root, { task }) => addTask(task),
    updateTask: (root, { task, id }) => updateTaskById(id, task),
    deleteTask: (root, { id }) => removeTask(id),
    updateStatus: (root, { id, status }) =>
      updateTaskById(id, { completed: status }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server endpoint: ${url}`);
});
