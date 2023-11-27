import { Model } from "objection";
import User from "./User";

export default class Board extends Model {
  id!: number;
  title!: string;
  userId!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static tableName = "board";

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "board.userId",
        to: "users.id",
      },
    },
  };
}
