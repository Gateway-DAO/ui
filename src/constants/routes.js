const ROUTES = {
  LANDING: '/',
  TERMS: '/terms',
  EXPLORE: '/explore',
  EXPLORE_EARN: '/explore/earn',
  EXPLORE_PASSES: '/explore/passes',
  EXPLORE_ISSUE: '/explore/issue',
  EXPLORE_ORGANIZATIONS: '/explore/organizations',
  SEARCH: '/search/[key]',
  NEW_USER: '/new-user',
  CREDENTIALS: '/credentials',
  CREDIT_SCORE: '/creditscore',
  CREDENTIALS_NEW: '/credentials/new',
  EARNED: '/earned/[id]',
  DAO_PROFILE: '/org/[slug]',
  MY_PROFILE: '/profile',
  PROFILE: '/profile/[username]',
  PROFILE_EDIT: '/profile/edit',
  SETTINGS: '/settings',
  SETTINGS_PUBLIC_PROFILE: '/settings/public-profile',
  SETTINGS_ACCOUNT_MANAGEMENT: '/settings/account-management',
  SETTINGS_CONNECTED_ACCOUNTS: '/settings/connected-accounts',
  SETTINGS_DEVELOPER_PORTAL: '/settings/developer-portal',
  SETTINGS_NOTIFICATIONS: '/settings/notifications',
  DAO_EDIT: '/org/[slug]/edit',
  DAO_NEW: '/org/new',
  GATE_PROFILE: '/credential/[id]',
  GATE_NEW: '/credential/new',
  PROTOCOL_CREDENTIAL: '/protocol/credentials/[id]/show',
  PROTOCOL_DATAMODEL: '/model/[id]',
  PROTOCOL_DATAMODEL_ISSUERS: '/model/[id]/issuers',
  PROTOCOL_DATAMODEL_RECIPIENTS: '/model/[id]/recipients',
  PROTOCOL_DATAMODEL_CREDENTIALS: '/model/[id]/credentials',
  PROTOCOL_DATAMODEL_PLAYGROUND: '/model/[id]/playground',
  PROTOCOL_DATAMODEL_CREDENTIAL_CREATE: '/model/[id]/credentials/create',
  LOYALTY_PROGRAM: '/loyalty/[id]',
  LOYALTY_PROGRAM_CREDENTIAL: '/loyalty/credential/[id]',
};

module.exports = {
  ROUTES,
};
