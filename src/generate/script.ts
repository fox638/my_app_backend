import { loadFiles } from "@graphql-tools/load-files";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { generateCode, writeGeneratedCode } from "mercurius-codegen/dist/code";
import path from "path";

const start = async () => {
  const schema = makeExecutableSchema({
    typeDefs: await loadFiles(path.join(__dirname, "../**/*.graphql")),
  });

  const code = await generateCode(
    schema,
    {},
    "",
    false,
    path.join(__dirname, "../../test/**/*.gql")
  );

  const absoluteTargetPath = await writeGeneratedCode({
    code,
    targetPath: path.join(__dirname, "./graphql.ts"),
  });

  console.log(`[mercurius-codegen] Code re-generated at ${absoluteTargetPath}`);
};

start();
