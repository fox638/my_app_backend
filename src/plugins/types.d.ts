import { Knex } from "knex";
import type { FastifyJwtNamespace } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    knex: Knex;
    hash: (plain: string) => Promise<string>;
    hashCompare: (plain: string, hash: string) => Promise<boolean>;
  }
  interface FastifyReply {
    knex: Knex;
    hash: (plain: string) => Promise<string>;
    hashCompare: (plain: string, hash: string) => Promise<boolean>;
  }
  interface FastifyInstance extends FastifyJwtNamespace {
    knex: Knex;
    hash: (plain: string) => Promise<string>;
    hashCompare: (plain: string, hash: string) => Promise<boolean>;
  }
}
