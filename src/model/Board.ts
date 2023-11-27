import { Model } from "objection";
import User from "./User";
import BoardCard from "./BoardCard";
import BoardColumn from "./BoardColumn";

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
    cards: {
      relation: Model.HasManyRelation,
      modelClass: BoardCard,
      join: {
        from: "board.id",
        to: "board_card.boardId",
      },
    },
    columns: {
      relation: Model.HasManyRelation,
      modelClass: BoardColumn,
      join: {
        from: "board.id",
        to: "board_column.boardId",
      },
    },
  };
}
