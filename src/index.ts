import fastify from "fastify";
import { getConfig } from "@/config";
import startServer from "@/server";

export const config = getConfig();

export const server = fastify(config.fastifyInit);

server.register(startServer, config as any);
