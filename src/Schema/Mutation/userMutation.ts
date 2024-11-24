import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLString } from "graphql";
import { Users } from "../../Entities/userEntity";
import { UserType } from "../TypeDefs/userType";
import { MesageType } from "../TypeDefs/messageType";
import bycrypt from "bcryptjs";

// Funcion para crear un nuevo usuario en la base de datos.
export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_: any, args: any) => {
    const { name, username, password } = args;

    const encryptedPassword = await bycrypt.hash(password, 10);

    const result = await Users.insert({
      name,
      username,
      password: encryptedPassword,
    });

    return {
      ...args,
      id: result.identifiers[0].id,
      password: encryptedPassword,
    };
  },
};

// Funcion para borrar un usuario de la base de datos.
export const DELETE_USER = {
  type: MesageType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_: any, args: any) => {
    const result = await Users.delete(args.id);
    if(result.affected === 1){
      return {
        success: true,
        message: "User deleted successfully"
      };
    } 
    return {
      success: false,
      message: "User not found"
    };
  },
};

// Funcion para actualizar un usuario de la base de datos.
export const UPDATE_USER = {
  type: MesageType,
  args: {
    id: { type: GraphQLID },
    input: {
      type: new GraphQLInputObjectType({
        name: "UserInput",
        fields: {
          name: { type: GraphQLString },
          username: { type: GraphQLString },
          oldPassword: { type: GraphQLString },
          newPassword: { type: GraphQLString },
        }
        
      })
    }
  },
  resolve: async (_: any, {id,input}: any) => {
    const userFound = await Users.findOneBy({id});

    if(!userFound){
      return {
        success: false,
        message: "User not found"
      }
    } 

    const isMatch = await bycrypt.compare(input.oldPassword, userFound?.password || "");

    if(!isMatch) {
      return {
        success: false,
        message: "Old password is incorrect"
      }
    }
    
    const encryptedPassword = await bycrypt.hash(input.newPassword, 10);
    
    const result = await Users.update({id}, {
      name: input.name,
      username: input.username,
      password: encryptedPassword
    })
    
    if (result.affected === 0) {
      return {
        success: false,
        message: "User not updated"
      }
    }

    return {
      success: true,
      message: "User updated successfully"
    };
  },
};