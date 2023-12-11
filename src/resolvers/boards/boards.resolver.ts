import Board from "@/model/Board";
import User from "@/model/User";
import { boardService } from "@/services/board.service";
import { IResolvers } from "mercurius";

export default {
  User: {
    boards: async (_, __, context) => {
      return boardService(context).getUserBoardIds(context?.auth?.user as User);
    },
  },
  BoardMutations: {
    createBoard: (_, args, context) =>
      boardService(context).createBoard(args.input),
    deleteBoard: (_, args, context) => {
      return boardService(context).deleteBoard(
        args.input.boardId as number,
        (context.auth?.user as User)?.id
      );
    },
    updateBoard: (_, args, context) => {
      return boardService(context).updateBoard(args.input);
    },
  },
} as IResolvers;
