/* eslint-disable @typescript-eslint/no-var-requires */
const { ROUTES } = require('./constants/routes');

const config = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': ['common', 'auth', 'notifications', '404', 'gates-card', 'errors'],
    [ROUTES.DAO_EDIT]: ['dao-edit'],
    [ROUTES.DAO_NEW]: ['dao-new'],
    [ROUTES.DAO_PROFILE]: ['dao-profile'],
    [ROUTES.EXPLORE]: ['explore'],
    [ROUTES.GATE_NEW]: ['gate-new'],
    [ROUTES.GATE_PROFILE]: ['gate-new', 'gate-profile', 'credential'],
    [ROUTES.LANDING]: ['index'],
    [ROUTES.CREDIT_SCORE]: ['credit-score'],
    [ROUTES.MY_PROFILE]: ['user-profile'],
    [ROUTES.NEW_USER]: ['dashboard-new-user'],
    [ROUTES.PROFILE_EDIT]: ['profile-edit'],
    [ROUTES.PROFILE]: ['user-profile'],
    [ROUTES.SEARCH]: ['search'],
    [ROUTES.SETTINGS]: ['settings'],
    [ROUTES.SETTINGS_PUBLIC_PROFILE]: ['settings'],
    [ROUTES.SETTINGS_ACCOUNT_MANAGEMENT]: ['settings'],
    [ROUTES.SETTINGS_CONNECTED_ACCOUNTS]: ['settings'],
    [ROUTES.SETTINGS_NOTIFICATIONS]: ['settings'],
    [ROUTES.SETTINGS_DEVELOPER_PORTAL]: ['settings'],
    [ROUTES.PROTOCOL_CREDENTIAL]: ['protocol'],
    [ROUTES.PROTOCOL_DATAMODEL]: ['protocol'],
    [ROUTES.PROTOCOL_DATAMODEL_CREDENTIAL_CREATE]: ['protocol'],
    [ROUTES.LOYALTY_PROGRAM]: ['loyalty-program'],
    [ROUTES.LOYALTY_PROGRAM_CREDENTIAL]: [
      'loyalty-program',
      'credential',
      'gate-new',
      'gate-profile',
    ],
  },
  localeDetection: false,
};

module.exports = config;
