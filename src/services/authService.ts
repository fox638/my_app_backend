import { MercuriusContext } from "mercurius";
import { usersModel } from "../model/users";
import {
  AuthLoginInput,
  AuthLoginResponse,
  AuthSignUpInput,
  AuthSignUpResponse,
  ErrorMessage,
  FormError,
} from "../types/resolver-gql";
import Joy from "joi";

const schema = Joy.object<AuthSignUpInput, true>({
  email: Joy.string().email().required(),
  password: Joy.string().max(10).min(4).required(),
  username: Joy.string().required(),
});

const loginInputSchema = Joy.object<AuthLoginInput, false>({
  email: Joy.string().email().required(),
  password: Joy.string().required(),
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
      const { error } = schema.validate(input);

      if (error) {
        return {
          ok: false,
          errors: parseJoyError(error),
        };
      }

      const userModel = usersModel(context.app.knex);
      const user = await userModel.getUserByEmail(input.email);
      const userByUsername = await userModel.getUserByUsername(input.username);
      if (!user && !userByUsername) {
        const password = await context.app.hash(input.password);

        await userModel.createUser({ ...input, password });
        return {
          ok: true,
        };
      } else if (user) {
        return {
          ok: false,
          errors: [
            {
              __typename: "ErrorMessage",
              message: "Already registered",
            },
          ],
        };
      } else if (userByUsername) {
        return {
          ok: false,
          errors: [
            {
              __typename: "FormError",
              message: "Username already take",
              fieldName: "username",
            },
          ],
        };
      } else {
        return {
          ok: false,
          errors: [
            {
              __typename: "ErrorMessage",
              message: "Unknown error",
            },
          ],
        };
      }
    },
    login: async (input: AuthLoginInput) => {
      const { error } = loginInputSchema.validate(input);
      if (error) {
        return {
          ok: false,
          errors: parseJoyError(error),
        };
      }

      const userModel = usersModel(context.app.knex);
      const user = await userModel.getUserByEmail(input.email);

      if (user) {
        if (await context.app.hashCompare(input.password, user.password)) {
          const jwt = await context.app.jwt.sign({ email: user.email });

          // TODo user const
          context.reply.setCookie("user-jwt", jwt, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });

          return {
            ok: true,
            user,
          };
        }
      }

      return {
        ok: false,
        user: null,
        errors: [
          {
            __typename: "ErrorMessage" as ErrorMessage["__typename"],
            message: "invalid credentials",
          },
        ],
      };
    },
  };
}
