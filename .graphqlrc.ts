import { IGraphQLProjects, IGraphQLConfig } from 'graphql-config';

require('dotenv').config();

const generateConfig = {
  plugins: [
    'typescript',
    'typescript-operations',
    'typescript-graphql-request',
    'typescript-resolvers',
  ],
  config: {
    scalars: {
      _text: 'string',
    },
    defaultMapper: 'Partial<{T}>',
    avoidOptionals: {
      field: true,
      inputValue: false,
      object: true,
      defaultValue: true,
    },
    fetcher: 'graphql-request',
  },
};

const config: IGraphQLConfig = {
  schema: '',
  documents: [],
  extensions: {
    codegen: {
      generates: {
        './apps/website/services-cyberconnect/types.generated.ts': {
          ...generateConfig,
          schema: process.env.NEXT_PUBLIC_CYBERCONNECT_ENDPOINT as string,
          documents: ['apps/website/services-cyberconnect/**/*.gql'],
        },
        './apps/website/services/graphql/types.generated.ts': {
          ...generateConfig,
          schema: {
            [`${process.env.HASURA_ENDPOINT}`]: {
              headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
              },
            },
          },
          documents: ['apps/website/services/**/*.gql'],
        }
      },
    },
  },
}


export default config;
