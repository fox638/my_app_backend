import { Model } from "objection";
import BoardColumn from "./BoardColumn";

export default class BoardCard extends Model {
  id!: number;
  title!: string;
  description!: string;
  order!: number;
  columnId!: number;
  boardId!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static tableName = "board_card";

  static relationMappings = {
    column: {
      relation: Model.BelongsToOneRelation,
      modelClass: BoardColumn,
      join: {
        from: "board_card.columnId",
        to: "board_column.id",
      },
    },
    board: {
      relation: Model.BelongsToOneRelation,
      modelClass: BoardColumn,
      join: {
        from: "board_card.boardId",
        to: "board.id",
      },
    },
  };
}
