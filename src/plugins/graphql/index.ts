import { ServerConfig } from "config";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify/types/plugin";
import mercurius from "mercurius";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFiles } from "@graphql-tools/load-files";
import path from "node:path";
import mercuriusAuth from "mercurius-auth";

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
    authContext(context) {
      return {
        identity: context.reply.request.cookies["x-user"] || "",
      };
    },
    async applyPolicy(authDirectiveAST, parent, args, context, info) {
      return context?.auth?.identity === "admin";
    },
    authDirective: "auth",
  });
};

export default fp(graphqlMercurius);
