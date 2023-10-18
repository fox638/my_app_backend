import { Knex } from "knex";
import { AuthSignInInput } from "types/resolver-gql";

export function usersModel(knex: Knex) {
  return {
    getUserByEmail(email: string) {
      return knex("users").first().where({ email });
    },
    async createUser(input: AuthSignInInput) {
      await knex("users").insert(input);

      return await knex("users").first().where({ email: input.email });
    },
  };
}
