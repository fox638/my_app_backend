import * as bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { Knex } from "knex";

export const seed = async function (knex: Knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert(
    //@ts-ignore
    Array.from({ length: 5 }, (v, i) => {
      return {
        id: i,
        email: `user${i}@demo.test`,
        username: faker.name.firstName(),
        password: bcrypt.hashSync(`user${i}pass`, 10),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    })
  );
};
