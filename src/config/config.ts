import envSchema from "env-schema";
import { S } from "fluent-json-schema";
import type { FastifyRequest } from "fastify";
import kenxconf from "../../knexfile";

export type ServerConfig = Awaited<ReturnType<typeof getConfig>>;
export function getConfig() {
  const env = envSchema({
    dotenv: true,
    schema: S.object()
      .prop("NODE_ENV", S.string().required())
      .prop("API_HOST", S.string().required())
      .prop("API_PORT", S.string().required())
      .prop(
        "LOG_LEVEL",
        S.string()
          .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
          .default("info")
      )
      .valueOf(),
  });

  const config = {
    fastify: {
      host: env.API_HOST as string,
      port: Number(env.API_PORT),
    },
    fastifyInit: {
      logger: {
        level: env.LOG_LEVEL as string,
        serializers: {
          req: (request: FastifyRequest) => ({
            method: request.raw.method,
            url: request.raw.url,
            hostname: request.hostname,
          }),
          res: (response: any) => ({
            statusCode: response.statusCode,
          }),
        },
      },
    },
    knex: kenxconf[env.NODE_ENV as any],
  };
  return config;
}
