import { Knex } from "knex";

type CreateColumnInput = {
  title: string;
  board_id: number;
  order?: number;
};

type UpdateColumnInput = {
  id: number;
  title?: string;
  order?: number;
};

export function columnModel(knex: Knex) {
  return {
    createColumn: async (input: CreateColumnInput) => {
      return knex("board_column")
        .insert(input)
        .returning("*")
        .then((resp) => resp[0]);
    },
    updateColumn: async (input: UpdateColumnInput) => {
      return knex("board_column")
        .update(input)
        .where({ id: input.id })
        .returning("*")
        .then((resp) => resp[0]);
    },
  };
}
