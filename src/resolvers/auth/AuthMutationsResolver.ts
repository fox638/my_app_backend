import { IResolvers } from "mercurius";
import { authService } from "../../services/authService";
import { AuthMutationsSignInArgs } from "types/resolver-gql";

const authMutationsResolver: IResolvers = {
  AuthMutations: {
    login: (_, args, context, info) => {
      context.reply.setCookie("x-user", "admin", {
        httpOnly: true,
      });
      return {
        username: "testUser",
      };
    },
    signIn: (_, args: AuthMutationsSignInArgs, context, info) => {
      return authService(context).signIn(args.input);
    },
  },
};

export default authMutationsResolver;
