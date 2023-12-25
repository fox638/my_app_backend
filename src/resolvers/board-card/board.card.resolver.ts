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
    updateCard: async (_, args, context) =>
      boardCardService(context).updateBoardCard(args.input),
    deleteCard: async (_, args, context) =>
      boardCardService(context).deleteBoardCard(args.input),
  },
  User: {
    cards: async ({ id: userId }, _, context) => {
      return boardCardService(context).getCardsByUserId({
        userId,
      });
    },
  },
} as IResolvers;
