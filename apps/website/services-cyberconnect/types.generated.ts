import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Percentage: any;
  Time: any;
  Upload: any;
};

export type AckAllNotificationsInput = {
  address: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  operation: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
  /**
   * Unix timestamp in millisecond.
   * Use current timestamp.
   */
  timestamp: Scalars['String'];
};

export type AckAllNotificationsResponse = {
  __typename?: 'AckAllNotificationsResponse';
  result: AckAllNotificationsResponse_Result;
};

export enum AckAllNotificationsResponse_Result {
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  InvalidTimestamp = 'INVALID_TIMESTAMP',
  OperationExpired = 'OPERATION_EXPIRED',
  Success = 'SUCCESS'
}

export type AckNotificationsInput = {
  address: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  notificationIds: Array<Scalars['String']>;
  operation: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
};

export type AckNotificationsResponse = {
  __typename?: 'AckNotificationsResponse';
  result: AckNotificationsResponse_Result;
};

export enum AckNotificationsResponse_Result {
  AckFailed = 'ACK_FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  Success = 'SUCCESS'
}

export type AliasResponse = {
  __typename?: 'AliasResponse';
  result: AliasResponse_Result;
};

export enum AliasResponse_Result {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  DuplicateAddress = 'DUPLICATE_ADDRESS',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  SigningKeyExpired = 'SIGNING_KEY_EXPIRED',
  Success = 'SUCCESS'
}

export type AuthResponse = {
  __typename?: 'AuthResponse';
  authToken: Scalars['String'];
  result: AuthResponse_Result;
};

export enum AuthResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type BatchConnectResponse = {
  __typename?: 'BatchConnectResponse';
  alreadyFollowed: Maybe<Array<Scalars['String']>>;
  failToFollow: Maybe<Array<Scalars['String']>>;
  result: BatchConnectResponse_Result;
  successFollowed: Maybe<Array<Scalars['String']>>;
};

export enum BatchConnectResponse_Result {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  DuplicateAddress = 'DUPLICATE_ADDRESS',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  SigningKeyExpired = 'SIGNING_KEY_EXPIRED',
  Success = 'SUCCESS'
}

export type BatchUpdateConnectionInput = {
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  signingInputs: Array<SigningInput>;
  signingKey: Scalars['String'];
};

export type BiConnEvent = Event & {
  __typename?: 'BiConnEvent';
  createdAt: Scalars['String'];
  fromAddr: Scalars['String'];
  hash: Scalars['String'];
  instruction: BiConnInstruction;
  isAnchor: Scalars['Boolean'];
  namespace: Scalars['String'];
  network: Network;
  parentHash: Scalars['String'];
  proof: Proof;
  toAddr: Scalars['String'];
};

export type BiConnIdentity = {
  __typename?: 'BiConnIdentity';
  bidirectionalConnection: BidirectionalConnection;
  identity: UserIdentity;
};

export enum BiConnInstruction {
  Accept = 'ACCEPT',
  Block = 'BLOCK',
  Init = 'INIT',
  Reject = 'REJECT',
  Terminate = 'TERMINATE',
  Unblock = 'UNBLOCK'
}

export enum BiConnState {
  Blacklist = 'BLACKLIST',
  Connected = 'CONNECTED',
  Empty = 'EMPTY',
  Pending = 'PENDING'
}

export type BiConnectAcceptedNotification = Notification & {
  __typename?: 'BiConnectAcceptedNotification';
  fromAddress: Scalars['String'];
  hasRead: Scalars['Boolean'];
  id: Scalars['ID'];
  namespace: Scalars['String'];
  network: Network;
  timestamp: Scalars['String'];
  toAddress: Scalars['String'];
  type: NotificationType;
};

export type BiConnectInput = {
  fromAddr: Scalars['String'];
  instruction: BiConnInstruction;
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  operation: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
  toAddr: Scalars['String'];
};

export type BiConnectReceivedNotification = Notification & {
  __typename?: 'BiConnectReceivedNotification';
  fromAddress: Scalars['String'];
  hasRead: Scalars['Boolean'];
  id: Scalars['ID'];
  namespace: Scalars['String'];
  network: Network;
  timestamp: Scalars['String'];
  toAddress: Scalars['String'];
  type: NotificationType;
};

export type BiConnectResponse = {
  __typename?: 'BiConnectResponse';
  message: Scalars['String'];
  result: BiConnectResponse_Result;
};

export enum BiConnectResponse_Result {
  ExceedLimit = 'EXCEED_LIMIT',
  InconsistencyError = 'INCONSISTENCY_ERROR',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidParameter = 'INVALID_PARAMETER',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  Success = 'SUCCESS'
}

