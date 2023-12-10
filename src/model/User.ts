import { Model } from "objection";
import Board from "./Board";
import BoardColumn from "./BoardColumn";
import BoardCard from "./BoardCard";

export default class UserModel extends Model {
  static tableName = "users";

  id!: number;
  email!: string;
  username!: string;
  password!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static relationMappings = {
    boards: {
      relation: Model.HasManyRelation,
      modelClass: Board,
      join: {
        from: "users.id",
        to: "board.userId",
      },
    },
    columns: {
      relation: Model.HasManyRelation,
      modelClass: BoardColumn,
      join: {
        from: "users.id",
        to: "board_column.userId",
      },
    },
    cards: {
      relation: Model.HasManyRelation,
      modelClass: BoardCard,
      join: {
        from: "users.id",
        to: "board_card.userId",
      },
    },
  };
}
