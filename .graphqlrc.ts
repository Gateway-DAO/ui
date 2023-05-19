import { IGraphQLProjects, IGraphQLConfig } from 'graphql-config';
import * as prismaEnumsBase from "@prisma/client";
require('dotenv').config();

const prismaEnums = Object.keys(prismaEnumsBase)
// Remove non-objects and uppercased keys
.filter(key => typeof prismaEnumsBase[key] === 'object' && key[0] !== key[0].toUpperCase())
// Transform object to union type
.reduce((acc,curr) => ({
  ...acc,
  [curr]: Object.keys(prismaEnumsBase[curr]).map(el => `"${el}"`).join(" | "),
}), {} as Record<keyof typeof prismaEnumsBase, string>)

const generateConfig = {
  plugins: [
    {
      add: {
        content: ['/* eslint-disable */', `export type Notification_Type = ${prismaEnums.notification_type};`],
      }
    },
    'typescript',
    'typescript-operations',
    'typescript-graphql-request',
    'typescript-resolvers',
  ],
  config: {
    scalars: {
      _text: 'string',
      // TODO: Fix all type errors on build when enabling next line
      // ...prismaEnums,
      "_notification_type": `Array<Notification_Type>`,
      manual_task_event_type: prismaEnums.manual_task_event_type,
      task_type: prismaEnums.task_type,
      key_status: prismaEnums.key_status
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
        './services/hasura/types.ts': {
          ...generateConfig,
          schema: {
            [`${process.env.HASURA_ENDPOINT}`]: {
              headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
              },
            },
          },
          documents: ['services/hasura/**/*.gql'],
        },
        './services/gateway-protocol/types.ts': {
          ...generateConfig,
          schema: {
            [`${process.env.GATEWAY_PROTOCOL_ENDPOINT}`]: {
            },
          },
          documents: ['services/gateway-protocol/**/*.gql'],
        }
      }
    }
  }
}


export default config;