export type BidirectionalConnection = {
  __typename?: 'BidirectionalConnection';
  direction: Direction;
  from: Scalars['String'];
  latestAnchorEvent: Maybe<BiConnEvent>;
  latestEvent: Maybe<BiConnEvent>;
  latestHash: Scalars['String'];
  namespace: Scalars['String'];
  network: Network;
  state: BiConnState;
  to: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type BidirectionalConnectionIdentityPage = {
  __typename?: 'BidirectionalConnectionIdentityPage';
  list: Array<BiConnIdentity>;
  pageInfo: PageInfo;
};

export type Connect = {
  __typename?: 'Connect';
  address: Scalars['String'];
  alias: Scalars['String'];
  avatar: Scalars['String'];
  domain: Scalars['String'];
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars['String'];
  /** @deprecated `lastModifiedTime` is deprecated. */
  lastModifiedTime: Scalars['String'];
  namespace: Scalars['String'];
  type: ConnectionType;
  verifiable: Scalars['Boolean'];
};

export type ConnectResponse = {
  __typename?: 'ConnectResponse';
  result: ConnectResponse_Result;
};

export enum ConnectResponse_Result {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  DuplicateAddress = 'DUPLICATE_ADDRESS',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  SigningKeyExpired = 'SIGNING_KEY_EXPIRED',
  Success = 'SUCCESS'
}

export type Connection = {
  __typename?: 'Connection';
  /** The alias set by the fromAddr for toAddr. */
  alias: Scalars['String'];
  createdAt: Scalars['String'];
  followStatus: FollowStatus;
  fromAddr: Scalars['String'];
  latestAnchorEvent: Maybe<ConnectionEvent>;
  latestEvent: Maybe<ConnectionEvent>;
  namespace: Scalars['String'];
  network: Network;
  /** @deprecated `proof` is deprecated. Use `latestEvent` to retrieve it. */
  proof: Scalars['String'];
  toAddr: Scalars['String'];
  /** Connection type. Default is FOLLOW. */
  type: ConnectionType;
  updatedAt: Scalars['String'];
};

export type ConnectionEvent = Event & {
  __typename?: 'ConnectionEvent';
  createdAt: Scalars['String'];
  fromAddr: Scalars['String'];
  hash: Scalars['String'];
  isAnchor: Scalars['Boolean'];
  namespace: Scalars['String'];
  network: Network;
  operator: Scalars['Boolean'];
  parentHash: Scalars['String'];
  proof: Proof;
  toAddr: Scalars['String'];
  type: ConnectionType;
};

export type ConnectionIdentityPage = {
  __typename?: 'ConnectionIdentityPage';
  list: Array<Connect>;
  pageInfo: PageInfo;
};

export type ConnectionSummary = {
  __typename?: 'ConnectionSummary';
  connectionCount: Scalars['Int'];
  connectionDelta: Scalars['Int'];
  namespaceCount: Scalars['Int'];
  userCount: Scalars['Int'];
  userDelta: Scalars['Int'];
};

export enum ConnectionType {
  Follow = 'FOLLOW',
  Like = 'LIKE',
  Report = 'REPORT',
  Vote = 'VOTE',
  Watch = 'WATCH'
}

export enum Direction {
  Bidirection = 'BIDIRECTION',
  FromTo = 'FROM_TO',
  ToFrom = 'TO_FROM'
}

export type DisconnectResponse = {
  __typename?: 'DisconnectResponse';
  result: DisconnectResponse_Result;
};

export enum DisconnectResponse_Result {
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
  DuplicateAddress = 'DUPLICATE_ADDRESS',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidOperation = 'INVALID_OPERATION',
  InvalidSignature = 'INVALID_SIGNATURE',
  OperationExpired = 'OPERATION_EXPIRED',
  SigningKeyExpired = 'SIGNING_KEY_EXPIRED',
  Success = 'SUCCESS'
}

export type Event = {
  createdAt: Scalars['String'];
  fromAddr: Scalars['String'];
  hash: Scalars['String'];
  isAnchor: Scalars['Boolean'];
  namespace: Scalars['String'];
  network: Network;
  parentHash: Scalars['String'];
  proof: Proof;
  toAddr: Scalars['String'];
};

export type EventPage = {
  __typename?: 'EventPage';
  list: Array<Event>;
  pageInfo: PageInfo;
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  result: FollowResponse_Result;
};

export enum FollowResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type FollowStatus = {
  __typename?: 'FollowStatus';
  isFollowed: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
};

export type Github = {
  __typename?: 'Github';
  gistId: Scalars['String'];
  userId: Scalars['Int'];
  username: Scalars['String'];
};

export type HomePage = {
  __typename?: 'HomePage';
  connectionCount: Scalars['Int'];
  indexedConnectionCount: Scalars['Int'];
  indexedUserCount: Scalars['Int'];
  userCount: Scalars['Int'];
};

export type MetricsCount = {
  __typename?: 'MetricsCount';
  top10Count: Scalars['Int'];
  top100Count: Scalars['Int'];
  top1000Count: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ackAllNotifications: AckAllNotificationsResponse;
  ackNotifications: AckNotificationsResponse;
  alias: AliasResponse;
  /** @deprecated `auth` for centralized authorization is deprecated. To make data verifiable, use `registerKey` instead. */
  auth: AuthResponse;
  batchConnect: BatchConnectResponse;
  bidirectionalConnect: BiConnectResponse;
  connect: ConnectResponse;
  disconnect: DisconnectResponse;
  /** @deprecated `follow` is deprecated. To make data verifiable, use `connect` instead. */
  follow: FollowResponse;
  registerKey: RegisterKeyResponse;
  /** @deprecated `setAlias` is deprecated. To make data verifiable, use `alias` instead. */
  setAlias: SetAliasResponse;
  /** @deprecated `setProfile` is deprecated. */
  setProfile: SetProfileResponse;
  setTwitterHandle: SetTwitterHandleResponse;
  subscribe: SubscribeResponse;
  /** @deprecated `unfollow` is deprecated. To make data verifiable, use `disconnect` instead. */
  unfollow: UnFollowResponse;
  verifyGithub: VerifyGithubResponse;
  verifyTwitter: VerifyTwitterResponse;
};


export type MutationAckAllNotificationsArgs = {
  input: AckAllNotificationsInput;
};


export type MutationAckNotificationsArgs = {
  input: AckNotificationsInput;
};


export type MutationAliasArgs = {
  input: UpdateConnectionInput;
};


export type MutationAuthArgs = {
  address: Scalars['String'];
  network: InputMaybe<Network>;
  signature: Scalars['String'];
};


export type MutationBatchConnectArgs = {
  input: BatchUpdateConnectionInput;
};


export type MutationBidirectionalConnectArgs = {
  input: BiConnectInput;
};


export type MutationConnectArgs = {
  input: UpdateConnectionInput;
};


export type MutationDisconnectArgs = {
  input: UpdateConnectionInput;
};


export type MutationFollowArgs = {
  alias: InputMaybe<Scalars['String']>;
  fromAddr: Scalars['String'];
  namespace: InputMaybe<Scalars['String']>;
  network: InputMaybe<Network>;
  signature: Scalars['String'];
  toAddr: Scalars['String'];
};


export type MutationRegisterKeyArgs = {
  input: RegisterKeyInput;
};


export type MutationSetAliasArgs = {
  alias: Scalars['String'];
  fromAddr: Scalars['String'];
  namespace: InputMaybe<Scalars['String']>;
  network: InputMaybe<Network>;
  signature: Scalars['String'];
  toAddr: Scalars['String'];
};


export type MutationSetProfileArgs = {
  address: Scalars['String'];
  avatar: InputMaybe<Scalars['String']>;
  domain: InputMaybe<Scalars['String']>;
  network: Network;
  signature: Scalars['String'];
};


export type MutationSetTwitterHandleArgs = {
  address: Scalars['String'];
  handle: Scalars['String'];
  network?: InputMaybe<Network>;
};


export type MutationSubscribeArgs = {
  input: Array<SubscribeInput>;
};


export type MutationUnfollowArgs = {
  fromAddr: Scalars['String'];
  namespace: InputMaybe<Scalars['String']>;
  network: InputMaybe<Network>;
  signature: Scalars['String'];
  toAddr: Scalars['String'];
};


export type MutationVerifyGithubArgs = {
  address: Scalars['String'];
  gistId: Scalars['String'];
  namespace: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type MutationVerifyTwitterArgs = {
  address: Scalars['String'];
  handle: Scalars['String'];
  namespace: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};

export type NftOwner = {
  __typename?: 'NFTOwner';
  owner: Scalars['String'];
  tokenId: Scalars['String'];
  twitter: Maybe<Twitter>;
};

export enum Network {
  /** Ethereum network. */
  Eth = 'ETH',
  /** Solana network. */
  Solana = 'SOLANA'
}

export type NewConnectionNotification = Notification & {
  __typename?: 'NewConnectionNotification';
  connectionType: ConnectionType;
  fromAddress: Scalars['String'];
  hasRead: Scalars['Boolean'];
  id: Scalars['ID'];
  namespace: Scalars['String'];
  network: Network;
  timestamp: Scalars['String'];
  toAddress: Scalars['String'];
  type: NotificationType;
};

export type Node = {
  id: Scalars['ID'];
};

export type Notification = {
  hasRead: Scalars['Boolean'];
  id: Scalars['ID'];
  namespace: Scalars['String'];
  network: Network;
  timestamp: Scalars['String'];
  toAddress: Scalars['String'];
  type: NotificationType;
};

export type NotificationPage = {
  __typename?: 'NotificationPage';
  list: Array<Notification>;
  pageInfo: PageInfo;
};

export enum NotificationType {
  BiconnectAccepted = 'BICONNECT_ACCEPTED',
  BiconnectReceived = 'BICONNECT_RECEIVED',
  NewConnection = 'NEW_CONNECTION'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Popular = {
  __typename?: 'Popular';
  address: Scalars['String'];
  avatar: Scalars['String'];
  domain: Scalars['String'];
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars['String'];
  followerCount: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  recommendationReason: Scalars['String'];
};

export type PopularPage = {
  __typename?: 'PopularPage';
  list: Array<Popular>;
  pageInfo: PageInfo;
};

export type Proof = {
  __typename?: 'Proof';
  arweaveTxHash: Scalars['String'];
  content: Scalars['String'];
  digest: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
  signingKeyAuth: SigningKeyAuth;
};

export type Query = {
  __typename?: 'Query';
  bidirectionalConnectionEvent: Event;
  bidirectionalConnectionEvents: EventPage;
  bidirectionalConnections: Array<BidirectionalConnection>;
  connectionEvent: Event;
  connectionEvents: EventPage;
  connectionSummary: ConnectionSummary;
  connections: Array<Connection>;
  featured: Array<Popular>;
  /** @deprecated `followStatus` is deprecated. Use `connections.followStatus` instead. */
  followStatus: Maybe<FollowStatus>;
  /** @deprecated `followingAlias` is deprecated. Use `connections.alias` instead. */
  followingAlias: Scalars['String'];
  homePage: HomePage;
  identity: UserIdentity;
  nftOwners: Maybe<Array<NftOwner>>;
  popular: PopularPage;
  /** @deprecated `proof` is deprecated. Use `connections.proof` instead. */
  proof: Scalars['String'];
  rankings: UserIdentityPage;
  recommendations: RecommendationResponse;
  twitterRankings: TwitterRankingPage;
};


export type QueryBidirectionalConnectionEventArgs = {
  hash: Scalars['String'];
};


export type QueryBidirectionalConnectionEventsArgs = {
  address: InputMaybe<Scalars['String']>;
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  namespace: InputMaybe<Scalars['String']>;
  network: InputMaybe<Network>;
};


export type QueryBidirectionalConnectionsArgs = {
  fromAddr: Scalars['String'];
  network?: InputMaybe<Network>;
  toAddrList: Array<Scalars['String']>;
};


export type QueryConnectionEventArgs = {
  hash: Scalars['String'];
};


export type QueryConnectionEventsArgs = {
  address: InputMaybe<Scalars['String']>;
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  namespace: InputMaybe<Scalars['String']>;
  network: InputMaybe<Network>;
};


export type QueryConnectionSummaryArgs = {
  namespace: InputMaybe<Scalars['String']>;
};


export type QueryConnectionsArgs = {
  fromAddr: Scalars['String'];
  network?: InputMaybe<Network>;
  toAddrList: Array<Scalars['String']>;
};


export type QueryFeaturedArgs = {
  fromAddr: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type QueryFollowStatusArgs = {
  fromAddr: Scalars['String'];
  namespace: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  toAddr: Scalars['String'];
};


export type QueryFollowingAliasArgs = {
  fromAddr: Scalars['String'];
  namespace: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  toAddr: Scalars['String'];
};


export type QueryHomePageArgs = {
  network?: InputMaybe<Network>;
};


export type QueryIdentityArgs = {
  address: Scalars['String'];
  network?: InputMaybe<Network>;
};


export type QueryNftOwnersArgs = {
  contract: Scalars['String'];
  tokenId: InputMaybe<Scalars['String']>;
};


export type QueryPopularArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  fromAddr: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  tags: TagsInput;
};


export type QueryProofArgs = {
  fromAddr: Scalars['String'];
  namespace: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  toAddr: Scalars['String'];
};


export type QueryRankingsArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  namespaces: InputMaybe<Array<Scalars['String']>>;
  network?: InputMaybe<Network>;
  type: InputMaybe<ConnectionType>;
};


export type QueryRecommendationsArgs = {
  address: Scalars['String'];
  after: InputMaybe<Scalars['String']>;
  filter: InputMaybe<RecommFilter>;
  first: InputMaybe<Scalars['Int']>;
  namespace: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};


export type QueryTwitterRankingsArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  fromAddr: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
};

export type Ranking = {
  __typename?: 'Ranking';
  address: Scalars['String'];
  avatar: Scalars['String'];
  domain: Scalars['String'];
  followerCount: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  twitterFollowersCount: Scalars['Int'];
  twitterHandle: Scalars['String'];
  verifiable: Scalars['Boolean'];
};

export enum RecommFilter {
  Defi = 'DEFI',
  Game = 'GAME',
  Nft = 'NFT',
  Social = 'SOCIAL'
}

export type Recommendation = {
  __typename?: 'Recommendation';
  address: Scalars['String'];
  avatar: Scalars['String'];
  domain: Scalars['String'];
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars['String'];
  followerCount: Scalars['Int'];
  recommendationReason: Scalars['String'];
};

export type RecommendationPage = {
  __typename?: 'RecommendationPage';
  list: Array<Recommendation>;
  pageInfo: PageInfo;
};

export type RecommendationResponse = {
  __typename?: 'RecommendationResponse';
  data: Maybe<RecommendationPage>;
  result: RecommendationResponse_Result;
};

export enum RecommendationResponse_Result {
  Indexing = 'INDEXING',
  Success = 'SUCCESS'
}

export type RegisterKeyInput = {
  address: Scalars['String'];
  message: Scalars['String'];
  network?: InputMaybe<Network>;
  signature: Scalars['String'];
};

export type RegisterKeyResponse = {
  __typename?: 'RegisterKeyResponse';
  result: RegisterKeyResponse_Result;
};

export enum RegisterKeyResponse_Result {
  Failed = 'FAILED',
  Success = 'SUCCESS'
}

export type SetAliasResponse = {
  __typename?: 'SetAliasResponse';
  result: SetAliasResponse_Result;
};

export enum SetAliasResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type SetProfileResponse = {
  __typename?: 'SetProfileResponse';
  result: SetProfileResponse_Result;
};

export enum SetProfileResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type SetTwitterHandleResponse = {
  __typename?: 'SetTwitterHandleResponse';
  result: SetTwitterHandleResponse_Result;
};

export enum SetTwitterHandleResponse_Result {
  HandleExists = 'HANDLE_EXISTS',
  InvalidAddress = 'INVALID_ADDRESS',
  Success = 'SUCCESS'
}

export type SigningInput = {
  operation: Scalars['String'];
  signature: Scalars['String'];
  toAddr: Scalars['String'];
  type?: InputMaybe<ConnectionType>;
};

export type SigningKeyAuth = {
  __typename?: 'SigningKeyAuth';
  address: Scalars['String'];
  message: Scalars['String'];
  signature: Scalars['String'];
};

export type Social = {
  __typename?: 'Social';
  twitter: Scalars['String'];
};

export type SubscribeInput = {
  address?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type SubscribeResponse = {
  __typename?: 'SubscribeResponse';
  result: SubscribeResponse_Result;
};

export enum SubscribeResponse_Result {
  Success = 'SUCCESS'
}

export enum Tag {
  Featured = 'FEATURED',
  Nftmarket = 'NFTMARKET',
  Plaza = 'PLAZA'
}

export type TagsInput = {
  list: Array<Tag>;
};

export type Twitter = {
  __typename?: 'Twitter';
  /** Twitter avatar. */
  avatar: Scalars['String'];
  /** Twitter followers count, updated every day. */
  followerCount: Scalars['Int'];
  /** @deprecated `followersCount` is deprecated. Use `followerCount` instead. */
  followersCount: Scalars['Int'];
  /** Twitter handle. */
  handle: Scalars['String'];
  /** Data source of twitter handle. */
  source: Scalars['String'];
  /** Verification tweet id. */
  tweetId: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type TwitterRankingPage = {
  __typename?: 'TwitterRankingPage';
  MetricsCount: MetricsCount;
  list: Array<Ranking>;
  pageInfo: PageInfo;
};

export type UnFollowResponse = {
  __typename?: 'UnFollowResponse';
  result: UnFollowResponse_Result;
};

export enum UnFollowResponse_Result {
  DeprecatedApi = 'DEPRECATED_API'
}

export type UpdateConnectionInput = {
  alias?: InputMaybe<Scalars['String']>;
  fromAddr: Scalars['String'];
  namespace?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Network>;
  operation: Scalars['String'];
  signature: Scalars['String'];
  signingKey: Scalars['String'];
  toAddr: Scalars['String'];
  type?: InputMaybe<ConnectionType>;
};

export type UserIdentity = {
  __typename?: 'UserIdentity';
  address: Scalars['String'];
  /** Ethereum: ENS avatar updated every week; Solana: customized profile avatar. */
  avatar: Scalars['String'];
  /** Bidirectional Connection with others. */
  bidirectionalFriends: BidirectionalConnectionIdentityPage;
  blacklist: BidirectionalConnectionIdentityPage;
  /** Ethereum: ENS updated every week; Solana: SNS from Bonfida. */
  domain: Scalars['String'];
  /** @deprecated `ens` is deprecated. Use `domain` instead. */
  ens: Scalars['String'];
  followerCount: Scalars['Int'];
  followers: ConnectionIdentityPage;
  followingCount: Scalars['Int'];
  followings: ConnectionIdentityPage;
  friendRequestsInbox: BidirectionalConnectionIdentityPage;
  friendRequestsSent: BidirectionalConnectionIdentityPage;
  /** Mutually followed. */
  friends: ConnectionIdentityPage;
  /** Github info bound to the address. */
  github: Github;
  /** The time of user's first sent transaction. */
  joinTime: Scalars['String'];
  notifications: NotificationPage;
  /** @deprecated `social` is deprecated. Use `twitter` instead. */
  social: Social;
  /** Twitter info bound to the address. */
  twitter: Twitter;
  unreadNotificationCount: Scalars['Int'];
};


export type UserIdentityBidirectionalFriendsArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
};


export type UserIdentityBlacklistArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
};


export type UserIdentityFollowerCountArgs = {
  namespace: InputMaybe<Scalars['String']>;
  namespaces: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityFollowersArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  namespace: InputMaybe<Scalars['String']>;
  namespaces: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityFollowingCountArgs = {
  namespace: InputMaybe<Scalars['String']>;
  namespaces: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityFollowingsArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  namespace: InputMaybe<Scalars['String']>;
  namespaces: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityFriendRequestsInboxArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
};


export type UserIdentityFriendRequestsSentArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
};


export type UserIdentityFriendsArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  namespace: InputMaybe<Scalars['String']>;
  namespaces: InputMaybe<Array<Scalars['String']>>;
  type?: InputMaybe<ConnectionType>;
};


