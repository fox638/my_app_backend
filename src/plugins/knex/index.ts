import { ServerConfig } from "config";
import fp from "fastify-plugin";
import { FastifyInstance } from "fastify/types/instance";
import { FastifyPluginCallback } from "fastify/types/plugin";
import { IncomingMessage, Server, ServerResponse } from "http";
import knex from "knex";

const fastifyKnexJS: FastifyPluginCallback<ServerConfig> = async (
  server: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options: ServerConfig,
  next: (err?: Error) => void
) => {
  try {
    const handler = knex(options.knex);

    server.decorate("knex", handler).addHook("onClose", (instance, done) => {
      /* istanbul ignore else */

      if (instance?.knex === handler) {
        instance?.knex?.destroy();
        //@ts-ignore
        instance.knex = null;
      }

      done();
    });
    next();
  } catch (error) {
    next(error as Error);
  }
};

export default fp(fastifyKnexJS);
