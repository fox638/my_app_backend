import { IResolvers } from "mercurius";

const resolvers: IResolvers = {
  Mutation: {
    auth: () => ({}),
    board: () => ({}),
    column: () => ({}),
  },
};

export default resolvers;
