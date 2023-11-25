import { User } from "@/generate";
import { boardService } from "@/services/board.service";
import { IResolvers } from "mercurius";

export default {
  User: {
    boards: (_, __, context) => {
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
  BoardInfo: {
    board: ({ boardId }, _, context) =>
      //TODO add loaders
      boardService(context).getBoard(boardId),
  },
} as IResolvers;
