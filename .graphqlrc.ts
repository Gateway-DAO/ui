import { IGraphQLProjects } from "graphql-config";

require('dotenv').config()

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
      documents: [
        // "./apps/website/**/*.{graphql,gql,js,ts,jsx,tsx}",
        "./apps/website/**/*.{graphql,gql}",
        "!**/*.generated.{graphql,gql}",
      ],
      extensions: {
        codegen: {
          generates: {
            "./apps/website/services/graphql/types.generated.ts": {
              plugins: [
                "typescript",
                "typescript-operations",
                "typescript-graphql-request"
              ],
              config: {
                scalars: {
                  "_text": "string"
                },
                avoidOptionals: true,
                fetcher: "graphql-request"
              }
            }
          }
        }
      }
    }
  }
}

export default config;
