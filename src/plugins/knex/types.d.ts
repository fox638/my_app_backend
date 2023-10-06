import Knex from "knex";

declare module "fastify" {
  interface FastifyRequest {
    knex: Knex;
  }
  interface FastifyReply {
    knex: Knex;
  }
  interface FastifyInstance {
    knex: Knex;
  }
}
