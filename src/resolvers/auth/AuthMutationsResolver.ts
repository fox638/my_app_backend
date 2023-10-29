import { IResolvers } from "mercurius";
import { authService } from "../../services/authService";
import {
  AuthMutationsLoginArgs,
  AuthMutationsSignUpArgs,
} from "../../types/resolver-gql";

const authMutationsResolver: IResolvers = {
  AuthMutations: {
    login: (_, args: AuthMutationsLoginArgs, context, info) => {
      return authService(context).login(args.input);
    },
    signUp: (_, args: AuthMutationsSignUpArgs, context, info) => {
      return authService(context).signUp(args.input);
    },
  },
};

export default authMutationsResolver;
