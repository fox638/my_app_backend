import { server } from "@/index";
import gql from "graphql-tag";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";
import {
  createBoardCardDocument,
  getUserCardsDocument,
} from "@/generate/graphql";

const client = createMercuriusTestClient(server);

tap.teardown(async () => {
  await server.close();
});

tap.test("create, get, delete board-card", async (t) => {
  await server.listen();
  const jwt = server.jwt.sign({ email: "my@mail.com" });
  const testBoard = await server
    .knex("board")
    .where("title", "test_board")
    .first();

  const testColumn = await server
    .knex("board_column")
    .where("title", "seed_test_column")
    .first();

  const createCardResp = await client.mutate(createBoardCardDocument, {
    variables: {
      input: {
        title: "test_card",
        columnId: testColumn?.id as number,
        order: 1,
        description: "test_description",
        boardId: testBoard?.id as number,
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  t.equal(
    createCardResp.data?.card.createCard?.ok,
    true,
    "create cards failed"
  );

  // const userCardsResp = await client.query(getUserCardsDocument, {
  //   cookies: {
  //     "user-jwt": jwt,
  //   },
  // });

  // const newCard = userCardsResp.data.me.cards.find(
  //   (card) => card.cardId === createCardResp.data.card.createCard?.card?.id
  // );

  // t.equal(!!newCard, true);
  // t.equal(newCard?.card.title, "test_card");
});
