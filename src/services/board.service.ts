import { MercuriusContext } from "mercurius";
import type {
  Board,
  BoardColumn,
  CreateBoardInput,
  CreateBoardResponse,
  DeleteBoardResponse,
  UpdateBoardInput,
  UpdateBoardResponse,
} from "@/generate/graphql";
import { onlyNotNullValue } from "@/utils/onlyNotNullValue";
import UserModel from "@/model/User";
import BoardModel from "@/model/Board";
import BoardColumnModel from "@/model/BoardColumn";

export function boardService(context: MercuriusContext) {
  const userId = context.auth?.user?.id as number;

  return {
    getUserBoardIds: async (user: UserModel) => {
      try {
        return await user.$relatedQuery<BoardModel>("boards").select("*");
      } catch (error) {
        context.app.log.error("getUserBoardIds error", error);
        return [];
      }
    },
    createBoard: async (
      input: CreateBoardInput
    ): Promise<CreateBoardResponse> => {
      try {
        const board = await BoardModel.query()
          .insert({
            userId,
            ...input,
          })
          .returning("id");

        return {
          ok: true,
          board: { ...board, columns: undefined as unknown as BoardColumn[] },
        };
      } catch (error) {
        return {
          ok: false,
          board: null,
        };
      }
    },
    getBoard: async (boardId: number): Promise<Board | null> => {
      const board = await BoardModel.query()
        .where("id", boardId)
        .where("userId", userId)
        .first();

      if (!board) {
        return null;
      }

      return {
        ...board,
        columns: undefined as unknown as BoardColumn[],
      };
    },
    deleteBoard: async (
      boardId: number,
      userId: number
    ): Promise<DeleteBoardResponse> => {
      try {
        const count = await BoardModel.query()
          .delete()
          .where("id", boardId)
          .where("userId", userId);

        if (count) {
          return {
            ok: true,
            boardId,
            query: {},
          };
        } else {
          return {
            ok: false,
            boardId: null,
            query: {},
          };
        }
      } catch (error) {
        context.app.log.error("deleteBoard error", error);
        return {
          ok: false,
          boardId: null,
          query: {},
        };
      }
    },
    updateBoard: async ({
      boardId,
      ...input
    }: UpdateBoardInput): Promise<UpdateBoardResponse> => {
      try {
        const updateBoard = await BoardModel.query()
          .where("id", boardId)
          .where("userId", userId)
          .patch(onlyNotNullValue(input))
          .returning("*");

        return {
          ok: true,
          board: {
            ...updateBoard[0],
            columns: undefined as unknown as BoardColumn[],
          },
        };
      } catch (error) {
        return {
          ok: false,
          board: null,
          error: {
            __typename: "ErrorMessage",
            message: (error as Error)?.message,
          },
        };
      }
    },
  };
}
