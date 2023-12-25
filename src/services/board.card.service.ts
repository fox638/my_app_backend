import {
  Board,
  BoardCard,
  CreateCardInput,
  CreateCardResponse,
  DeleteCardInput,
  DeleteCardResponse,
  UpdateCardInput,
  UpdateCardResponse,
} from "@/generate/graphql";
import { MercuriusContext } from "mercurius";
import BoardCardModel from "@/model/BoardCard";
import UserModel from "@/model/User";
import { Either, right, left } from "@sweet-monads/either";
import BoardModel from "@/model/Board";
import { BoardColumnModel } from "@/model";
import { onlyNotNullValue } from "@/utils/onlyNotNullValue";

type BoardCardResp = Omit<BoardCard, "board">;
type CreateBoardCardResp = Promise<
  Omit<CreateCardResponse, "card"> & { card?: BoardCardResp }
>;

type GetCardsByUserIdArgs = {
  userId: number;
};

export function boardCardService(context: MercuriusContext) {
  const user = context.auth?.user as UserModel;
  const userId = user.id;

  return {
    createBoardCard: async (
      input: CreateCardInput
    ): Promise<CreateBoardCardResp> => {
      try {
        const board = await user.getOwnerdBoardById({ boardId: input.boardId });
        if (!board) {
          return {
            ok: false,
            error: {
              message: `User not ownerd board with id: ${input.boardId}`,
            },
          };
        }

        const column = await user.getOwnerdColumnById({
          columnId: input.columnId,
        });

        if (!column) {
          return {
            ok: false,
            error: {
              message: `User not ownerd column with id: ${input.columnId}`,
            },
          };
        }

        const card = await user
          .$relatedQuery<BoardCardModel>("cards")
          .insert({
            ...input,
          })
          .returning("*");

        return {
          ok: true,
          card,
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
    updateBoardCard: async (
      input: UpdateCardInput
    ): Promise<UpdateCardResponse> => {
      try {
        const card = await user.getOwnedBoardCardById({ cardId: input.cardId });
        if (!card) {
          return {
            ok: false,
            error: {
              message: `User not ownerd card with id: ${input.cardId}`,
            },
          };
        }

        const updateCard = await card
          .$query()
          .patchAndFetchById(
            card.id,
            onlyNotNullValue({
              order: input.order,
              title: input.title,
              description: input.description,
            })
          )
          .returning("*");

        return {
          ok: true,
          card: { ...updateCard, board: undefined as unknown as Board },
        };
      } catch (error) {
        return {
          ok: false,
          error: {
            message: (error as Error).message,
          },
        };
      }
    },

    deleteBoardCard: async (
      input: DeleteCardInput
    ): Promise<DeleteCardResponse> => {
      try {
        const card = await user.getOwnedBoardCardById({ cardId: input.cardId });
        if (!card) {
          return {
            ok: false,
            error: {
              message: `User not ownerd card with id: ${input.cardId}`,
            },
          };
        }

        await card.$query().delete();
        return {
          ok: true,
          cardId: input.cardId,
        };
      } catch (error) {
        return {
          ok: false,
          error: {
            message: (error as Error).message,
          },
        };
      }
    },
    getCardsByUserId: async ({
      userId,
    }: GetCardsByUserIdArgs): Promise<BoardCardResp[]> => {
      const cards = await BoardCardModel.query()
        .where("userId", userId)
        .returning("*");

      return cards ? cards : [];
    },
  };
}
