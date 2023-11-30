import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .table("board_column", (table) => {
      table
        .integer("user_id")
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE");
    })
    .table("board_card", (table) => {
      table
        .integer("user_id")
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE");
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .table("board_column", (table) => {
      table.dropColumn("user_id");
    })
    .table("board_card", (table) => {
      table.dropColumn("user_id");
    });
}
