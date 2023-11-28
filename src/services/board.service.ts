import { CreateBoardInput, CreateBoardResponse } from "@/types/resolver-gql";
import { MercuriusContext } from "mercurius";
import { Board, UpdateBoardInput } from "@/generate/graphql";
import { onlyNotNullValue } from "@/utils/onlyNotNullValue";
import UserModel from "@/model/User";
import BoardModel from "@/model/Board";

export function boardService(context: MercuriusContext) {
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
          .debug()
          .then((resp) =>
            resp.map((item) => ({
              boardId: item.id,
              board: {},
            }))
          );
      } catch (error) {
        // TODO add logger
        console.log("getUserBoardIds error", error);
        return [];
      }
    },
    createBoard: async (
      input: CreateBoardInput
    ): Promise<CreateBoardResponse> => {
      try {
        const board = await BoardModel.query()
          .insert({
            userId: context.auth?.user?.id,
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
    getBoard: async (boardId: number) => {
      return await BoardModel.query().findById(boardId);
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
        await BoardModel.query()
          .delete()
          .where("id", boardId)
          .where("userId", userId)
          .debug();

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
        const updateBoard = await BoardModel.query().patchAndFetchById(
          boardId,
          onlyNotNullValue(input)
        );

        return {
          ok: true,
          board: updateBoard,
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
