import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify/types/plugin";
import { buildSchema } from "graphql";
import mercurius from "mercurius";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFiles } from "@graphql-tools/load-files";
import path from "node:path";
import mercuriusAuth from "mercurius-auth";
import { usersModel } from "../../model/users";
import { ServerConfig } from "../../config";
import { codegenMercurius, CodegenMercuriusOptions } from "mercurius-codegen";
import mercuriusValidation from "mercurius-validation";

const graphqlMercurius: FastifyPluginAsync<ServerConfig> = async (
  server,
  options
) => {
  const schema = makeExecutableSchema({
    typeDefs: await loadFiles(
      path.join(__dirname, "../../typeDefs/**/*.graphql")
    ),

    resolvers: await loadFiles(
      path.join(__dirname, "../../resolvers/**/*.{js,ts}")
    ),
  });

  await server.register(mercurius, {
    schema,
    graphiql: true,
  });

  await server.register(mercuriusAuth, {
    async authContext(context) {
      const userModel = usersModel(context.app.knex);
      const token = context.reply.request.cookies["user-jwt"] || "";
      if (!token) {
        return {
          user: null,
        };
      }

      const jwtDecode = context.app.jwt.decode(token) as any;

      if (jwtDecode?.email) {
        const user = (await userModel.getUserByEmail(jwtDecode?.email)) || null;
        return {
          user,
        };
      }
      return {
        user: null,
      };
    },
    async applyPolicy(authDirectiveAST, parent, args, context, info) {
      return !!context?.auth?.user;
    },
    authDirective: "auth",
  });

  // await server.register(mercuriusValidation, {
  //   schema: {
  //     AuthSignUpInput: {
  //       email: {
  //         errorMessage: "Invalid email",
  //         type: "string",
  //         format: "email",
  //       },
  //       password: {
  //         type: "string",
  //         minLength: 4,
  //         maxLength: 10,
  //         errorMessage: {
  //           minLength: "Минимальная длинна 4",
  //           maxLength: "Максимальная длинна 10",
  //         },
  //       },
  //     },
  //   },
  // });

  const codegenMercuriusOptions: CodegenMercuriusOptions = {
    targetPath: "./src/generate/graphql.ts",
    // operationsGlob: "./src/graphql/operations/*.gql",
    watchOptions: {
      enabled: process.env.NODE_ENV === "development",
    },
  };

  codegenMercurius(server, codegenMercuriusOptions).catch(console.error);
};

export default fp(graphqlMercurius);
