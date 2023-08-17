export const query = {
  credentialsByDataModel: 'credentials_by_data_model',
  issuersByDataModel: 'issuers_by_data_model',
  recipientsByDataModel: 'recipients_by_data_model',
  credentialsByIssuerUser: 'credentials_by_issuer_user',
  credentialsByRecipientUser: 'credentials_by_recipient_user',
  dataModels: 'data_models',
  dataModel: 'data_model',
  mintCredential: 'mint_credential',
  credentialsIssuedByOrg: 'credentials_issued_by_organization',
  credentialsReceivedByOrg: 'credentials_received_by_organization',
  passes: 'passes', //loyalty programs
  direct_credentialholders: 'direct-credential-holders',
  publish_gate: 'publishGate',
  delete_gate: 'deleteGate',
  direct_credential_info: 'direct-credential-info',
  gate: 'gate',
  create_code_change_email: 'create_code',
  confirm_token_change_email: 'confirm_token_change_email',
  org_pending_gate_creation: 'org_pending_gate_creation',
  loyalty_credential_by_user_id_by_data_model_id:
    'loyalty_credential_by_user_id_by_data_model_id',
  protocol_credential: 'protocol_credential',
};

export const mutation = {
  create_organization: 'create_organization',
  approve_organization: 'approve_organization',
};
