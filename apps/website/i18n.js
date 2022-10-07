/* eslint-disable @typescript-eslint/no-var-requires */
const { ROUTES } = require('./constants/routes');

const config = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'auth', 'notifications', '404', 'gates-card'],
    [ROUTES.DAO_EDIT]: ['dao-edit'],
    [ROUTES.DAO_NEW]: ['dao-new'],
    [ROUTES.DAO_PROFILE]: ['dao-profile'],
    [ROUTES.EXPLORE]: ['explore'],
    [ROUTES.GATE_NEW]: ['gate-new'],
    [ROUTES.GATE_PROFILE]: ['gate-profile', 'credential'],
    [ROUTES.LANDING]: ['index'],
    [ROUTES.MY_PROFILE]: ['user-profile'],
    [ROUTES.NEW_USER]: ['dashboard-new-user'],
    [ROUTES.PROFILE_EDIT]: ['profile-edit'],
    [ROUTES.PROFILE]: ['user-profile'],
    [ROUTES.SEARCH]: ['search'],
  },
  localeDetection: false,
};

module.exports = config;
