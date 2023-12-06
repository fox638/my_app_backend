import { IResolvers } from "mercurius";

export default {
  BoardColumn: {
    cards: async ({ id }, _, context) => {
      return [];
    },
  },
  CardMutations: {},
} as IResolvers;
