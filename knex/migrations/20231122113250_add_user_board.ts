import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("board", function (table) {
      table.increments("id").primary().notNullable();
      table.text("title").notNullable();
      table
        .integer("user_id")
        .notNullable()
        .references("users.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("board_column", function (table) {
      table.increments("id").primary().notNullable();
      table.text("title").notNullable();
      table.integer("order").notNullable();
      table
        .integer("board_id")
        .notNullable()
        .references("board.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    })
    .createTable("board_card", function (table) {
      table.increments("id").primary().notNullable();
      table.text("title").notNullable();
      table.text("description").notNullable();
      table.integer("order").notNullable();
      table
        .integer("column_id")
        .notNullable()
        .references("board_column.id")
        .onDelete("CASCADE");
      table
        .integer("board_id")
        .notNullable()
        .references("board.id")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("board_card")
    .dropTableIfExists("board_column")
    .dropTableIfExists("board");
}
