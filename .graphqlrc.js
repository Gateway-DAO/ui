require('dotenv').config();
module.exports = {
  projects: {
    hasura: {
      schema: {
        [`${process.env.HASURA_ENDPOINT}`]: {
          headers: {
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
          },
        },
      },
      documents: 'src/services/hasura/**/*.gql'
    },
    protocol: {
      schema: `${process.env.GATEWAY_PROTOCOL_ENDPOINT}`,
      documents: 'src/services/gateway-protocol/**/*.gql'
    }
  }
}
