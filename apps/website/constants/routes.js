const ROUTES = {
  LANDING: '/',
  EXPLORE: '/home',
  SEARCH: '/search/[key]',
  NEW_USER: '/new-user',
  CREDENTIALS: '/credentials',
  CREDENTIALS_NEW: '/credentials/new',
  EARNED: '/earned/[id]',
  DAO_PROFILE: '/dao/[slug]',
  MY_PROFILE: '/profile',
  PROFILE: '/profile/[username]',
  PROFILE_EDIT: '/profile/edit',
  SETTINGS: '/settings',
  SETTINGS_PUBLIC_PROFILE: '/settings/public-profile',
  SETTINGS_ACCOUNT_MANAGEMENT: '/settings/account-management',
  SETTINGS_CONNECTED_ACCOUNTS: '/settings/connected-accounts',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
  DAO_EDIT: '/dao/[slug]/edit',
  DAO_NEW: '/dao/new',
  GATE_PROFILE: '/credential/[id]',
  GATE_NEW: '/credential/new',
  PROTOCOL_CREDENTIAL: '/protocol/credentials/[id]/show',
  PROTOCOL_DATAMODEL: '/protocol/data-models/[id]/show',
  PROTOCOL_DATAMODEL_CREDENTIAL_CREATE:
    '/protocol/data-models/[id]/credentials/create',
  LOYALTY_PROGRAM: '/loyalty/[id]',
  LOYALTY_PROGRAM_CREDENTIAL: '/loyalty/credential/[id]',
};

module.exports = {
  ROUTES,
};