export type UserIdentityNotificationsArgs = {
  after: InputMaybe<Scalars['String']>;
  first: InputMaybe<Scalars['Int']>;
  hasRead: InputMaybe<Scalars['Boolean']>;
  namespaces: InputMaybe<Array<Scalars['String']>>;
  timestamp: InputMaybe<Scalars['String']>;
  types: InputMaybe<Array<NotificationType>>;
};


export type UserIdentityUnreadNotificationCountArgs = {
  namespaces: InputMaybe<Array<Scalars['String']>>;
  types: InputMaybe<Array<NotificationType>>;
};

export type UserIdentityPage = {
  __typename?: 'UserIdentityPage';
  list: Array<UserIdentity>;
  pageInfo: PageInfo;
};

export type VerifyGithubResponse = {
  __typename?: 'VerifyGithubResponse';
  result: VerifyGithubResponse_Result;
};

export enum VerifyGithubResponse_Result {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Failed = 'FAILED',
  GistNotFound = 'GIST_NOT_FOUND',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidHandle = 'INVALID_HANDLE',
  Success = 'SUCCESS',
  UnsupportedNetwork = 'UNSUPPORTED_NETWORK'
}

export type VerifyTwitterResponse = {
  __typename?: 'VerifyTwitterResponse';
  result: VerifyTwitterResponse_Result;
};

