import { IResolvers } from "mercurius";

const resolvers: IResolvers = {
  Mutation: {
    auth: () => ({}),
    board: () => ({}),
    column: () => ({}),
    card: () => ({}),
  },
};

export default resolvers;
