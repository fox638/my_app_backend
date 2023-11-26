import { columnService } from "@/services/column.service";
import { IResolvers } from "mercurius";

export default {
  ColumnMutations: {
    createColumn: async (parent, args, context) => {
      return columnService(context).createColumn(args.input);
    },
    updateColumn: async (parent, args, context) => {
      return columnService(context).updateColumn(args.input);
    },
  },
} as IResolvers;
