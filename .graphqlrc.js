require('dotenv').config();
module.exports = {
  schema: {
    [`${process.env.HASURA_ENDPOINT}`]: {
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
    },
  },
  documents: 'src/services/hasura/**/*.gql'
}
