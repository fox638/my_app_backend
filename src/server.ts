import path from "path";
import fp, { PluginMetadata } from "fastify-plugin";
import autoLoad from "@fastify/autoload";
import cors from "@fastify/cors";
import { FastifyInstance } from "fastify";
import { ServerConfig } from "config";

async function plugin(server: FastifyInstance, config: ServerConfig) {
  server.register(cors, {}).register(autoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: config,
  });
  // .register(autoLoad, {
  //   dir: path.join(__dirname, "services"),
  //   options: config,
  // })
  // .register(autoLoad, {
  //   dir: path.join(__dirname, "routes"),
  //   options: config,
  //   dirNameRoutePrefix: false,
  // });
  server.setErrorHandler((err, req, res) => {
    req.log.error({ req, res, err }, err && err.message);
    err.message = "An error has occurred";
    res.send(err);
  });

  // Trick to handle empty body on POST
  // because POST {{APIURL}}/articles/{{slug}}/favorite will be done without a body
  server.addHook("onRequest", async (req, res) => {
    if (
      req.headers["content-type"] === "application/json" &&
      req.headers["content-length"] === "0"
    ) {
      req.headers["content-type"] = "empty";
    }
  });

  server.addContentTypeParser("empty", (request, body, done) => {
    done(null, {});
  });
}

export default fp(plugin);
