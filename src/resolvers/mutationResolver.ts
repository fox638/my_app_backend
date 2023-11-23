import { IResolvers } from "mercurius";

const resolvers: IResolvers = {
  Mutation: {
    auth: () => ({}),
    board: () => ({}),
  },
};

export default resolvers;
