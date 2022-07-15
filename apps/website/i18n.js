/* eslint-disable @typescript-eslint/no-var-requires */
const { ROUTES } = require('./constants/routes');

const config = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'auth'],
    [ROUTES.LANDING]: ['index'],
    [ROUTES.EXPLORE]: ['explore'],
    [ROUTES.NEW_USER]: ['dashboard-new-user'],
    [ROUTES.DAO_PROFILE]: ['dao-profile'],
  },
  localeDetection: false,
};

module.exports = config;
