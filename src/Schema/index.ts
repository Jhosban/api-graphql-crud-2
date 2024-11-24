import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GREETING } from "./Queries/greeting";
import { CREATE_USER, DELETE_USER, UPDATE_USER } from "./Mutation/userMutation";
import { GET_ALL_USERS, GET_USER } from "./Queries/userQuery";

// Query principal del api
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    greeting: GREETING,
    getAllUsers: GET_ALL_USERS,
    getUser: GET_USER
  },
});

// Mutation principal del api
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updateUser: UPDATE_USER
  },
});

// Exportacion del esquema del api que sera utilizado en el servidor
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
