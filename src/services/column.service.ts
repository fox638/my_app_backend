import {
  CreateColumnInput,
  CreateColumnResponse,
  UpdateColumnInput,
} from "@/generate/graphql";
import { columnModel } from "@/model/column";
import { onlyNotNullValue } from "@/utils/onlyNotNullValue";
import { MercuriusContext } from "mercurius";

export function columnService(context: MercuriusContext) {
  return {
    createColumn: async ({
      boardId: board_id,
      ...input
    }: CreateColumnInput): Promise<CreateColumnResponse> => {
      try {
        const column = await columnModel(context.app.knex).createColumn({
          board_id,
          ...input,
        });
        return {
          ok: true,
          column: {
            ...column,
            boardId: board_id,
          },
        };
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

    updateColumn: async ({ columnId, ...input }: UpdateColumnInput) => {
      const column = await columnModel(context.app.knex).updateColumn({
        id: columnId,
        ...onlyNotNullValue(input),
      });
    },
  };
}
