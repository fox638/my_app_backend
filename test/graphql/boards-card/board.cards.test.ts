import { server } from "@/index";
import gql from "graphql-tag";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

const client = createMercuriusTestClient(server);

tap.teardown(async () => {
  await server.close();
});

const createBoardCardMutation = gql`
  mutation createBoardCard($input: CreateCardInput!) {
    card {
      createCard(input: $input) {
        ok
        card {
          id
          title
          columnId
          boardId
        }
        error {
          message
        }
      }
    }
  }
`;

const getUserCardsQuery = gql`
  query getUserCards {
    me {
      cards {
        cardId
        card {
          id
          title
        }
      }
      boards {
        boardId
        board {
          id
          columns {
            columnId
            column {
              id
              title
              cards {
                cardId
                card {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

tap.test("create, get, delete board-card", async (t) => {
  await server.listen();
  const jwt = server.jwt.sign({ email: "my@mail.com" });
  const testColumn = await server
    .knex("board_column")
    .where("title", "seed_test_column")
    .first();

  const createCardResp = await client.mutate<
    {
      card: {
        createCard: {
          ok: boolean;
          card: {
            id: number;
            title: string;
            columnId: number;
            boardId: number;
          };
        };
      };
    },
    {
      title: string;
      columnId: number;
      order: number;
    }
  >(createBoardCardMutation, {
    variables: {
      title: "test_card",
      columnId: testColumn?.id as number,
      order: 1,
    },
    cookies: {
      "user-jwt": jwt,
    },
  });

  t.equal(createCardResp.data.card.createCard.ok, true, "create cards failed");

  const userCardsResp = await client.query<{
    me: {
      cards: {
        cardId: number;
        card: {
          id: number;
          title: string;
        };
      }[];
      boards: {
        boardId: number;
        board: {
          id: number;
          columns: {
            columnId: number;
            column: {
              id: number;
              title: string;
              cards: {
                cardId: number;
                card: {
                  id: number;
                  title: string;
                };
              };
            };
          };
        };
      };
    };
  }>(getUserCardsQuery, {
    cookies: {
      "user-jwt": jwt,
    },
  });

  const newCard = userCardsResp.data.me.cards.find(
    (card) => card.cardId === createCardResp.data.card.createCard.card.id
  );

  t.equal(!!newCard, true);
  t.equal(newCard?.card.title, "test_card");
});
