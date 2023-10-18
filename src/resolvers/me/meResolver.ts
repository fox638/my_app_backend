import { IResolvers } from "mercurius";
import { User } from "../../types/resolver-gql";

export default {
  Query: {
    me: (_, args, context) => context.auth?.user as User,
  },
} as IResolvers;
