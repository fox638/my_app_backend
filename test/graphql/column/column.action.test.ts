import { server } from "@/index";
import gql from "graphql-tag";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

export const createColumnMutation = gql`
  mutation createColumn($input: CreateColumnInput!) {
    column {
      createColumn(input: $input) {
        ok
        column {
          columnId
          column {
            id
            title
            order
          }
        }
        error {
          message
        }
      }
    }
  }
`;

const getUserColumnsQuery = gql`
  query getUserColumns {
    me {
      boards {
        board {
          id
          title
          columns {
            columnId
            column {
              id
              title
              order
            }
          }
        }
      }
    }
  }
`;

const updateColumnMutation = gql`
  mutation updateColumn($input: UpdateColumnInput!) {
    column {
      updateColumn(input: $input) {
        ok
        column {
          columnId
          column {
            id
            title
            order
          }
        }
      }
    }
  }
`;

const deleteColumnMutation = gql`
  mutation deleteColumn($input: DeleteColumnInput!) {
    column {
      deleteColumn(input: $input) {
        ok
        columnId
        error {
          message
        }
      }
    }
  }
`;

const client = createMercuriusTestClient(server);

tap.teardown(async () => {
  await server.close();
});

tap.test("column test", async (t) => {
  await server.listen();
  const jwt = server.jwt.sign({ email: "my@mail.com" });
  const test_board = await server
    .knex("board")
    .where("title", "test_board")
    .first();
  const testColumnTitle = "test_column";
  const testColumnOrder = 1;

  t.test("create column", async (t) => {
    const createColumnResp = await client.mutate<
      {
        column: {
          createColumn: {
            ok: boolean;
            column: {
              columnId: number;
              column: { id: number; title: string; order: number };
            };
          };
        };
      },
      {
        input: {
          boardId: number;
          title: string;
          order: number;
        };
      }
    >(createColumnMutation, {
      cookies: {
        "user-jwt": jwt,
      },
      variables: {
        input: {
          boardId: test_board?.id as number,
          title: testColumnTitle,
          order: testColumnOrder,
        },
      },
    });

    const newColumnId =
      createColumnResp.data.column.createColumn.column.columnId;

    t.equal(createColumnResp.data.column.createColumn.ok, true);
    t.equal(!!newColumnId, true);

    // get user boards and columns

    const userColumnsResp = await client.query<{
      me: {
        boards: {
          board: {
            id: number;
            title: string;
            columns: {
              columnId: number;
              column: {
                id: number;
                title: string;
                order: number;
              };
            }[];
          };
        }[];
      };
    }>(getUserColumnsQuery, {
      cookies: {
        "user-jwt": jwt,
      },
    });
    const column = userColumnsResp.data.me.boards
      .find((board) => board.board.id === test_board?.id)
      ?.board.columns.find((column) => column.columnId === newColumnId);

    t.equal(!!column, true);
    t.equal(column?.column.title, testColumnTitle);
    t.equal(column?.column.order, testColumnOrder);

    // update column

    const newColumnTitle = "new_test_column_title";
    const newTestColumnOrder = 2;

    const updateColumnResp = await client.mutate<
      {
        column: {
          updateColumn: {
            ok: boolean;
            column: {
              columnId: number;
              column: {
                id: number;
                title: string;
                order: number;
              };
            };
          };
        };
      },
      {
        input: {
          columnId: number;
          title: string;
          order: number;
        };
      }
    >(updateColumnMutation, {
      variables: {
        input: {
          columnId: newColumnId,
          title: newColumnTitle,
          order: 2,
        },
      },
      cookies: {
        "user-jwt": jwt,
      },
    });

    t.equal(updateColumnResp.data.column.updateColumn.ok, true);

    const updatedColumn = updateColumnResp.data.column.updateColumn.column;

    t.equal(!!updatedColumn, true);
    t.equal(updatedColumn?.column.title, newColumnTitle);
    t.equal(updatedColumn?.column.order, newTestColumnOrder);
    t.equal(updatedColumn?.column.id, newColumnId);

    // delete column

    const deleteColumnResp = await client.mutate<
      {
        column: {
          deleteColumn: {
            ok: boolean;
            columnId: number;
            error?: {
              message: string;
            };
          };
        };
      },
      {
        input: {
          columnId: number;
        };
      }
    >(deleteColumnMutation, {
      variables: {
        input: {
          columnId: newColumnId,
        },
      },
      cookies: {
        "user-jwt": jwt,
      },
    });

    t.equal(deleteColumnResp.data.column.deleteColumn.ok, true);
    t.equal(deleteColumnResp.data.column.deleteColumn.columnId, newColumnId);
    t.equal(deleteColumnResp.data.column.deleteColumn.error, null);

    const newUserColumnsResp = await client.query<{
      me: {
        boards: {
          board: {
            id: number;
            title: string;
            columns: {
              columnId: number;
              column: {
                id: number;
                title: string;
                order: number;
              };
            }[];
          };
        }[];
      };
    }>(getUserColumnsQuery, {
      cookies: {
        "user-jwt": jwt,
      },
    });
    const columnNew = newUserColumnsResp.data.me.boards
      .find((board) => board.board.id === test_board?.id)
      ?.board.columns.find((column) => column.columnId === newColumnId);
    console.log("column", columnNew);
    t.equal(!!columnNew, false);
    t.end();
  });

  t.end();
});
