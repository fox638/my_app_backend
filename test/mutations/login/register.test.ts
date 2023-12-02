import { server } from "@/index";
import gql from "graphql-tag";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

const client = createMercuriusTestClient(server);

tap.teardown(async () => {
  await server.close();
});

tap.test("register user", async (t) => {
  t.plan(1);

  const query = `
    mutation {
      auth {
        signUp(
          input: { email: "my@mail.com", password: "1111", username: "dima" }
        ) {
          ok
        }
      }
    }
  `;

  const resp = await client.mutate<{
    auth: {
      signUp: {
        ok: boolean;
      };
    };
  }>(query);

  t.equal(resp.data.auth.signUp.ok, true);
  console.log("resp", resp);

  t.end();
});