export enum VerifyTwitterResponse_Result {
  AlreadyVerified = 'ALREADY_VERIFIED',
  Failed = 'FAILED',
  InvalidAddress = 'INVALID_ADDRESS',
  InvalidHandle = 'INVALID_HANDLE',
  Success = 'SUCCESS',
  TweetNotFound = 'TWEET_NOT_FOUND',
  UnsupportedNetwork = 'UNSUPPORTED_NETWORK'
}

export type User_NotificationsQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type User_NotificationsQuery = { __typename?: 'Query', identity: { __typename?: 'UserIdentity', unreadNotificationCount: number, notifications: { __typename?: 'NotificationPage', list: Array<{ __typename?: 'BiConnectAcceptedNotification', fromAddress: string, network: Network, namespace: string, id: string, toAddress: string, hasRead: boolean, type: NotificationType, timestamp: string } | { __typename?: 'BiConnectReceivedNotification', fromAddress: string, network: Network, namespace: string, id: string, toAddress: string, hasRead: boolean, type: NotificationType, timestamp: string } | { __typename?: 'NewConnectionNotification', network: Network, namespace: string, id: string, toAddress: string, hasRead: boolean, type: NotificationType, timestamp: string }> }, bidirectionalFriends: { __typename?: 'BidirectionalConnectionIdentityPage', list: Array<{ __typename?: 'BiConnIdentity', bidirectionalConnection: { __typename?: 'BidirectionalConnection', namespace: string, from: string, to: string, state: BiConnState } }> }, friendRequestsInbox: { __typename?: 'BidirectionalConnectionIdentityPage', list: Array<{ __typename?: 'BiConnIdentity', bidirectionalConnection: { __typename?: 'BidirectionalConnection', network: Network, direction: Direction, namespace: string, from: string, to: string, state: BiConnState } }> }, friendRequestsSent: { __typename?: 'BidirectionalConnectionIdentityPage', list: Array<{ __typename?: 'BiConnIdentity', bidirectionalConnection: { __typename?: 'BidirectionalConnection', namespace: string, from: string, to: string, state: BiConnState } }> } } };

export type User_ConnectionsQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type User_ConnectionsQuery = { __typename?: 'Query', identity: { __typename?: 'UserIdentity', bidirectionalFriends: { __typename?: 'BidirectionalConnectionIdentityPage', list: Array<{ __typename?: 'BiConnIdentity', bidirectionalConnection: { __typename?: 'BidirectionalConnection', namespace: string, from: string, to: string, state: BiConnState } }> } } };


export const User_NotificationsDocument = gql`
    query user_notifications($address: String!) {
  identity(address: $address, network: ETH) {
    unreadNotificationCount(namespaces: ["GatewayDAO"])
    notifications(namespaces: ["GatewayDAO"]) {
      list {
        network
        namespace
        id
        toAddress
        hasRead
        type
        timestamp
        ... on BiConnectReceivedNotification {
          fromAddress
        }
        ... on BiConnectAcceptedNotification {
          fromAddress
        }
      }
    }
    bidirectionalFriends {
      list {
        bidirectionalConnection {
          namespace
          from
          to
          state
        }
      }
    }
    friendRequestsInbox(after: "-1") {
      list {
        bidirectionalConnection {
          network
          direction
          namespace
          from
          to
          state
        }
      }
    }
    friendRequestsSent(after: "-1") {
      list {
        bidirectionalConnection {
          namespace
          from
          to
          state
        }
      }
    }
  }
}
    `;
