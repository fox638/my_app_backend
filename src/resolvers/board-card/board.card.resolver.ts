import { boardCardService } from "@/services/board.card.service";
import { IResolvers } from "mercurius";

export default {
  BoardColumn: {
    cards: async ({ id }, _, context) => {
      return [];
    },
  },
  CardMutations: {
    createCard: async (_, args, context) =>
      boardCardService(context).createBoardCard(args.input),
  },
} as IResolvers;
