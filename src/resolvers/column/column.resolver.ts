import { columnService } from "@/services/column.service";
import { IResolvers } from "mercurius";
import UserModel from "@/model/User";

export default {
  ColumnMutations: {
    createColumn: async (_, args, context) => {
      return columnService(context).createColumn({
        input: args.input,
      });
    },
    updateColumn: async (_, args, context) => {
      return columnService(context).updateColumn({
        input: args.input,
      });
    },
    deleteColumn: async (_, args, context) => {
      return columnService(context).deleteColumn({
        input: args.input,
      });
    },
  },
  Board: {
    columns: async ({ id: boardId }, args, context) => {
      return columnService(context).getColumnsByBoardId({
        boardId,
      });
    },
  },
} as IResolvers;
