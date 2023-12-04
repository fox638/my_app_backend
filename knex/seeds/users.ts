import * as bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export const seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("board").del();
  await knex("board_column").del();
  await knex("board_card").del();
  await knex("users").insert({
    email: "my@mail.com",
    username: "dima",
    password: "$2b$10$sCSA8aXzoaMn1i4YgpboXejsDq8q6RsZNMCNDQb3iz4vCadnOgTG.",
  });
};
