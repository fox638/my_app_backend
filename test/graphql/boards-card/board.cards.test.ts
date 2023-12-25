import { server } from "@/index";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";
import {
  createBoardCardDocument,
  createBoardDocument,
  createColumnDocument,
  deleteBoardCardDocument,
  getUserCardsDocument,
  updateBoardCardDocument,
} from "@/generate/graphql";
import { testUserEmail, testUserEmailTwo } from "knex/seeds/users";

const client = createMercuriusTestClient(server);

type ContextType = {
  jwt: string;
  userTwoJwt: string;
  testBoardId: number;
  testColumnId: number;
};

tap.before(async () => {
  await server.listen();
  const jwt = server.jwt.sign({ email: testUserEmail });
  const userTwoJwt = server.jwt.sign({ email: testUserEmailTwo });
  const testBoardResp = await client.mutate(createBoardDocument, {
    variables: {
      input: {
        title: "test_board",
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  const testColumnResp = await client.mutate(createColumnDocument, {
    variables: {
      input: {
        title: "test_column",
        boardId: testBoardResp.data?.board?.createBoard?.board?.id as number,
        order: 1,
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });
  tap.context = {
    jwt,
    userTwoJwt,
    testBoardId: testBoardResp.data?.board?.createBoard?.board?.id as number,
    testColumnId: testColumnResp.data?.column?.createColumn?.column
      ?.id as number,
  } as ContextType;
});

tap.teardown(async () => {
  await server.close();
});

const testCardTitle = "test_card";
const testCardDecription = "test_description";

tap.test("create, get, delete board-card", async (t) => {
  const { jwt, testBoardId, testColumnId, userTwoJwt } =
    tap.context as ContextType;

  const createCardResp = await client.mutate(createBoardCardDocument, {
    variables: {
      input: {
        title: testCardTitle,
        columnId: testColumnId as number,
        order: 1,
        description: testCardDecription,
        boardId: testBoardId as number,
      },
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  const newCardId = createCardResp.data?.card?.createCard?.card?.id;

  t.equal(
    createCardResp.data?.card.createCard?.ok,
    true,
    "create cards failed"
  );

  const userCardsResp = await client.query(getUserCardsDocument, {
    cookies: {
      "user-jwt": jwt,
    },
  });

  const cards = userCardsResp.data.me?.cards;
  t.equal(!!cards?.length, true);

  const newCard = cards?.find((card) => card.id === newCardId);
  t.equal(!!newCard, true);
  t.equal(newCard?.title, testCardTitle);
  t.equal(newCard?.description, testCardDecription);

  // create card another user
  t.test("create card another user", async (t) => {
    const createCardResp = await client.mutate(createBoardCardDocument, {
      variables: {
        input: {
          title: testCardTitle,
          columnId: testColumnId as number,
          order: 1,
          description: testCardDecription,
          boardId: testBoardId as number,
        },
      },
      cookies: {
        "user-jwt": userTwoJwt,
      },
    });

    t.equal(
      createCardResp?.data?.card?.createCard?.ok,
      false,
      "board assigned to another user"
    );

    t.end();
  });

  t.test("update card", async (t) => {
    const cardUpdateResponse = await client.mutate(updateBoardCardDocument, {
      variables: {
        input: {
          cardId: newCardId as number,
          title: "new title",
          description: "new description",
          order: 10,
        },
      },
      cookies: {
        "user-jwt": jwt,
      },
    });

    const newCard = cardUpdateResponse.data?.card?.updateCard?.card;

    t.equal(cardUpdateResponse.data?.card?.updateCard?.ok, true);
    t.equal(newCard?.title, "new title");
    t.equal(newCard?.description, "new description");
    t.equal(newCard?.order, 10);

    t.end();
  });

  t.test("update card other user", async () => {
    const cardUpdateResponse = await client.mutate(updateBoardCardDocument, {
      variables: {
        input: {
          cardId: newCardId as number,
          title: "new title two",
          description: "new description two",
          order: 50,
        },
      },
      cookies: {
        "user-jwt": userTwoJwt,
      },
    });

    const respone = cardUpdateResponse.data?.card?.updateCard;

    t.equal(respone?.ok, false);
    t.equal(
      respone?.error?.message,
      `User not ownerd card with id: ${newCardId}`
    );

    t.end();
  });

  t.test("Delete card other user", async () => {
    const cardDeleteResponse = await client.mutate(deleteBoardCardDocument, {
      variables: {
        input: {
          cardId: newCardId as number,
        },
      },
      cookies: {
        "user-jwt": userTwoJwt,
      },
    });

    const response = cardDeleteResponse.data?.card?.deleteCard;
    t.equal(response?.ok, false);
    t.equal(
      response?.error?.message,
      `User not ownerd card with id: ${newCardId}`
    );

    t.end();
  });

  t.test("Delete card", async () => {
    const cardDeleteResponse = await client.mutate(deleteBoardCardDocument, {
      variables: {
        input: {
          cardId: newCardId as number,
        },
      },
      cookies: {
        "user-jwt": jwt,
      },
    });

    const response = cardDeleteResponse.data?.card?.deleteCard;
    t.equal(response?.ok, true);
    t.equal(response?.cardId, newCardId);

    const userCardsResp = await client.query(getUserCardsDocument, {
      cookies: {
        "user-jwt": jwt,
      },
    });

    const userCards = userCardsResp.data.me?.cards;
    const newUserCard = userCards?.find((card) => card.id === newCardId);
    t.equal(!!newUserCard, false);

    t.end();
  });

  t.end();
});
