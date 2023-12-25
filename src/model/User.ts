import { Model } from "objection";
import BoardModel from "./Board";
import BoardColumnModel from "./BoardColumn";
import BoardCardModel from "./BoardCard";

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
      modelClass: BoardModel,
      join: {
        from: "users.id",
        to: "board.userId",
      },
    },
    columns: {
      relation: Model.HasManyRelation,
      modelClass: BoardColumnModel,
      join: {
        from: "users.id",
        to: "board_column.userId",
      },
    },
    cards: {
      relation: Model.HasManyRelation,
      modelClass: BoardCardModel,
      join: {
        from: "users.id",
        to: "board_card.userId",
      },
    },
  };

  async getOwnerdBoardById({ boardId }: { boardId: number }) {
    return await this.$relatedQuery<BoardModel>("boards")
      .findOne({ id: boardId })
      .returning("*");
  }

  async getOwnerdColumnById({ columnId }: { columnId: number }) {
    return await this.$relatedQuery<BoardColumnModel>("columns").findOne({
      id: columnId,
    });
  }

  async getOwnedBoardCardById({ cardId }: { cardId: number }) {
    return await this.$relatedQuery<BoardCardModel>("cards")
      .findOne({ id: cardId })
      .returning("*");
  }
}
