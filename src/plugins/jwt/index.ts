import fp from "fastify-plugin";

export default fp((fastify, options, next) => {
  try {
    // TODO use env or config
    fastify.register(require("@fastify/jwt"), {
      secret: "supersecret",
    });
    next();
  } catch (error) {
    next(error as Error);
  }
});
