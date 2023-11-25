import { User } from "@/generate";
import { BoardMutationsResolvers, Resolvers } from "@/graphql/generated";
import { boardService } from "@/services/board.service";
import { BoardInfo, BoardMutationsCreateBoardArgs } from "@/types/resolver-gql";
import { IResolvers } from "mercurius";

export default {
  User: {
    boardsInfo: (_, __, context) => {
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
  },
  BoardInfo: {
    // TODO add types
    board: ({ boardId }, _, context) =>
      //TODO add loaders
      boardService(context).getBoard(boardId),
  },
} as IResolvers;
