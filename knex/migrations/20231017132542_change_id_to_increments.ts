import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", async function (table) {
    await table.dropColumn("id");
    await table.increments("id").primary();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("users", async function (table) {
    await table.dropColumn("id");
    await table.integer("id").unique().primary().notNullable();
  });
}
