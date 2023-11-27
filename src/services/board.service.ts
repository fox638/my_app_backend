import { boardModel } from "@/model/boards";
import { CreateBoardInput, CreateBoardResponse } from "@/types/resolver-gql";
import { MercuriusContext } from "mercurius";
import { Board, Users as User } from "@/generate/db";
import { UpdateBoardInput } from "@/generate/graphql";
import { onlyNotNullValue } from "@/utils/onlyNotNullValue";

export function boardService(context: MercuriusContext) {
  return {
    getUserBoardsInfo: async (userId: number): Promise<Board[]> => {
      return boardModel(context.app.knex).getBoardsByUserId(userId);
    },

    getUserBoardIds: async (
      user: User
    ): Promise<
      {
        boardId: number;
        board: {};
      }[]
    > => {
      try {
        return boardModel(context.app.knex)
          .getUserBordsId(user.id)
          .then((boardIds) =>
            boardIds.map(({ id: boardId }) => ({
              boardId,
              board: {},
            }))
          );
      } catch (error) {
        // TODO add logger
        console.log("getUserBoardIds", error);
        return [];
      }
    },
    createBoard: async (
      input: CreateBoardInput
    ): Promise<CreateBoardResponse> => {
      try {
        const boardId = await boardModel(context.app.knex).createBoard(
          context.auth?.user?.id as number,
          input
        );
        return {
          ok: true,
          board: {
            boardId,
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
    getBoard: async (boardId: number) => {
      return boardModel(context.app.knex).getBoardById(boardId);
    },
    deleteBoard: async (
      boardId: number,
      userId: number
    ): Promise<{
      ok: boolean;
      boardId: number | null;
      query: {};
    }> => {
      try {
        await boardModel(context.app.knex).deleteBoardById(boardId, userId);
        return {
          ok: true,
          boardId,
          query: {},
        };
      } catch {
        return {
          ok: false,
          boardId: null,
          query: {},
        };
      }
    },
    updateBoard: async ({ boardId, ...input }: UpdateBoardInput) => {
      try {
        const board = await boardModel(context.app.knex).updateBoard({
          id: boardId,
          ...onlyNotNullValue(input),
        });

        return {
          ok: true,
          board,
        };
        //TODO handle error
      } catch {
        return {
          ok: false,
          board: null,
        };
      }
    },
  };
}
