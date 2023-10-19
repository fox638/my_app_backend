import { Knex } from "knex";
import { AuthSignInInput } from "../types/resolver-gql";

export function usersModel(knex: Knex) {
  return {
    getUserByEmail(email: string) {
      return knex("users").first().where({ email });
    },
    getUserById(id: number) {
      return knex("users").first().where({ id });
    },
    async createUser(input: AuthSignInInput) {
      return await knex("users").insert(input).returning(["email", "username"]);
    },
  };
}
