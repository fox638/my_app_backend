import { Model } from "objection";
import Board from "./Board";

export default class User extends Model {
  static tableName = "users";

  id!: number;
  email!: string;
  username!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static relationMappings = {
    board: {
      relation: Model.HasManyRelation,
      modelClass: Board,
      join: {
        from: "users.id",
        to: "board.userId",
      },
    },
  };
}
