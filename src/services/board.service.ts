import { MercuriusContext } from "mercurius";
import type {
  Board,
  BoardInfo,
  CreateBoardInput,
  CreateBoardResponse,
  DeleteBoardResponse,
  UpdateBoardInput,
  UpdateBoardResponse,
} from "@/generate/graphql";
import { onlyNotNullValue } from "@/utils/onlyNotNullValue";
import UserModel from "@/model/User";
import BoardModel from "@/model/Board";
import BoardColumn from "@/model/BoardColumn";

export function boardService(context: MercuriusContext) {
  const userId = context.auth?.user?.id as number;

  return {
    getUserBoardIds: async (
      user: UserModel
    ): Promise<
      {
        boardId: number;
        board: {};
      }[]
    > => {
      try {
        return await user
          .$relatedQuery<BoardModel>("boards")
          .select("id")
          .then((resp) =>
            resp.map((item) => ({
              boardId: item.id,
              board: {},
            }))
          );
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
          .select("id");

        return {
          ok: true,
          board: {
            boardId: board.id,
            board: {} as Board,
          },
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
      const columns = await board
        .$relatedQuery<BoardColumn>("columns")
        .returning("id");
      return {
        ...board,
        columns: columns.map((item) => ({
          columnId: item.id,
          column: {} as BoardColumn,
        })),
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
          .where("userId", userId)
          .debug();
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
          .returning("id");

        return {
          ok: true,
          board: { boardId: updateBoard[0].id, board: {} as Board },
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
