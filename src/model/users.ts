import { Knex } from "knex";
import { AuthSignInInput } from "types/resolver-gql";

export function usersModel(knex: Knex) {
  return {
    getUserByEmail(email: string) {
      return knex("users").first().where({ email });
    },
    async createUser(input: AuthSignInInput) {
      console.log("call", input);
      const user = await knex("users").insert(input);
      console.log("newUser", user);
    },
  };
}
