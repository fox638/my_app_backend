import {
  createBoardDocument,
  createColumnDocument,
  deleteColumnDocument,
  getUserBoardsColumnsDocument,
  getUserColumnsDocument,
  updateColumnDocument,
} from "@/generate/graphql";
import { server } from "@/index";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

const client = createMercuriusTestClient(server);

type ContextType = {
  jwt: string;
  testBoardId: number;
};

const testBoardTitle = "Test board";

tap.before(async () => {
  await server.listen();
  const jwt = server.jwt.sign({ email: "my@mail.com" });

  const testBoard = await client.mutate(createBoardDocument, {
    variables: {
      input: {
        title: testBoardTitle,
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  tap.context = {
    jwt,
    testBoardId: testBoard?.data?.board?.createBoard?.board?.id,
  };
});

tap.teardown(async () => {
  await server.close();
});

tap.test("column test", async (t) => {
  const { testBoardId, jwt } = tap.context as ContextType;

  const testColumnTitle = "Test Column";
  const testColumnOrder = 1;

  t.test("create column", async (t) => {
    const createColumnResp = await client.mutate(createColumnDocument, {
      cookies: {
        "user-jwt": jwt,
      },
      variables: {
        input: {
          boardId: testBoardId,
          title: testColumnTitle,
          order: testColumnOrder,
        },
      },
    });

    const newColumnId =
      createColumnResp?.data?.column?.createColumn?.column?.id;

    t.equal(createColumnResp.data.column.createColumn?.ok, true);
    t.equal(!!newColumnId, true);

    // get user boards and columns

    const userBoardsColumnsResp = await client.query(
      getUserBoardsColumnsDocument,
      {
        cookies: {
          "user-jwt": jwt,
        },
      }
    );
    const column = userBoardsColumnsResp.data.me?.boards
      ?.find((board) => board?.id === testBoardId)
      ?.columns?.find((column) => column?.id === newColumnId);

    t.equal(!!column, true);
    t.equal(column?.title, testColumnTitle);
    t.equal(column?.order, testColumnOrder);

    // update column

    const newColumnTitle = "new_test_column_title";
    const newTestColumnOrder = 2;

    const updateColumnResp = await client.mutate(updateColumnDocument, {
      variables: {
        input: {
          columnId: newColumnId as number,
          title: newColumnTitle,
          order: 2,
        },
      },
      cookies: {
        "user-jwt": jwt,
      },
    });

    t.equal(updateColumnResp.data.column.updateColumn?.ok, true);

    const updatedColumn = updateColumnResp.data.column.updateColumn?.column;

    t.equal(!!updatedColumn, true);
    t.equal(updatedColumn?.title, newColumnTitle);
    t.equal(updatedColumn?.order, newTestColumnOrder);
    t.equal(updatedColumn?.id, newColumnId);

    // get user columns

    const userColumnsResp = await client.query(getUserColumnsDocument, {
      cookies: {
        "user-jwt": jwt,
      },
    });

    t.equal(!!userColumnsResp.data.me?.columns.length, true);
    const newColumn = userColumnsResp.data.me?.columns.find(
      (column) => column?.id === newColumnId
    );

    t.equal(!!newColumn, true);
    t.equal(newColumn?.title, newColumnTitle);
    t.equal(newColumn?.order, newTestColumnOrder);
    t.equal(newColumn?.id, newColumnId);

    // delete column

    const deleteColumnResp = await client.mutate(deleteColumnDocument, {
      variables: {
        input: {
          columnId: newColumnId as number,
        },
      },
      cookies: {
        "user-jwt": jwt,
      },
    });

    t.equal(deleteColumnResp.data.column.deleteColumn?.ok, true);
    t.equal(deleteColumnResp.data.column.deleteColumn?.columnId, newColumnId);
    t.equal(deleteColumnResp.data.column.deleteColumn?.error, null);

    const newUserColumnsResp = await client.query(
      getUserBoardsColumnsDocument,
      {
        cookies: {
          "user-jwt": jwt,
        },
      }
    );
    const columnNew = newUserColumnsResp.data.me?.boards
      .find((board) => board?.id === testBoardId)
      ?.columns?.find((column) => column.id === newColumnId);

    t.equal(!!columnNew, false);

    t.end();
  });

  t.end();
});
