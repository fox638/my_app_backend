require("ts-node/register");
import knex from "knex";
import config from "./knexfile";
const { updateTypes } = require("knex-types");

const db = knex(config.staging);

updateTypes(db, { output: "./types.ts" }).catch((err: any) => {
  console.error(err);
  process.exit(1);
});
