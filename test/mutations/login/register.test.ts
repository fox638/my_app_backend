import { server } from "@/index";
import gql from "graphql-tag";
import { createMercuriusTestClient } from "mercurius-integration-testing";
import tap from "tap";

const client = createMercuriusTestClient(server);

tap.teardown(async () => {
  await server.close();
});

tap.test("register user and login user", async (t) => {
  // const signUpMutation = gql`
  //   mutation {
  //     auth {
  //       signUp(
  //         input: { email: "my@mail.com", password: "1111", username: "dima" }
  //       ) {
  //         ok
  //       }
  //     }
  //   }
  // `;

  const loginMutation = gql`
    mutation {
      auth {
        login(input: { email: "my@mail.com", password: "1111" }) {
          ok
        }
      }
    }
  `;

  const geMeQuery = gql`
    query {
      me {
        email
      }
    }
  `;

  // const resp = await client.mutate<{
  //   auth: {
  //     signUp: {
  //       ok: boolean;
  //     };
  //   };
  // }>(signUpMutation);

  // t.equal(
  //   resp.data.auth.signUp.ok,
  //   true,
  //   "signUp mutation should return ok true"
  // );

  // const loginResp = await client.mutate<{
  //   auth: {
  //     login: {
  //       ok: boolean;
  //     };
  //   };
  // }>(loginMutation);
  // console.log("loginResp", loginResp);

  // t.equal(
  //   loginResp.data.auth.login.ok,
  //   true,
  //   'login mutation should return ok "true"'
  // );
  await server.listen();

  const jwt = server.jwt.sign({ email: "my@mail.com" });

  const meResp = await client.query<{
    me: {
      email: string;
    };
  }>(geMeQuery, {
    cookies: {
      "user-jwt": jwt,
    },
  });

  t.equal(
    meResp.data.me.email,
    "my@mail.com",
    'get me query should return "my@mail.com"'
  );

  t.end();
});
