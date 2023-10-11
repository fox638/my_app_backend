import { IResolvers } from "mercurius";

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
  },
};

export default authMutationsResolver;
