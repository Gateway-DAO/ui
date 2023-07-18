/* eslint-disable @typescript-eslint/no-var-requires */
const { ROUTES } = require('./src/constants/routes');

const config = {
  locales: ['en'],
  defaultLocale: 'en',
  pages: {
    '*': [
      'common',
      'auth',
      'notifications',
      '404',
      'gates-card',
      'errors',
      'org-signup',
    ],
    [ROUTES.DAO_EDIT]: ['dao-edit'],
    [ROUTES.DAO_NEW]: ['dao-new'],
    [ROUTES.DAO_PROFILE]: ['dao-profile', 'org-signup'],
    [ROUTES.EXPLORE]: ['explore', 'org-signup'],
    [ROUTES.EXPLORE_EARN]: ['explore', 'org-signup'],
    [ROUTES.EXPLORE_ISSUE]: ['explore', 'org-signup'],
    [ROUTES.EXPLORE_PASSES]: ['explore', 'org-signup'],
    [ROUTES.EXPLORE_ORGANIZATIONS]: ['explore', 'org-signup'],
    [ROUTES.GATE_NEW]: ['gate-new'],
    [ROUTES.GATE_PROFILE]: [
      'gate-new',
      'gate-profile',
      'credential',
      'protocol',
    ],
    [ROUTES.LANDING]: ['index'],
    [ROUTES.TERMS]: ['index', 'terms'],
    [ROUTES.CREDIT_SCORE]: ['credit-score'],
    [ROUTES.SPBLUR]: ['sp-blur'],
    [ROUTES.MY_PROFILE]: ['user-profile'],
    [ROUTES.AUTHENTICATION]: ['authentication'],
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
    [ROUTES.PROTOCOL_DATAMODEL_ISSUERS]: ['protocol'],
    [ROUTES.PROTOCOL_DATAMODEL_CREDENTIALS]: ['protocol'],
    [ROUTES.PROTOCOL_DATAMODEL_RECIPIENTS]: ['protocol'],
    [ROUTES.PROTOCOL_DATAMODEL_PLAYGROUND]: ['protocol'],
    [ROUTES.LOYALTY_PROGRAM]: [
      'loyalty-program',
      'credential',
      'gate-new',
      'gate-profile',
      'protocol',
    ],
    [ROUTES.LOYALTY_PROGRAM_CREDENTIAL]: [
      'loyalty-program',
      'credential',
      'gate-new',
      'gate-profile',
      'protocol',
    ],
  },
  localeDetection: false,
};

module.exports = config;
