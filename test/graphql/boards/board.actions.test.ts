import {
  createBoardDocument,
  deleteBoardDocument,
  getUserBoardsDocument,
  updateBoardDocument,
} from "@/generate/graphql";
import { server } from "@/index";
import gql from "graphql-tag";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

const client = createMercuriusTestClient(server);

tap.before(async () => {
  await server.listen();
});

tap.teardown(async () => {
  await server.close();
});

tap.test("create, get, delete board", async (t) => {
  const boardTitle = "Test";

  const jwt = server.jwt.sign({ email: "my@mail.com" });

  const resp = await client.mutate(createBoardDocument, {
    cookies: {
      "user-jwt": jwt,
    },
    variables: {
      input: {
        title: boardTitle,
      },
    },
  });

  t.equal(resp.data.board.createBoard.ok, true);

  const createBoardId = resp.data?.board?.createBoard?.board?.id;

  t.equal(resp.data?.board?.createBoard?.board?.title, boardTitle);

  const userBoards = await client.query(getUserBoardsDocument, {
    cookies: {
      "user-jwt": jwt,
    },
  });

  const board = userBoards?.data?.me?.boards?.find(
    (board) => board?.id === createBoardId
  );

  console.log("userBoards", userBoards);

  t.equal(board?.title, boardTitle);

  const updateBoardResp = await client.mutate(updateBoardDocument, {
    variables: {
      input: {
        boardId: createBoardId as number,
        title: "New title",
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  const updatedBoard = updateBoardResp.data.board.updateBoard.board;

  t.equal(updatedBoard?.title, "New title");
  t.equal(updatedBoard?.id, createBoardId);

  const deleteBoardResp = await client.mutate(deleteBoardDocument, {
    variables: {
      input: {
        boardId: createBoardId as number,
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  t.equal(deleteBoardResp.data.board.deleteBoard.ok, true);

  const newUserBoards = await client.query(getUserBoardsDocument, {
    cookies: {
      "user-jwt": jwt,
    },
  });

  const newBoard = newUserBoards.data.me?.boards.find(
    (board) => board?.id === createBoardId
  );

  t.equal(newBoard, undefined);

  t.end();
});
