import { Knex } from "knex";

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
  interface FastifyInstance {
    knex: Knex;
    hash: (plain: string) => Promise<string>;
    hashCompare: (plain: string, hash: string) => Promise<boolean>;
  }
}
