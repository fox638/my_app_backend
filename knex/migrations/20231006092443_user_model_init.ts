import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.integer("id").unique().primary().notNullable();
    table.string("email").unique().notNullable();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("users");
}
