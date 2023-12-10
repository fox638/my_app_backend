import { Model } from "objection";
import Board from "./Board";
import BoardCard from "./BoardCard";
import User from "./User";

export default class BoardColumnModel extends Model {
  id!: number;
  title!: string;
  order!: number;
  boardId!: number;
  userId!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static tableName = "board_column";

  static relationMappings = {
    board: {
      relation: Model.BelongsToOneRelation,
      modelClass: Board,
      join: {
        from: "board_column.boardId",
        to: "board.id",
      },
    },
    cards: {
      relation: Model.HasManyRelation,
      modelClass: BoardCard,
      join: {
        from: "board_column.id",
        to: "board_card.columnId",
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "board_column.userId",
        to: "users.id",
      },
    },
  };
}
