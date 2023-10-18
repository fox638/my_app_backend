import { MercuriusContext } from "mercurius";
import { usersModel } from "../model/users";
import { AuthSignInInput, AuthSignInResponse } from "types/resolver-gql";

export function authService(context: MercuriusContext) {
  return {
    signIn: async (input: AuthSignInInput): Promise<AuthSignInResponse> => {
      const userModel = usersModel(context.app.knex);
      const user = await userModel.getUserByEmail(input.email);
      let password = input.password;
      password = await context.app.hash(input.password);
      // звахешировать пароль
      // сохранить пользователя в базу

      await userModel.createUser(input);

      return {
        ok: false,
      };
    },
  };
}
