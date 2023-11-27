import { User as UserType } from "@/generate";
import Board from "@/model/Board";
import User from "@/model/User";
import { boardService } from "@/services/board.service";
import { IResolvers } from "mercurius";

export default {
  User: {
    boards: async (_, __, context) => {
      const board = await Board.query()
        .where("id", 6)
        .withGraphFetched({
          user: true,
        })
        .debug();

      console.log("board result", board);

      return boardService(context).getUserBoardIds(
        context?.auth?.user as UserType
      );
    },
  },
  BoardMutations: {
    createBoard: (_, args, context) =>
      boardService(context).createBoard(args.input),
    deleteBoard: (_, args, context) => {
      return boardService(context).deleteBoard(
        args.input.boardId as number,
        (context.auth?.user as UserType)?.id
      );
    },
    updateBoard: (_, args, context) => {
      return boardService(context).updateBoard(args.input);
    },
  },
  BoardInfo: {
    board: ({ boardId }, _, context) =>
      //TODO add loaders
      boardService(context).getBoard(boardId),
  },
} as IResolvers;
