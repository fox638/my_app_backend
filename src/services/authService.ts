import { MercuriusContext } from "mercurius";
import { usersModel } from "../model/users";
import {
  AuthLoginInput,
  AuthLoginResponse,
  AuthSignUpInput,
  AuthSignUpResponse,
  FormError,
} from "../types/resolver-gql";
import Joy from "joi";

const schema = Joy.object<AuthSignUpInput, true>({
  email: Joy.string().email().required(),
  password: Joy.string().max(10).min(4).required(),
  username: Joy.string().required(),
});

function parseJoyError(error: Joy.ValidationError): Array<FormError> {
  return error.details.map((item) => ({
    __typename: "FormError",
    message: item.message,
    fieldName: item.path.toString(),
  }));
}

export function authService(context: MercuriusContext) {
  return {
    signUp: async (input: AuthSignUpInput): Promise<AuthSignUpResponse> => {
      const { error, value } = schema.validate(input);

      if (error) {
        const parseErrors = parseJoyError(error);
        return {
          ok: false,
          errors: parseErrors,
        };
      }

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
          errors: [
            {
              __typename: "ErrorMessage",
              message: "Already registered",
            },
          ],
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
