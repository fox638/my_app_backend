import { IResolvers } from "mercurius";
import UserModel from "@/model/User";

export default {
  Query: {
    me: (_, args, context) => context.auth?.user as UserModel,
  },
} as IResolvers;
