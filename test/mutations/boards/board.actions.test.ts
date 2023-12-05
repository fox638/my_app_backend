import { server } from "@/index";
import gql from "graphql-tag";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

const client = createMercuriusTestClient(server);

tap.teardown(async () => {
  await server.close();
});

const createBoardMutation = gql`
  mutation createBoard($input: CreateBoardInput!) {
    board {
      createBoard(input: $input) {
        ok
        board {
          boardId
          board {
            id
            title
          }
        }
      }
    }
  }
`;

const getUserBoards = gql`
  query {
    me {
      boards {
        boardId
        board {
          id
          title
        }
      }
    }
  }
`;

const deleteBoardMutation = gql`
  mutation deleteBoard($input: DeleteBoardInput!) {
    board {
      deleteBoard(input: $input) {
        ok
        boardId
      }
    }
  }
`;

const updateBoardMutation = gql`
  mutation updateBoard($input: UpdateBoardInput!) {
    board {
      updateBoard(input: $input) {
        ok
        board {
          boardId
          board {
            id
            title
          }
        }
      }
    }
  }
`;

tap.test("create, get, delete board", async (t) => {
  await server.listen();

  const boardTitle = "Test";

  const jwt = server.jwt.sign({ email: "my@mail.com" });

  const resp = await client.mutate<
    {
      board: {
        createBoard: {
          ok: boolean;
          board: {
            boardId: number;
            board: {
              id: number;
              title: string;
            };
          };
        };
      };
    },
    {
      input: {
        title: string;
      };
    }
  >(createBoardMutation, {
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

  const createBoardId = resp.data.board.createBoard.board.boardId;

  t.equal(resp.data.board.createBoard.board.board.title, boardTitle);

  const userBoards = await client.query<{
    me: {
      boards: {
        boardId: number;
        board: {
          id: number;
          title: string;
        };
      }[];
    };
  }>(getUserBoards, {
    cookies: {
      "user-jwt": jwt,
    },
  });

  const board = userBoards.data.me.boards.find(
    (board) => board.boardId === createBoardId
  );

  t.equal(board?.board.title, boardTitle);

  const updateBoardResp = await client.mutate<
    {
      board: {
        updateBoard: {
          ok: boolean;
          board: {
            boardId: number;
            board: {
              id: number;
              title: string;
            };
          };
        };
      };
    },
    { input: { boardId: number; title: string } }
  >(updateBoardMutation, {
    variables: {
      input: {
        boardId: createBoardId,
        title: "New title",
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  const updatedBoard = updateBoardResp.data.board.updateBoard.board;

  t.equal(updatedBoard?.board.title, "New title");
  t.equal(updatedBoard?.boardId, createBoardId);

  const deleteBoardResp = await client.mutate<
    {
      board: {
        deleteBoard: {
          ok: boolean;
          boardId: number;
        };
      };
    },
    { input: { boardId: number } }
  >(deleteBoardMutation, {
    variables: {
      input: {
        boardId: createBoardId,
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  t.equal(deleteBoardResp.data.board.deleteBoard.ok, true);

  const newUserBoards = await client.query<{
    me: {
      boards: {
        boardId: number;
        board: {
          id: number;
          title: string;
        };
      }[];
    };
  }>(getUserBoards, {
    cookies: {
      "user-jwt": jwt,
    },
  });

  const newBoard = newUserBoards.data.me.boards.find(
    (board) => board.boardId === createBoardId
  );

  t.equal(newBoard, undefined);

  t.end();
});