export const User_ConnectionsDocument = gql`
    query user_connections($address: String!) {
  identity(address: $address, network: ETH) {
    bidirectionalFriends {
      list {
        bidirectionalConnection {
          namespace
          from
          to
          state
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    user_notifications(variables: User_NotificationsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<User_NotificationsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<User_NotificationsQuery>(User_NotificationsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'user_notifications', 'query');
    },
    user_connections(variables: User_ConnectionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<User_ConnectionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<User_ConnectionsQuery>(User_ConnectionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'user_connections', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AckAllNotificationsInput: ResolverTypeWrapper<Partial<AckAllNotificationsInput>>;
  AckAllNotificationsResponse: ResolverTypeWrapper<Partial<AckAllNotificationsResponse>>;
  AckAllNotificationsResponse_Result: ResolverTypeWrapper<Partial<AckAllNotificationsResponse_Result>>;
  AckNotificationsInput: ResolverTypeWrapper<Partial<AckNotificationsInput>>;
  AckNotificationsResponse: ResolverTypeWrapper<Partial<AckNotificationsResponse>>;
  AckNotificationsResponse_Result: ResolverTypeWrapper<Partial<AckNotificationsResponse_Result>>;
  AliasResponse: ResolverTypeWrapper<Partial<AliasResponse>>;
  AliasResponse_Result: ResolverTypeWrapper<Partial<AliasResponse_Result>>;
  AuthResponse: ResolverTypeWrapper<Partial<AuthResponse>>;
  AuthResponse_Result: ResolverTypeWrapper<Partial<AuthResponse_Result>>;
  BatchConnectResponse: ResolverTypeWrapper<Partial<BatchConnectResponse>>;
  BatchConnectResponse_Result: ResolverTypeWrapper<Partial<BatchConnectResponse_Result>>;
  BatchUpdateConnectionInput: ResolverTypeWrapper<Partial<BatchUpdateConnectionInput>>;
  BiConnEvent: ResolverTypeWrapper<Partial<BiConnEvent>>;
  BiConnIdentity: ResolverTypeWrapper<Partial<BiConnIdentity>>;
  BiConnInstruction: ResolverTypeWrapper<Partial<BiConnInstruction>>;
  BiConnState: ResolverTypeWrapper<Partial<BiConnState>>;
  BiConnectAcceptedNotification: ResolverTypeWrapper<Partial<BiConnectAcceptedNotification>>;
  BiConnectInput: ResolverTypeWrapper<Partial<BiConnectInput>>;
  BiConnectReceivedNotification: ResolverTypeWrapper<Partial<BiConnectReceivedNotification>>;
  BiConnectResponse: ResolverTypeWrapper<Partial<BiConnectResponse>>;
  BiConnectResponse_Result: ResolverTypeWrapper<Partial<BiConnectResponse_Result>>;
  BidirectionalConnection: ResolverTypeWrapper<Partial<BidirectionalConnection>>;
  BidirectionalConnectionIdentityPage: ResolverTypeWrapper<Partial<BidirectionalConnectionIdentityPage>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  Connect: ResolverTypeWrapper<Partial<Connect>>;
  ConnectResponse: ResolverTypeWrapper<Partial<ConnectResponse>>;
  ConnectResponse_Result: ResolverTypeWrapper<Partial<ConnectResponse_Result>>;
  Connection: ResolverTypeWrapper<Partial<Connection>>;
  ConnectionEvent: ResolverTypeWrapper<Partial<ConnectionEvent>>;
  ConnectionIdentityPage: ResolverTypeWrapper<Partial<ConnectionIdentityPage>>;
  ConnectionSummary: ResolverTypeWrapper<Partial<ConnectionSummary>>;
  ConnectionType: ResolverTypeWrapper<Partial<ConnectionType>>;
  Direction: ResolverTypeWrapper<Partial<Direction>>;
  DisconnectResponse: ResolverTypeWrapper<Partial<DisconnectResponse>>;
  DisconnectResponse_Result: ResolverTypeWrapper<Partial<DisconnectResponse_Result>>;
  Event: ResolversTypes['BiConnEvent'] | ResolversTypes['ConnectionEvent'];
  EventPage: ResolverTypeWrapper<Partial<EventPage>>;
  FollowResponse: ResolverTypeWrapper<Partial<FollowResponse>>;
  FollowResponse_Result: ResolverTypeWrapper<Partial<FollowResponse_Result>>;
  FollowStatus: ResolverTypeWrapper<Partial<FollowStatus>>;
  Github: ResolverTypeWrapper<Partial<Github>>;
  HomePage: ResolverTypeWrapper<Partial<HomePage>>;
  ID: ResolverTypeWrapper<Partial<Scalars['ID']>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  MetricsCount: ResolverTypeWrapper<Partial<MetricsCount>>;
  Mutation: ResolverTypeWrapper<{}>;
  NFTOwner: ResolverTypeWrapper<Partial<NftOwner>>;
  Network: ResolverTypeWrapper<Partial<Network>>;
  NewConnectionNotification: ResolverTypeWrapper<Partial<NewConnectionNotification>>;
  Node: never;
  Notification: ResolversTypes['BiConnectAcceptedNotification'] | ResolversTypes['BiConnectReceivedNotification'] | ResolversTypes['NewConnectionNotification'];
  NotificationPage: ResolverTypeWrapper<Partial<NotificationPage>>;
  NotificationType: ResolverTypeWrapper<Partial<NotificationType>>;
  PageInfo: ResolverTypeWrapper<Partial<PageInfo>>;
  Percentage: ResolverTypeWrapper<Partial<Scalars['Percentage']>>;
  Popular: ResolverTypeWrapper<Partial<Popular>>;
  PopularPage: ResolverTypeWrapper<Partial<PopularPage>>;
  Proof: ResolverTypeWrapper<Partial<Proof>>;
  Query: ResolverTypeWrapper<{}>;
  Ranking: ResolverTypeWrapper<Partial<Ranking>>;
  RecommFilter: ResolverTypeWrapper<Partial<RecommFilter>>;
  Recommendation: ResolverTypeWrapper<Partial<Recommendation>>;
  RecommendationPage: ResolverTypeWrapper<Partial<RecommendationPage>>;
  RecommendationResponse: ResolverTypeWrapper<Partial<RecommendationResponse>>;
  RecommendationResponse_Result: ResolverTypeWrapper<Partial<RecommendationResponse_Result>>;
  RegisterKeyInput: ResolverTypeWrapper<Partial<RegisterKeyInput>>;
  RegisterKeyResponse: ResolverTypeWrapper<Partial<RegisterKeyResponse>>;
  RegisterKeyResponse_Result: ResolverTypeWrapper<Partial<RegisterKeyResponse_Result>>;
  SetAliasResponse: ResolverTypeWrapper<Partial<SetAliasResponse>>;
  SetAliasResponse_Result: ResolverTypeWrapper<Partial<SetAliasResponse_Result>>;
  SetProfileResponse: ResolverTypeWrapper<Partial<SetProfileResponse>>;
  SetProfileResponse_Result: ResolverTypeWrapper<Partial<SetProfileResponse_Result>>;
  SetTwitterHandleResponse: ResolverTypeWrapper<Partial<SetTwitterHandleResponse>>;
  SetTwitterHandleResponse_Result: ResolverTypeWrapper<Partial<SetTwitterHandleResponse_Result>>;
  SigningInput: ResolverTypeWrapper<Partial<SigningInput>>;
  SigningKeyAuth: ResolverTypeWrapper<Partial<SigningKeyAuth>>;
  Social: ResolverTypeWrapper<Partial<Social>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  SubscribeInput: ResolverTypeWrapper<Partial<SubscribeInput>>;
  SubscribeResponse: ResolverTypeWrapper<Partial<SubscribeResponse>>;
  SubscribeResponse_Result: ResolverTypeWrapper<Partial<SubscribeResponse_Result>>;
  Tag: ResolverTypeWrapper<Partial<Tag>>;
  TagsInput: ResolverTypeWrapper<Partial<TagsInput>>;
  Time: ResolverTypeWrapper<Partial<Scalars['Time']>>;
  Twitter: ResolverTypeWrapper<Partial<Twitter>>;
  TwitterRankingPage: ResolverTypeWrapper<Partial<TwitterRankingPage>>;
  UnFollowResponse: ResolverTypeWrapper<Partial<UnFollowResponse>>;
  UnFollowResponse_Result: ResolverTypeWrapper<Partial<UnFollowResponse_Result>>;
  UpdateConnectionInput: ResolverTypeWrapper<Partial<UpdateConnectionInput>>;
  Upload: ResolverTypeWrapper<Partial<Scalars['Upload']>>;
  UserIdentity: ResolverTypeWrapper<Partial<UserIdentity>>;
  UserIdentityPage: ResolverTypeWrapper<Partial<UserIdentityPage>>;
  VerifyGithubResponse: ResolverTypeWrapper<Partial<VerifyGithubResponse>>;
  VerifyGithubResponse_Result: ResolverTypeWrapper<Partial<VerifyGithubResponse_Result>>;
  VerifyTwitterResponse: ResolverTypeWrapper<Partial<VerifyTwitterResponse>>;
  VerifyTwitterResponse_Result: ResolverTypeWrapper<Partial<VerifyTwitterResponse_Result>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AckAllNotificationsInput: Partial<AckAllNotificationsInput>;
  AckAllNotificationsResponse: Partial<AckAllNotificationsResponse>;
  AckNotificationsInput: Partial<AckNotificationsInput>;
  AckNotificationsResponse: Partial<AckNotificationsResponse>;
  AliasResponse: Partial<AliasResponse>;
  AuthResponse: Partial<AuthResponse>;
  BatchConnectResponse: Partial<BatchConnectResponse>;
  BatchUpdateConnectionInput: Partial<BatchUpdateConnectionInput>;
  BiConnEvent: Partial<BiConnEvent>;
  BiConnIdentity: Partial<BiConnIdentity>;
  BiConnectAcceptedNotification: Partial<BiConnectAcceptedNotification>;
  BiConnectInput: Partial<BiConnectInput>;
  BiConnectReceivedNotification: Partial<BiConnectReceivedNotification>;
  BiConnectResponse: Partial<BiConnectResponse>;
  BidirectionalConnection: Partial<BidirectionalConnection>;
  BidirectionalConnectionIdentityPage: Partial<BidirectionalConnectionIdentityPage>;
  Boolean: Partial<Scalars['Boolean']>;
  Connect: Partial<Connect>;
  ConnectResponse: Partial<ConnectResponse>;
  Connection: Partial<Connection>;
  ConnectionEvent: Partial<ConnectionEvent>;
  ConnectionIdentityPage: Partial<ConnectionIdentityPage>;
  ConnectionSummary: Partial<ConnectionSummary>;
  DisconnectResponse: Partial<DisconnectResponse>;
  Event: ResolversParentTypes['BiConnEvent'] | ResolversParentTypes['ConnectionEvent'];
  EventPage: Partial<EventPage>;
  FollowResponse: Partial<FollowResponse>;
  FollowStatus: Partial<FollowStatus>;
  Github: Partial<Github>;
  HomePage: Partial<HomePage>;
  ID: Partial<Scalars['ID']>;
  Int: Partial<Scalars['Int']>;
  MetricsCount: Partial<MetricsCount>;
  Mutation: {};
  NFTOwner: Partial<NftOwner>;
  NewConnectionNotification: Partial<NewConnectionNotification>;
  Node: never;
  Notification: ResolversParentTypes['BiConnectAcceptedNotification'] | ResolversParentTypes['BiConnectReceivedNotification'] | ResolversParentTypes['NewConnectionNotification'];
  NotificationPage: Partial<NotificationPage>;
  PageInfo: Partial<PageInfo>;
  Percentage: Partial<Scalars['Percentage']>;
  Popular: Partial<Popular>;
  PopularPage: Partial<PopularPage>;
  Proof: Partial<Proof>;
  Query: {};
  Ranking: Partial<Ranking>;
  Recommendation: Partial<Recommendation>;
  RecommendationPage: Partial<RecommendationPage>;
  RecommendationResponse: Partial<RecommendationResponse>;
  RegisterKeyInput: Partial<RegisterKeyInput>;
  RegisterKeyResponse: Partial<RegisterKeyResponse>;
  SetAliasResponse: Partial<SetAliasResponse>;
  SetProfileResponse: Partial<SetProfileResponse>;
  SetTwitterHandleResponse: Partial<SetTwitterHandleResponse>;
  SigningInput: Partial<SigningInput>;
  SigningKeyAuth: Partial<SigningKeyAuth>;
  Social: Partial<Social>;
  String: Partial<Scalars['String']>;
  SubscribeInput: Partial<SubscribeInput>;
  SubscribeResponse: Partial<SubscribeResponse>;
  TagsInput: Partial<TagsInput>;
  Time: Partial<Scalars['Time']>;
  Twitter: Partial<Twitter>;
  TwitterRankingPage: Partial<TwitterRankingPage>;
  UnFollowResponse: Partial<UnFollowResponse>;
  UpdateConnectionInput: Partial<UpdateConnectionInput>;
  Upload: Partial<Scalars['Upload']>;
  UserIdentity: Partial<UserIdentity>;
  UserIdentityPage: Partial<UserIdentityPage>;
  VerifyGithubResponse: Partial<VerifyGithubResponse>;
  VerifyTwitterResponse: Partial<VerifyTwitterResponse>;
};

export type AdminDirectiveArgs = { };

export type AdminDirectiveResolver<Result, Parent, ContextType = any, Args = AdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AckAllNotificationsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AckAllNotificationsResponse'] = ResolversParentTypes['AckAllNotificationsResponse']> = {
  result?: Resolver<ResolversTypes['AckAllNotificationsResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AckNotificationsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AckNotificationsResponse'] = ResolversParentTypes['AckNotificationsResponse']> = {
  result?: Resolver<ResolversTypes['AckNotificationsResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AliasResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AliasResponse'] = ResolversParentTypes['AliasResponse']> = {
  result?: Resolver<ResolversTypes['AliasResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthResponse'] = ResolversParentTypes['AuthResponse']> = {
  authToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['AuthResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BatchConnectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BatchConnectResponse'] = ResolversParentTypes['BatchConnectResponse']> = {
  alreadyFollowed?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  failToFollow?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['BatchConnectResponse_Result'], ParentType, ContextType>;
  successFollowed?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BiConnEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['BiConnEvent'] = ResolversParentTypes['BiConnEvent']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fromAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  instruction?: Resolver<ResolversTypes['BiConnInstruction'], ParentType, ContextType>;
  isAnchor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  parentHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proof?: Resolver<ResolversTypes['Proof'], ParentType, ContextType>;
  toAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BiConnIdentityResolvers<ContextType = any, ParentType extends ResolversParentTypes['BiConnIdentity'] = ResolversParentTypes['BiConnIdentity']> = {
  bidirectionalConnection?: Resolver<ResolversTypes['BidirectionalConnection'], ParentType, ContextType>;
  identity?: Resolver<ResolversTypes['UserIdentity'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BiConnectAcceptedNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BiConnectAcceptedNotification'] = ResolversParentTypes['BiConnectAcceptedNotification']> = {
  fromAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NotificationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BiConnectReceivedNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['BiConnectReceivedNotification'] = ResolversParentTypes['BiConnectReceivedNotification']> = {
  fromAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NotificationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BiConnectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BiConnectResponse'] = ResolversParentTypes['BiConnectResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['BiConnectResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BidirectionalConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BidirectionalConnection'] = ResolversParentTypes['BidirectionalConnection']> = {
  direction?: Resolver<ResolversTypes['Direction'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latestAnchorEvent?: Resolver<Maybe<ResolversTypes['BiConnEvent']>, ParentType, ContextType>;
  latestEvent?: Resolver<Maybe<ResolversTypes['BiConnEvent']>, ParentType, ContextType>;
  latestHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['BiConnState'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BidirectionalConnectionIdentityPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['BidirectionalConnectionIdentityPage'] = ResolversParentTypes['BidirectionalConnectionIdentityPage']> = {
  list?: Resolver<Array<ResolversTypes['BiConnIdentity']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Connect'] = ResolversParentTypes['Connect']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ens?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModifiedTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ConnectionType'], ParentType, ContextType>;
  verifiable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectResponse'] = ResolversParentTypes['ConnectResponse']> = {
  result?: Resolver<ResolversTypes['ConnectResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Connection'] = ResolversParentTypes['Connection']> = {
  alias?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followStatus?: Resolver<ResolversTypes['FollowStatus'], ParentType, ContextType>;
  fromAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latestAnchorEvent?: Resolver<Maybe<ResolversTypes['ConnectionEvent']>, ParentType, ContextType>;
  latestEvent?: Resolver<Maybe<ResolversTypes['ConnectionEvent']>, ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  proof?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ConnectionType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectionEvent'] = ResolversParentTypes['ConnectionEvent']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fromAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAnchor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  operator?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  parentHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proof?: Resolver<ResolversTypes['Proof'], ParentType, ContextType>;
  toAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ConnectionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionIdentityPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectionIdentityPage'] = ResolversParentTypes['ConnectionIdentityPage']> = {
  list?: Resolver<Array<ResolversTypes['Connect']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectionSummary'] = ResolversParentTypes['ConnectionSummary']> = {
  connectionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  connectionDelta?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  namespaceCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userDelta?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DisconnectResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DisconnectResponse'] = ResolversParentTypes['DisconnectResponse']> = {
  result?: Resolver<ResolversTypes['DisconnectResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  __resolveType: TypeResolveFn<'BiConnEvent' | 'ConnectionEvent', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fromAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAnchor?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  parentHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  proof?: Resolver<ResolversTypes['Proof'], ParentType, ContextType>;
  toAddr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type EventPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['EventPage'] = ResolversParentTypes['EventPage']> = {
  list?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowResponse'] = ResolversParentTypes['FollowResponse']> = {
  result?: Resolver<ResolversTypes['FollowResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowStatus'] = ResolversParentTypes['FollowStatus']> = {
  isFollowed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isFollowing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GithubResolvers<ContextType = any, ParentType extends ResolversParentTypes['Github'] = ResolversParentTypes['Github']> = {
  gistId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HomePageResolvers<ContextType = any, ParentType extends ResolversParentTypes['HomePage'] = ResolversParentTypes['HomePage']> = {
  connectionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  indexedConnectionCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  indexedUserCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetricsCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['MetricsCount'] = ResolversParentTypes['MetricsCount']> = {
  top10Count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  top100Count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  top1000Count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  ackAllNotifications?: Resolver<ResolversTypes['AckAllNotificationsResponse'], ParentType, ContextType, RequireFields<MutationAckAllNotificationsArgs, 'input'>>;
  ackNotifications?: Resolver<ResolversTypes['AckNotificationsResponse'], ParentType, ContextType, RequireFields<MutationAckNotificationsArgs, 'input'>>;
  alias?: Resolver<ResolversTypes['AliasResponse'], ParentType, ContextType, RequireFields<MutationAliasArgs, 'input'>>;
  auth?: Resolver<ResolversTypes['AuthResponse'], ParentType, ContextType, RequireFields<MutationAuthArgs, 'address' | 'signature'>>;
  batchConnect?: Resolver<ResolversTypes['BatchConnectResponse'], ParentType, ContextType, RequireFields<MutationBatchConnectArgs, 'input'>>;
  bidirectionalConnect?: Resolver<ResolversTypes['BiConnectResponse'], ParentType, ContextType, RequireFields<MutationBidirectionalConnectArgs, 'input'>>;
  connect?: Resolver<ResolversTypes['ConnectResponse'], ParentType, ContextType, RequireFields<MutationConnectArgs, 'input'>>;
  disconnect?: Resolver<ResolversTypes['DisconnectResponse'], ParentType, ContextType, RequireFields<MutationDisconnectArgs, 'input'>>;
  follow?: Resolver<ResolversTypes['FollowResponse'], ParentType, ContextType, RequireFields<MutationFollowArgs, 'fromAddr' | 'signature' | 'toAddr'>>;
  registerKey?: Resolver<ResolversTypes['RegisterKeyResponse'], ParentType, ContextType, RequireFields<MutationRegisterKeyArgs, 'input'>>;
  setAlias?: Resolver<ResolversTypes['SetAliasResponse'], ParentType, ContextType, RequireFields<MutationSetAliasArgs, 'alias' | 'fromAddr' | 'signature' | 'toAddr'>>;
  setProfile?: Resolver<ResolversTypes['SetProfileResponse'], ParentType, ContextType, RequireFields<MutationSetProfileArgs, 'address' | 'network' | 'signature'>>;
  setTwitterHandle?: Resolver<ResolversTypes['SetTwitterHandleResponse'], ParentType, ContextType, RequireFields<MutationSetTwitterHandleArgs, 'address' | 'handle' | 'network'>>;
  subscribe?: Resolver<ResolversTypes['SubscribeResponse'], ParentType, ContextType, RequireFields<MutationSubscribeArgs, 'input'>>;
  unfollow?: Resolver<ResolversTypes['UnFollowResponse'], ParentType, ContextType, RequireFields<MutationUnfollowArgs, 'fromAddr' | 'signature' | 'toAddr'>>;
  verifyGithub?: Resolver<ResolversTypes['VerifyGithubResponse'], ParentType, ContextType, RequireFields<MutationVerifyGithubArgs, 'address' | 'gistId' | 'network'>>;
  verifyTwitter?: Resolver<ResolversTypes['VerifyTwitterResponse'], ParentType, ContextType, RequireFields<MutationVerifyTwitterArgs, 'address' | 'handle' | 'network'>>;
};

export type NftOwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['NFTOwner'] = ResolversParentTypes['NFTOwner']> = {
  owner?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tokenId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['Twitter']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewConnectionNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['NewConnectionNotification'] = ResolversParentTypes['NewConnectionNotification']> = {
  connectionType?: Resolver<ResolversTypes['ConnectionType'], ParentType, ContextType>;
  fromAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NotificationType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  __resolveType: TypeResolveFn<'BiConnectAcceptedNotification' | 'BiConnectReceivedNotification' | 'NewConnectionNotification', ParentType, ContextType>;
  hasRead?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['Network'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  toAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['NotificationType'], ParentType, ContextType>;
};

export type NotificationPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['NotificationPage'] = ResolversParentTypes['NotificationPage']> = {
  list?: Resolver<Array<ResolversTypes['Notification']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PercentageScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Percentage'], any> {
  name: 'Percentage';
}

export type PopularResolvers<ContextType = any, ParentType extends ResolversParentTypes['Popular'] = ResolversParentTypes['Popular']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ens?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isFollowing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  recommendationReason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PopularPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['PopularPage'] = ResolversParentTypes['PopularPage']> = {
  list?: Resolver<Array<ResolversTypes['Popular']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProofResolvers<ContextType = any, ParentType extends ResolversParentTypes['Proof'] = ResolversParentTypes['Proof']> = {
  arweaveTxHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  digest?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signingKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signingKeyAuth?: Resolver<ResolversTypes['SigningKeyAuth'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  bidirectionalConnectionEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<QueryBidirectionalConnectionEventArgs, 'hash'>>;
  bidirectionalConnectionEvents?: Resolver<ResolversTypes['EventPage'], ParentType, ContextType, Partial<QueryBidirectionalConnectionEventsArgs>>;
  bidirectionalConnections?: Resolver<Array<ResolversTypes['BidirectionalConnection']>, ParentType, ContextType, RequireFields<QueryBidirectionalConnectionsArgs, 'fromAddr' | 'network' | 'toAddrList'>>;
  connectionEvent?: Resolver<ResolversTypes['Event'], ParentType, ContextType, RequireFields<QueryConnectionEventArgs, 'hash'>>;
  connectionEvents?: Resolver<ResolversTypes['EventPage'], ParentType, ContextType, Partial<QueryConnectionEventsArgs>>;
  connectionSummary?: Resolver<ResolversTypes['ConnectionSummary'], ParentType, ContextType, Partial<QueryConnectionSummaryArgs>>;
  connections?: Resolver<Array<ResolversTypes['Connection']>, ParentType, ContextType, RequireFields<QueryConnectionsArgs, 'fromAddr' | 'network' | 'toAddrList'>>;
  featured?: Resolver<Array<ResolversTypes['Popular']>, ParentType, ContextType, RequireFields<QueryFeaturedArgs, 'network'>>;
  followStatus?: Resolver<Maybe<ResolversTypes['FollowStatus']>, ParentType, ContextType, RequireFields<QueryFollowStatusArgs, 'fromAddr' | 'network' | 'toAddr'>>;
  followingAlias?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryFollowingAliasArgs, 'fromAddr' | 'network' | 'toAddr'>>;
  homePage?: Resolver<ResolversTypes['HomePage'], ParentType, ContextType, RequireFields<QueryHomePageArgs, 'network'>>;
  identity?: Resolver<ResolversTypes['UserIdentity'], ParentType, ContextType, RequireFields<QueryIdentityArgs, 'address' | 'network'>>;
  nftOwners?: Resolver<Maybe<Array<ResolversTypes['NFTOwner']>>, ParentType, ContextType, RequireFields<QueryNftOwnersArgs, 'contract'>>;
  popular?: Resolver<ResolversTypes['PopularPage'], ParentType, ContextType, RequireFields<QueryPopularArgs, 'network' | 'tags'>>;
  proof?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryProofArgs, 'fromAddr' | 'network' | 'toAddr'>>;
  rankings?: Resolver<ResolversTypes['UserIdentityPage'], ParentType, ContextType, RequireFields<QueryRankingsArgs, 'network'>>;
  recommendations?: Resolver<ResolversTypes['RecommendationResponse'], ParentType, ContextType, RequireFields<QueryRecommendationsArgs, 'address' | 'network'>>;
  twitterRankings?: Resolver<ResolversTypes['TwitterRankingPage'], ParentType, ContextType, RequireFields<QueryTwitterRankingsArgs, 'network'>>;
};

export type RankingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ranking'] = ResolversParentTypes['Ranking']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isFollowing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  twitterFollowersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  twitterHandle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verifiable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Recommendation'] = ResolversParentTypes['Recommendation']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ens?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  recommendationReason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendationPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecommendationPage'] = ResolversParentTypes['RecommendationPage']> = {
  list?: Resolver<Array<ResolversTypes['Recommendation']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RecommendationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RecommendationResponse'] = ResolversParentTypes['RecommendationResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['RecommendationPage']>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['RecommendationResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterKeyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterKeyResponse'] = ResolversParentTypes['RegisterKeyResponse']> = {
  result?: Resolver<ResolversTypes['RegisterKeyResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetAliasResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetAliasResponse'] = ResolversParentTypes['SetAliasResponse']> = {
  result?: Resolver<ResolversTypes['SetAliasResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetProfileResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetProfileResponse'] = ResolversParentTypes['SetProfileResponse']> = {
  result?: Resolver<ResolversTypes['SetProfileResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SetTwitterHandleResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SetTwitterHandleResponse'] = ResolversParentTypes['SetTwitterHandleResponse']> = {
  result?: Resolver<ResolversTypes['SetTwitterHandleResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SigningKeyAuthResolvers<ContextType = any, ParentType extends ResolversParentTypes['SigningKeyAuth'] = ResolversParentTypes['SigningKeyAuth']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  signature?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SocialResolvers<ContextType = any, ParentType extends ResolversParentTypes['Social'] = ResolversParentTypes['Social']> = {
  twitter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscribeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubscribeResponse'] = ResolversParentTypes['SubscribeResponse']> = {
  result?: Resolver<ResolversTypes['SubscribeResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type TwitterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Twitter'] = ResolversParentTypes['Twitter']> = {
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  source?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweetId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TwitterRankingPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['TwitterRankingPage'] = ResolversParentTypes['TwitterRankingPage']> = {
  MetricsCount?: Resolver<ResolversTypes['MetricsCount'], ParentType, ContextType>;
  list?: Resolver<Array<ResolversTypes['Ranking']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UnFollowResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UnFollowResponse'] = ResolversParentTypes['UnFollowResponse']> = {
  result?: Resolver<ResolversTypes['UnFollowResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserIdentityResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserIdentity'] = ResolversParentTypes['UserIdentity']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bidirectionalFriends?: Resolver<ResolversTypes['BidirectionalConnectionIdentityPage'], ParentType, ContextType, Partial<UserIdentityBidirectionalFriendsArgs>>;
  blacklist?: Resolver<ResolversTypes['BidirectionalConnectionIdentityPage'], ParentType, ContextType, Partial<UserIdentityBlacklistArgs>>;
  domain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ens?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<UserIdentityFollowerCountArgs, 'type'>>;
  followers?: Resolver<ResolversTypes['ConnectionIdentityPage'], ParentType, ContextType, RequireFields<UserIdentityFollowersArgs, 'type'>>;
  followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<UserIdentityFollowingCountArgs, 'type'>>;
  followings?: Resolver<ResolversTypes['ConnectionIdentityPage'], ParentType, ContextType, RequireFields<UserIdentityFollowingsArgs, 'type'>>;
  friendRequestsInbox?: Resolver<ResolversTypes['BidirectionalConnectionIdentityPage'], ParentType, ContextType, Partial<UserIdentityFriendRequestsInboxArgs>>;
  friendRequestsSent?: Resolver<ResolversTypes['BidirectionalConnectionIdentityPage'], ParentType, ContextType, Partial<UserIdentityFriendRequestsSentArgs>>;
  friends?: Resolver<ResolversTypes['ConnectionIdentityPage'], ParentType, ContextType, RequireFields<UserIdentityFriendsArgs, 'type'>>;
  github?: Resolver<ResolversTypes['Github'], ParentType, ContextType>;
  joinTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  notifications?: Resolver<ResolversTypes['NotificationPage'], ParentType, ContextType, Partial<UserIdentityNotificationsArgs>>;
  social?: Resolver<ResolversTypes['Social'], ParentType, ContextType>;
  twitter?: Resolver<ResolversTypes['Twitter'], ParentType, ContextType>;
  unreadNotificationCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<UserIdentityUnreadNotificationCountArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserIdentityPageResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserIdentityPage'] = ResolversParentTypes['UserIdentityPage']> = {
  list?: Resolver<Array<ResolversTypes['UserIdentity']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyGithubResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyGithubResponse'] = ResolversParentTypes['VerifyGithubResponse']> = {
  result?: Resolver<ResolversTypes['VerifyGithubResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyTwitterResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyTwitterResponse'] = ResolversParentTypes['VerifyTwitterResponse']> = {
  result?: Resolver<ResolversTypes['VerifyTwitterResponse_Result'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AckAllNotificationsResponse?: AckAllNotificationsResponseResolvers<ContextType>;
  AckNotificationsResponse?: AckNotificationsResponseResolvers<ContextType>;
  AliasResponse?: AliasResponseResolvers<ContextType>;
  AuthResponse?: AuthResponseResolvers<ContextType>;
  BatchConnectResponse?: BatchConnectResponseResolvers<ContextType>;
  BiConnEvent?: BiConnEventResolvers<ContextType>;
  BiConnIdentity?: BiConnIdentityResolvers<ContextType>;
  BiConnectAcceptedNotification?: BiConnectAcceptedNotificationResolvers<ContextType>;
  BiConnectReceivedNotification?: BiConnectReceivedNotificationResolvers<ContextType>;
  BiConnectResponse?: BiConnectResponseResolvers<ContextType>;
  BidirectionalConnection?: BidirectionalConnectionResolvers<ContextType>;
  BidirectionalConnectionIdentityPage?: BidirectionalConnectionIdentityPageResolvers<ContextType>;
  Connect?: ConnectResolvers<ContextType>;
  ConnectResponse?: ConnectResponseResolvers<ContextType>;
  Connection?: ConnectionResolvers<ContextType>;
  ConnectionEvent?: ConnectionEventResolvers<ContextType>;
  ConnectionIdentityPage?: ConnectionIdentityPageResolvers<ContextType>;
  ConnectionSummary?: ConnectionSummaryResolvers<ContextType>;
  DisconnectResponse?: DisconnectResponseResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  EventPage?: EventPageResolvers<ContextType>;
  FollowResponse?: FollowResponseResolvers<ContextType>;
  FollowStatus?: FollowStatusResolvers<ContextType>;
  Github?: GithubResolvers<ContextType>;
  HomePage?: HomePageResolvers<ContextType>;
  MetricsCount?: MetricsCountResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NFTOwner?: NftOwnerResolvers<ContextType>;
  NewConnectionNotification?: NewConnectionNotificationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  NotificationPage?: NotificationPageResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Percentage?: GraphQLScalarType;
  Popular?: PopularResolvers<ContextType>;
  PopularPage?: PopularPageResolvers<ContextType>;
  Proof?: ProofResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Ranking?: RankingResolvers<ContextType>;
  Recommendation?: RecommendationResolvers<ContextType>;
  RecommendationPage?: RecommendationPageResolvers<ContextType>;
  RecommendationResponse?: RecommendationResponseResolvers<ContextType>;
  RegisterKeyResponse?: RegisterKeyResponseResolvers<ContextType>;
  SetAliasResponse?: SetAliasResponseResolvers<ContextType>;
  SetProfileResponse?: SetProfileResponseResolvers<ContextType>;
  SetTwitterHandleResponse?: SetTwitterHandleResponseResolvers<ContextType>;
  SigningKeyAuth?: SigningKeyAuthResolvers<ContextType>;
  Social?: SocialResolvers<ContextType>;
  SubscribeResponse?: SubscribeResponseResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Twitter?: TwitterResolvers<ContextType>;
  TwitterRankingPage?: TwitterRankingPageResolvers<ContextType>;
  UnFollowResponse?: UnFollowResponseResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UserIdentity?: UserIdentityResolvers<ContextType>;
  UserIdentityPage?: UserIdentityPageResolvers<ContextType>;
  VerifyGithubResponse?: VerifyGithubResponseResolvers<ContextType>;
  VerifyTwitterResponse?: VerifyTwitterResponseResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  admin?: AdminDirectiveResolver<any, any, ContextType>;
};
