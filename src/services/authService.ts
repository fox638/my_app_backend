import { MercuriusContext } from "mercurius";
import { usersModel } from "../model/users";
import {
  AuthLoginInput,
  AuthLoginResponse,
  AuthSignUpInput,
  AuthSignUpResponse,
} from "../types/resolver-gql";

export function authService(context: MercuriusContext) {
  return {
    signUp: async (input: AuthSignUpInput): Promise<AuthSignUpResponse> => {
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
    login: async (input: AuthLoginInput): Promise<AuthLoginResponse> => {
      const userModel = usersModel(context.app.knex);
      const user = await userModel.getUserByEmail(input.email);
      if (user) {
        if (await context.app.hashCompare(input.password, user.password)) {
          const jwt = await context.app.jwt.sign({ email: user.email });

          context.reply.setCookie("user-jwt", jwt, {
            httpOnly: true,
          });

          return {
            ok: true,
            user,
          };
        } else {
          return {
            ok: false,
            user: null,
          };
        }
      } else {
        return {
          ok: false,
          user: null,
        };
      }
    },
  };
}
