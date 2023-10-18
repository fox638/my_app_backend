import { IResolvers } from "mercurius";
import { authService } from "../../services/authService";
import {
  AuthMutationsLoginArgs,
  AuthMutationsSignInArgs,
} from "../../types/resolver-gql";

const authMutationsResolver: IResolvers = {
  AuthMutations: {
    login: (_, args: AuthMutationsLoginArgs, context, info) => {
      return authService(context).login(args.input);
    },
    signIn: (_, args: AuthMutationsSignInArgs, context, info) => {
      return authService(context).signUp(args.input);
    },
  },
};

export default authMutationsResolver;
