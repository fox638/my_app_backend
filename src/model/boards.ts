import { CreateBoardInput } from "@/types/resolver-gql";
import { Knex } from "knex";
import { Board } from "types";

export function boardModel(knex: Knex) {
  return {
    getBoardsByUserId(userId: number): Promise<Board[]> {
      return knex("board").where({ user_id: userId });
    },
    async getUserBordsId(userId: number): Promise<{ id: number }[]> {
      const boards = await knex("board")
        .select("id")
        .where({ user_id: userId });

      return boards;
    },
    createBoard(userId: number, input: CreateBoardInput): Promise<number> {
      console.log("createBoard", userId, input);
      return knex("board")
        .insert({ user_id: userId, title: input.title })
        .returning(["id"])
        .then((resp) => resp[0]?.id);
    },
    getBoardById(boardId: number): Promise<Board> {
      return knex("board").where({ id: boardId }).first();
    },
    deleteBoardById(boardId: number, userId: number) {
      return knex("board").where({ id: boardId, user_id: userId }).del();
    },
  };
}
