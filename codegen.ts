import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "src/typeDefs/**/*.graphql",
  generates: {
    "src/types/resolver-gql.ts": {
      plugins: ["typescript"],
      config: {
        avoidOptionals: false,
      },
    },
  },
  watch: true,
};

export default config;
