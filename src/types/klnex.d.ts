import * as db from "../generate/db";

declare module "knex/types/tables" {
  interface Tables extends TablesType {}
}

type TablesType = {
  [table in keyof db.Tables]: db.Tables[table];
};
