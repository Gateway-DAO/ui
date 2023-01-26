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
        './apps/website/services/cyberconnect/types.ts': {
          ...generateConfig,
          schema: process.env.CYBERCONNECT_ENDPOINT as string,
          documents: ['apps/website/services/cyberconnect/**/*.gql'],
        },
        './apps/website/services/hasura/types.ts': {
          ...generateConfig,
          schema: {
            [`${process.env.HASURA_ENDPOINT}`]: {
              headers: {
                'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET as string,
              },
            },
          },
          documents: ['apps/website/services/hasura/**/*.gql'],
        },
        './apps/website/services/gateway-protocol/types.ts': {
          ...generateConfig,
          schema: {
            [`${process.env.GATEWAY_PROTOCOL_ENDPOINT}`]: {
            },
          },
          documents: ['apps/website/services/gateway-protocol/**/*.gql'],
        },
        './apps/website/services/gateway-protocol/validation.ts': {
          plugins: [
            'typescript-validation-schema',
          ],
          config: {
            scalars: {
              DateTime: 'string',
              JSON: 'any',
              StringSchema: 'string'
            },
            strictScalars: true,
            schema: 'zod',
            importFrom: './types.ts'
          },
          schema: {
            [`${process.env.GATEWAY_PROTOCOL_ENDPOINT}`]: {
            },
          },
          documents: ['apps/website/services/gateway-protocol/**/*.gql'],
        }
      }
    }
  }
}


export default config;
