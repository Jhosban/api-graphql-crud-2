import { GraphQLString } from "graphql";

// greeting
export const GREETING = {
  type: GraphQLString,
  resolve: () => "hello",
};
