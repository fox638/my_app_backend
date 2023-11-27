import { Model } from "objection";
import Board from "./Board";

export default class BoardColumn extends Model {
  id!: number;
  title!: string;
  order!: number;
  boardId!: number;
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
  };
}
