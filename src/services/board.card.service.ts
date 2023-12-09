import { CreateCardInput } from "@/generate/graphql";
import { MercuriusContext } from "mercurius";
import BoardCardModel from "@/model/BoardCard";

export function boardCardService(context: MercuriusContext) {
  const userId = context.auth?.user?.id as number;

  return {
    createBoardCard: async (input: CreateCardInput) => {
      try {
        const card = await BoardCardModel.query().insert({
          userId,
          ...input,
        });

        return {
          ok: true,
          card: {
            cardId: card.id,
            card: {} as BoardCardModel,
          },
        };
      } catch (error) {
        context.app.log.error("createBoardCard error", error);
        return {
          ok: false,
          error: {
            message: (error as Error).message,
          },
        };
      }
    },
  };
}
