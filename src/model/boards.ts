import { CreateBoardInput } from "@/types/resolver-gql";
import { Knex } from "knex";
import { Board } from "@/generate/db";

export function boardModel(knex: Knex) {
  return {
    getBoardsByUserId(userId: number) {
      return knex("board").where({ user_id: userId });
    },
    async getUserBordsId(userId: number) {
      const boards = await knex("board")
        .select("id")
        .where({ user_id: userId });

      return boards;
    },
    createBoard(userId: number, input: CreateBoardInput) {
      console.log("createBoard", userId, input);
      return knex("board")
        .insert({ user_id: userId, title: input.title })
        .returning(["id"])
        .then((resp) => resp[0]?.id);
    },
    getBoardById(boardId: number) {
      return knex("board").where({ id: boardId }).first();
    },
    deleteBoardById(boardId: number, userId: number) {
      return knex("board").where({ id: boardId, user_id: userId }).del();
    },
    updateBoard(board: Pick<Board, "id"> & Partial<Board>) {
      return knex("board")
        .update(board)
        .where({ id: board.id })
        .returning("*")
        .then((resp) => resp[0]);
    },
  };
}
