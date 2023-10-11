import { IResolvers } from "mercurius";

const resolvers: IResolvers = {
  Query: {
    add: async (_: any, { x, y }: { x: number; y: number }, ctx) => {
      return x + y;
    },
  },
};

export default resolvers;
