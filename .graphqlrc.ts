import { IGraphQLProjects } from "graphql-config";

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
