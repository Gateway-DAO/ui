/* eslint-disable @typescript-eslint/no-var-requires */
const { ROUTES } = require('./constants/routes');

const config = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'auth', 'notifications', '404'],
    [ROUTES.LANDING]: ['index'],
    [ROUTES.EXPLORE]: ['explore'],
    [ROUTES.SEARCH]: ['search'],
    [ROUTES.NEW_USER]: ['dashboard-new-user'],
    [ROUTES.PROFILE_EDIT]: ['profile-edit'],
    [ROUTES.DAO_PROFILE]: ['dao-profile'],
    [ROUTES.DAO_NEW]: ['dao-new'],
    [ROUTES.DAO_EDIT]: ['dao-edit'],
    [ROUTES.PROFILE]: ['user-profile'],
    [ROUTES.MY_PROFILE]: ['user-profile'],
    [ROUTES.GATE_PROFILE]: ['credential'],
  },
  localeDetection: false,
};

module.exports = config;
