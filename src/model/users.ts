import { Knex } from "knex";
import { AuthSignUpInput } from "../types/resolver-gql";

export function usersModel(knex: Knex) {
  return {
    getUserByEmail(email: string) {
      return knex("users").first().where({ email });
    },
    getUserById(id: number) {
      return knex("users").first().where({ id });
    },
    getUserByUsername(username: string) {
      return knex("users").first().where({ username });
    },
    async createUser(input: AuthSignUpInput) {
      return await knex("users")
        .insert(input)
        .returning(["email", "username", "id"]);
    },
  };
}
