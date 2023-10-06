import fastify from "fastify";
import { getConfig } from "./config";
import startServer from "./server";

const main = async () => {
  process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
  });

  const config = await getConfig();
  const server = fastify(config.fastifyInit);

  server.register(startServer, config as any);

  const address = await server.listen(config.fastify);
  server.log.info(`Server running at: ${address}`);
};

main();
