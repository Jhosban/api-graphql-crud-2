import { GraphQLID, GraphQLList } from "graphql";
import { Users } from "../../Entities/userEntity";
import { UserType } from "../TypeDefs/userType";

// Funcion para obtener todos los usuarios de la base de datos.
export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  async resolve() {
    return await Users.find();
  },
};

// Funcion para obtener un usuario de la base de datos.
export const GET_USER = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    return await Users.findOneBy({ id: args.id });
  },
};