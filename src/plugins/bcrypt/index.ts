import bcrypt from "bcrypt";

import fp from "fastify-plugin";

export default fp((fastify, options, next) => {
  try {
    fastify.decorate("hash", async (plain: string) => {
      // TODO use env !!
      return await bcrypt.hash(plain, 10);
    });
    fastify.decorate("hashCompare", async (plain: string, hash: string) => {
      return await bcrypt.compare(plain, hash);
    });
    next();
  } catch (error) {
    next(error as Error);
  }
});
