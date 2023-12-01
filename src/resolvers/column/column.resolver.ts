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
  BoardColumnInfo: {
    column: async ({ columnId }, _, context) => {
      return columnService(context).getColumn(columnId);
    },
  },
} as IResolvers;
