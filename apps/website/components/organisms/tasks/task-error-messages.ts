export const taskErrorMessages = {
  INVALID_AUTH_TOKEN: 'Invalid auth token, please try to login again.',
  INVALID_REFRESH_TOKEN: 'Invalid refresh token, please try to login again.',
  WALLET_REQUIRED: 'Please login to your wallet.',
  ADDRESS_MISMATCH: 'Address mismatch, please login to your wallet.',
  ALREADY_CLAIMED: 'You have already claimed this task.',
  CANNOT_CLAIM: `You cannot claim this task, contact the DAO.`,
  NOT_CREDENTIAL_ADMIN: `You are not a credential admin, contact the DAO's admin.`,
  NO_VERIFICATION_CODE: 'No verification code found.',
  INVALID_VERIFICATION_CODE: 'Invalid verification code.',
  NO_HOLD: `You don't hold the token, contact the DAO's admin.`,
  NO_HOLD_NFT: `You don't hold the NFT, contact the DAO's admin.`,
  NO_CONTRACT_INTERACTION: `There was an error with the contract interaction, contact the DAO's admin.`,
  NO_PROPOSAL_VOTE: `You didn't vote for this proposal.`,
  NO_PROPOSAL_CREATION: `You didn't create any proposal on the Snapshot space.`,
  NO_QUIZ_BODY: `The Quiz was not filled out correctly.`,
  FAILED_QUIZ: `You didn't pass the quiz.`,
  FAILED_GITHUB_CONTRIBUTE: `You didn't contribute to this GitHub repository.`,
  FAILED_GITHUB_PRS: `You haven't merged enough pull requests on this GitHub repository.`,
  NO_INPUT: `There was an error with your Quiz validation, please, try again.`,
  NO_TASK_ID: `There was an error with your Quiz validation, please, try again.`,
  NO_MANUAL_TASK_IDS: `There was an error with your Quiz validation, please, try again.`,
  UNKNOWN_TASK_TYPE: `There was an error retrieving your task, please, try again.`,
  WRONG_TASK_TYPE: `This task is not a manual task, please, try again.`,
  NO_BASE64: `There was an error uploading your image, please, try again.`,
  FILE_NOT_FOUND: `There was an error retrieving your image, please, contact Gateway or try again.`,
  UNABLE_TO_RETRIEVE_FILE: `There was an error retrieving your image, please, contact Gateway or try again.`,
  UNEXPECTED_ERROR: `There was an unexpected error, please, contact Gateway or try again.`,
  NO_POSTED_TWEET: `You have not posted the tweet`,
  NO_POSTED_RETWEET: `You have not posted the tweet`,
  NO_FOLLOW: `The user does not follow the twitter account`,
};
