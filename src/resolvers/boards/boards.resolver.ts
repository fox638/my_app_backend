import { boardService } from "@/services/board.service";
import { CreateBoardInput } from "@/types/resolver-gql";
import { IResolvers } from "mercurius";
import { Users } from "types";

export default {
  User: {
    boards: (_, __, context) => {
      return boardService(context).getUserBoardIds(context.auth?.user as Users);
    },
  },
  BoardMutations: {
    createBoard: (_, args, context) =>
      boardService(context).createBoard(args.input as CreateBoardInput),
    deleteBoard: (_, args, context) => {
      return boardService(context).deleteBoard(
        args.input.boardId as number,
        context.auth?.user.id
      );
    },
  },
  BoardInfo: {
    // TODO add types
    board: ({ boardId }, _, context) =>
      //TODO add loaders
      boardService(context).getBoard(boardId as number),
  },
} as IResolvers;
