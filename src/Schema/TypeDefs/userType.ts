import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

// Tipo de dato personalizado para devolver la informacion del usuario
export const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});
