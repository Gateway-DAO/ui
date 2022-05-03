import { IGraphQLProjects } from "graphql-config";
/* dotenv is needed for vscode graphql extension */
const dotenv = require("dotenv");

dotenv.config({path: "./.env"})


const config: IGraphQLProjects = {
  projects: {
    website: {
      schema: [{
        [`${process.env.HASURA_ENDPOINT}`]: {
          headers: {
            "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
          }
        }
      }],
      documents: ["./apps/website/**/*.{graphql,gql,js,ts,jsx,tsx}"],
      extensions: {
        codegen: {
          generates: {
            "./apps/website/types/graphql.ts": {
              plugins: [
                "typescript",
                "typescript-operations",
              ],
            }
          }
        }
      }
    }
  }
}

export default config;
