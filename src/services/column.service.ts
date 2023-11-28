import {
  CreateColumnInput,
  CreateColumnResponse,
  UpdateColumnInput,
} from "@/generate/graphql";
import BoardColumnModel from "@/model/BoardColumn";

import { onlyNotNullValue } from "@/utils/onlyNotNullValue";
import { MercuriusContext } from "mercurius";

export function columnService(context: MercuriusContext) {
  return {
    createColumn: async (
      input: CreateColumnInput
    ): Promise<CreateColumnResponse> => {
      try {
        const column = await BoardColumnModel.query().insert(input);

        return {
          ok: true,
          column,
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
      try {
        // const column = await columnModel(context.app.knex).updateColumn({
        //   id: columnId,
        //   ...onlyNotNullValue(input),
        // });
      } catch (error) {}
    },
  };
}
