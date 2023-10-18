import { MercuriusContext } from "mercurius";
import { usersModel } from "../model/users";
import { AuthSignInInput, AuthSignInResponse } from "types/resolver-gql";
import {} from "knex";

export function authService(context: MercuriusContext) {
  return {
    signIn: async (input: AuthSignInInput): Promise<AuthSignInResponse> => {
      const userModel = usersModel(context.app.knex);
      const user = await userModel.getUserByEmail(input.email);
      if (!user) {
        const password = await context.app.hash(input.password);
        await userModel.createUser({ ...input, password });
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
        };
      }
    },
  };
}
