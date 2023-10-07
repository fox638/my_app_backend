import { ServerConfig } from "config";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify/types/plugin";
import mercurius from "mercurius";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { loadFiles } from "@graphql-tools/load-files";
import path from "node:path";

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
};

export default fp(graphqlMercurius);
