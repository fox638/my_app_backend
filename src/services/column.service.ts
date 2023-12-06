import {
  BoardCardInfo,
  BoardColumn,
  CreateColumnInput,
  CreateColumnResponse,
  DeleteColumnInput,
  DeleteColumnResponse,
  UpdateColumnInput,
  UpdateColumnResponse,
} from "@/generate/graphql";
import BoardColumnModel from "@/model/BoardColumn";
import BoardModel from "@/model/Board";
import UserModel from "@/model/User";
import { onlyNotNullValue } from "@/utils/onlyNotNullValue";
import { MercuriusContext } from "mercurius";

type CreateColumnArguments = {
  input: CreateColumnInput;
};

type UpdateColumnArguments = {
  input: UpdateColumnInput;
};

type DeleteColumnArguments = {
  input: DeleteColumnInput;
};

export function columnService(context: MercuriusContext) {
  const user = context.auth?.user as UserModel;
  const userId = user?.id;
  return {
    getColumn: async (columnId: number): Promise<Nullable<BoardColumn>> => {
      try {
        const column = await BoardColumnModel.query().findOne({
          id: columnId,
          userId,
        });

        return column ? { ...column, cards: {} as BoardCardInfo[] } : null;
      } catch (error) {
        context.app.log.error("getColumn error", error);
        return null;
      }
    },
    createColumn: async ({
      input: { boardId, ...input },
    }: CreateColumnArguments): Promise<CreateColumnResponse> => {
      try {
        const board = await BoardModel.query().findOne({
          id: boardId,
          userId,
        });

        if (board) {
          const boardColumn = await board
            .$relatedQuery<BoardColumnModel>("columns")
            .insert({ ...input, userId });

          return {
            ok: true,
            column: {
              columnId: boardColumn.id,
              column: { ...boardColumn, cards: {} as BoardCardInfo[] },
            },
          };
        } else {
          return {
            ok: false,
            column: null,
            error: {
              message: "Board not found",
            },
          };
        }
      } catch (error) {
        return {
          ok: false,
          column: null,
          error: {
            message: (error as Error).message,
          },
        };
      }
    },

    updateColumn: async ({
      input: { columnId, ...input },
    }: UpdateColumnArguments): Promise<UpdateColumnResponse> => {
      try {
        const column = await BoardColumnModel.query()
          .where("userId", user?.id)
          .where("id", columnId)
          .patch(onlyNotNullValue(input))
          .returning("*");

        if (column) {
          return {
            ok: true,
            column: {
              columnId: column[0].id,
              column: { ...column[0], cards: {} as BoardCardInfo[] },
            },
            error: null,
          };
        } else {
          return {
            ok: false,
            column: null,
            error: {
              message: "Column not found",
            },
          };
        }
      } catch (error) {
        return {
          ok: false,
          column: null,
          error: {
            message: (error as Error).message,
          },
        };
      }
    },
    deleteColumn: async ({
      input,
    }: DeleteColumnArguments): Promise<DeleteColumnResponse> => {
      try {
        const column = await BoardColumnModel.query()
          .where(function () {
            this.where("userId", user?.id).andWhere("id", input.columnId);
          })
          .delete();
        console.log("column", column);
        return {
          ok: true,
          columnId: input.columnId,
        };
      } catch (error) {
        return {
          ok: false,

          error: {
            message: (error as Error).message,
          },
        };
      }
    },
  };
}
