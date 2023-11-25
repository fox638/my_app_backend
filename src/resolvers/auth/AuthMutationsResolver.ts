import { IResolvers } from "mercurius";
import { authService } from "../../services/authService";

const authMutationsResolver: IResolvers = {
  AuthMutations: {
    login: (_, args, context, info) => {
      return authService(context).login(args.input);
    },
    signUp: (_, args, context, info) => {
      return authService(context).signUp(args.input);
    },
  },
};

export default authMutationsResolver;
