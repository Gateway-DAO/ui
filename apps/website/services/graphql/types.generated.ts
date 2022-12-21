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
  _text: string;
  bigint: any;
  citext: any;
  credential_state: any;
  email: any;
  following_state: any;
  gate_state: any;
  gate_status: any;
  gate_type: any;
  json: any;
  jsonb: any;
  key_status: any;
  manual_task_event_type: any;
  permission_types: any;
  submission_state: any;
  task_type: any;
  timestamp: any;
  timestamptz: any;
  users_scalar: any;
  uuid: any;
};

export type AlgoliaPaginationInput = {
  hitsPerPage?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type AlgoliaSearchResults = {
  __typename?: 'AlgoliaSearchResults';
  hits: Scalars['jsonb'];
};

export type ApproveCredentialOutput = {
  __typename?: 'ApproveCredentialOutput';
  status: Scalars['String'];
};

export type ApproveMtInput = {
  admin_id?: InputMaybe<Scalars['uuid']>;
  comment?: InputMaybe<Scalars['String']>;
  submission_id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type ClaimCredentialOutput = {
  __typename?: 'ClaimCredentialOutput';
  admin_id: Scalars['uuid'];
  credential: Scalars['jsonb'];
  user_id: Scalars['uuid'];
};

export type CreateCodeOutput = {
  __typename?: 'CreateCodeOutput';
  success: Scalars['Boolean'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type LinkPreviewOutput = {
  __typename?: 'LinkPreviewOutput';
  contentType: Scalars['String'];
  description: Maybe<Scalars['String']>;
  favicons: Maybe<Array<Maybe<Scalars['String']>>>;
  images: Maybe<Array<Maybe<Scalars['String']>>>;
  mediaType: Scalars['String'];
  siteName: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  url: Scalars['String'];
  videos: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  refresh_token: Scalars['String'];
  token: Scalars['String'];
  user_id: Scalars['String'];
};

export type MetadataInput = {
  name: Scalars['String'];
};

export type MintCredentialInfo = {
  __typename?: 'MintCredentialInfo';
  chain_id: Scalars['String'];
  transaction_hash: Scalars['String'];
  wallet: Scalars['String'];
};

export type MintCredentialOutput = {
  __typename?: 'MintCredentialOutput';
  info: MintCredentialInfo;
  message: Scalars['String'];
  status: Scalars['String'];
};

export type NonceOutput = {
  __typename?: 'NonceOutput';
  nonce: Scalars['Int'];
};

export type OptionsInput = {
  blur?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['Int']>;
  resize?: InputMaybe<ResizeInput>;
};

export type PublishGateOutput = {
  __typename?: 'PublishGateOutput';
  gate: Maybe<Gates>;
  gate_id: Scalars['uuid'];
  published: Scalars['String'];
};

export type RefreshOutput = {
  __typename?: 'RefreshOutput';
  refresh_token: Scalars['String'];
  token: Scalars['String'];
};

export type RejectMtOutput = {
  __typename?: 'RejectMTOutput';
  message: Scalars['String'];
};

export type Resize = {
  __typename?: 'Resize';
  height: Maybe<Scalars['Int']>;
  width: Maybe<Scalars['Int']>;
};

export type ResizeInput = {
  height?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

export type TransformOptions = {
  __typename?: 'TransformOptions';
  blur: Maybe<Scalars['Int']>;
  q: Maybe<Scalars['Int']>;
  resize: Maybe<Resize>;
};

export type TransformOutput = {
  __typename?: 'TransformOutput';
  original_url: Scalars['String'];
  transformed: Maybe<TransformedImage>;
};

export type TransformedImage = {
  __typename?: 'TransformedImage';
  args: Maybe<TransformOptions>;
  base64: Scalars['String'];
};

export type TwitterPublicMetrics = {
  __typename?: 'TwitterPublicMetrics';
  followers_count: Maybe<Scalars['Int']>;
  following_count: Maybe<Scalars['Int']>;
  listed_count: Maybe<Scalars['Int']>;
  tweet_count: Maybe<Scalars['Int']>;
};

export type TwitterTweet = {
  __typename?: 'TwitterTweet';
  author_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  text: Maybe<Scalars['String']>;
};

export type TwitterUser = {
  __typename?: 'TwitterUser';
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  profile_image_url: Maybe<Scalars['String']>;
  protected: Maybe<Scalars['Boolean']>;
  public_metrics: Maybe<TwitterPublicMetrics>;
  username: Maybe<Scalars['String']>;
  verified: Maybe<Scalars['Boolean']>;
};

export type UploadOutput = {
  __typename?: 'UploadOutput';
  author_id: Maybe<Scalars['uuid']>;
  blur: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  metadata: Maybe<Scalars['jsonb']>;
  type: Scalars['String'];
};

export type VerifyCsvOutput = {
  __typename?: 'VerifyCSVOutput';
  accessToken: Scalars['String'];
};

export type VerifyCsvProgressOutput = {
  __typename?: 'VerifyCSVProgressOutput';
  id: Scalars['String'];
  invalid: Scalars['Int'];
  invalidList: Maybe<Array<Maybe<Scalars['String']>>>;
  isDone: Scalars['Boolean'];
  total: Scalars['Int'];
  uploadedTime: Scalars['Int'];
  valid: Scalars['Int'];
  validList: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type VerifyCodeOutput = {
  __typename?: 'VerifyCodeOutput';
  success: Scalars['Boolean'];
};

export type VerifyInput = {
  info?: InputMaybe<Scalars['json']>;
  task_id: Scalars['uuid'];
};

export type VerifyOutput = {
  __typename?: 'VerifyOutput';
  task_info: Scalars['json'];
};

/** Boolean expression to compare columns of type "_text". All fields are combined with logical 'AND'. */
export type _Text_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['_text']>;
  _gt?: InputMaybe<Scalars['_text']>;
  _gte?: InputMaybe<Scalars['_text']>;
  _in?: InputMaybe<Array<Scalars['_text']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['_text']>;
  _lte?: InputMaybe<Scalars['_text']>;
  _neq?: InputMaybe<Scalars['_text']>;
  _nin?: InputMaybe<Array<Scalars['_text']>>;
};

/** columns and relationships of "access_tokens" */
export type Access_Tokens = {
  __typename?: 'access_tokens';
  github_access_token: Maybe<Scalars['String']>;
  twitter_access_token: Maybe<Scalars['String']>;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "access_tokens" */
export type Access_Tokens_Aggregate = {
  __typename?: 'access_tokens_aggregate';
  aggregate: Maybe<Access_Tokens_Aggregate_Fields>;
  nodes: Array<Access_Tokens>;
};

/** aggregate fields of "access_tokens" */
export type Access_Tokens_Aggregate_Fields = {
  __typename?: 'access_tokens_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Access_Tokens_Max_Fields>;
  min: Maybe<Access_Tokens_Min_Fields>;
};


/** aggregate fields of "access_tokens" */
export type Access_Tokens_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Access_Tokens_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "access_tokens". All fields are combined with a logical 'AND'. */
export type Access_Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<Access_Tokens_Bool_Exp>>;
  _not?: InputMaybe<Access_Tokens_Bool_Exp>;
  _or?: InputMaybe<Array<Access_Tokens_Bool_Exp>>;
  github_access_token?: InputMaybe<String_Comparison_Exp>;
  twitter_access_token?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "access_tokens" */
export enum Access_Tokens_Constraint {
  /** unique or primary key constraint on columns "github_access_token" */
  AccessTokensGithubAccessTokenUindex = 'access_tokens_github_access_token_uindex',
  /** unique or primary key constraint on columns "twitter_access_token" */
  AccessTokensTwitterAccessTokenUindex = 'access_tokens_twitter_access_token_uindex',
  /** unique or primary key constraint on columns "user_id" */
  AccessTokensUserIdUindex = 'access_tokens_user_id_uindex'
}

/** input type for inserting data into table "access_tokens" */
export type Access_Tokens_Insert_Input = {
  github_access_token?: InputMaybe<Scalars['String']>;
  twitter_access_token?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Access_Tokens_Max_Fields = {
  __typename?: 'access_tokens_max_fields';
  github_access_token: Maybe<Scalars['String']>;
  twitter_access_token: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type Access_Tokens_Min_Fields = {
  __typename?: 'access_tokens_min_fields';
  github_access_token: Maybe<Scalars['String']>;
  twitter_access_token: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "access_tokens" */
export type Access_Tokens_Mutation_Response = {
  __typename?: 'access_tokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Access_Tokens>;
};

/** input type for inserting object relation for remote table "access_tokens" */
export type Access_Tokens_Obj_Rel_Insert_Input = {
  data: Access_Tokens_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Access_Tokens_On_Conflict>;
};

/** on_conflict condition type for table "access_tokens" */
export type Access_Tokens_On_Conflict = {
  constraint: Access_Tokens_Constraint;
  update_columns: Array<Access_Tokens_Update_Column>;
  where?: InputMaybe<Access_Tokens_Bool_Exp>;
};

/** Ordering options when selecting data from "access_tokens". */
export type Access_Tokens_Order_By = {
  github_access_token?: InputMaybe<Order_By>;
  twitter_access_token?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "access_tokens" */
export enum Access_Tokens_Select_Column {
  /** column name */
  GithubAccessToken = 'github_access_token',
  /** column name */
  TwitterAccessToken = 'twitter_access_token',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "access_tokens" */
export type Access_Tokens_Set_Input = {
  github_access_token?: InputMaybe<Scalars['String']>;
  twitter_access_token?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "access_tokens" */
export type Access_Tokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Access_Tokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Access_Tokens_Stream_Cursor_Value_Input = {
  github_access_token?: InputMaybe<Scalars['String']>;
  twitter_access_token?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "access_tokens" */
export enum Access_Tokens_Update_Column {
  /** column name */
  GithubAccessToken = 'github_access_token',
  /** column name */
  TwitterAccessToken = 'twitter_access_token',
  /** column name */
  UserId = 'user_id'
}

export type Access_Tokens_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Access_Tokens_Set_Input>;
  where: Access_Tokens_Bool_Exp;
};

/** columns and relationships of "all_credential_count" */
export type All_Credential_Count = {
  __typename?: 'all_credential_count';
  count: Maybe<Scalars['bigint']>;
  /** An object relationship */
  gate: Maybe<Gates>;
  gate_id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
};

/** aggregated selection of "all_credential_count" */
export type All_Credential_Count_Aggregate = {
  __typename?: 'all_credential_count_aggregate';
  aggregate: Maybe<All_Credential_Count_Aggregate_Fields>;
  nodes: Array<All_Credential_Count>;
};

/** aggregate fields of "all_credential_count" */
export type All_Credential_Count_Aggregate_Fields = {
  __typename?: 'all_credential_count_aggregate_fields';
  avg: Maybe<All_Credential_Count_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<All_Credential_Count_Max_Fields>;
  min: Maybe<All_Credential_Count_Min_Fields>;
  stddev: Maybe<All_Credential_Count_Stddev_Fields>;
  stddev_pop: Maybe<All_Credential_Count_Stddev_Pop_Fields>;
  stddev_samp: Maybe<All_Credential_Count_Stddev_Samp_Fields>;
  sum: Maybe<All_Credential_Count_Sum_Fields>;
  var_pop: Maybe<All_Credential_Count_Var_Pop_Fields>;
  var_samp: Maybe<All_Credential_Count_Var_Samp_Fields>;
  variance: Maybe<All_Credential_Count_Variance_Fields>;
};


/** aggregate fields of "all_credential_count" */
export type All_Credential_Count_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<All_Credential_Count_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type All_Credential_Count_Avg_Fields = {
  __typename?: 'all_credential_count_avg_fields';
  count: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "all_credential_count". All fields are combined with a logical 'AND'. */
export type All_Credential_Count_Bool_Exp = {
  _and?: InputMaybe<Array<All_Credential_Count_Bool_Exp>>;
  _not?: InputMaybe<All_Credential_Count_Bool_Exp>;
  _or?: InputMaybe<Array<All_Credential_Count_Bool_Exp>>;
  count?: InputMaybe<Bigint_Comparison_Exp>;
  gate?: InputMaybe<Gates_Bool_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type All_Credential_Count_Max_Fields = {
  __typename?: 'all_credential_count_max_fields';
  count: Maybe<Scalars['bigint']>;
  gate_id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type All_Credential_Count_Min_Fields = {
  __typename?: 'all_credential_count_min_fields';
  count: Maybe<Scalars['bigint']>;
  gate_id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "all_credential_count". */
export type All_Credential_Count_Order_By = {
  count?: InputMaybe<Order_By>;
  gate?: InputMaybe<Gates_Order_By>;
  gate_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** select columns of table "all_credential_count" */
export enum All_Credential_Count_Select_Column {
  /** column name */
  Count = 'count',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Name = 'name'
}

/** aggregate stddev on columns */
export type All_Credential_Count_Stddev_Fields = {
  __typename?: 'all_credential_count_stddev_fields';
  count: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type All_Credential_Count_Stddev_Pop_Fields = {
  __typename?: 'all_credential_count_stddev_pop_fields';
  count: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type All_Credential_Count_Stddev_Samp_Fields = {
  __typename?: 'all_credential_count_stddev_samp_fields';
  count: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "all_credential_count" */
export type All_Credential_Count_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: All_Credential_Count_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type All_Credential_Count_Stream_Cursor_Value_Input = {
  count?: InputMaybe<Scalars['bigint']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type All_Credential_Count_Sum_Fields = {
  __typename?: 'all_credential_count_sum_fields';
  count: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type All_Credential_Count_Var_Pop_Fields = {
  __typename?: 'all_credential_count_var_pop_fields';
  count: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type All_Credential_Count_Var_Samp_Fields = {
  __typename?: 'all_credential_count_var_samp_fields';
  count: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type All_Credential_Count_Variance_Fields = {
  __typename?: 'all_credential_count_variance_fields';
  count: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']>;
  _gt?: InputMaybe<Scalars['bigint']>;
  _gte?: InputMaybe<Scalars['bigint']>;
  _in?: InputMaybe<Array<Scalars['bigint']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['bigint']>;
  _lte?: InputMaybe<Scalars['bigint']>;
  _neq?: InputMaybe<Scalars['bigint']>;
  _nin?: InputMaybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "bookmarks" */
export type Bookmarks = {
  __typename?: 'bookmarks';
  created_at: Scalars['timestamp'];
  gate_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
};

/** aggregated selection of "bookmarks" */
export type Bookmarks_Aggregate = {
  __typename?: 'bookmarks_aggregate';
  aggregate: Maybe<Bookmarks_Aggregate_Fields>;
  nodes: Array<Bookmarks>;
};

export type Bookmarks_Aggregate_Bool_Exp = {
  count?: InputMaybe<Bookmarks_Aggregate_Bool_Exp_Count>;
};

export type Bookmarks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Bookmarks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Bookmarks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "bookmarks" */
export type Bookmarks_Aggregate_Fields = {
  __typename?: 'bookmarks_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Bookmarks_Max_Fields>;
  min: Maybe<Bookmarks_Min_Fields>;
};


/** aggregate fields of "bookmarks" */
export type Bookmarks_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Bookmarks_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "bookmarks" */
export type Bookmarks_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Bookmarks_Max_Order_By>;
  min?: InputMaybe<Bookmarks_Min_Order_By>;
};

/** input type for inserting array relation for remote table "bookmarks" */
export type Bookmarks_Arr_Rel_Insert_Input = {
  data: Array<Bookmarks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Bookmarks_On_Conflict>;
};

/** Boolean expression to filter rows from the table "bookmarks". All fields are combined with a logical 'AND'. */
export type Bookmarks_Bool_Exp = {
  _and?: InputMaybe<Array<Bookmarks_Bool_Exp>>;
  _not?: InputMaybe<Bookmarks_Bool_Exp>;
  _or?: InputMaybe<Array<Bookmarks_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "bookmarks" */
export enum Bookmarks_Constraint {
  /** unique or primary key constraint on columns "user_id", "gate_id" */
  BookmarksPk = 'bookmarks_pk',
  /** unique or primary key constraint on columns "user_id", "gate_id" */
  BookmarksUserIdGateIdUindex = 'bookmarks_user_id_gate_id_uindex'
}

/** input type for inserting data into table "bookmarks" */
export type Bookmarks_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Bookmarks_Max_Fields = {
  __typename?: 'bookmarks_max_fields';
  created_at: Maybe<Scalars['timestamp']>;
  gate_id: Maybe<Scalars['uuid']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "bookmarks" */
export type Bookmarks_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Bookmarks_Min_Fields = {
  __typename?: 'bookmarks_min_fields';
  created_at: Maybe<Scalars['timestamp']>;
  gate_id: Maybe<Scalars['uuid']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "bookmarks" */
export type Bookmarks_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "bookmarks" */
export type Bookmarks_Mutation_Response = {
  __typename?: 'bookmarks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Bookmarks>;
};

/** on_conflict condition type for table "bookmarks" */
export type Bookmarks_On_Conflict = {
  constraint: Bookmarks_Constraint;
  update_columns: Array<Bookmarks_Update_Column>;
  where?: InputMaybe<Bookmarks_Bool_Exp>;
};

/** Ordering options when selecting data from "bookmarks". */
export type Bookmarks_Order_By = {
  created_at?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "bookmarks" */
export enum Bookmarks_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "bookmarks" */
export type Bookmarks_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "bookmarks" */
export type Bookmarks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Bookmarks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Bookmarks_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "bookmarks" */
export enum Bookmarks_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  UserId = 'user_id'
}

export type Bookmarks_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Bookmarks_Set_Input>;
  where: Bookmarks_Bool_Exp;
};

/** columns and relationships of "bounties" */
export type Bounties = {
  __typename?: 'bounties';
  categories: Scalars['_text'];
  dao_id: Scalars['uuid'];
  description: Maybe<Scalars['String']>;
  directions: Maybe<Scalars['String']>;
  end_date: Scalars['timestamp'];
  headline: Scalars['String'];
  id: Scalars['uuid'];
  level: Scalars['String'];
  links: Scalars['_text'];
  post_date: Scalars['timestamp'];
  reward: Scalars['String'];
};

/** aggregated selection of "bounties" */
export type Bounties_Aggregate = {
  __typename?: 'bounties_aggregate';
  aggregate: Maybe<Bounties_Aggregate_Fields>;
  nodes: Array<Bounties>;
};

export type Bounties_Aggregate_Bool_Exp = {
  count?: InputMaybe<Bounties_Aggregate_Bool_Exp_Count>;
};

export type Bounties_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Bounties_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Bounties_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "bounties" */
export type Bounties_Aggregate_Fields = {
  __typename?: 'bounties_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Bounties_Max_Fields>;
  min: Maybe<Bounties_Min_Fields>;
};


/** aggregate fields of "bounties" */
export type Bounties_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Bounties_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "bounties" */
export type Bounties_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Bounties_Max_Order_By>;
  min?: InputMaybe<Bounties_Min_Order_By>;
};

/** input type for inserting array relation for remote table "bounties" */
export type Bounties_Arr_Rel_Insert_Input = {
  data: Array<Bounties_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Bounties_On_Conflict>;
};

/** Boolean expression to filter rows from the table "bounties". All fields are combined with a logical 'AND'. */
export type Bounties_Bool_Exp = {
  _and?: InputMaybe<Array<Bounties_Bool_Exp>>;
  _not?: InputMaybe<Bounties_Bool_Exp>;
  _or?: InputMaybe<Array<Bounties_Bool_Exp>>;
  categories?: InputMaybe<_Text_Comparison_Exp>;
  dao_id?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  directions?: InputMaybe<String_Comparison_Exp>;
  end_date?: InputMaybe<Timestamp_Comparison_Exp>;
  headline?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  level?: InputMaybe<String_Comparison_Exp>;
  links?: InputMaybe<_Text_Comparison_Exp>;
  post_date?: InputMaybe<Timestamp_Comparison_Exp>;
  reward?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "bounties" */
export enum Bounties_Constraint {
  /** unique or primary key constraint on columns "id" */
  BountiesIdUindex = 'bounties_id_uindex',
  /** unique or primary key constraint on columns "id" */
  BountiesPk = 'bounties_pk'
}

/** input type for inserting data into table "bounties" */
export type Bounties_Insert_Input = {
  categories?: InputMaybe<Scalars['_text']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  directions?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['timestamp']>;
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  level?: InputMaybe<Scalars['String']>;
  links?: InputMaybe<Scalars['_text']>;
  post_date?: InputMaybe<Scalars['timestamp']>;
  reward?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Bounties_Max_Fields = {
  __typename?: 'bounties_max_fields';
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  directions: Maybe<Scalars['String']>;
  end_date: Maybe<Scalars['timestamp']>;
  headline: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  level: Maybe<Scalars['String']>;
  post_date: Maybe<Scalars['timestamp']>;
  reward: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "bounties" */
export type Bounties_Max_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  directions?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  headline?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  post_date?: InputMaybe<Order_By>;
  reward?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Bounties_Min_Fields = {
  __typename?: 'bounties_min_fields';
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  directions: Maybe<Scalars['String']>;
  end_date: Maybe<Scalars['timestamp']>;
  headline: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  level: Maybe<Scalars['String']>;
  post_date: Maybe<Scalars['timestamp']>;
  reward: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "bounties" */
export type Bounties_Min_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  directions?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  headline?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  post_date?: InputMaybe<Order_By>;
  reward?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "bounties" */
export type Bounties_Mutation_Response = {
  __typename?: 'bounties_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Bounties>;
};

/** on_conflict condition type for table "bounties" */
export type Bounties_On_Conflict = {
  constraint: Bounties_Constraint;
  update_columns: Array<Bounties_Update_Column>;
  where?: InputMaybe<Bounties_Bool_Exp>;
};

/** Ordering options when selecting data from "bounties". */
export type Bounties_Order_By = {
  categories?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  directions?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  headline?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  links?: InputMaybe<Order_By>;
  post_date?: InputMaybe<Order_By>;
  reward?: InputMaybe<Order_By>;
};

/** primary key columns input for table: bounties */
export type Bounties_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "bounties" */
export enum Bounties_Select_Column {
  /** column name */
  Categories = 'categories',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  Directions = 'directions',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Headline = 'headline',
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  Links = 'links',
  /** column name */
  PostDate = 'post_date',
  /** column name */
  Reward = 'reward'
}

/** input type for updating data in table "bounties" */
export type Bounties_Set_Input = {
  categories?: InputMaybe<Scalars['_text']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  directions?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['timestamp']>;
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  level?: InputMaybe<Scalars['String']>;
  links?: InputMaybe<Scalars['_text']>;
  post_date?: InputMaybe<Scalars['timestamp']>;
  reward?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "bounties" */
export type Bounties_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Bounties_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Bounties_Stream_Cursor_Value_Input = {
  categories?: InputMaybe<Scalars['_text']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  directions?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['timestamp']>;
  headline?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  level?: InputMaybe<Scalars['String']>;
  links?: InputMaybe<Scalars['_text']>;
  post_date?: InputMaybe<Scalars['timestamp']>;
  reward?: InputMaybe<Scalars['String']>;
};

/** update columns of table "bounties" */
export enum Bounties_Update_Column {
  /** column name */
  Categories = 'categories',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  Directions = 'directions',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Headline = 'headline',
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  Links = 'links',
  /** column name */
  PostDate = 'post_date',
  /** column name */
  Reward = 'reward'
}

export type Bounties_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Bounties_Set_Input>;
  where: Bounties_Bool_Exp;
};

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type Citext_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['citext']>;
  _gt?: InputMaybe<Scalars['citext']>;
  _gte?: InputMaybe<Scalars['citext']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['citext']>;
  _in?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['citext']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['citext']>;
  _lt?: InputMaybe<Scalars['citext']>;
  _lte?: InputMaybe<Scalars['citext']>;
  _neq?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['citext']>;
  _nin?: InputMaybe<Array<Scalars['citext']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['citext']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['citext']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['citext']>;
};

/** columns and relationships of "credential_group" */
export type Credential_Group = {
  __typename?: 'credential_group';
  /** An object relationship */
  admin: Users;
  admin_id: Scalars['uuid'];
  category: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  image: Scalars['String'];
  name: Scalars['String'];
  slug: Maybe<Scalars['String']>;
  wallets: Scalars['jsonb'];
};


/** columns and relationships of "credential_group" */
export type Credential_GroupWalletsArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "credential_group" */
export type Credential_Group_Aggregate = {
  __typename?: 'credential_group_aggregate';
  aggregate: Maybe<Credential_Group_Aggregate_Fields>;
  nodes: Array<Credential_Group>;
};

export type Credential_Group_Aggregate_Bool_Exp = {
  count?: InputMaybe<Credential_Group_Aggregate_Bool_Exp_Count>;
};

export type Credential_Group_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Credential_Group_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Credential_Group_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "credential_group" */
export type Credential_Group_Aggregate_Fields = {
  __typename?: 'credential_group_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Credential_Group_Max_Fields>;
  min: Maybe<Credential_Group_Min_Fields>;
};


/** aggregate fields of "credential_group" */
export type Credential_Group_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Credential_Group_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "credential_group" */
export type Credential_Group_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Credential_Group_Max_Order_By>;
  min?: InputMaybe<Credential_Group_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Credential_Group_Append_Input = {
  wallets?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "credential_group" */
export type Credential_Group_Arr_Rel_Insert_Input = {
  data: Array<Credential_Group_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Credential_Group_On_Conflict>;
};

/** Boolean expression to filter rows from the table "credential_group". All fields are combined with a logical 'AND'. */
export type Credential_Group_Bool_Exp = {
  _and?: InputMaybe<Array<Credential_Group_Bool_Exp>>;
  _not?: InputMaybe<Credential_Group_Bool_Exp>;
  _or?: InputMaybe<Array<Credential_Group_Bool_Exp>>;
  admin?: InputMaybe<Users_Bool_Exp>;
  admin_id?: InputMaybe<Uuid_Comparison_Exp>;
  category?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  wallets?: InputMaybe<Jsonb_Comparison_Exp>;
};

/** unique or primary key constraints on table "credential_group" */
export enum Credential_Group_Constraint {
  /** unique or primary key constraint on columns "id" */
  CredentialGroupPk = 'credential_group_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Credential_Group_Delete_At_Path_Input = {
  wallets?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Credential_Group_Delete_Elem_Input = {
  wallets?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Credential_Group_Delete_Key_Input = {
  wallets?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "credential_group" */
export type Credential_Group_Insert_Input = {
  admin?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  admin_id?: InputMaybe<Scalars['uuid']>;
  category?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  wallets?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type Credential_Group_Max_Fields = {
  __typename?: 'credential_group_max_fields';
  admin_id: Maybe<Scalars['uuid']>;
  category: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "credential_group" */
export type Credential_Group_Max_Order_By = {
  admin_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Credential_Group_Min_Fields = {
  __typename?: 'credential_group_min_fields';
  admin_id: Maybe<Scalars['uuid']>;
  category: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  image: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "credential_group" */
export type Credential_Group_Min_Order_By = {
  admin_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "credential_group" */
export type Credential_Group_Mutation_Response = {
  __typename?: 'credential_group_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Credential_Group>;
};

/** input type for inserting object relation for remote table "credential_group" */
export type Credential_Group_Obj_Rel_Insert_Input = {
  data: Credential_Group_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Credential_Group_On_Conflict>;
};

/** on_conflict condition type for table "credential_group" */
export type Credential_Group_On_Conflict = {
  constraint: Credential_Group_Constraint;
  update_columns: Array<Credential_Group_Update_Column>;
  where?: InputMaybe<Credential_Group_Bool_Exp>;
};

/** Ordering options when selecting data from "credential_group". */
export type Credential_Group_Order_By = {
  admin?: InputMaybe<Users_Order_By>;
  admin_id?: InputMaybe<Order_By>;
  category?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  slug?: InputMaybe<Order_By>;
  wallets?: InputMaybe<Order_By>;
};

/** primary key columns input for table: credential_group */
export type Credential_Group_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Credential_Group_Prepend_Input = {
  wallets?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "credential_group" */
export enum Credential_Group_Select_Column {
  /** column name */
  AdminId = 'admin_id',
  /** column name */
  Category = 'category',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  Wallets = 'wallets'
}

/** input type for updating data in table "credential_group" */
export type Credential_Group_Set_Input = {
  admin_id?: InputMaybe<Scalars['uuid']>;
  category?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  wallets?: InputMaybe<Scalars['jsonb']>;
};

/** Streaming cursor of the table "credential_group" */
export type Credential_Group_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Credential_Group_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Credential_Group_Stream_Cursor_Value_Input = {
  admin_id?: InputMaybe<Scalars['uuid']>;
  category?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  wallets?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "credential_group" */
export enum Credential_Group_Update_Column {
  /** column name */
  AdminId = 'admin_id',
  /** column name */
  Category = 'category',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  Wallets = 'wallets'
}

export type Credential_Group_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Credential_Group_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Credential_Group_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Credential_Group_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Credential_Group_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Credential_Group_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Credential_Group_Set_Input>;
  where: Credential_Group_Bool_Exp;
};

/** Boolean expression to compare columns of type "credential_state". All fields are combined with logical 'AND'. */
export type Credential_State_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['credential_state']>;
  _gt?: InputMaybe<Scalars['credential_state']>;
  _gte?: InputMaybe<Scalars['credential_state']>;
  _in?: InputMaybe<Array<Scalars['credential_state']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['credential_state']>;
  _lte?: InputMaybe<Scalars['credential_state']>;
  _neq?: InputMaybe<Scalars['credential_state']>;
  _nin?: InputMaybe<Array<Scalars['credential_state']>>;
};

/** columns and relationships of "credentials" */
export type Credentials = {
  __typename?: 'credentials';
  admin_comment: Maybe<Scalars['String']>;
  attitudes: Maybe<Scalars['jsonb']>;
  categories: Scalars['jsonb'];
  ceramic: Scalars['String'];
  created_at: Scalars['timestamp'];
  /** An object relationship */
  credential_group: Maybe<Credential_Group>;
  /** An object relationship */
  dao: Maybe<Daos>;
  dao_id: Maybe<Scalars['uuid']>;
  description: Scalars['String'];
  details: Scalars['jsonb'];
  /** An object relationship */
  gate: Maybe<Gates>;
  gate_id: Maybe<Scalars['uuid']>;
  group_id: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  image: Scalars['String'];
  /** An object relationship */
  issuer: Maybe<Users>;
  issuer_id: Maybe<Scalars['uuid']>;
  knowledges: Maybe<Scalars['jsonb']>;
  name: Scalars['String'];
  namespace: Scalars['String'];
  pow: Maybe<Scalars['jsonb']>;
  signature: Maybe<Scalars['String']>;
  skills: Maybe<Scalars['jsonb']>;
  status: Scalars['credential_state'];
  /** An object relationship */
  target: Users;
  target_id: Scalars['uuid'];
  transaction_url: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamp'];
  uri: Maybe<Scalars['String']>;
};


/** columns and relationships of "credentials" */
export type CredentialsAttitudesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "credentials" */
export type CredentialsCategoriesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "credentials" */
export type CredentialsDetailsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "credentials" */
export type CredentialsKnowledgesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "credentials" */
export type CredentialsPowArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "credentials" */
export type CredentialsSkillsArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "credentials" */
export type Credentials_Aggregate = {
  __typename?: 'credentials_aggregate';
  aggregate: Maybe<Credentials_Aggregate_Fields>;
  nodes: Array<Credentials>;
};

export type Credentials_Aggregate_Bool_Exp = {
  count?: InputMaybe<Credentials_Aggregate_Bool_Exp_Count>;
};

export type Credentials_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Credentials_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Credentials_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "credentials" */
export type Credentials_Aggregate_Fields = {
  __typename?: 'credentials_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Credentials_Max_Fields>;
  min: Maybe<Credentials_Min_Fields>;
};


/** aggregate fields of "credentials" */
export type Credentials_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Credentials_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "credentials" */
export type Credentials_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Credentials_Max_Order_By>;
  min?: InputMaybe<Credentials_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Credentials_Append_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  details?: InputMaybe<Scalars['jsonb']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  pow?: InputMaybe<Scalars['jsonb']>;
  skills?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "credentials" */
export type Credentials_Arr_Rel_Insert_Input = {
  data: Array<Credentials_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Credentials_On_Conflict>;
};

/** Boolean expression to filter rows from the table "credentials". All fields are combined with a logical 'AND'. */
export type Credentials_Bool_Exp = {
  _and?: InputMaybe<Array<Credentials_Bool_Exp>>;
  _not?: InputMaybe<Credentials_Bool_Exp>;
  _or?: InputMaybe<Array<Credentials_Bool_Exp>>;
  admin_comment?: InputMaybe<String_Comparison_Exp>;
  attitudes?: InputMaybe<Jsonb_Comparison_Exp>;
  categories?: InputMaybe<Jsonb_Comparison_Exp>;
  ceramic?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  credential_group?: InputMaybe<Credential_Group_Bool_Exp>;
  dao?: InputMaybe<Daos_Bool_Exp>;
  dao_id?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  details?: InputMaybe<Jsonb_Comparison_Exp>;
  gate?: InputMaybe<Gates_Bool_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  group_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  issuer?: InputMaybe<Users_Bool_Exp>;
  issuer_id?: InputMaybe<Uuid_Comparison_Exp>;
  knowledges?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  namespace?: InputMaybe<String_Comparison_Exp>;
  pow?: InputMaybe<Jsonb_Comparison_Exp>;
  signature?: InputMaybe<String_Comparison_Exp>;
  skills?: InputMaybe<Jsonb_Comparison_Exp>;
  status?: InputMaybe<Credential_State_Comparison_Exp>;
  target?: InputMaybe<Users_Bool_Exp>;
  target_id?: InputMaybe<Uuid_Comparison_Exp>;
  transaction_url?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  uri?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "credentials" */
export enum Credentials_Constraint {
  /** unique or primary key constraint on columns "id" */
  CredentialsIdUindex = 'credentials_id_uindex',
  /** unique or primary key constraint on columns "id" */
  CredentialsPk = 'credentials_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Credentials_Delete_At_Path_Input = {
  attitudes?: InputMaybe<Array<Scalars['String']>>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  details?: InputMaybe<Array<Scalars['String']>>;
  knowledges?: InputMaybe<Array<Scalars['String']>>;
  pow?: InputMaybe<Array<Scalars['String']>>;
  skills?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Credentials_Delete_Elem_Input = {
  attitudes?: InputMaybe<Scalars['Int']>;
  categories?: InputMaybe<Scalars['Int']>;
  details?: InputMaybe<Scalars['Int']>;
  knowledges?: InputMaybe<Scalars['Int']>;
  pow?: InputMaybe<Scalars['Int']>;
  skills?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Credentials_Delete_Key_Input = {
  attitudes?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['String']>;
  knowledges?: InputMaybe<Scalars['String']>;
  pow?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "credentials" */
export type Credentials_Insert_Input = {
  admin_comment?: InputMaybe<Scalars['String']>;
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  ceramic?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  credential_group?: InputMaybe<Credential_Group_Obj_Rel_Insert_Input>;
  dao?: InputMaybe<Daos_Obj_Rel_Insert_Input>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['jsonb']>;
  gate?: InputMaybe<Gates_Obj_Rel_Insert_Input>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  issuer?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  issuer_id?: InputMaybe<Scalars['uuid']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  pow?: InputMaybe<Scalars['jsonb']>;
  signature?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  status?: InputMaybe<Scalars['credential_state']>;
  target?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  target_id?: InputMaybe<Scalars['uuid']>;
  transaction_url?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  uri?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Credentials_Max_Fields = {
  __typename?: 'credentials_max_fields';
  admin_comment: Maybe<Scalars['String']>;
  ceramic: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamp']>;
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  gate_id: Maybe<Scalars['uuid']>;
  group_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  image: Maybe<Scalars['String']>;
  issuer_id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  namespace: Maybe<Scalars['String']>;
  signature: Maybe<Scalars['String']>;
  status: Maybe<Scalars['credential_state']>;
  target_id: Maybe<Scalars['uuid']>;
  transaction_url: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamp']>;
  uri: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "credentials" */
export type Credentials_Max_Order_By = {
  admin_comment?: InputMaybe<Order_By>;
  ceramic?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  namespace?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  target_id?: InputMaybe<Order_By>;
  transaction_url?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  uri?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Credentials_Min_Fields = {
  __typename?: 'credentials_min_fields';
  admin_comment: Maybe<Scalars['String']>;
  ceramic: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamp']>;
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  gate_id: Maybe<Scalars['uuid']>;
  group_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  image: Maybe<Scalars['String']>;
  issuer_id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  namespace: Maybe<Scalars['String']>;
  signature: Maybe<Scalars['String']>;
  status: Maybe<Scalars['credential_state']>;
  target_id: Maybe<Scalars['uuid']>;
  transaction_url: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamp']>;
  uri: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "credentials" */
export type Credentials_Min_Order_By = {
  admin_comment?: InputMaybe<Order_By>;
  ceramic?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  namespace?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  target_id?: InputMaybe<Order_By>;
  transaction_url?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  uri?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "credentials" */
export type Credentials_Mutation_Response = {
  __typename?: 'credentials_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Credentials>;
};

/** input type for inserting object relation for remote table "credentials" */
export type Credentials_Obj_Rel_Insert_Input = {
  data: Credentials_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Credentials_On_Conflict>;
};

/** on_conflict condition type for table "credentials" */
export type Credentials_On_Conflict = {
  constraint: Credentials_Constraint;
  update_columns: Array<Credentials_Update_Column>;
  where?: InputMaybe<Credentials_Bool_Exp>;
};

/** Ordering options when selecting data from "credentials". */
export type Credentials_Order_By = {
  admin_comment?: InputMaybe<Order_By>;
  attitudes?: InputMaybe<Order_By>;
  categories?: InputMaybe<Order_By>;
  ceramic?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  credential_group?: InputMaybe<Credential_Group_Order_By>;
  dao?: InputMaybe<Daos_Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  details?: InputMaybe<Order_By>;
  gate?: InputMaybe<Gates_Order_By>;
  gate_id?: InputMaybe<Order_By>;
  group_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  issuer?: InputMaybe<Users_Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  knowledges?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  namespace?: InputMaybe<Order_By>;
  pow?: InputMaybe<Order_By>;
  signature?: InputMaybe<Order_By>;
  skills?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  target?: InputMaybe<Users_Order_By>;
  target_id?: InputMaybe<Order_By>;
  transaction_url?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  uri?: InputMaybe<Order_By>;
};

/** primary key columns input for table: credentials */
export type Credentials_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Credentials_Prepend_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  details?: InputMaybe<Scalars['jsonb']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  pow?: InputMaybe<Scalars['jsonb']>;
  skills?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "credentials" */
export enum Credentials_Select_Column {
  /** column name */
  AdminComment = 'admin_comment',
  /** column name */
  Attitudes = 'attitudes',
  /** column name */
  Categories = 'categories',
  /** column name */
  Ceramic = 'ceramic',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  Details = 'details',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  IssuerId = 'issuer_id',
  /** column name */
  Knowledges = 'knowledges',
  /** column name */
  Name = 'name',
  /** column name */
  Namespace = 'namespace',
  /** column name */
  Pow = 'pow',
  /** column name */
  Signature = 'signature',
  /** column name */
  Skills = 'skills',
  /** column name */
  Status = 'status',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TransactionUrl = 'transaction_url',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Uri = 'uri'
}

/** input type for updating data in table "credentials" */
export type Credentials_Set_Input = {
  admin_comment?: InputMaybe<Scalars['String']>;
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  ceramic?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['jsonb']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  issuer_id?: InputMaybe<Scalars['uuid']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  pow?: InputMaybe<Scalars['jsonb']>;
  signature?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  status?: InputMaybe<Scalars['credential_state']>;
  target_id?: InputMaybe<Scalars['uuid']>;
  transaction_url?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  uri?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "credentials" */
export type Credentials_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Credentials_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Credentials_Stream_Cursor_Value_Input = {
  admin_comment?: InputMaybe<Scalars['String']>;
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  ceramic?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  details?: InputMaybe<Scalars['jsonb']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  group_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  issuer_id?: InputMaybe<Scalars['uuid']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  namespace?: InputMaybe<Scalars['String']>;
  pow?: InputMaybe<Scalars['jsonb']>;
  signature?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  status?: InputMaybe<Scalars['credential_state']>;
  target_id?: InputMaybe<Scalars['uuid']>;
  transaction_url?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  uri?: InputMaybe<Scalars['String']>;
};

/** update columns of table "credentials" */
export enum Credentials_Update_Column {
  /** column name */
  AdminComment = 'admin_comment',
  /** column name */
  Attitudes = 'attitudes',
  /** column name */
  Categories = 'categories',
  /** column name */
  Ceramic = 'ceramic',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  Details = 'details',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  GroupId = 'group_id',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  IssuerId = 'issuer_id',
  /** column name */
  Knowledges = 'knowledges',
  /** column name */
  Name = 'name',
  /** column name */
  Namespace = 'namespace',
  /** column name */
  Pow = 'pow',
  /** column name */
  Signature = 'signature',
  /** column name */
  Skills = 'skills',
  /** column name */
  Status = 'status',
  /** column name */
  TargetId = 'target_id',
  /** column name */
  TransactionUrl = 'transaction_url',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Uri = 'uri'
}

export type Credentials_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Credentials_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Credentials_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Credentials_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Credentials_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Credentials_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Credentials_Set_Input>;
  where: Credentials_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "dao_following" */
export type Dao_Following = {
  __typename?: 'dao_following';
  /** An object relationship */
  dao: Daos;
  dao_id: Scalars['uuid'];
  followed_at: Scalars['timestamp'];
  follower_id: Scalars['uuid'];
  status: Scalars['following_state'];
  updated_at: Scalars['timestamp'];
  /** An object relationship */
  user: Users;
};

/** aggregated selection of "dao_following" */
export type Dao_Following_Aggregate = {
  __typename?: 'dao_following_aggregate';
  aggregate: Maybe<Dao_Following_Aggregate_Fields>;
  nodes: Array<Dao_Following>;
};

export type Dao_Following_Aggregate_Bool_Exp = {
  count?: InputMaybe<Dao_Following_Aggregate_Bool_Exp_Count>;
};

export type Dao_Following_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dao_Following_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Dao_Following_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "dao_following" */
export type Dao_Following_Aggregate_Fields = {
  __typename?: 'dao_following_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Dao_Following_Max_Fields>;
  min: Maybe<Dao_Following_Min_Fields>;
};


/** aggregate fields of "dao_following" */
export type Dao_Following_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Dao_Following_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dao_following" */
export type Dao_Following_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dao_Following_Max_Order_By>;
  min?: InputMaybe<Dao_Following_Min_Order_By>;
};

/** input type for inserting array relation for remote table "dao_following" */
export type Dao_Following_Arr_Rel_Insert_Input = {
  data: Array<Dao_Following_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Dao_Following_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dao_following". All fields are combined with a logical 'AND'. */
export type Dao_Following_Bool_Exp = {
  _and?: InputMaybe<Array<Dao_Following_Bool_Exp>>;
  _not?: InputMaybe<Dao_Following_Bool_Exp>;
  _or?: InputMaybe<Array<Dao_Following_Bool_Exp>>;
  dao?: InputMaybe<Daos_Bool_Exp>;
  dao_id?: InputMaybe<Uuid_Comparison_Exp>;
  followed_at?: InputMaybe<Timestamp_Comparison_Exp>;
  follower_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Following_State_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "dao_following" */
export enum Dao_Following_Constraint {
  /** unique or primary key constraint on columns "follower_id", "dao_id" */
  DaoFollowingDaoIdFollowerIdUindex = 'dao_following_dao_id_follower_id_uindex'
}

/** input type for inserting data into table "dao_following" */
export type Dao_Following_Insert_Input = {
  dao?: InputMaybe<Daos_Obj_Rel_Insert_Input>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  followed_at?: InputMaybe<Scalars['timestamp']>;
  follower_id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['following_state']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Dao_Following_Max_Fields = {
  __typename?: 'dao_following_max_fields';
  dao_id: Maybe<Scalars['uuid']>;
  followed_at: Maybe<Scalars['timestamp']>;
  follower_id: Maybe<Scalars['uuid']>;
  status: Maybe<Scalars['following_state']>;
  updated_at: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "dao_following" */
export type Dao_Following_Max_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  followed_at?: InputMaybe<Order_By>;
  follower_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dao_Following_Min_Fields = {
  __typename?: 'dao_following_min_fields';
  dao_id: Maybe<Scalars['uuid']>;
  followed_at: Maybe<Scalars['timestamp']>;
  follower_id: Maybe<Scalars['uuid']>;
  status: Maybe<Scalars['following_state']>;
  updated_at: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "dao_following" */
export type Dao_Following_Min_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  followed_at?: InputMaybe<Order_By>;
  follower_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dao_following" */
export type Dao_Following_Mutation_Response = {
  __typename?: 'dao_following_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Dao_Following>;
};

/** on_conflict condition type for table "dao_following" */
export type Dao_Following_On_Conflict = {
  constraint: Dao_Following_Constraint;
  update_columns: Array<Dao_Following_Update_Column>;
  where?: InputMaybe<Dao_Following_Bool_Exp>;
};

/** Ordering options when selecting data from "dao_following". */
export type Dao_Following_Order_By = {
  dao?: InputMaybe<Daos_Order_By>;
  dao_id?: InputMaybe<Order_By>;
  followed_at?: InputMaybe<Order_By>;
  follower_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
};

/** select columns of table "dao_following" */
export enum Dao_Following_Select_Column {
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  FollowedAt = 'followed_at',
  /** column name */
  FollowerId = 'follower_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "dao_following" */
export type Dao_Following_Set_Input = {
  dao_id?: InputMaybe<Scalars['uuid']>;
  followed_at?: InputMaybe<Scalars['timestamp']>;
  follower_id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['following_state']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** Streaming cursor of the table "dao_following" */
export type Dao_Following_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dao_Following_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dao_Following_Stream_Cursor_Value_Input = {
  dao_id?: InputMaybe<Scalars['uuid']>;
  followed_at?: InputMaybe<Scalars['timestamp']>;
  follower_id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['following_state']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "dao_following" */
export enum Dao_Following_Update_Column {
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  FollowedAt = 'followed_at',
  /** column name */
  FollowerId = 'follower_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Dao_Following_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dao_Following_Set_Input>;
  where: Dao_Following_Bool_Exp;
};

/** columns and relationships of "dao_socials" */
export type Dao_Socials = {
  __typename?: 'dao_socials';
  dao_id: Scalars['uuid'];
  network: Scalars['String'];
  url: Scalars['String'];
};

/** aggregated selection of "dao_socials" */
export type Dao_Socials_Aggregate = {
  __typename?: 'dao_socials_aggregate';
  aggregate: Maybe<Dao_Socials_Aggregate_Fields>;
  nodes: Array<Dao_Socials>;
};

export type Dao_Socials_Aggregate_Bool_Exp = {
  count?: InputMaybe<Dao_Socials_Aggregate_Bool_Exp_Count>;
};

export type Dao_Socials_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dao_Socials_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Dao_Socials_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "dao_socials" */
export type Dao_Socials_Aggregate_Fields = {
  __typename?: 'dao_socials_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Dao_Socials_Max_Fields>;
  min: Maybe<Dao_Socials_Min_Fields>;
};


/** aggregate fields of "dao_socials" */
export type Dao_Socials_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Dao_Socials_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dao_socials" */
export type Dao_Socials_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dao_Socials_Max_Order_By>;
  min?: InputMaybe<Dao_Socials_Min_Order_By>;
};

/** input type for inserting array relation for remote table "dao_socials" */
export type Dao_Socials_Arr_Rel_Insert_Input = {
  data: Array<Dao_Socials_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Dao_Socials_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dao_socials". All fields are combined with a logical 'AND'. */
export type Dao_Socials_Bool_Exp = {
  _and?: InputMaybe<Array<Dao_Socials_Bool_Exp>>;
  _not?: InputMaybe<Dao_Socials_Bool_Exp>;
  _or?: InputMaybe<Array<Dao_Socials_Bool_Exp>>;
  dao_id?: InputMaybe<Uuid_Comparison_Exp>;
  network?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "dao_socials" */
export enum Dao_Socials_Constraint {
  /** unique or primary key constraint on columns "network", "dao_id" */
  DaoSocialsDaoIdNetworkKey = 'dao_socials_dao_id_network_key'
}

/** input type for inserting data into table "dao_socials" */
export type Dao_Socials_Insert_Input = {
  dao_id?: InputMaybe<Scalars['uuid']>;
  network?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Dao_Socials_Max_Fields = {
  __typename?: 'dao_socials_max_fields';
  dao_id: Maybe<Scalars['uuid']>;
  network: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dao_socials" */
export type Dao_Socials_Max_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dao_Socials_Min_Fields = {
  __typename?: 'dao_socials_min_fields';
  dao_id: Maybe<Scalars['uuid']>;
  network: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dao_socials" */
export type Dao_Socials_Min_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dao_socials" */
export type Dao_Socials_Mutation_Response = {
  __typename?: 'dao_socials_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Dao_Socials>;
};

/** on_conflict condition type for table "dao_socials" */
export type Dao_Socials_On_Conflict = {
  constraint: Dao_Socials_Constraint;
  update_columns: Array<Dao_Socials_Update_Column>;
  where?: InputMaybe<Dao_Socials_Bool_Exp>;
};

/** Ordering options when selecting data from "dao_socials". */
export type Dao_Socials_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** select columns of table "dao_socials" */
export enum Dao_Socials_Select_Column {
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Network = 'network',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "dao_socials" */
export type Dao_Socials_Set_Input = {
  dao_id?: InputMaybe<Scalars['uuid']>;
  network?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "dao_socials" */
export type Dao_Socials_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dao_Socials_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Dao_Socials_Stream_Cursor_Value_Input = {
  dao_id?: InputMaybe<Scalars['uuid']>;
  network?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** update columns of table "dao_socials" */
export enum Dao_Socials_Update_Column {
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Network = 'network',
  /** column name */
  Url = 'url'
}

export type Dao_Socials_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dao_Socials_Set_Input>;
  where: Dao_Socials_Bool_Exp;
};

/** columns and relationships of "daos" */
export type Daos = {
  __typename?: 'daos';
  accomplishments: Maybe<Scalars['String']>;
  /** An object relationship */
  background: Maybe<Files>;
  background_id: Maybe<Scalars['uuid']>;
  background_url: Maybe<Scalars['String']>;
  blacklisted_flags: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  bounties: Array<Bounties>;
  /** An aggregate relationship */
  bounties_aggregate: Bounties_Aggregate;
  categories: Maybe<Scalars['jsonb']>;
  chains: Scalars['jsonb'];
  created_at: Scalars['timestamp'];
  description: Scalars['String'];
  ens: Maybe<Scalars['String']>;
  faq: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  followers: Array<Dao_Following>;
  /** An aggregate relationship */
  followers_aggregate: Dao_Following_Aggregate;
  /** An array relationship */
  gates: Array<Gates>;
  /** An aggregate relationship */
  gates_aggregate: Gates_Aggregate;
  guild_id: Maybe<Scalars['String']>;
  hangouts: Maybe<Scalars['String']>;
  how_to_join: Maybe<Scalars['jsonb']>;
  id: Scalars['uuid'];
  /** A computed field, executes function "get_if_dao_admin" */
  is_admin: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  logo: Maybe<Files>;
  logo_id: Maybe<Scalars['uuid']>;
  logo_url: Maybe<Scalars['String']>;
  mv: Maybe<Scalars['jsonb']>;
  name: Scalars['String'];
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregate relationship */
  permissions_aggregate: Permissions_Aggregate;
  slug: Maybe<Scalars['String']>;
  /** An array relationship */
  socials: Array<Dao_Socials>;
  /** An aggregate relationship */
  socials_aggregate: Dao_Socials_Aggregate;
  token: Maybe<Scalars['String']>;
  /** An array relationship */
  token_benefits: Array<Token_Benefits>;
  /** An aggregate relationship */
  token_benefits_aggregate: Token_Benefits_Aggregate;
  updated_at: Scalars['timestamp'];
  wdwd: Maybe<Scalars['String']>;
  whitelisted_flags: Maybe<Scalars['jsonb']>;
  youtube_url: Maybe<Scalars['String']>;
};


/** columns and relationships of "daos" */
export type DaosBlacklisted_FlagsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "daos" */
export type DaosBountiesArgs = {
  distinct_on: InputMaybe<Array<Bounties_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bounties_Order_By>>;
  where: InputMaybe<Bounties_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosBounties_AggregateArgs = {
  distinct_on: InputMaybe<Array<Bounties_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bounties_Order_By>>;
  where: InputMaybe<Bounties_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosCategoriesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "daos" */
export type DaosChainsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "daos" */
export type DaosFaqArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "daos" */
export type DaosFollowersArgs = {
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosFollowers_AggregateArgs = {
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosGatesArgs = {
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosGates_AggregateArgs = {
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosHow_To_JoinArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "daos" */
export type DaosMvArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "daos" */
export type DaosPermissionsArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosPermissions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosSocialsArgs = {
  distinct_on: InputMaybe<Array<Dao_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Socials_Order_By>>;
  where: InputMaybe<Dao_Socials_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosSocials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Dao_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Socials_Order_By>>;
  where: InputMaybe<Dao_Socials_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosToken_BenefitsArgs = {
  distinct_on: InputMaybe<Array<Token_Benefits_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Token_Benefits_Order_By>>;
  where: InputMaybe<Token_Benefits_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosToken_Benefits_AggregateArgs = {
  distinct_on: InputMaybe<Array<Token_Benefits_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Token_Benefits_Order_By>>;
  where: InputMaybe<Token_Benefits_Bool_Exp>;
};


/** columns and relationships of "daos" */
export type DaosWhitelisted_FlagsArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "daos" */
export type Daos_Aggregate = {
  __typename?: 'daos_aggregate';
  aggregate: Maybe<Daos_Aggregate_Fields>;
  nodes: Array<Daos>;
};

/** aggregate fields of "daos" */
export type Daos_Aggregate_Fields = {
  __typename?: 'daos_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Daos_Max_Fields>;
  min: Maybe<Daos_Min_Fields>;
};


/** aggregate fields of "daos" */
export type Daos_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Daos_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Daos_Append_Input = {
  blacklisted_flags?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  chains?: InputMaybe<Scalars['jsonb']>;
  faq?: InputMaybe<Scalars['jsonb']>;
  how_to_join?: InputMaybe<Scalars['jsonb']>;
  mv?: InputMaybe<Scalars['jsonb']>;
  whitelisted_flags?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "daos". All fields are combined with a logical 'AND'. */
export type Daos_Bool_Exp = {
  _and?: InputMaybe<Array<Daos_Bool_Exp>>;
  _not?: InputMaybe<Daos_Bool_Exp>;
  _or?: InputMaybe<Array<Daos_Bool_Exp>>;
  accomplishments?: InputMaybe<String_Comparison_Exp>;
  background?: InputMaybe<Files_Bool_Exp>;
  background_id?: InputMaybe<Uuid_Comparison_Exp>;
  background_url?: InputMaybe<String_Comparison_Exp>;
  blacklisted_flags?: InputMaybe<Jsonb_Comparison_Exp>;
  bounties?: InputMaybe<Bounties_Bool_Exp>;
  bounties_aggregate?: InputMaybe<Bounties_Aggregate_Bool_Exp>;
  categories?: InputMaybe<Jsonb_Comparison_Exp>;
  chains?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  ens?: InputMaybe<String_Comparison_Exp>;
  faq?: InputMaybe<Jsonb_Comparison_Exp>;
  followers?: InputMaybe<Dao_Following_Bool_Exp>;
  followers_aggregate?: InputMaybe<Dao_Following_Aggregate_Bool_Exp>;
  gates?: InputMaybe<Gates_Bool_Exp>;
  gates_aggregate?: InputMaybe<Gates_Aggregate_Bool_Exp>;
  guild_id?: InputMaybe<String_Comparison_Exp>;
  hangouts?: InputMaybe<String_Comparison_Exp>;
  how_to_join?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  is_admin?: InputMaybe<Boolean_Comparison_Exp>;
  logo?: InputMaybe<Files_Bool_Exp>;
  logo_id?: InputMaybe<Uuid_Comparison_Exp>;
  logo_url?: InputMaybe<String_Comparison_Exp>;
  mv?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  permissions?: InputMaybe<Permissions_Bool_Exp>;
  permissions_aggregate?: InputMaybe<Permissions_Aggregate_Bool_Exp>;
  slug?: InputMaybe<String_Comparison_Exp>;
  socials?: InputMaybe<Dao_Socials_Bool_Exp>;
  socials_aggregate?: InputMaybe<Dao_Socials_Aggregate_Bool_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  token_benefits?: InputMaybe<Token_Benefits_Bool_Exp>;
  token_benefits_aggregate?: InputMaybe<Token_Benefits_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  wdwd?: InputMaybe<String_Comparison_Exp>;
  whitelisted_flags?: InputMaybe<Jsonb_Comparison_Exp>;
  youtube_url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "daos" */
export enum Daos_Constraint {
  /** unique or primary key constraint on columns "ens" */
  DaosEnsUindex = 'daos_ens_uindex',
  /** unique or primary key constraint on columns "id" */
  DaosIdUindex = 'daos_id_uindex',
  /** unique or primary key constraint on columns "id" */
  DaosPk = 'daos_pk',
  /** unique or primary key constraint on columns "slug" */
  DaosSlugUindex = 'daos_slug_uindex'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Daos_Delete_At_Path_Input = {
  blacklisted_flags?: InputMaybe<Array<Scalars['String']>>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  chains?: InputMaybe<Array<Scalars['String']>>;
  faq?: InputMaybe<Array<Scalars['String']>>;
  how_to_join?: InputMaybe<Array<Scalars['String']>>;
  mv?: InputMaybe<Array<Scalars['String']>>;
  whitelisted_flags?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Daos_Delete_Elem_Input = {
  blacklisted_flags?: InputMaybe<Scalars['Int']>;
  categories?: InputMaybe<Scalars['Int']>;
  chains?: InputMaybe<Scalars['Int']>;
  faq?: InputMaybe<Scalars['Int']>;
  how_to_join?: InputMaybe<Scalars['Int']>;
  mv?: InputMaybe<Scalars['Int']>;
  whitelisted_flags?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Daos_Delete_Key_Input = {
  blacklisted_flags?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Scalars['String']>;
  chains?: InputMaybe<Scalars['String']>;
  faq?: InputMaybe<Scalars['String']>;
  how_to_join?: InputMaybe<Scalars['String']>;
  mv?: InputMaybe<Scalars['String']>;
  whitelisted_flags?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "daos" */
export type Daos_Insert_Input = {
  accomplishments?: InputMaybe<Scalars['String']>;
  background?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  background_id?: InputMaybe<Scalars['uuid']>;
  background_url?: InputMaybe<Scalars['String']>;
  blacklisted_flags?: InputMaybe<Scalars['jsonb']>;
  bounties?: InputMaybe<Bounties_Arr_Rel_Insert_Input>;
  categories?: InputMaybe<Scalars['jsonb']>;
  chains?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  description?: InputMaybe<Scalars['String']>;
  ens?: InputMaybe<Scalars['String']>;
  faq?: InputMaybe<Scalars['jsonb']>;
  followers?: InputMaybe<Dao_Following_Arr_Rel_Insert_Input>;
  gates?: InputMaybe<Gates_Arr_Rel_Insert_Input>;
  guild_id?: InputMaybe<Scalars['String']>;
  hangouts?: InputMaybe<Scalars['String']>;
  how_to_join?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  logo?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  logo_id?: InputMaybe<Scalars['uuid']>;
  logo_url?: InputMaybe<Scalars['String']>;
  mv?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Permissions_Arr_Rel_Insert_Input>;
  slug?: InputMaybe<Scalars['String']>;
  socials?: InputMaybe<Dao_Socials_Arr_Rel_Insert_Input>;
  token?: InputMaybe<Scalars['String']>;
  token_benefits?: InputMaybe<Token_Benefits_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  wdwd?: InputMaybe<Scalars['String']>;
  whitelisted_flags?: InputMaybe<Scalars['jsonb']>;
  youtube_url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Daos_Max_Fields = {
  __typename?: 'daos_max_fields';
  accomplishments: Maybe<Scalars['String']>;
  background_id: Maybe<Scalars['uuid']>;
  background_url: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamp']>;
  description: Maybe<Scalars['String']>;
  ens: Maybe<Scalars['String']>;
  guild_id: Maybe<Scalars['String']>;
  hangouts: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  logo_id: Maybe<Scalars['uuid']>;
  logo_url: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  token: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamp']>;
  wdwd: Maybe<Scalars['String']>;
  youtube_url: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Daos_Min_Fields = {
  __typename?: 'daos_min_fields';
  accomplishments: Maybe<Scalars['String']>;
  background_id: Maybe<Scalars['uuid']>;
  background_url: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamp']>;
  description: Maybe<Scalars['String']>;
  ens: Maybe<Scalars['String']>;
  guild_id: Maybe<Scalars['String']>;
  hangouts: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  logo_id: Maybe<Scalars['uuid']>;
  logo_url: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  token: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamp']>;
  wdwd: Maybe<Scalars['String']>;
  youtube_url: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "daos" */
export type Daos_Mutation_Response = {
  __typename?: 'daos_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Daos>;
};

/** input type for inserting object relation for remote table "daos" */
export type Daos_Obj_Rel_Insert_Input = {
  data: Daos_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Daos_On_Conflict>;
};

/** on_conflict condition type for table "daos" */
export type Daos_On_Conflict = {
  constraint: Daos_Constraint;
  update_columns: Array<Daos_Update_Column>;
  where?: InputMaybe<Daos_Bool_Exp>;
};

/** Ordering options when selecting data from "daos". */
export type Daos_Order_By = {
  accomplishments?: InputMaybe<Order_By>;
  background?: InputMaybe<Files_Order_By>;
  background_id?: InputMaybe<Order_By>;
  background_url?: InputMaybe<Order_By>;
  blacklisted_flags?: InputMaybe<Order_By>;
  bounties_aggregate?: InputMaybe<Bounties_Aggregate_Order_By>;
  categories?: InputMaybe<Order_By>;
  chains?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  faq?: InputMaybe<Order_By>;
  followers_aggregate?: InputMaybe<Dao_Following_Aggregate_Order_By>;
  gates_aggregate?: InputMaybe<Gates_Aggregate_Order_By>;
  guild_id?: InputMaybe<Order_By>;
  hangouts?: InputMaybe<Order_By>;
  how_to_join?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  is_admin?: InputMaybe<Order_By>;
  logo?: InputMaybe<Files_Order_By>;
  logo_id?: InputMaybe<Order_By>;
  logo_url?: InputMaybe<Order_By>;
  mv?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  permissions_aggregate?: InputMaybe<Permissions_Aggregate_Order_By>;
  slug?: InputMaybe<Order_By>;
  socials_aggregate?: InputMaybe<Dao_Socials_Aggregate_Order_By>;
  token?: InputMaybe<Order_By>;
  token_benefits_aggregate?: InputMaybe<Token_Benefits_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  wdwd?: InputMaybe<Order_By>;
  whitelisted_flags?: InputMaybe<Order_By>;
  youtube_url?: InputMaybe<Order_By>;
};

/** primary key columns input for table: daos */
export type Daos_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Daos_Prepend_Input = {
  blacklisted_flags?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  chains?: InputMaybe<Scalars['jsonb']>;
  faq?: InputMaybe<Scalars['jsonb']>;
  how_to_join?: InputMaybe<Scalars['jsonb']>;
  mv?: InputMaybe<Scalars['jsonb']>;
  whitelisted_flags?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "daos" */
export enum Daos_Select_Column {
  /** column name */
  Accomplishments = 'accomplishments',
  /** column name */
  BackgroundId = 'background_id',
  /** column name */
  BackgroundUrl = 'background_url',
  /** column name */
  BlacklistedFlags = 'blacklisted_flags',
  /** column name */
  Categories = 'categories',
  /** column name */
  Chains = 'chains',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Ens = 'ens',
  /** column name */
  Faq = 'faq',
  /** column name */
  GuildId = 'guild_id',
  /** column name */
  Hangouts = 'hangouts',
  /** column name */
  HowToJoin = 'how_to_join',
  /** column name */
  Id = 'id',
  /** column name */
  LogoId = 'logo_id',
  /** column name */
  LogoUrl = 'logo_url',
  /** column name */
  Mv = 'mv',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Wdwd = 'wdwd',
  /** column name */
  WhitelistedFlags = 'whitelisted_flags',
  /** column name */
  YoutubeUrl = 'youtube_url'
}

/** input type for updating data in table "daos" */
export type Daos_Set_Input = {
  accomplishments?: InputMaybe<Scalars['String']>;
  background_id?: InputMaybe<Scalars['uuid']>;
  background_url?: InputMaybe<Scalars['String']>;
  blacklisted_flags?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  chains?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  description?: InputMaybe<Scalars['String']>;
  ens?: InputMaybe<Scalars['String']>;
  faq?: InputMaybe<Scalars['jsonb']>;
  guild_id?: InputMaybe<Scalars['String']>;
  hangouts?: InputMaybe<Scalars['String']>;
  how_to_join?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  logo_id?: InputMaybe<Scalars['uuid']>;
  logo_url?: InputMaybe<Scalars['String']>;
  mv?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  wdwd?: InputMaybe<Scalars['String']>;
  whitelisted_flags?: InputMaybe<Scalars['jsonb']>;
  youtube_url?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "daos" */
export type Daos_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Daos_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Daos_Stream_Cursor_Value_Input = {
  accomplishments?: InputMaybe<Scalars['String']>;
  background_id?: InputMaybe<Scalars['uuid']>;
  background_url?: InputMaybe<Scalars['String']>;
  blacklisted_flags?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  chains?: InputMaybe<Scalars['jsonb']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  description?: InputMaybe<Scalars['String']>;
  ens?: InputMaybe<Scalars['String']>;
  faq?: InputMaybe<Scalars['jsonb']>;
  guild_id?: InputMaybe<Scalars['String']>;
  hangouts?: InputMaybe<Scalars['String']>;
  how_to_join?: InputMaybe<Scalars['jsonb']>;
  id?: InputMaybe<Scalars['uuid']>;
  logo_id?: InputMaybe<Scalars['uuid']>;
  logo_url?: InputMaybe<Scalars['String']>;
  mv?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  wdwd?: InputMaybe<Scalars['String']>;
  whitelisted_flags?: InputMaybe<Scalars['jsonb']>;
  youtube_url?: InputMaybe<Scalars['String']>;
};

/** update columns of table "daos" */
export enum Daos_Update_Column {
  /** column name */
  Accomplishments = 'accomplishments',
  /** column name */
  BackgroundId = 'background_id',
  /** column name */
  BackgroundUrl = 'background_url',
  /** column name */
  BlacklistedFlags = 'blacklisted_flags',
  /** column name */
  Categories = 'categories',
  /** column name */
  Chains = 'chains',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Ens = 'ens',
  /** column name */
  Faq = 'faq',
  /** column name */
  GuildId = 'guild_id',
  /** column name */
  Hangouts = 'hangouts',
  /** column name */
  HowToJoin = 'how_to_join',
  /** column name */
  Id = 'id',
  /** column name */
  LogoId = 'logo_id',
  /** column name */
  LogoUrl = 'logo_url',
  /** column name */
  Mv = 'mv',
  /** column name */
  Name = 'name',
  /** column name */
  Slug = 'slug',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Wdwd = 'wdwd',
  /** column name */
  WhitelistedFlags = 'whitelisted_flags',
  /** column name */
  YoutubeUrl = 'youtube_url'
}

export type Daos_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Daos_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Daos_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Daos_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Daos_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Daos_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Daos_Set_Input>;
  where: Daos_Bool_Exp;
};

/** columns and relationships of "earners" */
export type Earners = {
  __typename?: 'earners';
  /** An object relationship */
  gate: Gates;
  gate_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "earners" */
export type Earners_Aggregate = {
  __typename?: 'earners_aggregate';
  aggregate: Maybe<Earners_Aggregate_Fields>;
  nodes: Array<Earners>;
};

export type Earners_Aggregate_Bool_Exp = {
  count?: InputMaybe<Earners_Aggregate_Bool_Exp_Count>;
};

export type Earners_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Earners_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Earners_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "earners" */
export type Earners_Aggregate_Fields = {
  __typename?: 'earners_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Earners_Max_Fields>;
  min: Maybe<Earners_Min_Fields>;
};


/** aggregate fields of "earners" */
export type Earners_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Earners_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "earners" */
export type Earners_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Earners_Max_Order_By>;
  min?: InputMaybe<Earners_Min_Order_By>;
};

/** input type for inserting array relation for remote table "earners" */
export type Earners_Arr_Rel_Insert_Input = {
  data: Array<Earners_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Earners_On_Conflict>;
};

/** Boolean expression to filter rows from the table "earners". All fields are combined with a logical 'AND'. */
export type Earners_Bool_Exp = {
  _and?: InputMaybe<Array<Earners_Bool_Exp>>;
  _not?: InputMaybe<Earners_Bool_Exp>;
  _or?: InputMaybe<Array<Earners_Bool_Exp>>;
  gate?: InputMaybe<Gates_Bool_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "earners" */
export enum Earners_Constraint {
  /** unique or primary key constraint on columns "id" */
  EarnersPk = 'earners_pk'
}

/** input type for inserting data into table "earners" */
export type Earners_Insert_Input = {
  gate?: InputMaybe<Gates_Obj_Rel_Insert_Input>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Earners_Max_Fields = {
  __typename?: 'earners_max_fields';
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "earners" */
export type Earners_Max_Order_By = {
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Earners_Min_Fields = {
  __typename?: 'earners_min_fields';
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "earners" */
export type Earners_Min_Order_By = {
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "earners" */
export type Earners_Mutation_Response = {
  __typename?: 'earners_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Earners>;
};

/** on_conflict condition type for table "earners" */
export type Earners_On_Conflict = {
  constraint: Earners_Constraint;
  update_columns: Array<Earners_Update_Column>;
  where?: InputMaybe<Earners_Bool_Exp>;
};

/** Ordering options when selecting data from "earners". */
export type Earners_Order_By = {
  gate?: InputMaybe<Gates_Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: earners */
export type Earners_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "earners" */
export enum Earners_Select_Column {
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "earners" */
export type Earners_Set_Input = {
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "earners" */
export type Earners_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Earners_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Earners_Stream_Cursor_Value_Input = {
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "earners" */
export enum Earners_Update_Column {
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

export type Earners_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Earners_Set_Input>;
  where: Earners_Bool_Exp;
};

/** columns and relationships of "email_subscribers" */
export type Email_Subscribers = {
  __typename?: 'email_subscribers';
  created_at: Maybe<Scalars['timestamp']>;
  email: Scalars['citext'];
  id: Scalars['uuid'];
  subscribed: Scalars['Boolean'];
  updated_at: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "email_subscribers" */
export type Email_Subscribers_Aggregate = {
  __typename?: 'email_subscribers_aggregate';
  aggregate: Maybe<Email_Subscribers_Aggregate_Fields>;
  nodes: Array<Email_Subscribers>;
};

/** aggregate fields of "email_subscribers" */
export type Email_Subscribers_Aggregate_Fields = {
  __typename?: 'email_subscribers_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Email_Subscribers_Max_Fields>;
  min: Maybe<Email_Subscribers_Min_Fields>;
};


/** aggregate fields of "email_subscribers" */
export type Email_Subscribers_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Email_Subscribers_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "email_subscribers". All fields are combined with a logical 'AND'. */
export type Email_Subscribers_Bool_Exp = {
  _and?: InputMaybe<Array<Email_Subscribers_Bool_Exp>>;
  _not?: InputMaybe<Email_Subscribers_Bool_Exp>;
  _or?: InputMaybe<Array<Email_Subscribers_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<Citext_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  subscribed?: InputMaybe<Boolean_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "email_subscribers" */
export enum Email_Subscribers_Constraint {
  /** unique or primary key constraint on columns "email" */
  EmailSubscribersEmailUindex = 'email_subscribers_email_uindex',
  /** unique or primary key constraint on columns "id" */
  EmailSubscribersPk = 'email_subscribers_pk'
}

/** input type for inserting data into table "email_subscribers" */
export type Email_Subscribers_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  email?: InputMaybe<Scalars['citext']>;
  id?: InputMaybe<Scalars['uuid']>;
  subscribed?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Email_Subscribers_Max_Fields = {
  __typename?: 'email_subscribers_max_fields';
  created_at: Maybe<Scalars['timestamp']>;
  email: Maybe<Scalars['citext']>;
  id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Email_Subscribers_Min_Fields = {
  __typename?: 'email_subscribers_min_fields';
  created_at: Maybe<Scalars['timestamp']>;
  email: Maybe<Scalars['citext']>;
  id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "email_subscribers" */
export type Email_Subscribers_Mutation_Response = {
  __typename?: 'email_subscribers_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Email_Subscribers>;
};

/** on_conflict condition type for table "email_subscribers" */
export type Email_Subscribers_On_Conflict = {
  constraint: Email_Subscribers_Constraint;
  update_columns: Array<Email_Subscribers_Update_Column>;
  where?: InputMaybe<Email_Subscribers_Bool_Exp>;
};

/** Ordering options when selecting data from "email_subscribers". */
export type Email_Subscribers_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  subscribed?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: email_subscribers */
export type Email_Subscribers_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "email_subscribers" */
export enum Email_Subscribers_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Subscribed = 'subscribed',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "email_subscribers" */
export type Email_Subscribers_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  email?: InputMaybe<Scalars['citext']>;
  id?: InputMaybe<Scalars['uuid']>;
  subscribed?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** Streaming cursor of the table "email_subscribers" */
export type Email_Subscribers_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Email_Subscribers_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Email_Subscribers_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  email?: InputMaybe<Scalars['citext']>;
  id?: InputMaybe<Scalars['uuid']>;
  subscribed?: InputMaybe<Scalars['Boolean']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "email_subscribers" */
export enum Email_Subscribers_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Subscribed = 'subscribed',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Email_Subscribers_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Email_Subscribers_Set_Input>;
  where: Email_Subscribers_Bool_Exp;
};

/** columns and relationships of "experiences" */
export type Experiences = {
  __typename?: 'experiences';
  /** A computed field, executes function "get_experience_credentials" */
  credentials: Maybe<Array<Credentials>>;
  /** An object relationship */
  dao: Maybe<Daos>;
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  end_date: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  hidden_credentials: Array<Hidden_Experience_Credentials>;
  /** An aggregate relationship */
  hidden_credentials_aggregate: Hidden_Experience_Credentials_Aggregate;
  id: Scalars['uuid'];
  start_date: Maybe<Scalars['timestamp']>;
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
  visible: Scalars['Boolean'];
  working: Scalars['Boolean'];
};


/** columns and relationships of "experiences" */
export type ExperiencesCredentialsArgs = {
  distinct_on: InputMaybe<Array<Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credentials_Order_By>>;
  where: InputMaybe<Credentials_Bool_Exp>;
};


/** columns and relationships of "experiences" */
export type ExperiencesHidden_CredentialsArgs = {
  distinct_on: InputMaybe<Array<Hidden_Experience_Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Hidden_Experience_Credentials_Order_By>>;
  where: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
};


/** columns and relationships of "experiences" */
export type ExperiencesHidden_Credentials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Hidden_Experience_Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Hidden_Experience_Credentials_Order_By>>;
  where: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
};

/** aggregated selection of "experiences" */
export type Experiences_Aggregate = {
  __typename?: 'experiences_aggregate';
  aggregate: Maybe<Experiences_Aggregate_Fields>;
  nodes: Array<Experiences>;
};

export type Experiences_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Experiences_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Experiences_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Experiences_Aggregate_Bool_Exp_Count>;
};

export type Experiences_Aggregate_Bool_Exp_Bool_And = {
  arguments: Experiences_Select_Column_Experiences_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Experiences_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Experiences_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Experiences_Select_Column_Experiences_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Experiences_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Experiences_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Experiences_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Experiences_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "experiences" */
export type Experiences_Aggregate_Fields = {
  __typename?: 'experiences_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Experiences_Max_Fields>;
  min: Maybe<Experiences_Min_Fields>;
};


/** aggregate fields of "experiences" */
export type Experiences_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Experiences_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "experiences" */
export type Experiences_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Experiences_Max_Order_By>;
  min?: InputMaybe<Experiences_Min_Order_By>;
};

/** input type for inserting array relation for remote table "experiences" */
export type Experiences_Arr_Rel_Insert_Input = {
  data: Array<Experiences_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Experiences_On_Conflict>;
};

/** Boolean expression to filter rows from the table "experiences". All fields are combined with a logical 'AND'. */
export type Experiences_Bool_Exp = {
  _and?: InputMaybe<Array<Experiences_Bool_Exp>>;
  _not?: InputMaybe<Experiences_Bool_Exp>;
  _or?: InputMaybe<Array<Experiences_Bool_Exp>>;
  credentials?: InputMaybe<Credentials_Bool_Exp>;
  dao?: InputMaybe<Daos_Bool_Exp>;
  dao_id?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  end_date?: InputMaybe<Timestamp_Comparison_Exp>;
  hidden_credentials?: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
  hidden_credentials_aggregate?: InputMaybe<Hidden_Experience_Credentials_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  start_date?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  visible?: InputMaybe<Boolean_Comparison_Exp>;
  working?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "experiences" */
export enum Experiences_Constraint {
  /** unique or primary key constraint on columns "id" */
  ExperiencesIdUindex = 'experiences_id_uindex',
  /** unique or primary key constraint on columns "user_id", "dao_id" */
  ExperiencesUserIdDaoIdUindex = 'experiences_user_id_dao_id_uindex'
}

/** input type for inserting data into table "experiences" */
export type Experiences_Insert_Input = {
  dao?: InputMaybe<Daos_Obj_Rel_Insert_Input>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['timestamp']>;
  hidden_credentials?: InputMaybe<Hidden_Experience_Credentials_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  start_date?: InputMaybe<Scalars['timestamp']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
  visible?: InputMaybe<Scalars['Boolean']>;
  working?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Experiences_Max_Fields = {
  __typename?: 'experiences_max_fields';
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  end_date: Maybe<Scalars['timestamp']>;
  id: Maybe<Scalars['uuid']>;
  start_date: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "experiences" */
export type Experiences_Max_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Experiences_Min_Fields = {
  __typename?: 'experiences_min_fields';
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  end_date: Maybe<Scalars['timestamp']>;
  id: Maybe<Scalars['uuid']>;
  start_date: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "experiences" */
export type Experiences_Min_Order_By = {
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "experiences" */
export type Experiences_Mutation_Response = {
  __typename?: 'experiences_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Experiences>;
};

/** input type for inserting object relation for remote table "experiences" */
export type Experiences_Obj_Rel_Insert_Input = {
  data: Experiences_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Experiences_On_Conflict>;
};

/** on_conflict condition type for table "experiences" */
export type Experiences_On_Conflict = {
  constraint: Experiences_Constraint;
  update_columns: Array<Experiences_Update_Column>;
  where?: InputMaybe<Experiences_Bool_Exp>;
};

/** Ordering options when selecting data from "experiences". */
export type Experiences_Order_By = {
  credentials_aggregate?: InputMaybe<Credentials_Aggregate_Order_By>;
  dao?: InputMaybe<Daos_Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  hidden_credentials_aggregate?: InputMaybe<Hidden_Experience_Credentials_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  visible?: InputMaybe<Order_By>;
  working?: InputMaybe<Order_By>;
};

/** select columns of table "experiences" */
export enum Experiences_Select_Column {
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Visible = 'visible',
  /** column name */
  Working = 'working'
}

/** select "experiences_aggregate_bool_exp_bool_and_arguments_columns" columns of table "experiences" */
export enum Experiences_Select_Column_Experiences_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Visible = 'visible',
  /** column name */
  Working = 'working'
}

/** select "experiences_aggregate_bool_exp_bool_or_arguments_columns" columns of table "experiences" */
export enum Experiences_Select_Column_Experiences_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Visible = 'visible',
  /** column name */
  Working = 'working'
}

/** input type for updating data in table "experiences" */
export type Experiences_Set_Input = {
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  start_date?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
  visible?: InputMaybe<Scalars['Boolean']>;
  working?: InputMaybe<Scalars['Boolean']>;
};

/** Streaming cursor of the table "experiences" */
export type Experiences_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Experiences_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Experiences_Stream_Cursor_Value_Input = {
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['timestamp']>;
  id?: InputMaybe<Scalars['uuid']>;
  start_date?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
  visible?: InputMaybe<Scalars['Boolean']>;
  working?: InputMaybe<Scalars['Boolean']>;
};

/** update columns of table "experiences" */
export enum Experiences_Update_Column {
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Visible = 'visible',
  /** column name */
  Working = 'working'
}

export type Experiences_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Experiences_Set_Input>;
  where: Experiences_Bool_Exp;
};

/** columns and relationships of "files" */
export type Files = {
  __typename?: 'files';
  author_id: Maybe<Scalars['uuid']>;
  blur: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  metadata: Scalars['jsonb'];
  s3_key: Scalars['String'];
  type: Scalars['String'];
};


/** columns and relationships of "files" */
export type FilesMetadataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "files" */
export type Files_Aggregate = {
  __typename?: 'files_aggregate';
  aggregate: Maybe<Files_Aggregate_Fields>;
  nodes: Array<Files>;
};

/** aggregate fields of "files" */
export type Files_Aggregate_Fields = {
  __typename?: 'files_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Files_Max_Fields>;
  min: Maybe<Files_Min_Fields>;
};


/** aggregate fields of "files" */
export type Files_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Files_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Files_Append_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "files". All fields are combined with a logical 'AND'. */
export type Files_Bool_Exp = {
  _and?: InputMaybe<Array<Files_Bool_Exp>>;
  _not?: InputMaybe<Files_Bool_Exp>;
  _or?: InputMaybe<Array<Files_Bool_Exp>>;
  author_id?: InputMaybe<Uuid_Comparison_Exp>;
  blur?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  metadata?: InputMaybe<Jsonb_Comparison_Exp>;
  s3_key?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "files" */
export enum Files_Constraint {
  /** unique or primary key constraint on columns "id" */
  FilesIdUindex = 'files_id_uindex',
  /** unique or primary key constraint on columns "id" */
  FilesPk = 'files_pk',
  /** unique or primary key constraint on columns "s3_key" */
  FilesS3KeyUindex = 'files_s3_key_uindex'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Files_Delete_At_Path_Input = {
  metadata?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Files_Delete_Elem_Input = {
  metadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Files_Delete_Key_Input = {
  metadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "files" */
export type Files_Insert_Input = {
  author_id?: InputMaybe<Scalars['uuid']>;
  blur?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  s3_key?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Files_Max_Fields = {
  __typename?: 'files_max_fields';
  author_id: Maybe<Scalars['uuid']>;
  blur: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  s3_key: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Files_Min_Fields = {
  __typename?: 'files_min_fields';
  author_id: Maybe<Scalars['uuid']>;
  blur: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  s3_key: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "files" */
export type Files_Mutation_Response = {
  __typename?: 'files_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Files>;
};

/** input type for inserting object relation for remote table "files" */
export type Files_Obj_Rel_Insert_Input = {
  data: Files_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Files_On_Conflict>;
};

/** on_conflict condition type for table "files" */
export type Files_On_Conflict = {
  constraint: Files_Constraint;
  update_columns: Array<Files_Update_Column>;
  where?: InputMaybe<Files_Bool_Exp>;
};

/** Ordering options when selecting data from "files". */
export type Files_Order_By = {
  author_id?: InputMaybe<Order_By>;
  blur?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Order_By>;
  s3_key?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: files */
export type Files_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Files_Prepend_Input = {
  metadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "files" */
export enum Files_Select_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Blur = 'blur',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  S3Key = 's3_key',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "files" */
export type Files_Set_Input = {
  author_id?: InputMaybe<Scalars['uuid']>;
  blur?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  s3_key?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "files" */
export type Files_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Files_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Files_Stream_Cursor_Value_Input = {
  author_id?: InputMaybe<Scalars['uuid']>;
  blur?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  metadata?: InputMaybe<Scalars['jsonb']>;
  s3_key?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

/** update columns of table "files" */
export enum Files_Update_Column {
  /** column name */
  AuthorId = 'author_id',
  /** column name */
  Blur = 'blur',
  /** column name */
  Id = 'id',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  S3Key = 's3_key',
  /** column name */
  Type = 'type'
}

export type Files_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Files_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Files_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Files_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Files_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Files_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Files_Set_Input>;
  where: Files_Bool_Exp;
};

export type Follow_Dao_Args = {
  id?: InputMaybe<Scalars['uuid']>;
};

export type Follow_User_Args = {
  id?: InputMaybe<Scalars['uuid']>;
};

/** Boolean expression to compare columns of type "following_state". All fields are combined with logical 'AND'. */
export type Following_State_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['following_state']>;
  _gt?: InputMaybe<Scalars['following_state']>;
  _gte?: InputMaybe<Scalars['following_state']>;
  _in?: InputMaybe<Array<Scalars['following_state']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['following_state']>;
  _lte?: InputMaybe<Scalars['following_state']>;
  _neq?: InputMaybe<Scalars['following_state']>;
  _nin?: InputMaybe<Array<Scalars['following_state']>>;
};

/** columns and relationships of "gate_progress" */
export type Gate_Progress = {
  __typename?: 'gate_progress';
  completed_at: Maybe<Scalars['timestamp']>;
  created_at: Scalars['timestamp'];
  /** An object relationship */
  gate: Gates;
  gate_id: Scalars['uuid'];
  id: Scalars['uuid'];
  status: Scalars['gate_status'];
  tasks_completed: Scalars['Int'];
  updated_at: Scalars['timestamp'];
  user_id: Scalars['uuid'];
};

/** aggregated selection of "gate_progress" */
export type Gate_Progress_Aggregate = {
  __typename?: 'gate_progress_aggregate';
  aggregate: Maybe<Gate_Progress_Aggregate_Fields>;
  nodes: Array<Gate_Progress>;
};

export type Gate_Progress_Aggregate_Bool_Exp = {
  count?: InputMaybe<Gate_Progress_Aggregate_Bool_Exp_Count>;
};

export type Gate_Progress_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Gate_Progress_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Gate_Progress_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "gate_progress" */
export type Gate_Progress_Aggregate_Fields = {
  __typename?: 'gate_progress_aggregate_fields';
  avg: Maybe<Gate_Progress_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Gate_Progress_Max_Fields>;
  min: Maybe<Gate_Progress_Min_Fields>;
  stddev: Maybe<Gate_Progress_Stddev_Fields>;
  stddev_pop: Maybe<Gate_Progress_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Gate_Progress_Stddev_Samp_Fields>;
  sum: Maybe<Gate_Progress_Sum_Fields>;
  var_pop: Maybe<Gate_Progress_Var_Pop_Fields>;
  var_samp: Maybe<Gate_Progress_Var_Samp_Fields>;
  variance: Maybe<Gate_Progress_Variance_Fields>;
};


/** aggregate fields of "gate_progress" */
export type Gate_Progress_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Gate_Progress_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "gate_progress" */
export type Gate_Progress_Aggregate_Order_By = {
  avg?: InputMaybe<Gate_Progress_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Gate_Progress_Max_Order_By>;
  min?: InputMaybe<Gate_Progress_Min_Order_By>;
  stddev?: InputMaybe<Gate_Progress_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Gate_Progress_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Gate_Progress_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Gate_Progress_Sum_Order_By>;
  var_pop?: InputMaybe<Gate_Progress_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Gate_Progress_Var_Samp_Order_By>;
  variance?: InputMaybe<Gate_Progress_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "gate_progress" */
export type Gate_Progress_Arr_Rel_Insert_Input = {
  data: Array<Gate_Progress_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Gate_Progress_On_Conflict>;
};

/** aggregate avg on columns */
export type Gate_Progress_Avg_Fields = {
  __typename?: 'gate_progress_avg_fields';
  tasks_completed: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "gate_progress" */
export type Gate_Progress_Avg_Order_By = {
  tasks_completed?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "gate_progress". All fields are combined with a logical 'AND'. */
export type Gate_Progress_Bool_Exp = {
  _and?: InputMaybe<Array<Gate_Progress_Bool_Exp>>;
  _not?: InputMaybe<Gate_Progress_Bool_Exp>;
  _or?: InputMaybe<Array<Gate_Progress_Bool_Exp>>;
  completed_at?: InputMaybe<Timestamp_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  gate?: InputMaybe<Gates_Bool_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Gate_Status_Comparison_Exp>;
  tasks_completed?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "gate_progress" */
export enum Gate_Progress_Constraint {
  /** unique or primary key constraint on columns "id" */
  GateProgressIdUindex = 'gate_progress_id_uindex',
  /** unique or primary key constraint on columns "id" */
  GateProgressPk = 'gate_progress_pk',
  /** unique or primary key constraint on columns "user_id", "gate_id" */
  GateProgressUserIdGateIdUindex = 'gate_progress_user_id_gate_id_uindex'
}

/** input type for incrementing numeric columns in table "gate_progress" */
export type Gate_Progress_Inc_Input = {
  tasks_completed?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "gate_progress" */
export type Gate_Progress_Insert_Input = {
  completed_at?: InputMaybe<Scalars['timestamp']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate?: InputMaybe<Gates_Obj_Rel_Insert_Input>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['gate_status']>;
  tasks_completed?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Gate_Progress_Max_Fields = {
  __typename?: 'gate_progress_max_fields';
  completed_at: Maybe<Scalars['timestamp']>;
  created_at: Maybe<Scalars['timestamp']>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  status: Maybe<Scalars['gate_status']>;
  tasks_completed: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "gate_progress" */
export type Gate_Progress_Max_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tasks_completed?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Gate_Progress_Min_Fields = {
  __typename?: 'gate_progress_min_fields';
  completed_at: Maybe<Scalars['timestamp']>;
  created_at: Maybe<Scalars['timestamp']>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  status: Maybe<Scalars['gate_status']>;
  tasks_completed: Maybe<Scalars['Int']>;
  updated_at: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "gate_progress" */
export type Gate_Progress_Min_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tasks_completed?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "gate_progress" */
export type Gate_Progress_Mutation_Response = {
  __typename?: 'gate_progress_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Gate_Progress>;
};

/** on_conflict condition type for table "gate_progress" */
export type Gate_Progress_On_Conflict = {
  constraint: Gate_Progress_Constraint;
  update_columns: Array<Gate_Progress_Update_Column>;
  where?: InputMaybe<Gate_Progress_Bool_Exp>;
};

/** Ordering options when selecting data from "gate_progress". */
export type Gate_Progress_Order_By = {
  completed_at?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  gate?: InputMaybe<Gates_Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  tasks_completed?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: gate_progress */
export type Gate_Progress_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "gate_progress" */
export enum Gate_Progress_Select_Column {
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  TasksCompleted = 'tasks_completed',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "gate_progress" */
export type Gate_Progress_Set_Input = {
  completed_at?: InputMaybe<Scalars['timestamp']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['gate_status']>;
  tasks_completed?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Gate_Progress_Stddev_Fields = {
  __typename?: 'gate_progress_stddev_fields';
  tasks_completed: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "gate_progress" */
export type Gate_Progress_Stddev_Order_By = {
  tasks_completed?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Gate_Progress_Stddev_Pop_Fields = {
  __typename?: 'gate_progress_stddev_pop_fields';
  tasks_completed: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "gate_progress" */
export type Gate_Progress_Stddev_Pop_Order_By = {
  tasks_completed?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Gate_Progress_Stddev_Samp_Fields = {
  __typename?: 'gate_progress_stddev_samp_fields';
  tasks_completed: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "gate_progress" */
export type Gate_Progress_Stddev_Samp_Order_By = {
  tasks_completed?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "gate_progress" */
export type Gate_Progress_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Gate_Progress_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Gate_Progress_Stream_Cursor_Value_Input = {
  completed_at?: InputMaybe<Scalars['timestamp']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['gate_status']>;
  tasks_completed?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate sum on columns */
export type Gate_Progress_Sum_Fields = {
  __typename?: 'gate_progress_sum_fields';
  tasks_completed: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "gate_progress" */
export type Gate_Progress_Sum_Order_By = {
  tasks_completed?: InputMaybe<Order_By>;
};

/** update columns of table "gate_progress" */
export enum Gate_Progress_Update_Column {
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  TasksCompleted = 'tasks_completed',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Gate_Progress_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Gate_Progress_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Gate_Progress_Set_Input>;
  where: Gate_Progress_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Gate_Progress_Var_Pop_Fields = {
  __typename?: 'gate_progress_var_pop_fields';
  tasks_completed: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "gate_progress" */
export type Gate_Progress_Var_Pop_Order_By = {
  tasks_completed?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Gate_Progress_Var_Samp_Fields = {
  __typename?: 'gate_progress_var_samp_fields';
  tasks_completed: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "gate_progress" */
export type Gate_Progress_Var_Samp_Order_By = {
  tasks_completed?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Gate_Progress_Variance_Fields = {
  __typename?: 'gate_progress_variance_fields';
  tasks_completed: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "gate_progress" */
export type Gate_Progress_Variance_Order_By = {
  tasks_completed?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "gate_state". All fields are combined with logical 'AND'. */
export type Gate_State_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['gate_state']>;
  _gt?: InputMaybe<Scalars['gate_state']>;
  _gte?: InputMaybe<Scalars['gate_state']>;
  _in?: InputMaybe<Array<Scalars['gate_state']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['gate_state']>;
  _lte?: InputMaybe<Scalars['gate_state']>;
  _neq?: InputMaybe<Scalars['gate_state']>;
  _nin?: InputMaybe<Array<Scalars['gate_state']>>;
};

/** Boolean expression to compare columns of type "gate_status". All fields are combined with logical 'AND'. */
export type Gate_Status_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['gate_status']>;
  _gt?: InputMaybe<Scalars['gate_status']>;
  _gte?: InputMaybe<Scalars['gate_status']>;
  _in?: InputMaybe<Array<Scalars['gate_status']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['gate_status']>;
  _lte?: InputMaybe<Scalars['gate_status']>;
  _neq?: InputMaybe<Scalars['gate_status']>;
  _nin?: InputMaybe<Array<Scalars['gate_status']>>;
};

/** Boolean expression to compare columns of type "gate_type". All fields are combined with logical 'AND'. */
export type Gate_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['gate_type']>;
  _gt?: InputMaybe<Scalars['gate_type']>;
  _gte?: InputMaybe<Scalars['gate_type']>;
  _in?: InputMaybe<Array<Scalars['gate_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['gate_type']>;
  _lte?: InputMaybe<Scalars['gate_type']>;
  _neq?: InputMaybe<Scalars['gate_type']>;
  _nin?: InputMaybe<Array<Scalars['gate_type']>>;
};

/** columns and relationships of "gates" */
export type Gates = {
  __typename?: 'gates';
  attitudes: Scalars['jsonb'];
  categories: Scalars['jsonb'];
  claim_limit: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamp'];
  /** An object relationship */
  creator: Maybe<Users>;
  creator_id: Maybe<Scalars['uuid']>;
  /** An object relationship */
  dao: Daos;
  dao_id: Scalars['uuid'];
  description: Maybe<Scalars['String']>;
  /** An array relationship */
  earners: Array<Earners>;
  /** An aggregate relationship */
  earners_aggregate: Earners_Aggregate;
  expire_date: Maybe<Scalars['timestamptz']>;
  /** A computed field, executes function "get_gate_holder_count" */
  holder_count: Maybe<Scalars['bigint']>;
  /** A computed field, executes function "get_gate_holders" */
  holders: Maybe<Array<Users>>;
  id: Scalars['uuid'];
  image: Maybe<Scalars['String']>;
  knowledge: Scalars['jsonb'];
  links: Scalars['jsonb'];
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregate relationship */
  permissions_aggregate: Permissions_Aggregate;
  published: Scalars['gate_state'];
  published_at: Maybe<Scalars['timestamp']>;
  skills: Scalars['jsonb'];
  /** An array relationship */
  tasks: Array<Tasks>;
  /** An aggregate relationship */
  tasks_aggregate: Tasks_Aggregate;
  title: Maybe<Scalars['String']>;
  type: Scalars['gate_type'];
  updated_at: Scalars['timestamp'];
  /** An array relationship */
  whitelisted_wallets: Array<Whitelisted_Wallets>;
  /** An aggregate relationship */
  whitelisted_wallets_aggregate: Whitelisted_Wallets_Aggregate;
  /** An object relationship */
  whitelisted_wallets_file: Maybe<Files>;
  whitelisted_wallets_file_id: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "gates" */
export type GatesAttitudesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "gates" */
export type GatesCategoriesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "gates" */
export type GatesEarnersArgs = {
  distinct_on: InputMaybe<Array<Earners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Earners_Order_By>>;
  where: InputMaybe<Earners_Bool_Exp>;
};


/** columns and relationships of "gates" */
export type GatesEarners_AggregateArgs = {
  distinct_on: InputMaybe<Array<Earners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Earners_Order_By>>;
  where: InputMaybe<Earners_Bool_Exp>;
};


/** columns and relationships of "gates" */
export type GatesHoldersArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "gates" */
export type GatesKnowledgeArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "gates" */
export type GatesLinksArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "gates" */
export type GatesPermissionsArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


/** columns and relationships of "gates" */
export type GatesPermissions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


/** columns and relationships of "gates" */
export type GatesSkillsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "gates" */
export type GatesTasksArgs = {
  distinct_on: InputMaybe<Array<Tasks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Tasks_Order_By>>;
  where: InputMaybe<Tasks_Bool_Exp>;
};


/** columns and relationships of "gates" */
export type GatesTasks_AggregateArgs = {
  distinct_on: InputMaybe<Array<Tasks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Tasks_Order_By>>;
  where: InputMaybe<Tasks_Bool_Exp>;
};


/** columns and relationships of "gates" */
export type GatesWhitelisted_WalletsArgs = {
  distinct_on: InputMaybe<Array<Whitelisted_Wallets_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Whitelisted_Wallets_Order_By>>;
  where: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
};


/** columns and relationships of "gates" */
export type GatesWhitelisted_Wallets_AggregateArgs = {
  distinct_on: InputMaybe<Array<Whitelisted_Wallets_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Whitelisted_Wallets_Order_By>>;
  where: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
};

/** aggregated selection of "gates" */
export type Gates_Aggregate = {
  __typename?: 'gates_aggregate';
  aggregate: Maybe<Gates_Aggregate_Fields>;
  nodes: Array<Gates>;
};

export type Gates_Aggregate_Bool_Exp = {
  count?: InputMaybe<Gates_Aggregate_Bool_Exp_Count>;
};

export type Gates_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Gates_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Gates_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "gates" */
export type Gates_Aggregate_Fields = {
  __typename?: 'gates_aggregate_fields';
  avg: Maybe<Gates_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Gates_Max_Fields>;
  min: Maybe<Gates_Min_Fields>;
  stddev: Maybe<Gates_Stddev_Fields>;
  stddev_pop: Maybe<Gates_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Gates_Stddev_Samp_Fields>;
  sum: Maybe<Gates_Sum_Fields>;
  var_pop: Maybe<Gates_Var_Pop_Fields>;
  var_samp: Maybe<Gates_Var_Samp_Fields>;
  variance: Maybe<Gates_Variance_Fields>;
};


/** aggregate fields of "gates" */
export type Gates_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Gates_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "gates" */
export type Gates_Aggregate_Order_By = {
  avg?: InputMaybe<Gates_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Gates_Max_Order_By>;
  min?: InputMaybe<Gates_Min_Order_By>;
  stddev?: InputMaybe<Gates_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Gates_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Gates_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Gates_Sum_Order_By>;
  var_pop?: InputMaybe<Gates_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Gates_Var_Samp_Order_By>;
  variance?: InputMaybe<Gates_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Gates_Append_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  knowledge?: InputMaybe<Scalars['jsonb']>;
  links?: InputMaybe<Scalars['jsonb']>;
  skills?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "gates" */
export type Gates_Arr_Rel_Insert_Input = {
  data: Array<Gates_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Gates_On_Conflict>;
};

/** aggregate avg on columns */
export type Gates_Avg_Fields = {
  __typename?: 'gates_avg_fields';
  claim_limit: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "gates" */
export type Gates_Avg_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "gates". All fields are combined with a logical 'AND'. */
export type Gates_Bool_Exp = {
  _and?: InputMaybe<Array<Gates_Bool_Exp>>;
  _not?: InputMaybe<Gates_Bool_Exp>;
  _or?: InputMaybe<Array<Gates_Bool_Exp>>;
  attitudes?: InputMaybe<Jsonb_Comparison_Exp>;
  categories?: InputMaybe<Jsonb_Comparison_Exp>;
  claim_limit?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  creator?: InputMaybe<Users_Bool_Exp>;
  creator_id?: InputMaybe<Uuid_Comparison_Exp>;
  dao?: InputMaybe<Daos_Bool_Exp>;
  dao_id?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  earners?: InputMaybe<Earners_Bool_Exp>;
  earners_aggregate?: InputMaybe<Earners_Aggregate_Bool_Exp>;
  expire_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  holder_count?: InputMaybe<Bigint_Comparison_Exp>;
  holders?: InputMaybe<Users_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  knowledge?: InputMaybe<Jsonb_Comparison_Exp>;
  links?: InputMaybe<Jsonb_Comparison_Exp>;
  permissions?: InputMaybe<Permissions_Bool_Exp>;
  permissions_aggregate?: InputMaybe<Permissions_Aggregate_Bool_Exp>;
  published?: InputMaybe<Gate_State_Comparison_Exp>;
  published_at?: InputMaybe<Timestamp_Comparison_Exp>;
  skills?: InputMaybe<Jsonb_Comparison_Exp>;
  tasks?: InputMaybe<Tasks_Bool_Exp>;
  tasks_aggregate?: InputMaybe<Tasks_Aggregate_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<Gate_Type_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  whitelisted_wallets?: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
  whitelisted_wallets_aggregate?: InputMaybe<Whitelisted_Wallets_Aggregate_Bool_Exp>;
  whitelisted_wallets_file?: InputMaybe<Files_Bool_Exp>;
  whitelisted_wallets_file_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "gates" */
export enum Gates_Constraint {
  /** unique or primary key constraint on columns "id" */
  GatesIdUindex = 'gates_id_uindex',
  /** unique or primary key constraint on columns "id" */
  GatesPk = 'gates_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Gates_Delete_At_Path_Input = {
  attitudes?: InputMaybe<Array<Scalars['String']>>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  knowledge?: InputMaybe<Array<Scalars['String']>>;
  links?: InputMaybe<Array<Scalars['String']>>;
  skills?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Gates_Delete_Elem_Input = {
  attitudes?: InputMaybe<Scalars['Int']>;
  categories?: InputMaybe<Scalars['Int']>;
  knowledge?: InputMaybe<Scalars['Int']>;
  links?: InputMaybe<Scalars['Int']>;
  skills?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Gates_Delete_Key_Input = {
  attitudes?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Scalars['String']>;
  knowledge?: InputMaybe<Scalars['String']>;
  links?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "gates" */
export type Gates_Inc_Input = {
  claim_limit?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "gates" */
export type Gates_Insert_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  claim_limit?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  creator?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  creator_id?: InputMaybe<Scalars['uuid']>;
  dao?: InputMaybe<Daos_Obj_Rel_Insert_Input>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  earners?: InputMaybe<Earners_Arr_Rel_Insert_Input>;
  expire_date?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  knowledge?: InputMaybe<Scalars['jsonb']>;
  links?: InputMaybe<Scalars['jsonb']>;
  permissions?: InputMaybe<Permissions_Arr_Rel_Insert_Input>;
  published?: InputMaybe<Scalars['gate_state']>;
  published_at?: InputMaybe<Scalars['timestamp']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  tasks?: InputMaybe<Tasks_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['gate_type']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  whitelisted_wallets?: InputMaybe<Whitelisted_Wallets_Arr_Rel_Insert_Input>;
  whitelisted_wallets_file?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  whitelisted_wallets_file_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Gates_Max_Fields = {
  __typename?: 'gates_max_fields';
  claim_limit: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamp']>;
  creator_id: Maybe<Scalars['uuid']>;
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  expire_date: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  image: Maybe<Scalars['String']>;
  published: Maybe<Scalars['gate_state']>;
  published_at: Maybe<Scalars['timestamp']>;
  title: Maybe<Scalars['String']>;
  type: Maybe<Scalars['gate_type']>;
  updated_at: Maybe<Scalars['timestamp']>;
  whitelisted_wallets_file_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "gates" */
export type Gates_Max_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  expire_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  published?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  whitelisted_wallets_file_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Gates_Min_Fields = {
  __typename?: 'gates_min_fields';
  claim_limit: Maybe<Scalars['Int']>;
  created_at: Maybe<Scalars['timestamp']>;
  creator_id: Maybe<Scalars['uuid']>;
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  expire_date: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  image: Maybe<Scalars['String']>;
  published: Maybe<Scalars['gate_state']>;
  published_at: Maybe<Scalars['timestamp']>;
  title: Maybe<Scalars['String']>;
  type: Maybe<Scalars['gate_type']>;
  updated_at: Maybe<Scalars['timestamp']>;
  whitelisted_wallets_file_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "gates" */
export type Gates_Min_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator_id?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  expire_date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  published?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  whitelisted_wallets_file_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "gates" */
export type Gates_Mutation_Response = {
  __typename?: 'gates_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Gates>;
};

/** input type for inserting object relation for remote table "gates" */
export type Gates_Obj_Rel_Insert_Input = {
  data: Gates_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Gates_On_Conflict>;
};

/** on_conflict condition type for table "gates" */
export type Gates_On_Conflict = {
  constraint: Gates_Constraint;
  update_columns: Array<Gates_Update_Column>;
  where?: InputMaybe<Gates_Bool_Exp>;
};

/** Ordering options when selecting data from "gates". */
export type Gates_Order_By = {
  attitudes?: InputMaybe<Order_By>;
  categories?: InputMaybe<Order_By>;
  claim_limit?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  creator?: InputMaybe<Users_Order_By>;
  creator_id?: InputMaybe<Order_By>;
  dao?: InputMaybe<Daos_Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  earners_aggregate?: InputMaybe<Earners_Aggregate_Order_By>;
  expire_date?: InputMaybe<Order_By>;
  holder_count?: InputMaybe<Order_By>;
  holders_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  knowledge?: InputMaybe<Order_By>;
  links?: InputMaybe<Order_By>;
  permissions_aggregate?: InputMaybe<Permissions_Aggregate_Order_By>;
  published?: InputMaybe<Order_By>;
  published_at?: InputMaybe<Order_By>;
  skills?: InputMaybe<Order_By>;
  tasks_aggregate?: InputMaybe<Tasks_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  whitelisted_wallets_aggregate?: InputMaybe<Whitelisted_Wallets_Aggregate_Order_By>;
  whitelisted_wallets_file?: InputMaybe<Files_Order_By>;
  whitelisted_wallets_file_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: gates */
export type Gates_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Gates_Prepend_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  knowledge?: InputMaybe<Scalars['jsonb']>;
  links?: InputMaybe<Scalars['jsonb']>;
  skills?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "gates" */
export enum Gates_Select_Column {
  /** column name */
  Attitudes = 'attitudes',
  /** column name */
  Categories = 'categories',
  /** column name */
  ClaimLimit = 'claim_limit',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  ExpireDate = 'expire_date',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Knowledge = 'knowledge',
  /** column name */
  Links = 'links',
  /** column name */
  Published = 'published',
  /** column name */
  PublishedAt = 'published_at',
  /** column name */
  Skills = 'skills',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WhitelistedWalletsFileId = 'whitelisted_wallets_file_id'
}

/** input type for updating data in table "gates" */
export type Gates_Set_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  claim_limit?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  creator_id?: InputMaybe<Scalars['uuid']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  expire_date?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  knowledge?: InputMaybe<Scalars['jsonb']>;
  links?: InputMaybe<Scalars['jsonb']>;
  published?: InputMaybe<Scalars['gate_state']>;
  published_at?: InputMaybe<Scalars['timestamp']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['gate_type']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  whitelisted_wallets_file_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Gates_Stddev_Fields = {
  __typename?: 'gates_stddev_fields';
  claim_limit: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "gates" */
export type Gates_Stddev_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Gates_Stddev_Pop_Fields = {
  __typename?: 'gates_stddev_pop_fields';
  claim_limit: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "gates" */
export type Gates_Stddev_Pop_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Gates_Stddev_Samp_Fields = {
  __typename?: 'gates_stddev_samp_fields';
  claim_limit: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "gates" */
export type Gates_Stddev_Samp_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "gates" */
export type Gates_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Gates_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Gates_Stream_Cursor_Value_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  categories?: InputMaybe<Scalars['jsonb']>;
  claim_limit?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  creator_id?: InputMaybe<Scalars['uuid']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  expire_date?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  knowledge?: InputMaybe<Scalars['jsonb']>;
  links?: InputMaybe<Scalars['jsonb']>;
  published?: InputMaybe<Scalars['gate_state']>;
  published_at?: InputMaybe<Scalars['timestamp']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['gate_type']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  whitelisted_wallets_file_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate sum on columns */
export type Gates_Sum_Fields = {
  __typename?: 'gates_sum_fields';
  claim_limit: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "gates" */
export type Gates_Sum_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
};

/** update columns of table "gates" */
export enum Gates_Update_Column {
  /** column name */
  Attitudes = 'attitudes',
  /** column name */
  Categories = 'categories',
  /** column name */
  ClaimLimit = 'claim_limit',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatorId = 'creator_id',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  ExpireDate = 'expire_date',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Knowledge = 'knowledge',
  /** column name */
  Links = 'links',
  /** column name */
  Published = 'published',
  /** column name */
  PublishedAt = 'published_at',
  /** column name */
  Skills = 'skills',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WhitelistedWalletsFileId = 'whitelisted_wallets_file_id'
}

export type Gates_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Gates_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Gates_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Gates_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Gates_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Gates_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Gates_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Gates_Set_Input>;
  where: Gates_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Gates_Var_Pop_Fields = {
  __typename?: 'gates_var_pop_fields';
  claim_limit: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "gates" */
export type Gates_Var_Pop_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Gates_Var_Samp_Fields = {
  __typename?: 'gates_var_samp_fields';
  claim_limit: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "gates" */
export type Gates_Var_Samp_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Gates_Variance_Fields = {
  __typename?: 'gates_variance_fields';
  claim_limit: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "gates" */
export type Gates_Variance_Order_By = {
  claim_limit?: InputMaybe<Order_By>;
};

export type Get_Claimable_Credentials_Args = {
  user_row?: InputMaybe<Scalars['users_scalar']>;
};

/** columns and relationships of "hidden_experience_credentials" */
export type Hidden_Experience_Credentials = {
  __typename?: 'hidden_experience_credentials';
  /** An object relationship */
  credential: Credentials;
  credential_id: Scalars['uuid'];
  /** An object relationship */
  experience: Experiences;
  experience_id: Scalars['uuid'];
};

/** aggregated selection of "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Aggregate = {
  __typename?: 'hidden_experience_credentials_aggregate';
  aggregate: Maybe<Hidden_Experience_Credentials_Aggregate_Fields>;
  nodes: Array<Hidden_Experience_Credentials>;
};

export type Hidden_Experience_Credentials_Aggregate_Bool_Exp = {
  count?: InputMaybe<Hidden_Experience_Credentials_Aggregate_Bool_Exp_Count>;
};

export type Hidden_Experience_Credentials_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Hidden_Experience_Credentials_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Aggregate_Fields = {
  __typename?: 'hidden_experience_credentials_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Hidden_Experience_Credentials_Max_Fields>;
  min: Maybe<Hidden_Experience_Credentials_Min_Fields>;
};


/** aggregate fields of "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Hidden_Experience_Credentials_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Hidden_Experience_Credentials_Max_Order_By>;
  min?: InputMaybe<Hidden_Experience_Credentials_Min_Order_By>;
};

/** input type for inserting array relation for remote table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Arr_Rel_Insert_Input = {
  data: Array<Hidden_Experience_Credentials_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Hidden_Experience_Credentials_On_Conflict>;
};

/** Boolean expression to filter rows from the table "hidden_experience_credentials". All fields are combined with a logical 'AND'. */
export type Hidden_Experience_Credentials_Bool_Exp = {
  _and?: InputMaybe<Array<Hidden_Experience_Credentials_Bool_Exp>>;
  _not?: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
  _or?: InputMaybe<Array<Hidden_Experience_Credentials_Bool_Exp>>;
  credential?: InputMaybe<Credentials_Bool_Exp>;
  credential_id?: InputMaybe<Uuid_Comparison_Exp>;
  experience?: InputMaybe<Experiences_Bool_Exp>;
  experience_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "hidden_experience_credentials" */
export enum Hidden_Experience_Credentials_Constraint {
  /** unique or primary key constraint on columns "credential_id", "experience_id" */
  HiddenExperienceCredentialsExperienceIdCredentialIdUinde = 'hidden_experience_credentials_experience_id_credential_id_uinde'
}

/** input type for inserting data into table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Insert_Input = {
  credential?: InputMaybe<Credentials_Obj_Rel_Insert_Input>;
  credential_id?: InputMaybe<Scalars['uuid']>;
  experience?: InputMaybe<Experiences_Obj_Rel_Insert_Input>;
  experience_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Hidden_Experience_Credentials_Max_Fields = {
  __typename?: 'hidden_experience_credentials_max_fields';
  credential_id: Maybe<Scalars['uuid']>;
  experience_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Max_Order_By = {
  credential_id?: InputMaybe<Order_By>;
  experience_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Hidden_Experience_Credentials_Min_Fields = {
  __typename?: 'hidden_experience_credentials_min_fields';
  credential_id: Maybe<Scalars['uuid']>;
  experience_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Min_Order_By = {
  credential_id?: InputMaybe<Order_By>;
  experience_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Mutation_Response = {
  __typename?: 'hidden_experience_credentials_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Hidden_Experience_Credentials>;
};

/** on_conflict condition type for table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_On_Conflict = {
  constraint: Hidden_Experience_Credentials_Constraint;
  update_columns: Array<Hidden_Experience_Credentials_Update_Column>;
  where?: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
};

/** Ordering options when selecting data from "hidden_experience_credentials". */
export type Hidden_Experience_Credentials_Order_By = {
  credential?: InputMaybe<Credentials_Order_By>;
  credential_id?: InputMaybe<Order_By>;
  experience?: InputMaybe<Experiences_Order_By>;
  experience_id?: InputMaybe<Order_By>;
};

/** select columns of table "hidden_experience_credentials" */
export enum Hidden_Experience_Credentials_Select_Column {
  /** column name */
  CredentialId = 'credential_id',
  /** column name */
  ExperienceId = 'experience_id'
}

/** input type for updating data in table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Set_Input = {
  credential_id?: InputMaybe<Scalars['uuid']>;
  experience_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "hidden_experience_credentials" */
export type Hidden_Experience_Credentials_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Hidden_Experience_Credentials_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Hidden_Experience_Credentials_Stream_Cursor_Value_Input = {
  credential_id?: InputMaybe<Scalars['uuid']>;
  experience_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "hidden_experience_credentials" */
export enum Hidden_Experience_Credentials_Update_Column {
  /** column name */
  CredentialId = 'credential_id',
  /** column name */
  ExperienceId = 'experience_id'
}

export type Hidden_Experience_Credentials_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Hidden_Experience_Credentials_Set_Input>;
  where: Hidden_Experience_Credentials_Bool_Exp;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** Boolean expression to compare columns of type "key_status". All fields are combined with logical 'AND'. */
export type Key_Status_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['key_status']>;
  _gt?: InputMaybe<Scalars['key_status']>;
  _gte?: InputMaybe<Scalars['key_status']>;
  _in?: InputMaybe<Array<Scalars['key_status']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['key_status']>;
  _lte?: InputMaybe<Scalars['key_status']>;
  _neq?: InputMaybe<Scalars['key_status']>;
  _nin?: InputMaybe<Array<Scalars['key_status']>>;
};

/** Boolean expression to compare columns of type "manual_task_event_type". All fields are combined with logical 'AND'. */
export type Manual_Task_Event_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['manual_task_event_type']>;
  _gt?: InputMaybe<Scalars['manual_task_event_type']>;
  _gte?: InputMaybe<Scalars['manual_task_event_type']>;
  _in?: InputMaybe<Array<Scalars['manual_task_event_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['manual_task_event_type']>;
  _lte?: InputMaybe<Scalars['manual_task_event_type']>;
  _neq?: InputMaybe<Scalars['manual_task_event_type']>;
  _nin?: InputMaybe<Array<Scalars['manual_task_event_type']>>;
};

/** columns and relationships of "manual_task_events" */
export type Manual_Task_Events = {
  __typename?: 'manual_task_events';
  created_at: Scalars['timestamp'];
  data: Maybe<Scalars['jsonb']>;
  event_type: Scalars['manual_task_event_type'];
  id: Scalars['uuid'];
  /** An object relationship */
  issuer: Users;
  issuer_id: Scalars['uuid'];
  /** An object relationship */
  task_progress: Task_Progress;
  task_progress_id: Scalars['uuid'];
  updated_at: Scalars['timestamp'];
};


/** columns and relationships of "manual_task_events" */
export type Manual_Task_EventsDataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "manual_task_events" */
export type Manual_Task_Events_Aggregate = {
  __typename?: 'manual_task_events_aggregate';
  aggregate: Maybe<Manual_Task_Events_Aggregate_Fields>;
  nodes: Array<Manual_Task_Events>;
};

/** aggregate fields of "manual_task_events" */
export type Manual_Task_Events_Aggregate_Fields = {
  __typename?: 'manual_task_events_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Manual_Task_Events_Max_Fields>;
  min: Maybe<Manual_Task_Events_Min_Fields>;
};


/** aggregate fields of "manual_task_events" */
export type Manual_Task_Events_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Manual_Task_Events_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Manual_Task_Events_Append_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "manual_task_events". All fields are combined with a logical 'AND'. */
export type Manual_Task_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Manual_Task_Events_Bool_Exp>>;
  _not?: InputMaybe<Manual_Task_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Manual_Task_Events_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  data?: InputMaybe<Jsonb_Comparison_Exp>;
  event_type?: InputMaybe<Manual_Task_Event_Type_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  issuer?: InputMaybe<Users_Bool_Exp>;
  issuer_id?: InputMaybe<Uuid_Comparison_Exp>;
  task_progress?: InputMaybe<Task_Progress_Bool_Exp>;
  task_progress_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "manual_task_events" */
export enum Manual_Task_Events_Constraint {
  /** unique or primary key constraint on columns "id" */
  ManualTaskEventsPk = 'manual_task_events_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Manual_Task_Events_Delete_At_Path_Input = {
  data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Manual_Task_Events_Delete_Elem_Input = {
  data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Manual_Task_Events_Delete_Key_Input = {
  data?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "manual_task_events" */
export type Manual_Task_Events_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_type?: InputMaybe<Scalars['manual_task_event_type']>;
  id?: InputMaybe<Scalars['uuid']>;
  issuer?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  issuer_id?: InputMaybe<Scalars['uuid']>;
  task_progress?: InputMaybe<Task_Progress_Obj_Rel_Insert_Input>;
  task_progress_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Manual_Task_Events_Max_Fields = {
  __typename?: 'manual_task_events_max_fields';
  created_at: Maybe<Scalars['timestamp']>;
  event_type: Maybe<Scalars['manual_task_event_type']>;
  id: Maybe<Scalars['uuid']>;
  issuer_id: Maybe<Scalars['uuid']>;
  task_progress_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type Manual_Task_Events_Min_Fields = {
  __typename?: 'manual_task_events_min_fields';
  created_at: Maybe<Scalars['timestamp']>;
  event_type: Maybe<Scalars['manual_task_event_type']>;
  id: Maybe<Scalars['uuid']>;
  issuer_id: Maybe<Scalars['uuid']>;
  task_progress_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "manual_task_events" */
export type Manual_Task_Events_Mutation_Response = {
  __typename?: 'manual_task_events_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Manual_Task_Events>;
};

/** on_conflict condition type for table "manual_task_events" */
export type Manual_Task_Events_On_Conflict = {
  constraint: Manual_Task_Events_Constraint;
  update_columns: Array<Manual_Task_Events_Update_Column>;
  where?: InputMaybe<Manual_Task_Events_Bool_Exp>;
};

/** Ordering options when selecting data from "manual_task_events". */
export type Manual_Task_Events_Order_By = {
  created_at?: InputMaybe<Order_By>;
  data?: InputMaybe<Order_By>;
  event_type?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  issuer?: InputMaybe<Users_Order_By>;
  issuer_id?: InputMaybe<Order_By>;
  task_progress?: InputMaybe<Task_Progress_Order_By>;
  task_progress_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: manual_task_events */
export type Manual_Task_Events_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Manual_Task_Events_Prepend_Input = {
  data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "manual_task_events" */
export enum Manual_Task_Events_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  EventType = 'event_type',
  /** column name */
  Id = 'id',
  /** column name */
  IssuerId = 'issuer_id',
  /** column name */
  TaskProgressId = 'task_progress_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "manual_task_events" */
export type Manual_Task_Events_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_type?: InputMaybe<Scalars['manual_task_event_type']>;
  id?: InputMaybe<Scalars['uuid']>;
  issuer_id?: InputMaybe<Scalars['uuid']>;
  task_progress_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** Streaming cursor of the table "manual_task_events" */
export type Manual_Task_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Manual_Task_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Manual_Task_Events_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  data?: InputMaybe<Scalars['jsonb']>;
  event_type?: InputMaybe<Scalars['manual_task_event_type']>;
  id?: InputMaybe<Scalars['uuid']>;
  issuer_id?: InputMaybe<Scalars['uuid']>;
  task_progress_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "manual_task_events" */
export enum Manual_Task_Events_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Data = 'data',
  /** column name */
  EventType = 'event_type',
  /** column name */
  Id = 'id',
  /** column name */
  IssuerId = 'issuer_id',
  /** column name */
  TaskProgressId = 'task_progress_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Manual_Task_Events_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Manual_Task_Events_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Manual_Task_Events_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Manual_Task_Events_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Manual_Task_Events_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Manual_Task_Events_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Manual_Task_Events_Set_Input>;
  where: Manual_Task_Events_Bool_Exp;
};

/** columns and relationships of "manual_task_submission" */
export type Manual_Task_Submission = {
  __typename?: 'manual_task_submission';
  /** An object relationship */
  admin: Maybe<Users>;
  admin_comment: Maybe<Scalars['String']>;
  admin_id: Maybe<Scalars['uuid']>;
  comment: Maybe<Scalars['String']>;
  discord_id: Scalars['String'];
  id: Scalars['uuid'];
  status: Scalars['submission_state'];
  submission_url: Scalars['String'];
  task_id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
  wallet: Scalars['String'];
};

/** aggregated selection of "manual_task_submission" */
export type Manual_Task_Submission_Aggregate = {
  __typename?: 'manual_task_submission_aggregate';
  aggregate: Maybe<Manual_Task_Submission_Aggregate_Fields>;
  nodes: Array<Manual_Task_Submission>;
};

/** aggregate fields of "manual_task_submission" */
export type Manual_Task_Submission_Aggregate_Fields = {
  __typename?: 'manual_task_submission_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Manual_Task_Submission_Max_Fields>;
  min: Maybe<Manual_Task_Submission_Min_Fields>;
};


/** aggregate fields of "manual_task_submission" */
export type Manual_Task_Submission_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Manual_Task_Submission_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "manual_task_submission". All fields are combined with a logical 'AND'. */
export type Manual_Task_Submission_Bool_Exp = {
  _and?: InputMaybe<Array<Manual_Task_Submission_Bool_Exp>>;
  _not?: InputMaybe<Manual_Task_Submission_Bool_Exp>;
  _or?: InputMaybe<Array<Manual_Task_Submission_Bool_Exp>>;
  admin?: InputMaybe<Users_Bool_Exp>;
  admin_comment?: InputMaybe<String_Comparison_Exp>;
  admin_id?: InputMaybe<Uuid_Comparison_Exp>;
  comment?: InputMaybe<String_Comparison_Exp>;
  discord_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Submission_State_Comparison_Exp>;
  submission_url?: InputMaybe<String_Comparison_Exp>;
  task_id?: InputMaybe<Uuid_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  wallet?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "manual_task_submission" */
export enum Manual_Task_Submission_Constraint {
  /** unique or primary key constraint on columns "id" */
  ManualTaskSubmissionIdUindex = 'manual_task_submission_id_uindex',
  /** unique or primary key constraint on columns "id" */
  ManualTaskSubmissionPk = 'manual_task_submission_pk'
}

/** input type for inserting data into table "manual_task_submission" */
export type Manual_Task_Submission_Insert_Input = {
  admin?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  admin_comment?: InputMaybe<Scalars['String']>;
  admin_id?: InputMaybe<Scalars['uuid']>;
  comment?: InputMaybe<Scalars['String']>;
  discord_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['submission_state']>;
  submission_url?: InputMaybe<Scalars['String']>;
  task_id?: InputMaybe<Scalars['uuid']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
  wallet?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Manual_Task_Submission_Max_Fields = {
  __typename?: 'manual_task_submission_max_fields';
  admin_comment: Maybe<Scalars['String']>;
  admin_id: Maybe<Scalars['uuid']>;
  comment: Maybe<Scalars['String']>;
  discord_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  status: Maybe<Scalars['submission_state']>;
  submission_url: Maybe<Scalars['String']>;
  task_id: Maybe<Scalars['uuid']>;
  user_id: Maybe<Scalars['uuid']>;
  wallet: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Manual_Task_Submission_Min_Fields = {
  __typename?: 'manual_task_submission_min_fields';
  admin_comment: Maybe<Scalars['String']>;
  admin_id: Maybe<Scalars['uuid']>;
  comment: Maybe<Scalars['String']>;
  discord_id: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  status: Maybe<Scalars['submission_state']>;
  submission_url: Maybe<Scalars['String']>;
  task_id: Maybe<Scalars['uuid']>;
  user_id: Maybe<Scalars['uuid']>;
  wallet: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "manual_task_submission" */
export type Manual_Task_Submission_Mutation_Response = {
  __typename?: 'manual_task_submission_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Manual_Task_Submission>;
};

/** on_conflict condition type for table "manual_task_submission" */
export type Manual_Task_Submission_On_Conflict = {
  constraint: Manual_Task_Submission_Constraint;
  update_columns: Array<Manual_Task_Submission_Update_Column>;
  where?: InputMaybe<Manual_Task_Submission_Bool_Exp>;
};

/** Ordering options when selecting data from "manual_task_submission". */
export type Manual_Task_Submission_Order_By = {
  admin?: InputMaybe<Users_Order_By>;
  admin_comment?: InputMaybe<Order_By>;
  admin_id?: InputMaybe<Order_By>;
  comment?: InputMaybe<Order_By>;
  discord_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  submission_url?: InputMaybe<Order_By>;
  task_id?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Order_By>;
};

/** primary key columns input for table: manual_task_submission */
export type Manual_Task_Submission_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "manual_task_submission" */
export enum Manual_Task_Submission_Select_Column {
  /** column name */
  AdminComment = 'admin_comment',
  /** column name */
  AdminId = 'admin_id',
  /** column name */
  Comment = 'comment',
  /** column name */
  DiscordId = 'discord_id',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  SubmissionUrl = 'submission_url',
  /** column name */
  TaskId = 'task_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Wallet = 'wallet'
}

/** input type for updating data in table "manual_task_submission" */
export type Manual_Task_Submission_Set_Input = {
  admin_comment?: InputMaybe<Scalars['String']>;
  admin_id?: InputMaybe<Scalars['uuid']>;
  comment?: InputMaybe<Scalars['String']>;
  discord_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['submission_state']>;
  submission_url?: InputMaybe<Scalars['String']>;
  task_id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['uuid']>;
  wallet?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "manual_task_submission" */
export type Manual_Task_Submission_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Manual_Task_Submission_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Manual_Task_Submission_Stream_Cursor_Value_Input = {
  admin_comment?: InputMaybe<Scalars['String']>;
  admin_id?: InputMaybe<Scalars['uuid']>;
  comment?: InputMaybe<Scalars['String']>;
  discord_id?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['submission_state']>;
  submission_url?: InputMaybe<Scalars['String']>;
  task_id?: InputMaybe<Scalars['uuid']>;
  user_id?: InputMaybe<Scalars['uuid']>;
  wallet?: InputMaybe<Scalars['String']>;
};

/** update columns of table "manual_task_submission" */
export enum Manual_Task_Submission_Update_Column {
  /** column name */
  AdminComment = 'admin_comment',
  /** column name */
  AdminId = 'admin_id',
  /** column name */
  Comment = 'comment',
  /** column name */
  DiscordId = 'discord_id',
  /** column name */
  Id = 'id',
  /** column name */
  Status = 'status',
  /** column name */
  SubmissionUrl = 'submission_url',
  /** column name */
  TaskId = 'task_id',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Wallet = 'wallet'
}

export type Manual_Task_Submission_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Manual_Task_Submission_Set_Input>;
  where: Manual_Task_Submission_Bool_Exp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** approve_credential */
  approve_credential: Maybe<ApproveCredentialOutput>;
  approve_manual_task: Maybe<VerifyOutput>;
  claim_credential: Maybe<ClaimCredentialOutput>;
  /** complete_gate */
  complete_gate: Scalars['jsonb'];
  /** create_code */
  create_code: Maybe<CreateCodeOutput>;
  /** delete data from the table: "access_tokens" */
  delete_access_tokens: Maybe<Access_Tokens_Mutation_Response>;
  /** delete data from the table: "bookmarks" */
  delete_bookmarks: Maybe<Bookmarks_Mutation_Response>;
  /** delete data from the table: "bounties" */
  delete_bounties: Maybe<Bounties_Mutation_Response>;
  /** delete single row from the table: "bounties" */
  delete_bounties_by_pk: Maybe<Bounties>;
  /** delete data from the table: "credential_group" */
  delete_credential_group: Maybe<Credential_Group_Mutation_Response>;
  /** delete single row from the table: "credential_group" */
  delete_credential_group_by_pk: Maybe<Credential_Group>;
  /** delete data from the table: "credentials" */
  delete_credentials: Maybe<Credentials_Mutation_Response>;
  /** delete single row from the table: "credentials" */
  delete_credentials_by_pk: Maybe<Credentials>;
  /** delete data from the table: "dao_following" */
  delete_dao_following: Maybe<Dao_Following_Mutation_Response>;
  /** delete data from the table: "dao_socials" */
  delete_dao_socials: Maybe<Dao_Socials_Mutation_Response>;
  /** delete data from the table: "daos" */
  delete_daos: Maybe<Daos_Mutation_Response>;
  /** delete single row from the table: "daos" */
  delete_daos_by_pk: Maybe<Daos>;
  /** delete data from the table: "earners" */
  delete_earners: Maybe<Earners_Mutation_Response>;
  /** delete single row from the table: "earners" */
  delete_earners_by_pk: Maybe<Earners>;
  /** delete data from the table: "email_subscribers" */
  delete_email_subscribers: Maybe<Email_Subscribers_Mutation_Response>;
  /** delete single row from the table: "email_subscribers" */
  delete_email_subscribers_by_pk: Maybe<Email_Subscribers>;
  /** delete data from the table: "experiences" */
  delete_experiences: Maybe<Experiences_Mutation_Response>;
  /** delete data from the table: "files" */
  delete_files: Maybe<Files_Mutation_Response>;
  /** delete single row from the table: "files" */
  delete_files_by_pk: Maybe<Files>;
  /** delete data from the table: "gate_progress" */
  delete_gate_progress: Maybe<Gate_Progress_Mutation_Response>;
  /** delete single row from the table: "gate_progress" */
  delete_gate_progress_by_pk: Maybe<Gate_Progress>;
  /** delete data from the table: "gates" */
  delete_gates: Maybe<Gates_Mutation_Response>;
  /** delete single row from the table: "gates" */
  delete_gates_by_pk: Maybe<Gates>;
  /** delete data from the table: "hidden_experience_credentials" */
  delete_hidden_experience_credentials: Maybe<Hidden_Experience_Credentials_Mutation_Response>;
  /** delete data from the table: "manual_task_events" */
  delete_manual_task_events: Maybe<Manual_Task_Events_Mutation_Response>;
  /** delete single row from the table: "manual_task_events" */
  delete_manual_task_events_by_pk: Maybe<Manual_Task_Events>;
  /** delete data from the table: "manual_task_submission" */
  delete_manual_task_submission: Maybe<Manual_Task_Submission_Mutation_Response>;
  /** delete single row from the table: "manual_task_submission" */
  delete_manual_task_submission_by_pk: Maybe<Manual_Task_Submission>;
  /** delete data from the table: "permissions" */
  delete_permissions: Maybe<Permissions_Mutation_Response>;
  /** delete single row from the table: "permissions" */
  delete_permissions_by_pk: Maybe<Permissions>;
  /** delete data from the table: "task_progress" */
  delete_task_progress: Maybe<Task_Progress_Mutation_Response>;
  /** delete single row from the table: "task_progress" */
  delete_task_progress_by_pk: Maybe<Task_Progress>;
  /** delete data from the table: "tasks" */
  delete_tasks: Maybe<Tasks_Mutation_Response>;
  /** delete single row from the table: "tasks" */
  delete_tasks_by_pk: Maybe<Tasks>;
  /** delete data from the table: "token_benefits" */
  delete_token_benefits: Maybe<Token_Benefits_Mutation_Response>;
  /** delete single row from the table: "token_benefits" */
  delete_token_benefits_by_pk: Maybe<Token_Benefits>;
  /** delete data from the table: "user_following" */
  delete_user_following: Maybe<User_Following_Mutation_Response>;
  /** delete data from the table: "user_socials" */
  delete_user_socials: Maybe<User_Socials_Mutation_Response>;
  /** delete data from the table: "users" */
  delete_users: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk: Maybe<Users>;
  /** delete data from the table: "whitelisted_wallets" */
  delete_whitelisted_wallets: Maybe<Whitelisted_Wallets_Mutation_Response>;
  /** execute VOLATILE function "follow_dao" which returns "dao_following" */
  follow_dao: Maybe<Dao_Following>;
  /** execute VOLATILE function "follow_user" which returns "user_following" */
  follow_user: Maybe<User_Following>;
  /** insert data into the table: "access_tokens" */
  insert_access_tokens: Maybe<Access_Tokens_Mutation_Response>;
  /** insert a single row into the table: "access_tokens" */
  insert_access_tokens_one: Maybe<Access_Tokens>;
  /** insert data into the table: "bookmarks" */
  insert_bookmarks: Maybe<Bookmarks_Mutation_Response>;
  /** insert a single row into the table: "bookmarks" */
  insert_bookmarks_one: Maybe<Bookmarks>;
  /** insert data into the table: "bounties" */
  insert_bounties: Maybe<Bounties_Mutation_Response>;
  /** insert a single row into the table: "bounties" */
  insert_bounties_one: Maybe<Bounties>;
  /** insert data into the table: "credential_group" */
  insert_credential_group: Maybe<Credential_Group_Mutation_Response>;
  /** insert a single row into the table: "credential_group" */
  insert_credential_group_one: Maybe<Credential_Group>;
  /** insert data into the table: "credentials" */
  insert_credentials: Maybe<Credentials_Mutation_Response>;
  /** insert a single row into the table: "credentials" */
  insert_credentials_one: Maybe<Credentials>;
  /** insert data into the table: "dao_following" */
  insert_dao_following: Maybe<Dao_Following_Mutation_Response>;
  /** insert a single row into the table: "dao_following" */
  insert_dao_following_one: Maybe<Dao_Following>;
  /** insert data into the table: "dao_socials" */
  insert_dao_socials: Maybe<Dao_Socials_Mutation_Response>;
  /** insert a single row into the table: "dao_socials" */
  insert_dao_socials_one: Maybe<Dao_Socials>;
  /** insert data into the table: "daos" */
  insert_daos: Maybe<Daos_Mutation_Response>;
  /** insert a single row into the table: "daos" */
  insert_daos_one: Maybe<Daos>;
  /** insert data into the table: "earners" */
  insert_earners: Maybe<Earners_Mutation_Response>;
  /** insert a single row into the table: "earners" */
  insert_earners_one: Maybe<Earners>;
  /** insert data into the table: "email_subscribers" */
  insert_email_subscribers: Maybe<Email_Subscribers_Mutation_Response>;
  /** insert a single row into the table: "email_subscribers" */
  insert_email_subscribers_one: Maybe<Email_Subscribers>;
  /** insert data into the table: "experiences" */
  insert_experiences: Maybe<Experiences_Mutation_Response>;
  /** insert a single row into the table: "experiences" */
  insert_experiences_one: Maybe<Experiences>;
  /** insert data into the table: "files" */
  insert_files: Maybe<Files_Mutation_Response>;
  /** insert a single row into the table: "files" */
  insert_files_one: Maybe<Files>;
  /** insert data into the table: "gate_progress" */
  insert_gate_progress: Maybe<Gate_Progress_Mutation_Response>;
  /** insert a single row into the table: "gate_progress" */
  insert_gate_progress_one: Maybe<Gate_Progress>;
  /** insert data into the table: "gates" */
  insert_gates: Maybe<Gates_Mutation_Response>;
  /** insert a single row into the table: "gates" */
  insert_gates_one: Maybe<Gates>;
  /** insert data into the table: "hidden_experience_credentials" */
  insert_hidden_experience_credentials: Maybe<Hidden_Experience_Credentials_Mutation_Response>;
  /** insert a single row into the table: "hidden_experience_credentials" */
  insert_hidden_experience_credentials_one: Maybe<Hidden_Experience_Credentials>;
  /** insert data into the table: "manual_task_events" */
  insert_manual_task_events: Maybe<Manual_Task_Events_Mutation_Response>;
  /** insert a single row into the table: "manual_task_events" */
  insert_manual_task_events_one: Maybe<Manual_Task_Events>;
  /** insert data into the table: "manual_task_submission" */
  insert_manual_task_submission: Maybe<Manual_Task_Submission_Mutation_Response>;
  /** insert a single row into the table: "manual_task_submission" */
  insert_manual_task_submission_one: Maybe<Manual_Task_Submission>;
  /** insert data into the table: "permissions" */
  insert_permissions: Maybe<Permissions_Mutation_Response>;
  /** insert a single row into the table: "permissions" */
  insert_permissions_one: Maybe<Permissions>;
  /** insert data into the table: "task_progress" */
  insert_task_progress: Maybe<Task_Progress_Mutation_Response>;
  /** insert a single row into the table: "task_progress" */
  insert_task_progress_one: Maybe<Task_Progress>;
  /** insert data into the table: "tasks" */
  insert_tasks: Maybe<Tasks_Mutation_Response>;
  /** insert a single row into the table: "tasks" */
  insert_tasks_one: Maybe<Tasks>;
  /** insert data into the table: "token_benefits" */
  insert_token_benefits: Maybe<Token_Benefits_Mutation_Response>;
  /** insert a single row into the table: "token_benefits" */
  insert_token_benefits_one: Maybe<Token_Benefits>;
  /** insert data into the table: "user_following" */
  insert_user_following: Maybe<User_Following_Mutation_Response>;
  /** insert a single row into the table: "user_following" */
  insert_user_following_one: Maybe<User_Following>;
  /** insert data into the table: "user_socials" */
  insert_user_socials: Maybe<User_Socials_Mutation_Response>;
  /** insert a single row into the table: "user_socials" */
  insert_user_socials_one: Maybe<User_Socials>;
  /** insert data into the table: "users" */
  insert_users: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one: Maybe<Users>;
  /** insert data into the table: "whitelisted_wallets" */
  insert_whitelisted_wallets: Maybe<Whitelisted_Wallets_Mutation_Response>;
  /** insert a single row into the table: "whitelisted_wallets" */
  insert_whitelisted_wallets_one: Maybe<Whitelisted_Wallets>;
  /** link_preview */
  link_preview: Maybe<LinkPreviewOutput>;
  /** login */
  login: Maybe<LoginOutput>;
  /** mint_credential */
  mint_credential: Maybe<MintCredentialOutput>;
  /** publish_gate */
  publish_gate: Maybe<PublishGateOutput>;
  refresh: Maybe<RefreshOutput>;
  /** reject_credential */
  reject_credential: Maybe<ApproveCredentialOutput>;
  /** reject_manual_task */
  reject_manual_task: Maybe<RejectMtOutput>;
  /** revoke */
  revoke: Maybe<LoginOutput>;
  /** execute VOLATILE function "subscribe_to_newsletter" which returns "email_subscribers" */
  subscribe_to_newsletter: Maybe<Email_Subscribers>;
  /** execute VOLATILE function "unfollow_dao" which returns "dao_following" */
  unfollow_dao: Maybe<Dao_Following>;
  /** execute VOLATILE function "unfollow_user" which returns "user_following" */
  unfollow_user: Maybe<User_Following>;
  /** execute VOLATILE function "unsubscribe_to_newsletter" which returns "email_subscribers" */
  unsubscribe_to_newsletter: Maybe<Email_Subscribers>;
  /** update data of the table: "access_tokens" */
  update_access_tokens: Maybe<Access_Tokens_Mutation_Response>;
  /** update multiples rows of table: "access_tokens" */
  update_access_tokens_many: Maybe<Array<Maybe<Access_Tokens_Mutation_Response>>>;
  /** update data of the table: "bookmarks" */
  update_bookmarks: Maybe<Bookmarks_Mutation_Response>;
  /** update multiples rows of table: "bookmarks" */
  update_bookmarks_many: Maybe<Array<Maybe<Bookmarks_Mutation_Response>>>;
  /** update data of the table: "bounties" */
  update_bounties: Maybe<Bounties_Mutation_Response>;
  /** update single row of the table: "bounties" */
  update_bounties_by_pk: Maybe<Bounties>;
  /** update multiples rows of table: "bounties" */
  update_bounties_many: Maybe<Array<Maybe<Bounties_Mutation_Response>>>;
  /** update data of the table: "credential_group" */
  update_credential_group: Maybe<Credential_Group_Mutation_Response>;
  /** update single row of the table: "credential_group" */
  update_credential_group_by_pk: Maybe<Credential_Group>;
  /** update multiples rows of table: "credential_group" */
  update_credential_group_many: Maybe<Array<Maybe<Credential_Group_Mutation_Response>>>;
  /** update data of the table: "credentials" */
  update_credentials: Maybe<Credentials_Mutation_Response>;
  /** update single row of the table: "credentials" */
  update_credentials_by_pk: Maybe<Credentials>;
  /** update multiples rows of table: "credentials" */
  update_credentials_many: Maybe<Array<Maybe<Credentials_Mutation_Response>>>;
  /** update data of the table: "dao_following" */
  update_dao_following: Maybe<Dao_Following_Mutation_Response>;
  /** update multiples rows of table: "dao_following" */
  update_dao_following_many: Maybe<Array<Maybe<Dao_Following_Mutation_Response>>>;
  /** update data of the table: "dao_socials" */
  update_dao_socials: Maybe<Dao_Socials_Mutation_Response>;
  /** update multiples rows of table: "dao_socials" */
  update_dao_socials_many: Maybe<Array<Maybe<Dao_Socials_Mutation_Response>>>;
  /** update data of the table: "daos" */
  update_daos: Maybe<Daos_Mutation_Response>;
  /** update single row of the table: "daos" */
  update_daos_by_pk: Maybe<Daos>;
  /** update multiples rows of table: "daos" */
  update_daos_many: Maybe<Array<Maybe<Daos_Mutation_Response>>>;
  /** update data of the table: "earners" */
  update_earners: Maybe<Earners_Mutation_Response>;
  /** update single row of the table: "earners" */
  update_earners_by_pk: Maybe<Earners>;
  /** update multiples rows of table: "earners" */
  update_earners_many: Maybe<Array<Maybe<Earners_Mutation_Response>>>;
  /** update data of the table: "email_subscribers" */
  update_email_subscribers: Maybe<Email_Subscribers_Mutation_Response>;
  /** update single row of the table: "email_subscribers" */
  update_email_subscribers_by_pk: Maybe<Email_Subscribers>;
  /** update multiples rows of table: "email_subscribers" */
  update_email_subscribers_many: Maybe<Array<Maybe<Email_Subscribers_Mutation_Response>>>;
  /** update data of the table: "experiences" */
  update_experiences: Maybe<Experiences_Mutation_Response>;
  /** update multiples rows of table: "experiences" */
  update_experiences_many: Maybe<Array<Maybe<Experiences_Mutation_Response>>>;
  /** update data of the table: "files" */
  update_files: Maybe<Files_Mutation_Response>;
  /** update single row of the table: "files" */
  update_files_by_pk: Maybe<Files>;
  /** update multiples rows of table: "files" */
  update_files_many: Maybe<Array<Maybe<Files_Mutation_Response>>>;
  /** update data of the table: "gate_progress" */
  update_gate_progress: Maybe<Gate_Progress_Mutation_Response>;
  /** update single row of the table: "gate_progress" */
  update_gate_progress_by_pk: Maybe<Gate_Progress>;
  /** update multiples rows of table: "gate_progress" */
  update_gate_progress_many: Maybe<Array<Maybe<Gate_Progress_Mutation_Response>>>;
  /** update data of the table: "gates" */
  update_gates: Maybe<Gates_Mutation_Response>;
  /** update single row of the table: "gates" */
  update_gates_by_pk: Maybe<Gates>;
  /** update multiples rows of table: "gates" */
  update_gates_many: Maybe<Array<Maybe<Gates_Mutation_Response>>>;
  /** update data of the table: "hidden_experience_credentials" */
  update_hidden_experience_credentials: Maybe<Hidden_Experience_Credentials_Mutation_Response>;
  /** update multiples rows of table: "hidden_experience_credentials" */
  update_hidden_experience_credentials_many: Maybe<Array<Maybe<Hidden_Experience_Credentials_Mutation_Response>>>;
  /** update data of the table: "manual_task_events" */
  update_manual_task_events: Maybe<Manual_Task_Events_Mutation_Response>;
  /** update single row of the table: "manual_task_events" */
  update_manual_task_events_by_pk: Maybe<Manual_Task_Events>;
  /** update multiples rows of table: "manual_task_events" */
  update_manual_task_events_many: Maybe<Array<Maybe<Manual_Task_Events_Mutation_Response>>>;
  /** update data of the table: "manual_task_submission" */
  update_manual_task_submission: Maybe<Manual_Task_Submission_Mutation_Response>;
  /** update single row of the table: "manual_task_submission" */
  update_manual_task_submission_by_pk: Maybe<Manual_Task_Submission>;
  /** update multiples rows of table: "manual_task_submission" */
  update_manual_task_submission_many: Maybe<Array<Maybe<Manual_Task_Submission_Mutation_Response>>>;
  /** update data of the table: "permissions" */
  update_permissions: Maybe<Permissions_Mutation_Response>;
  /** update single row of the table: "permissions" */
  update_permissions_by_pk: Maybe<Permissions>;
  /** update multiples rows of table: "permissions" */
  update_permissions_many: Maybe<Array<Maybe<Permissions_Mutation_Response>>>;
  /** update data of the table: "task_progress" */
  update_task_progress: Maybe<Task_Progress_Mutation_Response>;
  /** update single row of the table: "task_progress" */
  update_task_progress_by_pk: Maybe<Task_Progress>;
  /** update multiples rows of table: "task_progress" */
  update_task_progress_many: Maybe<Array<Maybe<Task_Progress_Mutation_Response>>>;
  /** update data of the table: "tasks" */
  update_tasks: Maybe<Tasks_Mutation_Response>;
  /** update single row of the table: "tasks" */
  update_tasks_by_pk: Maybe<Tasks>;
  /** update multiples rows of table: "tasks" */
  update_tasks_many: Maybe<Array<Maybe<Tasks_Mutation_Response>>>;
  /** update data of the table: "token_benefits" */
  update_token_benefits: Maybe<Token_Benefits_Mutation_Response>;
  /** update single row of the table: "token_benefits" */
  update_token_benefits_by_pk: Maybe<Token_Benefits>;
  /** update multiples rows of table: "token_benefits" */
  update_token_benefits_many: Maybe<Array<Maybe<Token_Benefits_Mutation_Response>>>;
  /** update data of the table: "user_following" */
  update_user_following: Maybe<User_Following_Mutation_Response>;
  /** update multiples rows of table: "user_following" */
  update_user_following_many: Maybe<Array<Maybe<User_Following_Mutation_Response>>>;
  /** update data of the table: "user_socials" */
  update_user_socials: Maybe<User_Socials_Mutation_Response>;
  /** update multiples rows of table: "user_socials" */
  update_user_socials_many: Maybe<Array<Maybe<User_Socials_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  /** update data of the table: "whitelisted_wallets" */
  update_whitelisted_wallets: Maybe<Whitelisted_Wallets_Mutation_Response>;
  /** update multiples rows of table: "whitelisted_wallets" */
  update_whitelisted_wallets_many: Maybe<Array<Maybe<Whitelisted_Wallets_Mutation_Response>>>;
  /** upload_image */
  upload_image: Maybe<UploadOutput>;
  /** verify_code */
  verify_code: Maybe<VerifyCodeOutput>;
  /** verify_csv */
  verify_csv: Maybe<VerifyCsvOutput>;
  /** verify_key */
  verify_key: Maybe<VerifyOutput>;
};


/** mutation root */
export type Mutation_RootApprove_CredentialArgs = {
  comment: Scalars['String'];
  credential_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootApprove_Manual_TaskArgs = {
  input: ApproveMtInput;
};


/** mutation root */
export type Mutation_RootClaim_CredentialArgs = {
  group_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootComplete_GateArgs = {
  gate_id: Scalars['uuid'];
  recaptcha: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCreate_CodeArgs = {
  email: Scalars['String'];
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Access_TokensArgs = {
  where: Access_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_BookmarksArgs = {
  where: Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_BountiesArgs = {
  where: Bounties_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Bounties_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Credential_GroupArgs = {
  where: Credential_Group_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Credential_Group_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CredentialsArgs = {
  where: Credentials_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Credentials_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Dao_FollowingArgs = {
  where: Dao_Following_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dao_SocialsArgs = {
  where: Dao_Socials_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_DaosArgs = {
  where: Daos_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Daos_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_EarnersArgs = {
  where: Earners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Earners_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Email_SubscribersArgs = {
  where: Email_Subscribers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Email_Subscribers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ExperiencesArgs = {
  where: Experiences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_FilesArgs = {
  where: Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Files_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Gate_ProgressArgs = {
  where: Gate_Progress_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Gate_Progress_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_GatesArgs = {
  where: Gates_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Gates_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Hidden_Experience_CredentialsArgs = {
  where: Hidden_Experience_Credentials_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Manual_Task_EventsArgs = {
  where: Manual_Task_Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Manual_Task_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Manual_Task_SubmissionArgs = {
  where: Manual_Task_Submission_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Manual_Task_Submission_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_PermissionsArgs = {
  where: Permissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Permissions_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Task_ProgressArgs = {
  where: Task_Progress_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Task_Progress_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_TasksArgs = {
  where: Tasks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tasks_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Token_BenefitsArgs = {
  where: Token_Benefits_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Token_Benefits_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_User_FollowingArgs = {
  where: User_Following_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_SocialsArgs = {
  where: User_Socials_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Whitelisted_WalletsArgs = {
  where: Whitelisted_Wallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootFollow_DaoArgs = {
  args: Follow_Dao_Args;
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


/** mutation root */
export type Mutation_RootFollow_UserArgs = {
  args: Follow_User_Args;
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


/** mutation root */
export type Mutation_RootInsert_Access_TokensArgs = {
  objects: Array<Access_Tokens_Insert_Input>;
  on_conflict: InputMaybe<Access_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Access_Tokens_OneArgs = {
  object: Access_Tokens_Insert_Input;
  on_conflict: InputMaybe<Access_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BookmarksArgs = {
  objects: Array<Bookmarks_Insert_Input>;
  on_conflict: InputMaybe<Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Bookmarks_OneArgs = {
  object: Bookmarks_Insert_Input;
  on_conflict: InputMaybe<Bookmarks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BountiesArgs = {
  objects: Array<Bounties_Insert_Input>;
  on_conflict: InputMaybe<Bounties_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Bounties_OneArgs = {
  object: Bounties_Insert_Input;
  on_conflict: InputMaybe<Bounties_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Credential_GroupArgs = {
  objects: Array<Credential_Group_Insert_Input>;
  on_conflict: InputMaybe<Credential_Group_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Credential_Group_OneArgs = {
  object: Credential_Group_Insert_Input;
  on_conflict: InputMaybe<Credential_Group_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CredentialsArgs = {
  objects: Array<Credentials_Insert_Input>;
  on_conflict: InputMaybe<Credentials_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Credentials_OneArgs = {
  object: Credentials_Insert_Input;
  on_conflict: InputMaybe<Credentials_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dao_FollowingArgs = {
  objects: Array<Dao_Following_Insert_Input>;
  on_conflict: InputMaybe<Dao_Following_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dao_Following_OneArgs = {
  object: Dao_Following_Insert_Input;
  on_conflict: InputMaybe<Dao_Following_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dao_SocialsArgs = {
  objects: Array<Dao_Socials_Insert_Input>;
  on_conflict: InputMaybe<Dao_Socials_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dao_Socials_OneArgs = {
  object: Dao_Socials_Insert_Input;
  on_conflict: InputMaybe<Dao_Socials_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DaosArgs = {
  objects: Array<Daos_Insert_Input>;
  on_conflict: InputMaybe<Daos_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Daos_OneArgs = {
  object: Daos_Insert_Input;
  on_conflict: InputMaybe<Daos_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_EarnersArgs = {
  objects: Array<Earners_Insert_Input>;
  on_conflict: InputMaybe<Earners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Earners_OneArgs = {
  object: Earners_Insert_Input;
  on_conflict: InputMaybe<Earners_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Email_SubscribersArgs = {
  objects: Array<Email_Subscribers_Insert_Input>;
  on_conflict: InputMaybe<Email_Subscribers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Email_Subscribers_OneArgs = {
  object: Email_Subscribers_Insert_Input;
  on_conflict: InputMaybe<Email_Subscribers_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExperiencesArgs = {
  objects: Array<Experiences_Insert_Input>;
  on_conflict: InputMaybe<Experiences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Experiences_OneArgs = {
  object: Experiences_Insert_Input;
  on_conflict: InputMaybe<Experiences_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_FilesArgs = {
  objects: Array<Files_Insert_Input>;
  on_conflict: InputMaybe<Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Files_OneArgs = {
  object: Files_Insert_Input;
  on_conflict: InputMaybe<Files_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Gate_ProgressArgs = {
  objects: Array<Gate_Progress_Insert_Input>;
  on_conflict: InputMaybe<Gate_Progress_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Gate_Progress_OneArgs = {
  object: Gate_Progress_Insert_Input;
  on_conflict: InputMaybe<Gate_Progress_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GatesArgs = {
  objects: Array<Gates_Insert_Input>;
  on_conflict: InputMaybe<Gates_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Gates_OneArgs = {
  object: Gates_Insert_Input;
  on_conflict: InputMaybe<Gates_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Hidden_Experience_CredentialsArgs = {
  objects: Array<Hidden_Experience_Credentials_Insert_Input>;
  on_conflict: InputMaybe<Hidden_Experience_Credentials_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Hidden_Experience_Credentials_OneArgs = {
  object: Hidden_Experience_Credentials_Insert_Input;
  on_conflict: InputMaybe<Hidden_Experience_Credentials_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manual_Task_EventsArgs = {
  objects: Array<Manual_Task_Events_Insert_Input>;
  on_conflict: InputMaybe<Manual_Task_Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manual_Task_Events_OneArgs = {
  object: Manual_Task_Events_Insert_Input;
  on_conflict: InputMaybe<Manual_Task_Events_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manual_Task_SubmissionArgs = {
  objects: Array<Manual_Task_Submission_Insert_Input>;
  on_conflict: InputMaybe<Manual_Task_Submission_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Manual_Task_Submission_OneArgs = {
  object: Manual_Task_Submission_Insert_Input;
  on_conflict: InputMaybe<Manual_Task_Submission_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PermissionsArgs = {
  objects: Array<Permissions_Insert_Input>;
  on_conflict: InputMaybe<Permissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Permissions_OneArgs = {
  object: Permissions_Insert_Input;
  on_conflict: InputMaybe<Permissions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_ProgressArgs = {
  objects: Array<Task_Progress_Insert_Input>;
  on_conflict: InputMaybe<Task_Progress_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Task_Progress_OneArgs = {
  object: Task_Progress_Insert_Input;
  on_conflict: InputMaybe<Task_Progress_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TasksArgs = {
  objects: Array<Tasks_Insert_Input>;
  on_conflict: InputMaybe<Tasks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tasks_OneArgs = {
  object: Tasks_Insert_Input;
  on_conflict: InputMaybe<Tasks_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Token_BenefitsArgs = {
  objects: Array<Token_Benefits_Insert_Input>;
  on_conflict: InputMaybe<Token_Benefits_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Token_Benefits_OneArgs = {
  object: Token_Benefits_Insert_Input;
  on_conflict: InputMaybe<Token_Benefits_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_FollowingArgs = {
  objects: Array<User_Following_Insert_Input>;
  on_conflict: InputMaybe<User_Following_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Following_OneArgs = {
  object: User_Following_Insert_Input;
  on_conflict: InputMaybe<User_Following_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_SocialsArgs = {
  objects: Array<User_Socials_Insert_Input>;
  on_conflict: InputMaybe<User_Socials_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Socials_OneArgs = {
  object: User_Socials_Insert_Input;
  on_conflict: InputMaybe<User_Socials_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Whitelisted_WalletsArgs = {
  objects: Array<Whitelisted_Wallets_Insert_Input>;
  on_conflict: InputMaybe<Whitelisted_Wallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Whitelisted_Wallets_OneArgs = {
  object: Whitelisted_Wallets_Insert_Input;
  on_conflict: InputMaybe<Whitelisted_Wallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootLink_PreviewArgs = {
  url: Scalars['String'];
};


/** mutation root */
export type Mutation_RootLoginArgs = {
  signature: Scalars['String'];
  wallet: Scalars['String'];
};


/** mutation root */
export type Mutation_RootMint_CredentialArgs = {
  credential_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootPublish_GateArgs = {
  gate_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootRefreshArgs = {
  token: InputMaybe<Scalars['String']>;
};


/** mutation root */
export type Mutation_RootReject_CredentialArgs = {
  comment: Scalars['String'];
  credential_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootReject_Manual_TaskArgs = {
  input: ApproveMtInput;
};


/** mutation root */
export type Mutation_RootRevokeArgs = {
  token: Scalars['String'];
};


/** mutation root */
export type Mutation_RootSubscribe_To_NewsletterArgs = {
  args: Subscribe_To_Newsletter_Args;
  distinct_on: InputMaybe<Array<Email_Subscribers_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Email_Subscribers_Order_By>>;
  where: InputMaybe<Email_Subscribers_Bool_Exp>;
};


/** mutation root */
export type Mutation_RootUnfollow_DaoArgs = {
  args: Unfollow_Dao_Args;
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


/** mutation root */
export type Mutation_RootUnfollow_UserArgs = {
  args: Unfollow_User_Args;
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


/** mutation root */
export type Mutation_RootUnsubscribe_To_NewsletterArgs = {
  args: Unsubscribe_To_Newsletter_Args;
  distinct_on: InputMaybe<Array<Email_Subscribers_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Email_Subscribers_Order_By>>;
  where: InputMaybe<Email_Subscribers_Bool_Exp>;
};


/** mutation root */
export type Mutation_RootUpdate_Access_TokensArgs = {
  _set: InputMaybe<Access_Tokens_Set_Input>;
  where: Access_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Access_Tokens_ManyArgs = {
  updates: Array<Access_Tokens_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BookmarksArgs = {
  _set: InputMaybe<Bookmarks_Set_Input>;
  where: Bookmarks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Bookmarks_ManyArgs = {
  updates: Array<Bookmarks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_BountiesArgs = {
  _set: InputMaybe<Bounties_Set_Input>;
  where: Bounties_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Bounties_By_PkArgs = {
  _set: InputMaybe<Bounties_Set_Input>;
  pk_columns: Bounties_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Bounties_ManyArgs = {
  updates: Array<Bounties_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Credential_GroupArgs = {
  _append: InputMaybe<Credential_Group_Append_Input>;
  _delete_at_path: InputMaybe<Credential_Group_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Credential_Group_Delete_Elem_Input>;
  _delete_key: InputMaybe<Credential_Group_Delete_Key_Input>;
  _prepend: InputMaybe<Credential_Group_Prepend_Input>;
  _set: InputMaybe<Credential_Group_Set_Input>;
  where: Credential_Group_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Credential_Group_By_PkArgs = {
  _append: InputMaybe<Credential_Group_Append_Input>;
  _delete_at_path: InputMaybe<Credential_Group_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Credential_Group_Delete_Elem_Input>;
  _delete_key: InputMaybe<Credential_Group_Delete_Key_Input>;
  _prepend: InputMaybe<Credential_Group_Prepend_Input>;
  _set: InputMaybe<Credential_Group_Set_Input>;
  pk_columns: Credential_Group_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Credential_Group_ManyArgs = {
  updates: Array<Credential_Group_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_CredentialsArgs = {
  _append: InputMaybe<Credentials_Append_Input>;
  _delete_at_path: InputMaybe<Credentials_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Credentials_Delete_Elem_Input>;
  _delete_key: InputMaybe<Credentials_Delete_Key_Input>;
  _prepend: InputMaybe<Credentials_Prepend_Input>;
  _set: InputMaybe<Credentials_Set_Input>;
  where: Credentials_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Credentials_By_PkArgs = {
  _append: InputMaybe<Credentials_Append_Input>;
  _delete_at_path: InputMaybe<Credentials_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Credentials_Delete_Elem_Input>;
  _delete_key: InputMaybe<Credentials_Delete_Key_Input>;
  _prepend: InputMaybe<Credentials_Prepend_Input>;
  _set: InputMaybe<Credentials_Set_Input>;
  pk_columns: Credentials_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Credentials_ManyArgs = {
  updates: Array<Credentials_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Dao_FollowingArgs = {
  _set: InputMaybe<Dao_Following_Set_Input>;
  where: Dao_Following_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dao_Following_ManyArgs = {
  updates: Array<Dao_Following_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Dao_SocialsArgs = {
  _set: InputMaybe<Dao_Socials_Set_Input>;
  where: Dao_Socials_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dao_Socials_ManyArgs = {
  updates: Array<Dao_Socials_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_DaosArgs = {
  _append: InputMaybe<Daos_Append_Input>;
  _delete_at_path: InputMaybe<Daos_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Daos_Delete_Elem_Input>;
  _delete_key: InputMaybe<Daos_Delete_Key_Input>;
  _prepend: InputMaybe<Daos_Prepend_Input>;
  _set: InputMaybe<Daos_Set_Input>;
  where: Daos_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Daos_By_PkArgs = {
  _append: InputMaybe<Daos_Append_Input>;
  _delete_at_path: InputMaybe<Daos_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Daos_Delete_Elem_Input>;
  _delete_key: InputMaybe<Daos_Delete_Key_Input>;
  _prepend: InputMaybe<Daos_Prepend_Input>;
  _set: InputMaybe<Daos_Set_Input>;
  pk_columns: Daos_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Daos_ManyArgs = {
  updates: Array<Daos_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_EarnersArgs = {
  _set: InputMaybe<Earners_Set_Input>;
  where: Earners_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Earners_By_PkArgs = {
  _set: InputMaybe<Earners_Set_Input>;
  pk_columns: Earners_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Earners_ManyArgs = {
  updates: Array<Earners_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Email_SubscribersArgs = {
  _set: InputMaybe<Email_Subscribers_Set_Input>;
  where: Email_Subscribers_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Email_Subscribers_By_PkArgs = {
  _set: InputMaybe<Email_Subscribers_Set_Input>;
  pk_columns: Email_Subscribers_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Email_Subscribers_ManyArgs = {
  updates: Array<Email_Subscribers_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ExperiencesArgs = {
  _set: InputMaybe<Experiences_Set_Input>;
  where: Experiences_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Experiences_ManyArgs = {
  updates: Array<Experiences_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_FilesArgs = {
  _append: InputMaybe<Files_Append_Input>;
  _delete_at_path: InputMaybe<Files_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Files_Delete_Elem_Input>;
  _delete_key: InputMaybe<Files_Delete_Key_Input>;
  _prepend: InputMaybe<Files_Prepend_Input>;
  _set: InputMaybe<Files_Set_Input>;
  where: Files_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Files_By_PkArgs = {
  _append: InputMaybe<Files_Append_Input>;
  _delete_at_path: InputMaybe<Files_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Files_Delete_Elem_Input>;
  _delete_key: InputMaybe<Files_Delete_Key_Input>;
  _prepend: InputMaybe<Files_Prepend_Input>;
  _set: InputMaybe<Files_Set_Input>;
  pk_columns: Files_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Files_ManyArgs = {
  updates: Array<Files_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Gate_ProgressArgs = {
  _inc: InputMaybe<Gate_Progress_Inc_Input>;
  _set: InputMaybe<Gate_Progress_Set_Input>;
  where: Gate_Progress_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Gate_Progress_By_PkArgs = {
  _inc: InputMaybe<Gate_Progress_Inc_Input>;
  _set: InputMaybe<Gate_Progress_Set_Input>;
  pk_columns: Gate_Progress_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Gate_Progress_ManyArgs = {
  updates: Array<Gate_Progress_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_GatesArgs = {
  _append: InputMaybe<Gates_Append_Input>;
  _delete_at_path: InputMaybe<Gates_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Gates_Delete_Elem_Input>;
  _delete_key: InputMaybe<Gates_Delete_Key_Input>;
  _inc: InputMaybe<Gates_Inc_Input>;
  _prepend: InputMaybe<Gates_Prepend_Input>;
  _set: InputMaybe<Gates_Set_Input>;
  where: Gates_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Gates_By_PkArgs = {
  _append: InputMaybe<Gates_Append_Input>;
  _delete_at_path: InputMaybe<Gates_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Gates_Delete_Elem_Input>;
  _delete_key: InputMaybe<Gates_Delete_Key_Input>;
  _inc: InputMaybe<Gates_Inc_Input>;
  _prepend: InputMaybe<Gates_Prepend_Input>;
  _set: InputMaybe<Gates_Set_Input>;
  pk_columns: Gates_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Gates_ManyArgs = {
  updates: Array<Gates_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Hidden_Experience_CredentialsArgs = {
  _set: InputMaybe<Hidden_Experience_Credentials_Set_Input>;
  where: Hidden_Experience_Credentials_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Hidden_Experience_Credentials_ManyArgs = {
  updates: Array<Hidden_Experience_Credentials_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Manual_Task_EventsArgs = {
  _append: InputMaybe<Manual_Task_Events_Append_Input>;
  _delete_at_path: InputMaybe<Manual_Task_Events_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Manual_Task_Events_Delete_Elem_Input>;
  _delete_key: InputMaybe<Manual_Task_Events_Delete_Key_Input>;
  _prepend: InputMaybe<Manual_Task_Events_Prepend_Input>;
  _set: InputMaybe<Manual_Task_Events_Set_Input>;
  where: Manual_Task_Events_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Manual_Task_Events_By_PkArgs = {
  _append: InputMaybe<Manual_Task_Events_Append_Input>;
  _delete_at_path: InputMaybe<Manual_Task_Events_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Manual_Task_Events_Delete_Elem_Input>;
  _delete_key: InputMaybe<Manual_Task_Events_Delete_Key_Input>;
  _prepend: InputMaybe<Manual_Task_Events_Prepend_Input>;
  _set: InputMaybe<Manual_Task_Events_Set_Input>;
  pk_columns: Manual_Task_Events_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Manual_Task_Events_ManyArgs = {
  updates: Array<Manual_Task_Events_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Manual_Task_SubmissionArgs = {
  _set: InputMaybe<Manual_Task_Submission_Set_Input>;
  where: Manual_Task_Submission_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Manual_Task_Submission_By_PkArgs = {
  _set: InputMaybe<Manual_Task_Submission_Set_Input>;
  pk_columns: Manual_Task_Submission_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Manual_Task_Submission_ManyArgs = {
  updates: Array<Manual_Task_Submission_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_PermissionsArgs = {
  _set: InputMaybe<Permissions_Set_Input>;
  where: Permissions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Permissions_By_PkArgs = {
  _set: InputMaybe<Permissions_Set_Input>;
  pk_columns: Permissions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Permissions_ManyArgs = {
  updates: Array<Permissions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Task_ProgressArgs = {
  _set: InputMaybe<Task_Progress_Set_Input>;
  where: Task_Progress_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Task_Progress_By_PkArgs = {
  _set: InputMaybe<Task_Progress_Set_Input>;
  pk_columns: Task_Progress_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Task_Progress_ManyArgs = {
  updates: Array<Task_Progress_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TasksArgs = {
  _append: InputMaybe<Tasks_Append_Input>;
  _delete_at_path: InputMaybe<Tasks_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Tasks_Delete_Elem_Input>;
  _delete_key: InputMaybe<Tasks_Delete_Key_Input>;
  _inc: InputMaybe<Tasks_Inc_Input>;
  _prepend: InputMaybe<Tasks_Prepend_Input>;
  _set: InputMaybe<Tasks_Set_Input>;
  where: Tasks_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tasks_By_PkArgs = {
  _append: InputMaybe<Tasks_Append_Input>;
  _delete_at_path: InputMaybe<Tasks_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Tasks_Delete_Elem_Input>;
  _delete_key: InputMaybe<Tasks_Delete_Key_Input>;
  _inc: InputMaybe<Tasks_Inc_Input>;
  _prepend: InputMaybe<Tasks_Prepend_Input>;
  _set: InputMaybe<Tasks_Set_Input>;
  pk_columns: Tasks_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Tasks_ManyArgs = {
  updates: Array<Tasks_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Token_BenefitsArgs = {
  _set: InputMaybe<Token_Benefits_Set_Input>;
  where: Token_Benefits_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Token_Benefits_By_PkArgs = {
  _set: InputMaybe<Token_Benefits_Set_Input>;
  pk_columns: Token_Benefits_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Token_Benefits_ManyArgs = {
  updates: Array<Token_Benefits_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_FollowingArgs = {
  _set: InputMaybe<User_Following_Set_Input>;
  where: User_Following_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Following_ManyArgs = {
  updates: Array<User_Following_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_SocialsArgs = {
  _set: InputMaybe<User_Socials_Set_Input>;
  where: User_Socials_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Socials_ManyArgs = {
  updates: Array<User_Socials_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _append: InputMaybe<Users_Append_Input>;
  _delete_at_path: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key: InputMaybe<Users_Delete_Key_Input>;
  _inc: InputMaybe<Users_Inc_Input>;
  _prepend: InputMaybe<Users_Prepend_Input>;
  _set: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _append: InputMaybe<Users_Append_Input>;
  _delete_at_path: InputMaybe<Users_Delete_At_Path_Input>;
  _delete_elem: InputMaybe<Users_Delete_Elem_Input>;
  _delete_key: InputMaybe<Users_Delete_Key_Input>;
  _inc: InputMaybe<Users_Inc_Input>;
  _prepend: InputMaybe<Users_Prepend_Input>;
  _set: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Whitelisted_WalletsArgs = {
  _set: InputMaybe<Whitelisted_Wallets_Set_Input>;
  where: Whitelisted_Wallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Whitelisted_Wallets_ManyArgs = {
  updates: Array<Whitelisted_Wallets_Updates>;
};


/** mutation root */
export type Mutation_RootUpload_ImageArgs = {
  base64: Scalars['String'];
  metadata: MetadataInput;
};


/** mutation root */
export type Mutation_RootVerify_CodeArgs = {
  code: Scalars['String'];
  email: Scalars['String'];
  user_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootVerify_CsvArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootVerify_KeyArgs = {
  input: InputMaybe<VerifyInput>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** Boolean expression to compare columns of type "permission_types". All fields are combined with logical 'AND'. */
export type Permission_Types_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['permission_types']>;
  _gt?: InputMaybe<Scalars['permission_types']>;
  _gte?: InputMaybe<Scalars['permission_types']>;
  _in?: InputMaybe<Array<Scalars['permission_types']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['permission_types']>;
  _lte?: InputMaybe<Scalars['permission_types']>;
  _neq?: InputMaybe<Scalars['permission_types']>;
  _nin?: InputMaybe<Array<Scalars['permission_types']>>;
};

/** columns and relationships of "permissions" */
export type Permissions = {
  __typename?: 'permissions';
  created_at: Scalars['timestamp'];
  credential_id: Maybe<Scalars['uuid']>;
  /** An object relationship */
  dao: Maybe<Daos>;
  dao_id: Maybe<Scalars['uuid']>;
  /** An object relationship */
  gate: Maybe<Gates>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  permission: Maybe<Scalars['permission_types']>;
  updated_at: Scalars['timestamp'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "permissions" */
export type Permissions_Aggregate = {
  __typename?: 'permissions_aggregate';
  aggregate: Maybe<Permissions_Aggregate_Fields>;
  nodes: Array<Permissions>;
};

export type Permissions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Permissions_Aggregate_Bool_Exp_Count>;
};

export type Permissions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Permissions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Permissions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "permissions" */
export type Permissions_Aggregate_Fields = {
  __typename?: 'permissions_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Permissions_Max_Fields>;
  min: Maybe<Permissions_Min_Fields>;
};


/** aggregate fields of "permissions" */
export type Permissions_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Permissions_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "permissions" */
export type Permissions_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Permissions_Max_Order_By>;
  min?: InputMaybe<Permissions_Min_Order_By>;
};

/** input type for inserting array relation for remote table "permissions" */
export type Permissions_Arr_Rel_Insert_Input = {
  data: Array<Permissions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Permissions_On_Conflict>;
};

/** Boolean expression to filter rows from the table "permissions". All fields are combined with a logical 'AND'. */
export type Permissions_Bool_Exp = {
  _and?: InputMaybe<Array<Permissions_Bool_Exp>>;
  _not?: InputMaybe<Permissions_Bool_Exp>;
  _or?: InputMaybe<Array<Permissions_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  credential_id?: InputMaybe<Uuid_Comparison_Exp>;
  dao?: InputMaybe<Daos_Bool_Exp>;
  dao_id?: InputMaybe<Uuid_Comparison_Exp>;
  gate?: InputMaybe<Gates_Bool_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  permission?: InputMaybe<Permission_Types_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "permissions" */
export enum Permissions_Constraint {
  /** unique or primary key constraint on columns "user_id", "dao_id", "credential_id" */
  PermissionsDaoIdUserIdCredentialIdKey = 'permissions_dao_id_user_id_credential_id_key',
  /** unique or primary key constraint on columns "id" */
  PermissionsIdKey = 'permissions_id_key',
  /** unique or primary key constraint on columns "id" */
  PermissionsPkey = 'permissions_pkey'
}

/** input type for inserting data into table "permissions" */
export type Permissions_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  credential_id?: InputMaybe<Scalars['uuid']>;
  dao?: InputMaybe<Daos_Obj_Rel_Insert_Input>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  gate?: InputMaybe<Gates_Obj_Rel_Insert_Input>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  permission?: InputMaybe<Scalars['permission_types']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Permissions_Max_Fields = {
  __typename?: 'permissions_max_fields';
  created_at: Maybe<Scalars['timestamp']>;
  credential_id: Maybe<Scalars['uuid']>;
  dao_id: Maybe<Scalars['uuid']>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  permission: Maybe<Scalars['permission_types']>;
  updated_at: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "permissions" */
export type Permissions_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  credential_id?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  permission?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Permissions_Min_Fields = {
  __typename?: 'permissions_min_fields';
  created_at: Maybe<Scalars['timestamp']>;
  credential_id: Maybe<Scalars['uuid']>;
  dao_id: Maybe<Scalars['uuid']>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  permission: Maybe<Scalars['permission_types']>;
  updated_at: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "permissions" */
export type Permissions_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  credential_id?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  permission?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "permissions" */
export type Permissions_Mutation_Response = {
  __typename?: 'permissions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Permissions>;
};

/** on_conflict condition type for table "permissions" */
export type Permissions_On_Conflict = {
  constraint: Permissions_Constraint;
  update_columns: Array<Permissions_Update_Column>;
  where?: InputMaybe<Permissions_Bool_Exp>;
};

/** Ordering options when selecting data from "permissions". */
export type Permissions_Order_By = {
  created_at?: InputMaybe<Order_By>;
  credential_id?: InputMaybe<Order_By>;
  dao?: InputMaybe<Daos_Order_By>;
  dao_id?: InputMaybe<Order_By>;
  gate?: InputMaybe<Gates_Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  permission?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: permissions */
export type Permissions_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "permissions" */
export enum Permissions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CredentialId = 'credential_id',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  Permission = 'permission',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "permissions" */
export type Permissions_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  credential_id?: InputMaybe<Scalars['uuid']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  permission?: InputMaybe<Scalars['permission_types']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "permissions" */
export type Permissions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Permissions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Permissions_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']>;
  credential_id?: InputMaybe<Scalars['uuid']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  permission?: InputMaybe<Scalars['permission_types']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "permissions" */
export enum Permissions_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CredentialId = 'credential_id',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  Permission = 'permission',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Permissions_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Permissions_Set_Input>;
  where: Permissions_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "access_tokens" */
  access_tokens: Array<Access_Tokens>;
  /** fetch aggregated fields from the table: "access_tokens" */
  access_tokens_aggregate: Access_Tokens_Aggregate;
  /** fetch data from the table: "all_credential_count" */
  all_credential_count: Array<All_Credential_Count>;
  /** fetch aggregated fields from the table: "all_credential_count" */
  all_credential_count_aggregate: All_Credential_Count_Aggregate;
  /** An array relationship */
  bookmarks: Array<Bookmarks>;
  /** An aggregate relationship */
  bookmarks_aggregate: Bookmarks_Aggregate;
  /** An array relationship */
  bounties: Array<Bounties>;
  /** An aggregate relationship */
  bounties_aggregate: Bounties_Aggregate;
  /** fetch data from the table: "bounties" using primary key columns */
  bounties_by_pk: Maybe<Bounties>;
  /** fetch data from the table: "credential_group" */
  credential_group: Array<Credential_Group>;
  /** fetch aggregated fields from the table: "credential_group" */
  credential_group_aggregate: Credential_Group_Aggregate;
  /** fetch data from the table: "credential_group" using primary key columns */
  credential_group_by_pk: Maybe<Credential_Group>;
  /** An array relationship */
  credentials: Array<Credentials>;
  /** An aggregate relationship */
  credentials_aggregate: Credentials_Aggregate;
  /** fetch data from the table: "credentials" using primary key columns */
  credentials_by_pk: Maybe<Credentials>;
  /** fetch data from the table: "dao_following" */
  dao_following: Array<Dao_Following>;
  /** fetch aggregated fields from the table: "dao_following" */
  dao_following_aggregate: Dao_Following_Aggregate;
  /** fetch data from the table: "dao_socials" */
  dao_socials: Array<Dao_Socials>;
  /** fetch aggregated fields from the table: "dao_socials" */
  dao_socials_aggregate: Dao_Socials_Aggregate;
  /** fetch data from the table: "daos" */
  daos: Array<Daos>;
  /** fetch aggregated fields from the table: "daos" */
  daos_aggregate: Daos_Aggregate;
  /** fetch data from the table: "daos" using primary key columns */
  daos_by_pk: Maybe<Daos>;
  /** An array relationship */
  earners: Array<Earners>;
  /** An aggregate relationship */
  earners_aggregate: Earners_Aggregate;
  /** fetch data from the table: "earners" using primary key columns */
  earners_by_pk: Maybe<Earners>;
  /** fetch data from the table: "email_subscribers" */
  email_subscribers: Array<Email_Subscribers>;
  /** fetch aggregated fields from the table: "email_subscribers" */
  email_subscribers_aggregate: Email_Subscribers_Aggregate;
  /** fetch data from the table: "email_subscribers" using primary key columns */
  email_subscribers_by_pk: Maybe<Email_Subscribers>;
  /** An array relationship */
  experiences: Array<Experiences>;
  /** An aggregate relationship */
  experiences_aggregate: Experiences_Aggregate;
  /** fetch data from the table: "files" */
  files: Array<Files>;
  /** fetch aggregated fields from the table: "files" */
  files_aggregate: Files_Aggregate;
  /** fetch data from the table: "files" using primary key columns */
  files_by_pk: Maybe<Files>;
  /** fetch data from the table: "gate_progress" */
  gate_progress: Array<Gate_Progress>;
  /** fetch aggregated fields from the table: "gate_progress" */
  gate_progress_aggregate: Gate_Progress_Aggregate;
  /** fetch data from the table: "gate_progress" using primary key columns */
  gate_progress_by_pk: Maybe<Gate_Progress>;
  /** An array relationship */
  gates: Array<Gates>;
  /** An aggregate relationship */
  gates_aggregate: Gates_Aggregate;
  /** fetch data from the table: "gates" using primary key columns */
  gates_by_pk: Maybe<Gates>;
  /** execute function "get_claimable_credentials" which returns "credential_group" */
  get_claimable_credentials: Array<Credential_Group>;
  /** execute function "get_claimable_credentials" and query aggregates on result of table type "credential_group" */
  get_claimable_credentials_aggregate: Credential_Group_Aggregate;
  /** get_nonce */
  get_nonce: Maybe<NonceOutput>;
  /** get_twitter_tweet */
  get_twitter_tweet: Maybe<TwitterTweet>;
  /** get twitter user */
  get_twitter_user_data: Maybe<TwitterUser>;
  /** fetch data from the table: "hidden_experience_credentials" */
  hidden_experience_credentials: Array<Hidden_Experience_Credentials>;
  /** fetch aggregated fields from the table: "hidden_experience_credentials" */
  hidden_experience_credentials_aggregate: Hidden_Experience_Credentials_Aggregate;
  /** fetch data from the table: "manual_task_events" */
  manual_task_events: Array<Manual_Task_Events>;
  /** fetch aggregated fields from the table: "manual_task_events" */
  manual_task_events_aggregate: Manual_Task_Events_Aggregate;
  /** fetch data from the table: "manual_task_events" using primary key columns */
  manual_task_events_by_pk: Maybe<Manual_Task_Events>;
  /** fetch data from the table: "manual_task_submission" */
  manual_task_submission: Array<Manual_Task_Submission>;
  /** fetch aggregated fields from the table: "manual_task_submission" */
  manual_task_submission_aggregate: Manual_Task_Submission_Aggregate;
  /** fetch data from the table: "manual_task_submission" using primary key columns */
  manual_task_submission_by_pk: Maybe<Manual_Task_Submission>;
  /** execute function "me" which returns "users" */
  me: Maybe<Users>;
  /** execute function "me" and query aggregates on result of table type "users" */
  me_aggregate: Users_Aggregate;
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregate relationship */
  permissions_aggregate: Permissions_Aggregate;
  /** fetch data from the table: "permissions" using primary key columns */
  permissions_by_pk: Maybe<Permissions>;
  /** search_credentials */
  search_credentials: Maybe<AlgoliaSearchResults>;
  /** execute function "search_daos" which returns "daos" */
  search_daos: Array<Daos>;
  /** execute function "search_daos" and query aggregates on result of table type "daos" */
  search_daos_aggregate: Daos_Aggregate;
  /** execute function "search_gates" which returns "gates" */
  search_gates: Array<Gates>;
  /** execute function "search_gates" and query aggregates on result of table type "gates" */
  search_gates_aggregate: Gates_Aggregate;
  /** execute function "search_users" which returns "users" */
  search_users: Array<Users>;
  /** execute function "search_users" and query aggregates on result of table type "users" */
  search_users_aggregate: Users_Aggregate;
  /** fetch data from the table: "task_progress" */
  task_progress: Array<Task_Progress>;
  /** fetch aggregated fields from the table: "task_progress" */
  task_progress_aggregate: Task_Progress_Aggregate;
  /** fetch data from the table: "task_progress" using primary key columns */
  task_progress_by_pk: Maybe<Task_Progress>;
  /** An array relationship */
  tasks: Array<Tasks>;
  /** An aggregate relationship */
  tasks_aggregate: Tasks_Aggregate;
  /** fetch data from the table: "tasks" using primary key columns */
  tasks_by_pk: Maybe<Tasks>;
  /** An array relationship */
  token_benefits: Array<Token_Benefits>;
  /** An aggregate relationship */
  token_benefits_aggregate: Token_Benefits_Aggregate;
  /** fetch data from the table: "token_benefits" using primary key columns */
  token_benefits_by_pk: Maybe<Token_Benefits>;
  /** transformed_image */
  transformed_image: Maybe<TransformOutput>;
  /** fetch data from the table: "user_following" */
  user_following: Array<User_Following>;
  /** fetch aggregated fields from the table: "user_following" */
  user_following_aggregate: User_Following_Aggregate;
  /** fetch data from the table: "user_socials" */
  user_socials: Array<User_Socials>;
  /** fetch aggregated fields from the table: "user_socials" */
  user_socials_aggregate: User_Socials_Aggregate;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>;
  /** verify_csv_progress */
  verify_csv_progress: Maybe<VerifyCsvProgressOutput>;
  /** An array relationship */
  whitelisted_wallets: Array<Whitelisted_Wallets>;
  /** An aggregate relationship */
  whitelisted_wallets_aggregate: Whitelisted_Wallets_Aggregate;
};


export type Query_RootAccess_TokensArgs = {
  distinct_on: InputMaybe<Array<Access_Tokens_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Access_Tokens_Order_By>>;
  where: InputMaybe<Access_Tokens_Bool_Exp>;
};


export type Query_RootAccess_Tokens_AggregateArgs = {
  distinct_on: InputMaybe<Array<Access_Tokens_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Access_Tokens_Order_By>>;
  where: InputMaybe<Access_Tokens_Bool_Exp>;
};


export type Query_RootAll_Credential_CountArgs = {
  distinct_on: InputMaybe<Array<All_Credential_Count_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<All_Credential_Count_Order_By>>;
  where: InputMaybe<All_Credential_Count_Bool_Exp>;
};


export type Query_RootAll_Credential_Count_AggregateArgs = {
  distinct_on: InputMaybe<Array<All_Credential_Count_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<All_Credential_Count_Order_By>>;
  where: InputMaybe<All_Credential_Count_Bool_Exp>;
};


export type Query_RootBookmarksArgs = {
  distinct_on: InputMaybe<Array<Bookmarks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bookmarks_Order_By>>;
  where: InputMaybe<Bookmarks_Bool_Exp>;
};


export type Query_RootBookmarks_AggregateArgs = {
  distinct_on: InputMaybe<Array<Bookmarks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bookmarks_Order_By>>;
  where: InputMaybe<Bookmarks_Bool_Exp>;
};


export type Query_RootBountiesArgs = {
  distinct_on: InputMaybe<Array<Bounties_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bounties_Order_By>>;
  where: InputMaybe<Bounties_Bool_Exp>;
};


export type Query_RootBounties_AggregateArgs = {
  distinct_on: InputMaybe<Array<Bounties_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bounties_Order_By>>;
  where: InputMaybe<Bounties_Bool_Exp>;
};


export type Query_RootBounties_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCredential_GroupArgs = {
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Query_RootCredential_Group_AggregateArgs = {
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Query_RootCredential_Group_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCredentialsArgs = {
  distinct_on: InputMaybe<Array<Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credentials_Order_By>>;
  where: InputMaybe<Credentials_Bool_Exp>;
};


export type Query_RootCredentials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credentials_Order_By>>;
  where: InputMaybe<Credentials_Bool_Exp>;
};


export type Query_RootCredentials_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootDao_FollowingArgs = {
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


export type Query_RootDao_Following_AggregateArgs = {
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


export type Query_RootDao_SocialsArgs = {
  distinct_on: InputMaybe<Array<Dao_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Socials_Order_By>>;
  where: InputMaybe<Dao_Socials_Bool_Exp>;
};


export type Query_RootDao_Socials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Dao_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Socials_Order_By>>;
  where: InputMaybe<Dao_Socials_Bool_Exp>;
};


export type Query_RootDaosArgs = {
  distinct_on: InputMaybe<Array<Daos_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Daos_Order_By>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Query_RootDaos_AggregateArgs = {
  distinct_on: InputMaybe<Array<Daos_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Daos_Order_By>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Query_RootDaos_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEarnersArgs = {
  distinct_on: InputMaybe<Array<Earners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Earners_Order_By>>;
  where: InputMaybe<Earners_Bool_Exp>;
};


export type Query_RootEarners_AggregateArgs = {
  distinct_on: InputMaybe<Array<Earners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Earners_Order_By>>;
  where: InputMaybe<Earners_Bool_Exp>;
};


export type Query_RootEarners_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootEmail_SubscribersArgs = {
  distinct_on: InputMaybe<Array<Email_Subscribers_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Email_Subscribers_Order_By>>;
  where: InputMaybe<Email_Subscribers_Bool_Exp>;
};


export type Query_RootEmail_Subscribers_AggregateArgs = {
  distinct_on: InputMaybe<Array<Email_Subscribers_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Email_Subscribers_Order_By>>;
  where: InputMaybe<Email_Subscribers_Bool_Exp>;
};


export type Query_RootEmail_Subscribers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootExperiencesArgs = {
  distinct_on: InputMaybe<Array<Experiences_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Experiences_Order_By>>;
  where: InputMaybe<Experiences_Bool_Exp>;
};


export type Query_RootExperiences_AggregateArgs = {
  distinct_on: InputMaybe<Array<Experiences_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Experiences_Order_By>>;
  where: InputMaybe<Experiences_Bool_Exp>;
};


export type Query_RootFilesArgs = {
  distinct_on: InputMaybe<Array<Files_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Files_Order_By>>;
  where: InputMaybe<Files_Bool_Exp>;
};


export type Query_RootFiles_AggregateArgs = {
  distinct_on: InputMaybe<Array<Files_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Files_Order_By>>;
  where: InputMaybe<Files_Bool_Exp>;
};


export type Query_RootFiles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGate_ProgressArgs = {
  distinct_on: InputMaybe<Array<Gate_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gate_Progress_Order_By>>;
  where: InputMaybe<Gate_Progress_Bool_Exp>;
};


export type Query_RootGate_Progress_AggregateArgs = {
  distinct_on: InputMaybe<Array<Gate_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gate_Progress_Order_By>>;
  where: InputMaybe<Gate_Progress_Bool_Exp>;
};


export type Query_RootGate_Progress_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGatesArgs = {
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Query_RootGates_AggregateArgs = {
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Query_RootGates_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootGet_Claimable_CredentialsArgs = {
  args: Get_Claimable_Credentials_Args;
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Query_RootGet_Claimable_Credentials_AggregateArgs = {
  args: Get_Claimable_Credentials_Args;
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Query_RootGet_NonceArgs = {
  wallet: Scalars['String'];
};


export type Query_RootGet_Twitter_TweetArgs = {
  id: Scalars['String'];
};


export type Query_RootGet_Twitter_User_DataArgs = {
  userName: Scalars['String'];
};


export type Query_RootHidden_Experience_CredentialsArgs = {
  distinct_on: InputMaybe<Array<Hidden_Experience_Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Hidden_Experience_Credentials_Order_By>>;
  where: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
};


export type Query_RootHidden_Experience_Credentials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Hidden_Experience_Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Hidden_Experience_Credentials_Order_By>>;
  where: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
};


export type Query_RootManual_Task_EventsArgs = {
  distinct_on: InputMaybe<Array<Manual_Task_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Manual_Task_Events_Order_By>>;
  where: InputMaybe<Manual_Task_Events_Bool_Exp>;
};


export type Query_RootManual_Task_Events_AggregateArgs = {
  distinct_on: InputMaybe<Array<Manual_Task_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Manual_Task_Events_Order_By>>;
  where: InputMaybe<Manual_Task_Events_Bool_Exp>;
};


export type Query_RootManual_Task_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootManual_Task_SubmissionArgs = {
  distinct_on: InputMaybe<Array<Manual_Task_Submission_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Manual_Task_Submission_Order_By>>;
  where: InputMaybe<Manual_Task_Submission_Bool_Exp>;
};


export type Query_RootManual_Task_Submission_AggregateArgs = {
  distinct_on: InputMaybe<Array<Manual_Task_Submission_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Manual_Task_Submission_Order_By>>;
  where: InputMaybe<Manual_Task_Submission_Bool_Exp>;
};


export type Query_RootManual_Task_Submission_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootMeArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootMe_AggregateArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootPermissionsArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


export type Query_RootPermissions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


export type Query_RootPermissions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootSearch_CredentialsArgs = {
  pagination: InputMaybe<AlgoliaPaginationInput>;
  query: Scalars['String'];
};


export type Query_RootSearch_DaosArgs = {
  args: Search_Daos_Args;
  distinct_on: InputMaybe<Array<Daos_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Daos_Order_By>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Query_RootSearch_Daos_AggregateArgs = {
  args: Search_Daos_Args;
  distinct_on: InputMaybe<Array<Daos_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Daos_Order_By>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Query_RootSearch_GatesArgs = {
  args: Search_Gates_Args;
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Query_RootSearch_Gates_AggregateArgs = {
  args: Search_Gates_Args;
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Query_RootSearch_UsersArgs = {
  args: Search_Users_Args;
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootSearch_Users_AggregateArgs = {
  args: Search_Users_Args;
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootTask_ProgressArgs = {
  distinct_on: InputMaybe<Array<Task_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Task_Progress_Order_By>>;
  where: InputMaybe<Task_Progress_Bool_Exp>;
};


export type Query_RootTask_Progress_AggregateArgs = {
  distinct_on: InputMaybe<Array<Task_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Task_Progress_Order_By>>;
  where: InputMaybe<Task_Progress_Bool_Exp>;
};


export type Query_RootTask_Progress_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTasksArgs = {
  distinct_on: InputMaybe<Array<Tasks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Tasks_Order_By>>;
  where: InputMaybe<Tasks_Bool_Exp>;
};


export type Query_RootTasks_AggregateArgs = {
  distinct_on: InputMaybe<Array<Tasks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Tasks_Order_By>>;
  where: InputMaybe<Tasks_Bool_Exp>;
};


export type Query_RootTasks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootToken_BenefitsArgs = {
  distinct_on: InputMaybe<Array<Token_Benefits_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Token_Benefits_Order_By>>;
  where: InputMaybe<Token_Benefits_Bool_Exp>;
};


export type Query_RootToken_Benefits_AggregateArgs = {
  distinct_on: InputMaybe<Array<Token_Benefits_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Token_Benefits_Order_By>>;
  where: InputMaybe<Token_Benefits_Bool_Exp>;
};


export type Query_RootToken_Benefits_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTransformed_ImageArgs = {
  id: Scalars['uuid'];
  options: InputMaybe<OptionsInput>;
};


export type Query_RootUser_FollowingArgs = {
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


export type Query_RootUser_Following_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


export type Query_RootUser_SocialsArgs = {
  distinct_on: InputMaybe<Array<User_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Socials_Order_By>>;
  where: InputMaybe<User_Socials_Bool_Exp>;
};


export type Query_RootUser_Socials_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Socials_Order_By>>;
  where: InputMaybe<User_Socials_Bool_Exp>;
};


export type Query_RootUsersArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootVerify_Csv_ProgressArgs = {
  id: Scalars['uuid'];
};


export type Query_RootWhitelisted_WalletsArgs = {
  distinct_on: InputMaybe<Array<Whitelisted_Wallets_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Whitelisted_Wallets_Order_By>>;
  where: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
};


export type Query_RootWhitelisted_Wallets_AggregateArgs = {
  distinct_on: InputMaybe<Array<Whitelisted_Wallets_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Whitelisted_Wallets_Order_By>>;
  where: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
};

export type Search_Daos_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Search_Gates_Args = {
  search?: InputMaybe<Scalars['String']>;
};

export type Search_Users_Args = {
  search?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "submission_state". All fields are combined with logical 'AND'. */
export type Submission_State_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['submission_state']>;
  _gt?: InputMaybe<Scalars['submission_state']>;
  _gte?: InputMaybe<Scalars['submission_state']>;
  _in?: InputMaybe<Array<Scalars['submission_state']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['submission_state']>;
  _lte?: InputMaybe<Scalars['submission_state']>;
  _neq?: InputMaybe<Scalars['submission_state']>;
  _nin?: InputMaybe<Array<Scalars['submission_state']>>;
};

export type Subscribe_To_Newsletter_Args = {
  email_address?: InputMaybe<Scalars['email']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "access_tokens" */
  access_tokens: Array<Access_Tokens>;
  /** fetch aggregated fields from the table: "access_tokens" */
  access_tokens_aggregate: Access_Tokens_Aggregate;
  /** fetch data from the table in a streaming manner: "access_tokens" */
  access_tokens_stream: Array<Access_Tokens>;
  /** fetch data from the table: "all_credential_count" */
  all_credential_count: Array<All_Credential_Count>;
  /** fetch aggregated fields from the table: "all_credential_count" */
  all_credential_count_aggregate: All_Credential_Count_Aggregate;
  /** fetch data from the table in a streaming manner: "all_credential_count" */
  all_credential_count_stream: Array<All_Credential_Count>;
  /** An array relationship */
  bookmarks: Array<Bookmarks>;
  /** An aggregate relationship */
  bookmarks_aggregate: Bookmarks_Aggregate;
  /** fetch data from the table in a streaming manner: "bookmarks" */
  bookmarks_stream: Array<Bookmarks>;
  /** An array relationship */
  bounties: Array<Bounties>;
  /** An aggregate relationship */
  bounties_aggregate: Bounties_Aggregate;
  /** fetch data from the table: "bounties" using primary key columns */
  bounties_by_pk: Maybe<Bounties>;
  /** fetch data from the table in a streaming manner: "bounties" */
  bounties_stream: Array<Bounties>;
  /** fetch data from the table: "credential_group" */
  credential_group: Array<Credential_Group>;
  /** fetch aggregated fields from the table: "credential_group" */
  credential_group_aggregate: Credential_Group_Aggregate;
  /** fetch data from the table: "credential_group" using primary key columns */
  credential_group_by_pk: Maybe<Credential_Group>;
  /** fetch data from the table in a streaming manner: "credential_group" */
  credential_group_stream: Array<Credential_Group>;
  /** An array relationship */
  credentials: Array<Credentials>;
  /** An aggregate relationship */
  credentials_aggregate: Credentials_Aggregate;
  /** fetch data from the table: "credentials" using primary key columns */
  credentials_by_pk: Maybe<Credentials>;
  /** fetch data from the table in a streaming manner: "credentials" */
  credentials_stream: Array<Credentials>;
  /** fetch data from the table: "dao_following" */
  dao_following: Array<Dao_Following>;
  /** fetch aggregated fields from the table: "dao_following" */
  dao_following_aggregate: Dao_Following_Aggregate;
  /** fetch data from the table in a streaming manner: "dao_following" */
  dao_following_stream: Array<Dao_Following>;
  /** fetch data from the table: "dao_socials" */
  dao_socials: Array<Dao_Socials>;
  /** fetch aggregated fields from the table: "dao_socials" */
  dao_socials_aggregate: Dao_Socials_Aggregate;
  /** fetch data from the table in a streaming manner: "dao_socials" */
  dao_socials_stream: Array<Dao_Socials>;
  /** fetch data from the table: "daos" */
  daos: Array<Daos>;
  /** fetch aggregated fields from the table: "daos" */
  daos_aggregate: Daos_Aggregate;
  /** fetch data from the table: "daos" using primary key columns */
  daos_by_pk: Maybe<Daos>;
  /** fetch data from the table in a streaming manner: "daos" */
  daos_stream: Array<Daos>;
  /** An array relationship */
  earners: Array<Earners>;
  /** An aggregate relationship */
  earners_aggregate: Earners_Aggregate;
  /** fetch data from the table: "earners" using primary key columns */
  earners_by_pk: Maybe<Earners>;
  /** fetch data from the table in a streaming manner: "earners" */
  earners_stream: Array<Earners>;
  /** fetch data from the table: "email_subscribers" */
  email_subscribers: Array<Email_Subscribers>;
  /** fetch aggregated fields from the table: "email_subscribers" */
  email_subscribers_aggregate: Email_Subscribers_Aggregate;
  /** fetch data from the table: "email_subscribers" using primary key columns */
  email_subscribers_by_pk: Maybe<Email_Subscribers>;
  /** fetch data from the table in a streaming manner: "email_subscribers" */
  email_subscribers_stream: Array<Email_Subscribers>;
  /** An array relationship */
  experiences: Array<Experiences>;
  /** An aggregate relationship */
  experiences_aggregate: Experiences_Aggregate;
  /** fetch data from the table in a streaming manner: "experiences" */
  experiences_stream: Array<Experiences>;
  /** fetch data from the table: "files" */
  files: Array<Files>;
  /** fetch aggregated fields from the table: "files" */
  files_aggregate: Files_Aggregate;
  /** fetch data from the table: "files" using primary key columns */
  files_by_pk: Maybe<Files>;
  /** fetch data from the table in a streaming manner: "files" */
  files_stream: Array<Files>;
  /** fetch data from the table: "gate_progress" */
  gate_progress: Array<Gate_Progress>;
  /** fetch aggregated fields from the table: "gate_progress" */
  gate_progress_aggregate: Gate_Progress_Aggregate;
  /** fetch data from the table: "gate_progress" using primary key columns */
  gate_progress_by_pk: Maybe<Gate_Progress>;
  /** fetch data from the table in a streaming manner: "gate_progress" */
  gate_progress_stream: Array<Gate_Progress>;
  /** An array relationship */
  gates: Array<Gates>;
  /** An aggregate relationship */
  gates_aggregate: Gates_Aggregate;
  /** fetch data from the table: "gates" using primary key columns */
  gates_by_pk: Maybe<Gates>;
  /** fetch data from the table in a streaming manner: "gates" */
  gates_stream: Array<Gates>;
  /** execute function "get_claimable_credentials" which returns "credential_group" */
  get_claimable_credentials: Array<Credential_Group>;
  /** execute function "get_claimable_credentials" and query aggregates on result of table type "credential_group" */
  get_claimable_credentials_aggregate: Credential_Group_Aggregate;
  /** fetch data from the table: "hidden_experience_credentials" */
  hidden_experience_credentials: Array<Hidden_Experience_Credentials>;
  /** fetch aggregated fields from the table: "hidden_experience_credentials" */
  hidden_experience_credentials_aggregate: Hidden_Experience_Credentials_Aggregate;
  /** fetch data from the table in a streaming manner: "hidden_experience_credentials" */
  hidden_experience_credentials_stream: Array<Hidden_Experience_Credentials>;
  /** fetch data from the table: "manual_task_events" */
  manual_task_events: Array<Manual_Task_Events>;
  /** fetch aggregated fields from the table: "manual_task_events" */
  manual_task_events_aggregate: Manual_Task_Events_Aggregate;
  /** fetch data from the table: "manual_task_events" using primary key columns */
  manual_task_events_by_pk: Maybe<Manual_Task_Events>;
  /** fetch data from the table in a streaming manner: "manual_task_events" */
  manual_task_events_stream: Array<Manual_Task_Events>;
  /** fetch data from the table: "manual_task_submission" */
  manual_task_submission: Array<Manual_Task_Submission>;
  /** fetch aggregated fields from the table: "manual_task_submission" */
  manual_task_submission_aggregate: Manual_Task_Submission_Aggregate;
  /** fetch data from the table: "manual_task_submission" using primary key columns */
  manual_task_submission_by_pk: Maybe<Manual_Task_Submission>;
  /** fetch data from the table in a streaming manner: "manual_task_submission" */
  manual_task_submission_stream: Array<Manual_Task_Submission>;
  /** execute function "me" which returns "users" */
  me: Maybe<Users>;
  /** execute function "me" and query aggregates on result of table type "users" */
  me_aggregate: Users_Aggregate;
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregate relationship */
  permissions_aggregate: Permissions_Aggregate;
  /** fetch data from the table: "permissions" using primary key columns */
  permissions_by_pk: Maybe<Permissions>;
  /** fetch data from the table in a streaming manner: "permissions" */
  permissions_stream: Array<Permissions>;
  /** execute function "search_daos" which returns "daos" */
  search_daos: Array<Daos>;
  /** execute function "search_daos" and query aggregates on result of table type "daos" */
  search_daos_aggregate: Daos_Aggregate;
  /** execute function "search_gates" which returns "gates" */
  search_gates: Array<Gates>;
  /** execute function "search_gates" and query aggregates on result of table type "gates" */
  search_gates_aggregate: Gates_Aggregate;
  /** execute function "search_users" which returns "users" */
  search_users: Array<Users>;
  /** execute function "search_users" and query aggregates on result of table type "users" */
  search_users_aggregate: Users_Aggregate;
  /** fetch data from the table: "task_progress" */
  task_progress: Array<Task_Progress>;
  /** fetch aggregated fields from the table: "task_progress" */
  task_progress_aggregate: Task_Progress_Aggregate;
  /** fetch data from the table: "task_progress" using primary key columns */
  task_progress_by_pk: Maybe<Task_Progress>;
  /** fetch data from the table in a streaming manner: "task_progress" */
  task_progress_stream: Array<Task_Progress>;
  /** An array relationship */
  tasks: Array<Tasks>;
  /** An aggregate relationship */
  tasks_aggregate: Tasks_Aggregate;
  /** fetch data from the table: "tasks" using primary key columns */
  tasks_by_pk: Maybe<Tasks>;
  /** fetch data from the table in a streaming manner: "tasks" */
  tasks_stream: Array<Tasks>;
  /** An array relationship */
  token_benefits: Array<Token_Benefits>;
  /** An aggregate relationship */
  token_benefits_aggregate: Token_Benefits_Aggregate;
  /** fetch data from the table: "token_benefits" using primary key columns */
  token_benefits_by_pk: Maybe<Token_Benefits>;
  /** fetch data from the table in a streaming manner: "token_benefits" */
  token_benefits_stream: Array<Token_Benefits>;
  /** fetch data from the table: "user_following" */
  user_following: Array<User_Following>;
  /** fetch aggregated fields from the table: "user_following" */
  user_following_aggregate: User_Following_Aggregate;
  /** fetch data from the table in a streaming manner: "user_following" */
  user_following_stream: Array<User_Following>;
  /** fetch data from the table: "user_socials" */
  user_socials: Array<User_Socials>;
  /** fetch aggregated fields from the table: "user_socials" */
  user_socials_aggregate: User_Socials_Aggregate;
  /** fetch data from the table in a streaming manner: "user_socials" */
  user_socials_stream: Array<User_Socials>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
  /** An array relationship */
  whitelisted_wallets: Array<Whitelisted_Wallets>;
  /** An aggregate relationship */
  whitelisted_wallets_aggregate: Whitelisted_Wallets_Aggregate;
  /** fetch data from the table in a streaming manner: "whitelisted_wallets" */
  whitelisted_wallets_stream: Array<Whitelisted_Wallets>;
};


export type Subscription_RootAccess_TokensArgs = {
  distinct_on: InputMaybe<Array<Access_Tokens_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Access_Tokens_Order_By>>;
  where: InputMaybe<Access_Tokens_Bool_Exp>;
};


export type Subscription_RootAccess_Tokens_AggregateArgs = {
  distinct_on: InputMaybe<Array<Access_Tokens_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Access_Tokens_Order_By>>;
  where: InputMaybe<Access_Tokens_Bool_Exp>;
};


export type Subscription_RootAccess_Tokens_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Access_Tokens_Stream_Cursor_Input>>;
  where: InputMaybe<Access_Tokens_Bool_Exp>;
};


export type Subscription_RootAll_Credential_CountArgs = {
  distinct_on: InputMaybe<Array<All_Credential_Count_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<All_Credential_Count_Order_By>>;
  where: InputMaybe<All_Credential_Count_Bool_Exp>;
};


export type Subscription_RootAll_Credential_Count_AggregateArgs = {
  distinct_on: InputMaybe<Array<All_Credential_Count_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<All_Credential_Count_Order_By>>;
  where: InputMaybe<All_Credential_Count_Bool_Exp>;
};


export type Subscription_RootAll_Credential_Count_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<All_Credential_Count_Stream_Cursor_Input>>;
  where: InputMaybe<All_Credential_Count_Bool_Exp>;
};


export type Subscription_RootBookmarksArgs = {
  distinct_on: InputMaybe<Array<Bookmarks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bookmarks_Order_By>>;
  where: InputMaybe<Bookmarks_Bool_Exp>;
};


export type Subscription_RootBookmarks_AggregateArgs = {
  distinct_on: InputMaybe<Array<Bookmarks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bookmarks_Order_By>>;
  where: InputMaybe<Bookmarks_Bool_Exp>;
};


export type Subscription_RootBookmarks_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Bookmarks_Stream_Cursor_Input>>;
  where: InputMaybe<Bookmarks_Bool_Exp>;
};


export type Subscription_RootBountiesArgs = {
  distinct_on: InputMaybe<Array<Bounties_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bounties_Order_By>>;
  where: InputMaybe<Bounties_Bool_Exp>;
};


export type Subscription_RootBounties_AggregateArgs = {
  distinct_on: InputMaybe<Array<Bounties_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bounties_Order_By>>;
  where: InputMaybe<Bounties_Bool_Exp>;
};


export type Subscription_RootBounties_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBounties_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Bounties_Stream_Cursor_Input>>;
  where: InputMaybe<Bounties_Bool_Exp>;
};


export type Subscription_RootCredential_GroupArgs = {
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Subscription_RootCredential_Group_AggregateArgs = {
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Subscription_RootCredential_Group_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCredential_Group_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Credential_Group_Stream_Cursor_Input>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Subscription_RootCredentialsArgs = {
  distinct_on: InputMaybe<Array<Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credentials_Order_By>>;
  where: InputMaybe<Credentials_Bool_Exp>;
};


export type Subscription_RootCredentials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credentials_Order_By>>;
  where: InputMaybe<Credentials_Bool_Exp>;
};


export type Subscription_RootCredentials_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootCredentials_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Credentials_Stream_Cursor_Input>>;
  where: InputMaybe<Credentials_Bool_Exp>;
};


export type Subscription_RootDao_FollowingArgs = {
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


export type Subscription_RootDao_Following_AggregateArgs = {
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


export type Subscription_RootDao_Following_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Dao_Following_Stream_Cursor_Input>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


export type Subscription_RootDao_SocialsArgs = {
  distinct_on: InputMaybe<Array<Dao_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Socials_Order_By>>;
  where: InputMaybe<Dao_Socials_Bool_Exp>;
};


export type Subscription_RootDao_Socials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Dao_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Socials_Order_By>>;
  where: InputMaybe<Dao_Socials_Bool_Exp>;
};


export type Subscription_RootDao_Socials_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Dao_Socials_Stream_Cursor_Input>>;
  where: InputMaybe<Dao_Socials_Bool_Exp>;
};


export type Subscription_RootDaosArgs = {
  distinct_on: InputMaybe<Array<Daos_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Daos_Order_By>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Subscription_RootDaos_AggregateArgs = {
  distinct_on: InputMaybe<Array<Daos_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Daos_Order_By>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Subscription_RootDaos_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootDaos_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Daos_Stream_Cursor_Input>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Subscription_RootEarnersArgs = {
  distinct_on: InputMaybe<Array<Earners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Earners_Order_By>>;
  where: InputMaybe<Earners_Bool_Exp>;
};


export type Subscription_RootEarners_AggregateArgs = {
  distinct_on: InputMaybe<Array<Earners_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Earners_Order_By>>;
  where: InputMaybe<Earners_Bool_Exp>;
};


export type Subscription_RootEarners_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEarners_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Earners_Stream_Cursor_Input>>;
  where: InputMaybe<Earners_Bool_Exp>;
};


export type Subscription_RootEmail_SubscribersArgs = {
  distinct_on: InputMaybe<Array<Email_Subscribers_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Email_Subscribers_Order_By>>;
  where: InputMaybe<Email_Subscribers_Bool_Exp>;
};


export type Subscription_RootEmail_Subscribers_AggregateArgs = {
  distinct_on: InputMaybe<Array<Email_Subscribers_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Email_Subscribers_Order_By>>;
  where: InputMaybe<Email_Subscribers_Bool_Exp>;
};


export type Subscription_RootEmail_Subscribers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootEmail_Subscribers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Email_Subscribers_Stream_Cursor_Input>>;
  where: InputMaybe<Email_Subscribers_Bool_Exp>;
};


export type Subscription_RootExperiencesArgs = {
  distinct_on: InputMaybe<Array<Experiences_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Experiences_Order_By>>;
  where: InputMaybe<Experiences_Bool_Exp>;
};


export type Subscription_RootExperiences_AggregateArgs = {
  distinct_on: InputMaybe<Array<Experiences_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Experiences_Order_By>>;
  where: InputMaybe<Experiences_Bool_Exp>;
};


export type Subscription_RootExperiences_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Experiences_Stream_Cursor_Input>>;
  where: InputMaybe<Experiences_Bool_Exp>;
};


export type Subscription_RootFilesArgs = {
  distinct_on: InputMaybe<Array<Files_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Files_Order_By>>;
  where: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootFiles_AggregateArgs = {
  distinct_on: InputMaybe<Array<Files_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Files_Order_By>>;
  where: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootFiles_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootFiles_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Files_Stream_Cursor_Input>>;
  where: InputMaybe<Files_Bool_Exp>;
};


export type Subscription_RootGate_ProgressArgs = {
  distinct_on: InputMaybe<Array<Gate_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gate_Progress_Order_By>>;
  where: InputMaybe<Gate_Progress_Bool_Exp>;
};


export type Subscription_RootGate_Progress_AggregateArgs = {
  distinct_on: InputMaybe<Array<Gate_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gate_Progress_Order_By>>;
  where: InputMaybe<Gate_Progress_Bool_Exp>;
};


export type Subscription_RootGate_Progress_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGate_Progress_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Gate_Progress_Stream_Cursor_Input>>;
  where: InputMaybe<Gate_Progress_Bool_Exp>;
};


export type Subscription_RootGatesArgs = {
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Subscription_RootGates_AggregateArgs = {
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Subscription_RootGates_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootGates_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Gates_Stream_Cursor_Input>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Subscription_RootGet_Claimable_CredentialsArgs = {
  args: Get_Claimable_Credentials_Args;
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Subscription_RootGet_Claimable_Credentials_AggregateArgs = {
  args: Get_Claimable_Credentials_Args;
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


export type Subscription_RootHidden_Experience_CredentialsArgs = {
  distinct_on: InputMaybe<Array<Hidden_Experience_Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Hidden_Experience_Credentials_Order_By>>;
  where: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
};


export type Subscription_RootHidden_Experience_Credentials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Hidden_Experience_Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Hidden_Experience_Credentials_Order_By>>;
  where: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
};


export type Subscription_RootHidden_Experience_Credentials_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Hidden_Experience_Credentials_Stream_Cursor_Input>>;
  where: InputMaybe<Hidden_Experience_Credentials_Bool_Exp>;
};


export type Subscription_RootManual_Task_EventsArgs = {
  distinct_on: InputMaybe<Array<Manual_Task_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Manual_Task_Events_Order_By>>;
  where: InputMaybe<Manual_Task_Events_Bool_Exp>;
};


export type Subscription_RootManual_Task_Events_AggregateArgs = {
  distinct_on: InputMaybe<Array<Manual_Task_Events_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Manual_Task_Events_Order_By>>;
  where: InputMaybe<Manual_Task_Events_Bool_Exp>;
};


export type Subscription_RootManual_Task_Events_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootManual_Task_Events_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Manual_Task_Events_Stream_Cursor_Input>>;
  where: InputMaybe<Manual_Task_Events_Bool_Exp>;
};


export type Subscription_RootManual_Task_SubmissionArgs = {
  distinct_on: InputMaybe<Array<Manual_Task_Submission_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Manual_Task_Submission_Order_By>>;
  where: InputMaybe<Manual_Task_Submission_Bool_Exp>;
};


export type Subscription_RootManual_Task_Submission_AggregateArgs = {
  distinct_on: InputMaybe<Array<Manual_Task_Submission_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Manual_Task_Submission_Order_By>>;
  where: InputMaybe<Manual_Task_Submission_Bool_Exp>;
};


export type Subscription_RootManual_Task_Submission_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootManual_Task_Submission_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Manual_Task_Submission_Stream_Cursor_Input>>;
  where: InputMaybe<Manual_Task_Submission_Bool_Exp>;
};


export type Subscription_RootMeArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootMe_AggregateArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootPermissionsArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


export type Subscription_RootPermissions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


export type Subscription_RootPermissions_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPermissions_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Permissions_Stream_Cursor_Input>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


export type Subscription_RootSearch_DaosArgs = {
  args: Search_Daos_Args;
  distinct_on: InputMaybe<Array<Daos_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Daos_Order_By>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Subscription_RootSearch_Daos_AggregateArgs = {
  args: Search_Daos_Args;
  distinct_on: InputMaybe<Array<Daos_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Daos_Order_By>>;
  where: InputMaybe<Daos_Bool_Exp>;
};


export type Subscription_RootSearch_GatesArgs = {
  args: Search_Gates_Args;
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Subscription_RootSearch_Gates_AggregateArgs = {
  args: Search_Gates_Args;
  distinct_on: InputMaybe<Array<Gates_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gates_Order_By>>;
  where: InputMaybe<Gates_Bool_Exp>;
};


export type Subscription_RootSearch_UsersArgs = {
  args: Search_Users_Args;
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootSearch_Users_AggregateArgs = {
  args: Search_Users_Args;
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootTask_ProgressArgs = {
  distinct_on: InputMaybe<Array<Task_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Task_Progress_Order_By>>;
  where: InputMaybe<Task_Progress_Bool_Exp>;
};


export type Subscription_RootTask_Progress_AggregateArgs = {
  distinct_on: InputMaybe<Array<Task_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Task_Progress_Order_By>>;
  where: InputMaybe<Task_Progress_Bool_Exp>;
};


export type Subscription_RootTask_Progress_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTask_Progress_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Task_Progress_Stream_Cursor_Input>>;
  where: InputMaybe<Task_Progress_Bool_Exp>;
};


export type Subscription_RootTasksArgs = {
  distinct_on: InputMaybe<Array<Tasks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Tasks_Order_By>>;
  where: InputMaybe<Tasks_Bool_Exp>;
};


export type Subscription_RootTasks_AggregateArgs = {
  distinct_on: InputMaybe<Array<Tasks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Tasks_Order_By>>;
  where: InputMaybe<Tasks_Bool_Exp>;
};


export type Subscription_RootTasks_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootTasks_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Tasks_Stream_Cursor_Input>>;
  where: InputMaybe<Tasks_Bool_Exp>;
};


export type Subscription_RootToken_BenefitsArgs = {
  distinct_on: InputMaybe<Array<Token_Benefits_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Token_Benefits_Order_By>>;
  where: InputMaybe<Token_Benefits_Bool_Exp>;
};


export type Subscription_RootToken_Benefits_AggregateArgs = {
  distinct_on: InputMaybe<Array<Token_Benefits_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Token_Benefits_Order_By>>;
  where: InputMaybe<Token_Benefits_Bool_Exp>;
};


export type Subscription_RootToken_Benefits_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootToken_Benefits_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Token_Benefits_Stream_Cursor_Input>>;
  where: InputMaybe<Token_Benefits_Bool_Exp>;
};


export type Subscription_RootUser_FollowingArgs = {
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


export type Subscription_RootUser_Following_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


export type Subscription_RootUser_Following_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Following_Stream_Cursor_Input>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


export type Subscription_RootUser_SocialsArgs = {
  distinct_on: InputMaybe<Array<User_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Socials_Order_By>>;
  where: InputMaybe<User_Socials_Bool_Exp>;
};


export type Subscription_RootUser_Socials_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Socials_Order_By>>;
  where: InputMaybe<User_Socials_Bool_Exp>;
};


export type Subscription_RootUser_Socials_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<User_Socials_Stream_Cursor_Input>>;
  where: InputMaybe<User_Socials_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootWhitelisted_WalletsArgs = {
  distinct_on: InputMaybe<Array<Whitelisted_Wallets_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Whitelisted_Wallets_Order_By>>;
  where: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
};


export type Subscription_RootWhitelisted_Wallets_AggregateArgs = {
  distinct_on: InputMaybe<Array<Whitelisted_Wallets_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Whitelisted_Wallets_Order_By>>;
  where: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
};


export type Subscription_RootWhitelisted_Wallets_StreamArgs = {
  batch_size: Scalars['Int'];
  cursor: Array<InputMaybe<Whitelisted_Wallets_Stream_Cursor_Input>>;
  where: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
};

/** columns and relationships of "task_progress" */
export type Task_Progress = {
  __typename?: 'task_progress';
  completed: Scalars['key_status'];
  created_at: Scalars['timestamp'];
  /** An object relationship */
  gate: Gates;
  gate_id: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  task: Tasks;
  task_id: Scalars['uuid'];
  updated_at: Scalars['timestamp'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "task_progress" */
export type Task_Progress_Aggregate = {
  __typename?: 'task_progress_aggregate';
  aggregate: Maybe<Task_Progress_Aggregate_Fields>;
  nodes: Array<Task_Progress>;
};

export type Task_Progress_Aggregate_Bool_Exp = {
  count?: InputMaybe<Task_Progress_Aggregate_Bool_Exp_Count>;
};

export type Task_Progress_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Task_Progress_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Task_Progress_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "task_progress" */
export type Task_Progress_Aggregate_Fields = {
  __typename?: 'task_progress_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Task_Progress_Max_Fields>;
  min: Maybe<Task_Progress_Min_Fields>;
};


/** aggregate fields of "task_progress" */
export type Task_Progress_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Task_Progress_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "task_progress" */
export type Task_Progress_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Task_Progress_Max_Order_By>;
  min?: InputMaybe<Task_Progress_Min_Order_By>;
};

/** input type for inserting array relation for remote table "task_progress" */
export type Task_Progress_Arr_Rel_Insert_Input = {
  data: Array<Task_Progress_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Task_Progress_On_Conflict>;
};

/** Boolean expression to filter rows from the table "task_progress". All fields are combined with a logical 'AND'. */
export type Task_Progress_Bool_Exp = {
  _and?: InputMaybe<Array<Task_Progress_Bool_Exp>>;
  _not?: InputMaybe<Task_Progress_Bool_Exp>;
  _or?: InputMaybe<Array<Task_Progress_Bool_Exp>>;
  completed?: InputMaybe<Key_Status_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  gate?: InputMaybe<Gates_Bool_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  task?: InputMaybe<Tasks_Bool_Exp>;
  task_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "task_progress" */
export enum Task_Progress_Constraint {
  /** unique or primary key constraint on columns "id" */
  TaskProgressPk = 'task_progress_pk',
  /** unique or primary key constraint on columns "user_id", "task_id" */
  TaskProgressTaskIdUserIdUindex = 'task_progress_task_id_user_id_uindex'
}

/** input type for inserting data into table "task_progress" */
export type Task_Progress_Insert_Input = {
  completed?: InputMaybe<Scalars['key_status']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate?: InputMaybe<Gates_Obj_Rel_Insert_Input>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  task?: InputMaybe<Tasks_Obj_Rel_Insert_Input>;
  task_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Task_Progress_Max_Fields = {
  __typename?: 'task_progress_max_fields';
  completed: Maybe<Scalars['key_status']>;
  created_at: Maybe<Scalars['timestamp']>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  task_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "task_progress" */
export type Task_Progress_Max_Order_By = {
  completed?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  task_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Task_Progress_Min_Fields = {
  __typename?: 'task_progress_min_fields';
  completed: Maybe<Scalars['key_status']>;
  created_at: Maybe<Scalars['timestamp']>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  task_id: Maybe<Scalars['uuid']>;
  updated_at: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "task_progress" */
export type Task_Progress_Min_Order_By = {
  completed?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  task_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "task_progress" */
export type Task_Progress_Mutation_Response = {
  __typename?: 'task_progress_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Task_Progress>;
};

/** input type for inserting object relation for remote table "task_progress" */
export type Task_Progress_Obj_Rel_Insert_Input = {
  data: Task_Progress_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Task_Progress_On_Conflict>;
};

/** on_conflict condition type for table "task_progress" */
export type Task_Progress_On_Conflict = {
  constraint: Task_Progress_Constraint;
  update_columns: Array<Task_Progress_Update_Column>;
  where?: InputMaybe<Task_Progress_Bool_Exp>;
};

/** Ordering options when selecting data from "task_progress". */
export type Task_Progress_Order_By = {
  completed?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  gate?: InputMaybe<Gates_Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  task?: InputMaybe<Tasks_Order_By>;
  task_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: task_progress */
export type Task_Progress_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "task_progress" */
export enum Task_Progress_Select_Column {
  /** column name */
  Completed = 'completed',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  TaskId = 'task_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "task_progress" */
export type Task_Progress_Set_Input = {
  completed?: InputMaybe<Scalars['key_status']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  task_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "task_progress" */
export type Task_Progress_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Task_Progress_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Task_Progress_Stream_Cursor_Value_Input = {
  completed?: InputMaybe<Scalars['key_status']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  task_id?: InputMaybe<Scalars['uuid']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "task_progress" */
export enum Task_Progress_Update_Column {
  /** column name */
  Completed = 'completed',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  TaskId = 'task_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Task_Progress_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Task_Progress_Set_Input>;
  where: Task_Progress_Bool_Exp;
};

/** Boolean expression to compare columns of type "task_type". All fields are combined with logical 'AND'. */
export type Task_Type_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['task_type']>;
  _gt?: InputMaybe<Scalars['task_type']>;
  _gte?: InputMaybe<Scalars['task_type']>;
  _in?: InputMaybe<Array<Scalars['task_type']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['task_type']>;
  _lte?: InputMaybe<Scalars['task_type']>;
  _neq?: InputMaybe<Scalars['task_type']>;
  _nin?: InputMaybe<Array<Scalars['task_type']>>;
};

/** columns and relationships of "tasks" */
export type Tasks = {
  __typename?: 'tasks';
  description: Maybe<Scalars['String']>;
  /** An object relationship */
  gate: Gates;
  gate_id: Scalars['uuid'];
  id: Scalars['uuid'];
  order: Maybe<Scalars['Int']>;
  task_data: Maybe<Scalars['jsonb']>;
  task_type: Scalars['task_type'];
  title: Maybe<Scalars['String']>;
};


/** columns and relationships of "tasks" */
export type TasksTask_DataArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "tasks" */
export type Tasks_Aggregate = {
  __typename?: 'tasks_aggregate';
  aggregate: Maybe<Tasks_Aggregate_Fields>;
  nodes: Array<Tasks>;
};

export type Tasks_Aggregate_Bool_Exp = {
  count?: InputMaybe<Tasks_Aggregate_Bool_Exp_Count>;
};

export type Tasks_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Tasks_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Tasks_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "tasks" */
export type Tasks_Aggregate_Fields = {
  __typename?: 'tasks_aggregate_fields';
  avg: Maybe<Tasks_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Tasks_Max_Fields>;
  min: Maybe<Tasks_Min_Fields>;
  stddev: Maybe<Tasks_Stddev_Fields>;
  stddev_pop: Maybe<Tasks_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Tasks_Stddev_Samp_Fields>;
  sum: Maybe<Tasks_Sum_Fields>;
  var_pop: Maybe<Tasks_Var_Pop_Fields>;
  var_samp: Maybe<Tasks_Var_Samp_Fields>;
  variance: Maybe<Tasks_Variance_Fields>;
};


/** aggregate fields of "tasks" */
export type Tasks_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Tasks_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "tasks" */
export type Tasks_Aggregate_Order_By = {
  avg?: InputMaybe<Tasks_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Tasks_Max_Order_By>;
  min?: InputMaybe<Tasks_Min_Order_By>;
  stddev?: InputMaybe<Tasks_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Tasks_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Tasks_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Tasks_Sum_Order_By>;
  var_pop?: InputMaybe<Tasks_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Tasks_Var_Samp_Order_By>;
  variance?: InputMaybe<Tasks_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Tasks_Append_Input = {
  task_data?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "tasks" */
export type Tasks_Arr_Rel_Insert_Input = {
  data: Array<Tasks_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Tasks_On_Conflict>;
};

/** aggregate avg on columns */
export type Tasks_Avg_Fields = {
  __typename?: 'tasks_avg_fields';
  order: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "tasks" */
export type Tasks_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "tasks". All fields are combined with a logical 'AND'. */
export type Tasks_Bool_Exp = {
  _and?: InputMaybe<Array<Tasks_Bool_Exp>>;
  _not?: InputMaybe<Tasks_Bool_Exp>;
  _or?: InputMaybe<Array<Tasks_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  gate?: InputMaybe<Gates_Bool_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  task_data?: InputMaybe<Jsonb_Comparison_Exp>;
  task_type?: InputMaybe<Task_Type_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "tasks" */
export enum Tasks_Constraint {
  /** unique or primary key constraint on columns "id" */
  KeysIdUindex = 'keys_id_uindex',
  /** unique or primary key constraint on columns "id" */
  KeysPk = 'keys_pk'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Tasks_Delete_At_Path_Input = {
  task_data?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Tasks_Delete_Elem_Input = {
  task_data?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Tasks_Delete_Key_Input = {
  task_data?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "tasks" */
export type Tasks_Inc_Input = {
  order?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "tasks" */
export type Tasks_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  gate?: InputMaybe<Gates_Obj_Rel_Insert_Input>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  order?: InputMaybe<Scalars['Int']>;
  task_data?: InputMaybe<Scalars['jsonb']>;
  task_type?: InputMaybe<Scalars['task_type']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Tasks_Max_Fields = {
  __typename?: 'tasks_max_fields';
  description: Maybe<Scalars['String']>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  order: Maybe<Scalars['Int']>;
  task_type: Maybe<Scalars['task_type']>;
  title: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "tasks" */
export type Tasks_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  task_type?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Tasks_Min_Fields = {
  __typename?: 'tasks_min_fields';
  description: Maybe<Scalars['String']>;
  gate_id: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  order: Maybe<Scalars['Int']>;
  task_type: Maybe<Scalars['task_type']>;
  title: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "tasks" */
export type Tasks_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  task_type?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "tasks" */
export type Tasks_Mutation_Response = {
  __typename?: 'tasks_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Tasks>;
};

/** input type for inserting object relation for remote table "tasks" */
export type Tasks_Obj_Rel_Insert_Input = {
  data: Tasks_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Tasks_On_Conflict>;
};

/** on_conflict condition type for table "tasks" */
export type Tasks_On_Conflict = {
  constraint: Tasks_Constraint;
  update_columns: Array<Tasks_Update_Column>;
  where?: InputMaybe<Tasks_Bool_Exp>;
};

/** Ordering options when selecting data from "tasks". */
export type Tasks_Order_By = {
  description?: InputMaybe<Order_By>;
  gate?: InputMaybe<Gates_Order_By>;
  gate_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  task_data?: InputMaybe<Order_By>;
  task_type?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: tasks */
export type Tasks_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Tasks_Prepend_Input = {
  task_data?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "tasks" */
export enum Tasks_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  TaskData = 'task_data',
  /** column name */
  TaskType = 'task_type',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "tasks" */
export type Tasks_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  order?: InputMaybe<Scalars['Int']>;
  task_data?: InputMaybe<Scalars['jsonb']>;
  task_type?: InputMaybe<Scalars['task_type']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Tasks_Stddev_Fields = {
  __typename?: 'tasks_stddev_fields';
  order: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "tasks" */
export type Tasks_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Tasks_Stddev_Pop_Fields = {
  __typename?: 'tasks_stddev_pop_fields';
  order: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "tasks" */
export type Tasks_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Tasks_Stddev_Samp_Fields = {
  __typename?: 'tasks_stddev_samp_fields';
  order: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "tasks" */
export type Tasks_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "tasks" */
export type Tasks_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tasks_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Tasks_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  order?: InputMaybe<Scalars['Int']>;
  task_data?: InputMaybe<Scalars['jsonb']>;
  task_type?: InputMaybe<Scalars['task_type']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate sum on columns */
export type Tasks_Sum_Fields = {
  __typename?: 'tasks_sum_fields';
  order: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "tasks" */
export type Tasks_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "tasks" */
export enum Tasks_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  TaskData = 'task_data',
  /** column name */
  TaskType = 'task_type',
  /** column name */
  Title = 'title'
}

export type Tasks_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Tasks_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Tasks_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Tasks_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Tasks_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Tasks_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Tasks_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tasks_Set_Input>;
  where: Tasks_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Tasks_Var_Pop_Fields = {
  __typename?: 'tasks_var_pop_fields';
  order: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "tasks" */
export type Tasks_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Tasks_Var_Samp_Fields = {
  __typename?: 'tasks_var_samp_fields';
  order: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "tasks" */
export type Tasks_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Tasks_Variance_Fields = {
  __typename?: 'tasks_variance_fields';
  order: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "tasks" */
export type Tasks_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']>;
  _gt?: InputMaybe<Scalars['timestamp']>;
  _gte?: InputMaybe<Scalars['timestamp']>;
  _in?: InputMaybe<Array<Scalars['timestamp']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamp']>;
  _lte?: InputMaybe<Scalars['timestamp']>;
  _neq?: InputMaybe<Scalars['timestamp']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "token_benefits" */
export type Token_Benefits = {
  __typename?: 'token_benefits';
  amount: Maybe<Scalars['String']>;
  created_at: Scalars['timestamp'];
  dao_id: Scalars['uuid'];
  description: Scalars['String'];
  id: Scalars['uuid'];
  title: Scalars['String'];
  token: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamp'];
};

/** aggregated selection of "token_benefits" */
export type Token_Benefits_Aggregate = {
  __typename?: 'token_benefits_aggregate';
  aggregate: Maybe<Token_Benefits_Aggregate_Fields>;
  nodes: Array<Token_Benefits>;
};

export type Token_Benefits_Aggregate_Bool_Exp = {
  count?: InputMaybe<Token_Benefits_Aggregate_Bool_Exp_Count>;
};

export type Token_Benefits_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Token_Benefits_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Token_Benefits_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "token_benefits" */
export type Token_Benefits_Aggregate_Fields = {
  __typename?: 'token_benefits_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Token_Benefits_Max_Fields>;
  min: Maybe<Token_Benefits_Min_Fields>;
};


/** aggregate fields of "token_benefits" */
export type Token_Benefits_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Token_Benefits_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "token_benefits" */
export type Token_Benefits_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Token_Benefits_Max_Order_By>;
  min?: InputMaybe<Token_Benefits_Min_Order_By>;
};

/** input type for inserting array relation for remote table "token_benefits" */
export type Token_Benefits_Arr_Rel_Insert_Input = {
  data: Array<Token_Benefits_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Token_Benefits_On_Conflict>;
};

/** Boolean expression to filter rows from the table "token_benefits". All fields are combined with a logical 'AND'. */
export type Token_Benefits_Bool_Exp = {
  _and?: InputMaybe<Array<Token_Benefits_Bool_Exp>>;
  _not?: InputMaybe<Token_Benefits_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Benefits_Bool_Exp>>;
  amount?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  dao_id?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "token_benefits" */
export enum Token_Benefits_Constraint {
  /** unique or primary key constraint on columns "id" */
  TokenBenefitsIdUindex = 'token_benefits_id_uindex',
  /** unique or primary key constraint on columns "id" */
  TokenBenefitsPk = 'token_benefits_pk'
}

/** input type for inserting data into table "token_benefits" */
export type Token_Benefits_Insert_Input = {
  amount?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type Token_Benefits_Max_Fields = {
  __typename?: 'token_benefits_max_fields';
  amount: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamp']>;
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  title: Maybe<Scalars['String']>;
  token: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamp']>;
};

/** order by max() on columns of table "token_benefits" */
export type Token_Benefits_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Benefits_Min_Fields = {
  __typename?: 'token_benefits_min_fields';
  amount: Maybe<Scalars['String']>;
  created_at: Maybe<Scalars['timestamp']>;
  dao_id: Maybe<Scalars['uuid']>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  title: Maybe<Scalars['String']>;
  token: Maybe<Scalars['String']>;
  updated_at: Maybe<Scalars['timestamp']>;
};

/** order by min() on columns of table "token_benefits" */
export type Token_Benefits_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "token_benefits" */
export type Token_Benefits_Mutation_Response = {
  __typename?: 'token_benefits_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Token_Benefits>;
};

/** on_conflict condition type for table "token_benefits" */
export type Token_Benefits_On_Conflict = {
  constraint: Token_Benefits_Constraint;
  update_columns: Array<Token_Benefits_Update_Column>;
  where?: InputMaybe<Token_Benefits_Bool_Exp>;
};

/** Ordering options when selecting data from "token_benefits". */
export type Token_Benefits_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  dao_id?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
  token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: token_benefits */
export type Token_Benefits_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "token_benefits" */
export enum Token_Benefits_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "token_benefits" */
export type Token_Benefits_Set_Input = {
  amount?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** Streaming cursor of the table "token_benefits" */
export type Token_Benefits_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Token_Benefits_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Token_Benefits_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['timestamp']>;
  dao_id?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "token_benefits" */
export enum Token_Benefits_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DaoId = 'dao_id',
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  Token = 'token',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Token_Benefits_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Token_Benefits_Set_Input>;
  where: Token_Benefits_Bool_Exp;
};

export type Unfollow_Dao_Args = {
  id?: InputMaybe<Scalars['uuid']>;
};

export type Unfollow_User_Args = {
  id?: InputMaybe<Scalars['uuid']>;
};

export type Unsubscribe_To_Newsletter_Args = {
  email_address?: InputMaybe<Scalars['email']>;
};

/** columns and relationships of "user_following" */
export type User_Following = {
  __typename?: 'user_following';
  followed_at: Scalars['timestamp'];
  /** An object relationship */
  follower: Users;
  follower_id: Scalars['uuid'];
  status: Scalars['following_state'];
  updated_at: Scalars['timestamp'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid'];
};

/** aggregated selection of "user_following" */
export type User_Following_Aggregate = {
  __typename?: 'user_following_aggregate';
  aggregate: Maybe<User_Following_Aggregate_Fields>;
  nodes: Array<User_Following>;
};

export type User_Following_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Following_Aggregate_Bool_Exp_Count>;
};

export type User_Following_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Following_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<User_Following_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_following" */
export type User_Following_Aggregate_Fields = {
  __typename?: 'user_following_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<User_Following_Max_Fields>;
  min: Maybe<User_Following_Min_Fields>;
};


/** aggregate fields of "user_following" */
export type User_Following_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<User_Following_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_following" */
export type User_Following_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Following_Max_Order_By>;
  min?: InputMaybe<User_Following_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_following" */
export type User_Following_Arr_Rel_Insert_Input = {
  data: Array<User_Following_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Following_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_following". All fields are combined with a logical 'AND'. */
export type User_Following_Bool_Exp = {
  _and?: InputMaybe<Array<User_Following_Bool_Exp>>;
  _not?: InputMaybe<User_Following_Bool_Exp>;
  _or?: InputMaybe<Array<User_Following_Bool_Exp>>;
  followed_at?: InputMaybe<Timestamp_Comparison_Exp>;
  follower?: InputMaybe<Users_Bool_Exp>;
  follower_id?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<Following_State_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_following" */
export enum User_Following_Constraint {
  /** unique or primary key constraint on columns "follower_id", "user_id" */
  UserFollowingUserIdFollowerIdUindex = 'user_following_user_id_follower_id_uindex'
}

/** input type for inserting data into table "user_following" */
export type User_Following_Insert_Input = {
  followed_at?: InputMaybe<Scalars['timestamp']>;
  follower?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  follower_id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['following_state']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type User_Following_Max_Fields = {
  __typename?: 'user_following_max_fields';
  followed_at: Maybe<Scalars['timestamp']>;
  follower_id: Maybe<Scalars['uuid']>;
  status: Maybe<Scalars['following_state']>;
  updated_at: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "user_following" */
export type User_Following_Max_Order_By = {
  followed_at?: InputMaybe<Order_By>;
  follower_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Following_Min_Fields = {
  __typename?: 'user_following_min_fields';
  followed_at: Maybe<Scalars['timestamp']>;
  follower_id: Maybe<Scalars['uuid']>;
  status: Maybe<Scalars['following_state']>;
  updated_at: Maybe<Scalars['timestamp']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "user_following" */
export type User_Following_Min_Order_By = {
  followed_at?: InputMaybe<Order_By>;
  follower_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_following" */
export type User_Following_Mutation_Response = {
  __typename?: 'user_following_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Following>;
};

/** on_conflict condition type for table "user_following" */
export type User_Following_On_Conflict = {
  constraint: User_Following_Constraint;
  update_columns: Array<User_Following_Update_Column>;
  where?: InputMaybe<User_Following_Bool_Exp>;
};

/** Ordering options when selecting data from "user_following". */
export type User_Following_Order_By = {
  followed_at?: InputMaybe<Order_By>;
  follower?: InputMaybe<Users_Order_By>;
  follower_id?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "user_following" */
export enum User_Following_Select_Column {
  /** column name */
  FollowedAt = 'followed_at',
  /** column name */
  FollowerId = 'follower_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_following" */
export type User_Following_Set_Input = {
  followed_at?: InputMaybe<Scalars['timestamp']>;
  follower_id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['following_state']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "user_following" */
export type User_Following_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Following_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Following_Stream_Cursor_Value_Input = {
  followed_at?: InputMaybe<Scalars['timestamp']>;
  follower_id?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<Scalars['following_state']>;
  updated_at?: InputMaybe<Scalars['timestamp']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "user_following" */
export enum User_Following_Update_Column {
  /** column name */
  FollowedAt = 'followed_at',
  /** column name */
  FollowerId = 'follower_id',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type User_Following_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Following_Set_Input>;
  where: User_Following_Bool_Exp;
};

/** columns and relationships of "user_socials" */
export type User_Socials = {
  __typename?: 'user_socials';
  network: Scalars['String'];
  url: Scalars['String'];
  user_id: Scalars['uuid'];
};

/** aggregated selection of "user_socials" */
export type User_Socials_Aggregate = {
  __typename?: 'user_socials_aggregate';
  aggregate: Maybe<User_Socials_Aggregate_Fields>;
  nodes: Array<User_Socials>;
};

export type User_Socials_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Socials_Aggregate_Bool_Exp_Count>;
};

export type User_Socials_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Socials_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<User_Socials_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_socials" */
export type User_Socials_Aggregate_Fields = {
  __typename?: 'user_socials_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<User_Socials_Max_Fields>;
  min: Maybe<User_Socials_Min_Fields>;
};


/** aggregate fields of "user_socials" */
export type User_Socials_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<User_Socials_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_socials" */
export type User_Socials_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Socials_Max_Order_By>;
  min?: InputMaybe<User_Socials_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_socials" */
export type User_Socials_Arr_Rel_Insert_Input = {
  data: Array<User_Socials_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Socials_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_socials". All fields are combined with a logical 'AND'. */
export type User_Socials_Bool_Exp = {
  _and?: InputMaybe<Array<User_Socials_Bool_Exp>>;
  _not?: InputMaybe<User_Socials_Bool_Exp>;
  _or?: InputMaybe<Array<User_Socials_Bool_Exp>>;
  network?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_socials" */
export enum User_Socials_Constraint {
  /** unique or primary key constraint on columns "network", "user_id" */
  UserSocialsUserIdNetworkKey = 'user_socials_user_id_network_key'
}

/** input type for inserting data into table "user_socials" */
export type User_Socials_Insert_Input = {
  network?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type User_Socials_Max_Fields = {
  __typename?: 'user_socials_max_fields';
  network: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "user_socials" */
export type User_Socials_Max_Order_By = {
  network?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Socials_Min_Fields = {
  __typename?: 'user_socials_min_fields';
  network: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
  user_id: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "user_socials" */
export type User_Socials_Min_Order_By = {
  network?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_socials" */
export type User_Socials_Mutation_Response = {
  __typename?: 'user_socials_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Socials>;
};

/** on_conflict condition type for table "user_socials" */
export type User_Socials_On_Conflict = {
  constraint: User_Socials_Constraint;
  update_columns: Array<User_Socials_Update_Column>;
  where?: InputMaybe<User_Socials_Bool_Exp>;
};

/** Ordering options when selecting data from "user_socials". */
export type User_Socials_Order_By = {
  network?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** select columns of table "user_socials" */
export enum User_Socials_Select_Column {
  /** column name */
  Network = 'network',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_socials" */
export type User_Socials_Set_Input = {
  network?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "user_socials" */
export type User_Socials_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Socials_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Socials_Stream_Cursor_Value_Input = {
  network?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "user_socials" */
export enum User_Socials_Update_Column {
  /** column name */
  Network = 'network',
  /** column name */
  Url = 'url',
  /** column name */
  UserId = 'user_id'
}

export type User_Socials_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Socials_Set_Input>;
  where: User_Socials_Bool_Exp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  about: Maybe<Scalars['String']>;
  /** An object relationship */
  access_tokens: Maybe<Access_Tokens>;
  attitudes: Maybe<Scalars['jsonb']>;
  bio: Maybe<Scalars['String']>;
  blacklistedFlags: Scalars['_text'];
  /** An array relationship */
  bookmarks: Array<Bookmarks>;
  /** An aggregate relationship */
  bookmarks_aggregate: Bookmarks_Aggregate;
  /** A computed field, executes function "get_claimable_credentials" */
  claimable_credentials: Maybe<Array<Credential_Group>>;
  /** An object relationship */
  cover: Maybe<Files>;
  cover_id: Maybe<Scalars['uuid']>;
  createdAt: Scalars['timestamp'];
  /** An array relationship */
  credential_groups: Array<Credential_Group>;
  /** An aggregate relationship */
  credential_groups_aggregate: Credential_Group_Aggregate;
  /** An array relationship */
  credentials: Array<Credentials>;
  /** An aggregate relationship */
  credentials_aggregate: Credentials_Aggregate;
  device: Maybe<Scalars['String']>;
  discord_id: Maybe<Scalars['String']>;
  email_address: Maybe<Scalars['citext']>;
  ens: Maybe<Scalars['String']>;
  /** An array relationship */
  experiences: Array<Experiences>;
  /** An aggregate relationship */
  experiences_aggregate: Experiences_Aggregate;
  /** An array relationship */
  followed_by: Array<User_Following>;
  /** An aggregate relationship */
  followed_by_aggregate: User_Following_Aggregate;
  /** An array relationship */
  following: Array<User_Following>;
  /** An aggregate relationship */
  following_aggregate: User_Following_Aggregate;
  /** An array relationship */
  following_dao: Array<Dao_Following>;
  /** An aggregate relationship */
  following_dao_aggregate: Dao_Following_Aggregate;
  /** An array relationship */
  gate_progresses: Array<Gate_Progress>;
  /** An aggregate relationship */
  gate_progresses_aggregate: Gate_Progress_Aggregate;
  id: Scalars['uuid'];
  init: Scalars['Boolean'];
  is_poc_whitelisted: Scalars['Boolean'];
  knowledges: Maybe<Scalars['jsonb']>;
  languages: Maybe<Scalars['jsonb']>;
  name: Maybe<Scalars['String']>;
  nonce: Scalars['Int'];
  /** An array relationship */
  permissions: Array<Permissions>;
  /** An aggregate relationship */
  permissions_aggregate: Permissions_Aggregate;
  pfp: Maybe<Scalars['String']>;
  pic_id: Maybe<Scalars['uuid']>;
  /** An object relationship */
  picture: Maybe<Files>;
  refresh_token: Maybe<Scalars['String']>;
  skills: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  socials: Array<User_Socials>;
  /** An aggregate relationship */
  socials_aggregate: User_Socials_Aggregate;
  /** An array relationship */
  task_progresses: Array<Task_Progress>;
  /** An aggregate relationship */
  task_progresses_aggregate: Task_Progress_Aggregate;
  timezone: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamp'];
  username: Maybe<Scalars['String']>;
  wallet: Maybe<Scalars['String']>;
  whitelistedFlags: Scalars['_text'];
};


/** columns and relationships of "users" */
export type UsersAttitudesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersBookmarksArgs = {
  distinct_on: InputMaybe<Array<Bookmarks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bookmarks_Order_By>>;
  where: InputMaybe<Bookmarks_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersBookmarks_AggregateArgs = {
  distinct_on: InputMaybe<Array<Bookmarks_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Bookmarks_Order_By>>;
  where: InputMaybe<Bookmarks_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersClaimable_CredentialsArgs = {
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCredential_GroupsArgs = {
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCredential_Groups_AggregateArgs = {
  distinct_on: InputMaybe<Array<Credential_Group_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credential_Group_Order_By>>;
  where: InputMaybe<Credential_Group_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCredentialsArgs = {
  distinct_on: InputMaybe<Array<Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credentials_Order_By>>;
  where: InputMaybe<Credentials_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCredentials_AggregateArgs = {
  distinct_on: InputMaybe<Array<Credentials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Credentials_Order_By>>;
  where: InputMaybe<Credentials_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersExperiencesArgs = {
  distinct_on: InputMaybe<Array<Experiences_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Experiences_Order_By>>;
  where: InputMaybe<Experiences_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersExperiences_AggregateArgs = {
  distinct_on: InputMaybe<Array<Experiences_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Experiences_Order_By>>;
  where: InputMaybe<Experiences_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFollowed_ByArgs = {
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFollowed_By_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFollowingArgs = {
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFollowing_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Following_Order_By>>;
  where: InputMaybe<User_Following_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFollowing_DaoArgs = {
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFollowing_Dao_AggregateArgs = {
  distinct_on: InputMaybe<Array<Dao_Following_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Dao_Following_Order_By>>;
  where: InputMaybe<Dao_Following_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersGate_ProgressesArgs = {
  distinct_on: InputMaybe<Array<Gate_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gate_Progress_Order_By>>;
  where: InputMaybe<Gate_Progress_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersGate_Progresses_AggregateArgs = {
  distinct_on: InputMaybe<Array<Gate_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Gate_Progress_Order_By>>;
  where: InputMaybe<Gate_Progress_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersKnowledgesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersLanguagesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersPermissionsArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersPermissions_AggregateArgs = {
  distinct_on: InputMaybe<Array<Permissions_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Permissions_Order_By>>;
  where: InputMaybe<Permissions_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersSkillsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersSocialsArgs = {
  distinct_on: InputMaybe<Array<User_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Socials_Order_By>>;
  where: InputMaybe<User_Socials_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersSocials_AggregateArgs = {
  distinct_on: InputMaybe<Array<User_Socials_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<User_Socials_Order_By>>;
  where: InputMaybe<User_Socials_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTask_ProgressesArgs = {
  distinct_on: InputMaybe<Array<Task_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Task_Progress_Order_By>>;
  where: InputMaybe<Task_Progress_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersTask_Progresses_AggregateArgs = {
  distinct_on: InputMaybe<Array<Task_Progress_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Task_Progress_Order_By>>;
  where: InputMaybe<Task_Progress_Bool_Exp>;
};

export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  avg: Maybe<Users_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Users_Max_Fields>;
  min: Maybe<Users_Min_Fields>;
  stddev: Maybe<Users_Stddev_Fields>;
  stddev_pop: Maybe<Users_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Users_Stddev_Samp_Fields>;
  sum: Maybe<Users_Sum_Fields>;
  var_pop: Maybe<Users_Var_Pop_Fields>;
  var_samp: Maybe<Users_Var_Samp_Fields>;
  variance: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Users_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  avg?: InputMaybe<Users_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Users_Max_Order_By>;
  min?: InputMaybe<Users_Min_Order_By>;
  stddev?: InputMaybe<Users_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Users_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Users_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Users_Sum_Order_By>;
  var_pop?: InputMaybe<Users_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Users_Var_Samp_Order_By>;
  variance?: InputMaybe<Users_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Users_Append_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  languages?: InputMaybe<Scalars['jsonb']>;
  skills?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields';
  nonce: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  nonce?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  about?: InputMaybe<String_Comparison_Exp>;
  access_tokens?: InputMaybe<Access_Tokens_Bool_Exp>;
  attitudes?: InputMaybe<Jsonb_Comparison_Exp>;
  bio?: InputMaybe<String_Comparison_Exp>;
  blacklistedFlags?: InputMaybe<_Text_Comparison_Exp>;
  bookmarks?: InputMaybe<Bookmarks_Bool_Exp>;
  bookmarks_aggregate?: InputMaybe<Bookmarks_Aggregate_Bool_Exp>;
  claimable_credentials?: InputMaybe<Credential_Group_Bool_Exp>;
  cover?: InputMaybe<Files_Bool_Exp>;
  cover_id?: InputMaybe<Uuid_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamp_Comparison_Exp>;
  credential_groups?: InputMaybe<Credential_Group_Bool_Exp>;
  credential_groups_aggregate?: InputMaybe<Credential_Group_Aggregate_Bool_Exp>;
  credentials?: InputMaybe<Credentials_Bool_Exp>;
  credentials_aggregate?: InputMaybe<Credentials_Aggregate_Bool_Exp>;
  device?: InputMaybe<String_Comparison_Exp>;
  discord_id?: InputMaybe<String_Comparison_Exp>;
  email_address?: InputMaybe<Citext_Comparison_Exp>;
  ens?: InputMaybe<String_Comparison_Exp>;
  experiences?: InputMaybe<Experiences_Bool_Exp>;
  experiences_aggregate?: InputMaybe<Experiences_Aggregate_Bool_Exp>;
  followed_by?: InputMaybe<User_Following_Bool_Exp>;
  followed_by_aggregate?: InputMaybe<User_Following_Aggregate_Bool_Exp>;
  following?: InputMaybe<User_Following_Bool_Exp>;
  following_aggregate?: InputMaybe<User_Following_Aggregate_Bool_Exp>;
  following_dao?: InputMaybe<Dao_Following_Bool_Exp>;
  following_dao_aggregate?: InputMaybe<Dao_Following_Aggregate_Bool_Exp>;
  gate_progresses?: InputMaybe<Gate_Progress_Bool_Exp>;
  gate_progresses_aggregate?: InputMaybe<Gate_Progress_Aggregate_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  init?: InputMaybe<Boolean_Comparison_Exp>;
  is_poc_whitelisted?: InputMaybe<Boolean_Comparison_Exp>;
  knowledges?: InputMaybe<Jsonb_Comparison_Exp>;
  languages?: InputMaybe<Jsonb_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  nonce?: InputMaybe<Int_Comparison_Exp>;
  permissions?: InputMaybe<Permissions_Bool_Exp>;
  permissions_aggregate?: InputMaybe<Permissions_Aggregate_Bool_Exp>;
  pfp?: InputMaybe<String_Comparison_Exp>;
  pic_id?: InputMaybe<Uuid_Comparison_Exp>;
  picture?: InputMaybe<Files_Bool_Exp>;
  refresh_token?: InputMaybe<String_Comparison_Exp>;
  skills?: InputMaybe<Jsonb_Comparison_Exp>;
  socials?: InputMaybe<User_Socials_Bool_Exp>;
  socials_aggregate?: InputMaybe<User_Socials_Aggregate_Bool_Exp>;
  task_progresses?: InputMaybe<Task_Progress_Bool_Exp>;
  task_progresses_aggregate?: InputMaybe<Task_Progress_Aggregate_Bool_Exp>;
  timezone?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamp_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  wallet?: InputMaybe<String_Comparison_Exp>;
  whitelistedFlags?: InputMaybe<_Text_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserIdUindex = 'user_id_uindex',
  /** unique or primary key constraint on columns "username" */
  UserUsernameUindex = 'user_username_uindex',
  /** unique or primary key constraint on columns "wallet" */
  UserWalletUindex = 'user_wallet_uindex',
  /** unique or primary key constraint on columns "discord_id" */
  UsersDiscordIdUindex = 'users_discord_id_uindex',
  /** unique or primary key constraint on columns "email_address" */
  UsersEmailAddressUindex = 'users_email_address_uindex',
  /** unique or primary key constraint on columns "id" */
  UsersPk = 'users_pk',
  /** unique or primary key constraint on columns "refresh_token" */
  UsersRefreshTokenUindex = 'users_refresh_token_uindex',
  /** unique or primary key constraint on columns "wallet" */
  UsersWalletUindex = 'users_wallet_uindex'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Users_Delete_At_Path_Input = {
  attitudes?: InputMaybe<Array<Scalars['String']>>;
  knowledges?: InputMaybe<Array<Scalars['String']>>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  skills?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Users_Delete_Elem_Input = {
  attitudes?: InputMaybe<Scalars['Int']>;
  knowledges?: InputMaybe<Scalars['Int']>;
  languages?: InputMaybe<Scalars['Int']>;
  skills?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Users_Delete_Key_Input = {
  attitudes?: InputMaybe<Scalars['String']>;
  knowledges?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
  nonce?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  about?: InputMaybe<Scalars['String']>;
  access_tokens?: InputMaybe<Access_Tokens_Obj_Rel_Insert_Input>;
  attitudes?: InputMaybe<Scalars['jsonb']>;
  bio?: InputMaybe<Scalars['String']>;
  blacklistedFlags?: InputMaybe<Scalars['_text']>;
  bookmarks?: InputMaybe<Bookmarks_Arr_Rel_Insert_Input>;
  cover?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  cover_id?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamp']>;
  credential_groups?: InputMaybe<Credential_Group_Arr_Rel_Insert_Input>;
  credentials?: InputMaybe<Credentials_Arr_Rel_Insert_Input>;
  device?: InputMaybe<Scalars['String']>;
  discord_id?: InputMaybe<Scalars['String']>;
  email_address?: InputMaybe<Scalars['citext']>;
  ens?: InputMaybe<Scalars['String']>;
  experiences?: InputMaybe<Experiences_Arr_Rel_Insert_Input>;
  followed_by?: InputMaybe<User_Following_Arr_Rel_Insert_Input>;
  following?: InputMaybe<User_Following_Arr_Rel_Insert_Input>;
  following_dao?: InputMaybe<Dao_Following_Arr_Rel_Insert_Input>;
  gate_progresses?: InputMaybe<Gate_Progress_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  init?: InputMaybe<Scalars['Boolean']>;
  is_poc_whitelisted?: InputMaybe<Scalars['Boolean']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  languages?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['Int']>;
  permissions?: InputMaybe<Permissions_Arr_Rel_Insert_Input>;
  pfp?: InputMaybe<Scalars['String']>;
  pic_id?: InputMaybe<Scalars['uuid']>;
  picture?: InputMaybe<Files_Obj_Rel_Insert_Input>;
  refresh_token?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  socials?: InputMaybe<User_Socials_Arr_Rel_Insert_Input>;
  task_progresses?: InputMaybe<Task_Progress_Arr_Rel_Insert_Input>;
  timezone?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamp']>;
  username?: InputMaybe<Scalars['String']>;
  wallet?: InputMaybe<Scalars['String']>;
  whitelistedFlags?: InputMaybe<Scalars['_text']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  about: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  cover_id: Maybe<Scalars['uuid']>;
  createdAt: Maybe<Scalars['timestamp']>;
  device: Maybe<Scalars['String']>;
  discord_id: Maybe<Scalars['String']>;
  email_address: Maybe<Scalars['citext']>;
  ens: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  nonce: Maybe<Scalars['Int']>;
  pfp: Maybe<Scalars['String']>;
  pic_id: Maybe<Scalars['uuid']>;
  refresh_token: Maybe<Scalars['String']>;
  timezone: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamp']>;
  username: Maybe<Scalars['String']>;
  wallet: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  about?: InputMaybe<Order_By>;
  bio?: InputMaybe<Order_By>;
  cover_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  device?: InputMaybe<Order_By>;
  discord_id?: InputMaybe<Order_By>;
  email_address?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pfp?: InputMaybe<Order_By>;
  pic_id?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  about: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  cover_id: Maybe<Scalars['uuid']>;
  createdAt: Maybe<Scalars['timestamp']>;
  device: Maybe<Scalars['String']>;
  discord_id: Maybe<Scalars['String']>;
  email_address: Maybe<Scalars['citext']>;
  ens: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  name: Maybe<Scalars['String']>;
  nonce: Maybe<Scalars['Int']>;
  pfp: Maybe<Scalars['String']>;
  pic_id: Maybe<Scalars['uuid']>;
  refresh_token: Maybe<Scalars['String']>;
  timezone: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamp']>;
  username: Maybe<Scalars['String']>;
  wallet: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  about?: InputMaybe<Order_By>;
  bio?: InputMaybe<Order_By>;
  cover_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  device?: InputMaybe<Order_By>;
  discord_id?: InputMaybe<Order_By>;
  email_address?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  pfp?: InputMaybe<Order_By>;
  pic_id?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  timezone?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  about?: InputMaybe<Order_By>;
  access_tokens?: InputMaybe<Access_Tokens_Order_By>;
  attitudes?: InputMaybe<Order_By>;
  bio?: InputMaybe<Order_By>;
  blacklistedFlags?: InputMaybe<Order_By>;
  bookmarks_aggregate?: InputMaybe<Bookmarks_Aggregate_Order_By>;
  claimable_credentials_aggregate?: InputMaybe<Credential_Group_Aggregate_Order_By>;
  cover?: InputMaybe<Files_Order_By>;
  cover_id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  credential_groups_aggregate?: InputMaybe<Credential_Group_Aggregate_Order_By>;
  credentials_aggregate?: InputMaybe<Credentials_Aggregate_Order_By>;
  device?: InputMaybe<Order_By>;
  discord_id?: InputMaybe<Order_By>;
  email_address?: InputMaybe<Order_By>;
  ens?: InputMaybe<Order_By>;
  experiences_aggregate?: InputMaybe<Experiences_Aggregate_Order_By>;
  followed_by_aggregate?: InputMaybe<User_Following_Aggregate_Order_By>;
  following_aggregate?: InputMaybe<User_Following_Aggregate_Order_By>;
  following_dao_aggregate?: InputMaybe<Dao_Following_Aggregate_Order_By>;
  gate_progresses_aggregate?: InputMaybe<Gate_Progress_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  init?: InputMaybe<Order_By>;
  is_poc_whitelisted?: InputMaybe<Order_By>;
  knowledges?: InputMaybe<Order_By>;
  languages?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  nonce?: InputMaybe<Order_By>;
  permissions_aggregate?: InputMaybe<Permissions_Aggregate_Order_By>;
  pfp?: InputMaybe<Order_By>;
  pic_id?: InputMaybe<Order_By>;
  picture?: InputMaybe<Files_Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  skills?: InputMaybe<Order_By>;
  socials_aggregate?: InputMaybe<User_Socials_Aggregate_Order_By>;
  task_progresses_aggregate?: InputMaybe<Task_Progress_Aggregate_Order_By>;
  timezone?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Order_By>;
  whitelistedFlags?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Users_Prepend_Input = {
  attitudes?: InputMaybe<Scalars['jsonb']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  languages?: InputMaybe<Scalars['jsonb']>;
  skills?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  About = 'about',
  /** column name */
  Attitudes = 'attitudes',
  /** column name */
  Bio = 'bio',
  /** column name */
  BlacklistedFlags = 'blacklistedFlags',
  /** column name */
  CoverId = 'cover_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Device = 'device',
  /** column name */
  DiscordId = 'discord_id',
  /** column name */
  EmailAddress = 'email_address',
  /** column name */
  Ens = 'ens',
  /** column name */
  Id = 'id',
  /** column name */
  Init = 'init',
  /** column name */
  IsPocWhitelisted = 'is_poc_whitelisted',
  /** column name */
  Knowledges = 'knowledges',
  /** column name */
  Languages = 'languages',
  /** column name */
  Name = 'name',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  Pfp = 'pfp',
  /** column name */
  PicId = 'pic_id',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  Skills = 'skills',
  /** column name */
  Timezone = 'timezone',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username',
  /** column name */
  Wallet = 'wallet',
  /** column name */
  WhitelistedFlags = 'whitelistedFlags'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  about?: InputMaybe<Scalars['String']>;
  attitudes?: InputMaybe<Scalars['jsonb']>;
  bio?: InputMaybe<Scalars['String']>;
  blacklistedFlags?: InputMaybe<Scalars['_text']>;
  cover_id?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamp']>;
  device?: InputMaybe<Scalars['String']>;
  discord_id?: InputMaybe<Scalars['String']>;
  email_address?: InputMaybe<Scalars['citext']>;
  ens?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  init?: InputMaybe<Scalars['Boolean']>;
  is_poc_whitelisted?: InputMaybe<Scalars['Boolean']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  languages?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['Int']>;
  pfp?: InputMaybe<Scalars['String']>;
  pic_id?: InputMaybe<Scalars['uuid']>;
  refresh_token?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  timezone?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamp']>;
  username?: InputMaybe<Scalars['String']>;
  wallet?: InputMaybe<Scalars['String']>;
  whitelistedFlags?: InputMaybe<Scalars['_text']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields';
  nonce: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  nonce?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields';
  nonce: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  nonce?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields';
  nonce: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  nonce?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  about?: InputMaybe<Scalars['String']>;
  attitudes?: InputMaybe<Scalars['jsonb']>;
  bio?: InputMaybe<Scalars['String']>;
  blacklistedFlags?: InputMaybe<Scalars['_text']>;
  cover_id?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamp']>;
  device?: InputMaybe<Scalars['String']>;
  discord_id?: InputMaybe<Scalars['String']>;
  email_address?: InputMaybe<Scalars['citext']>;
  ens?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  init?: InputMaybe<Scalars['Boolean']>;
  is_poc_whitelisted?: InputMaybe<Scalars['Boolean']>;
  knowledges?: InputMaybe<Scalars['jsonb']>;
  languages?: InputMaybe<Scalars['jsonb']>;
  name?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['Int']>;
  pfp?: InputMaybe<Scalars['String']>;
  pic_id?: InputMaybe<Scalars['uuid']>;
  refresh_token?: InputMaybe<Scalars['String']>;
  skills?: InputMaybe<Scalars['jsonb']>;
  timezone?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamp']>;
  username?: InputMaybe<Scalars['String']>;
  wallet?: InputMaybe<Scalars['String']>;
  whitelistedFlags?: InputMaybe<Scalars['_text']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields';
  nonce: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  nonce?: InputMaybe<Order_By>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  About = 'about',
  /** column name */
  Attitudes = 'attitudes',
  /** column name */
  Bio = 'bio',
  /** column name */
  BlacklistedFlags = 'blacklistedFlags',
  /** column name */
  CoverId = 'cover_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Device = 'device',
  /** column name */
  DiscordId = 'discord_id',
  /** column name */
  EmailAddress = 'email_address',
  /** column name */
  Ens = 'ens',
  /** column name */
  Id = 'id',
  /** column name */
  Init = 'init',
  /** column name */
  IsPocWhitelisted = 'is_poc_whitelisted',
  /** column name */
  Knowledges = 'knowledges',
  /** column name */
  Languages = 'languages',
  /** column name */
  Name = 'name',
  /** column name */
  Nonce = 'nonce',
  /** column name */
  Pfp = 'pfp',
  /** column name */
  PicId = 'pic_id',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  Skills = 'skills',
  /** column name */
  Timezone = 'timezone',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Username = 'username',
  /** column name */
  Wallet = 'wallet',
  /** column name */
  WhitelistedFlags = 'whitelistedFlags'
}

export type Users_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Users_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Users_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Users_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Users_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Users_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Users_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields';
  nonce: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  nonce?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields';
  nonce: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  nonce?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields';
  nonce: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  nonce?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "whitelisted_wallets" */
export type Whitelisted_Wallets = {
  __typename?: 'whitelisted_wallets';
  ens: Maybe<Scalars['String']>;
  /** An object relationship */
  gate: Gates;
  gate_id: Scalars['uuid'];
  /** A computed field, executes function "get_whitelisted_users_by_gate" */
  gate_users: Maybe<Array<Users>>;
  /** A computed field, executes function "get_user_by_whitelisted_wallet" */
  user: Maybe<Array<Users>>;
  wallet: Scalars['String'];
};


/** columns and relationships of "whitelisted_wallets" */
export type Whitelisted_WalletsGate_UsersArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};


/** columns and relationships of "whitelisted_wallets" */
export type Whitelisted_WalletsUserArgs = {
  distinct_on: InputMaybe<Array<Users_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Users_Order_By>>;
  where: InputMaybe<Users_Bool_Exp>;
};

/** aggregated selection of "whitelisted_wallets" */
export type Whitelisted_Wallets_Aggregate = {
  __typename?: 'whitelisted_wallets_aggregate';
  aggregate: Maybe<Whitelisted_Wallets_Aggregate_Fields>;
  nodes: Array<Whitelisted_Wallets>;
};

export type Whitelisted_Wallets_Aggregate_Bool_Exp = {
  count?: InputMaybe<Whitelisted_Wallets_Aggregate_Bool_Exp_Count>;
};

export type Whitelisted_Wallets_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Whitelisted_Wallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "whitelisted_wallets" */
export type Whitelisted_Wallets_Aggregate_Fields = {
  __typename?: 'whitelisted_wallets_aggregate_fields';
  count: Scalars['Int'];
  max: Maybe<Whitelisted_Wallets_Max_Fields>;
  min: Maybe<Whitelisted_Wallets_Min_Fields>;
};


/** aggregate fields of "whitelisted_wallets" */
export type Whitelisted_Wallets_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Whitelisted_Wallets_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "whitelisted_wallets" */
export type Whitelisted_Wallets_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Whitelisted_Wallets_Max_Order_By>;
  min?: InputMaybe<Whitelisted_Wallets_Min_Order_By>;
};

/** input type for inserting array relation for remote table "whitelisted_wallets" */
export type Whitelisted_Wallets_Arr_Rel_Insert_Input = {
  data: Array<Whitelisted_Wallets_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Whitelisted_Wallets_On_Conflict>;
};

/** Boolean expression to filter rows from the table "whitelisted_wallets". All fields are combined with a logical 'AND'. */
export type Whitelisted_Wallets_Bool_Exp = {
  _and?: InputMaybe<Array<Whitelisted_Wallets_Bool_Exp>>;
  _not?: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
  _or?: InputMaybe<Array<Whitelisted_Wallets_Bool_Exp>>;
  ens?: InputMaybe<String_Comparison_Exp>;
  gate?: InputMaybe<Gates_Bool_Exp>;
  gate_id?: InputMaybe<Uuid_Comparison_Exp>;
  gate_users?: InputMaybe<Users_Bool_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  wallet?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "whitelisted_wallets" */
export enum Whitelisted_Wallets_Constraint {
  /** unique or primary key constraint on columns "wallet", "gate_id" */
  WhitelistedWalletsGateIdWalletUindex = 'whitelisted_wallets_gate_id_wallet_uindex'
}

/** input type for inserting data into table "whitelisted_wallets" */
export type Whitelisted_Wallets_Insert_Input = {
  ens?: InputMaybe<Scalars['String']>;
  gate?: InputMaybe<Gates_Obj_Rel_Insert_Input>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  wallet?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Whitelisted_Wallets_Max_Fields = {
  __typename?: 'whitelisted_wallets_max_fields';
  ens: Maybe<Scalars['String']>;
  gate_id: Maybe<Scalars['uuid']>;
  wallet: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "whitelisted_wallets" */
export type Whitelisted_Wallets_Max_Order_By = {
  ens?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Whitelisted_Wallets_Min_Fields = {
  __typename?: 'whitelisted_wallets_min_fields';
  ens: Maybe<Scalars['String']>;
  gate_id: Maybe<Scalars['uuid']>;
  wallet: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "whitelisted_wallets" */
export type Whitelisted_Wallets_Min_Order_By = {
  ens?: InputMaybe<Order_By>;
  gate_id?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "whitelisted_wallets" */
export type Whitelisted_Wallets_Mutation_Response = {
  __typename?: 'whitelisted_wallets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Whitelisted_Wallets>;
};

/** on_conflict condition type for table "whitelisted_wallets" */
export type Whitelisted_Wallets_On_Conflict = {
  constraint: Whitelisted_Wallets_Constraint;
  update_columns: Array<Whitelisted_Wallets_Update_Column>;
  where?: InputMaybe<Whitelisted_Wallets_Bool_Exp>;
};

/** Ordering options when selecting data from "whitelisted_wallets". */
export type Whitelisted_Wallets_Order_By = {
  ens?: InputMaybe<Order_By>;
  gate?: InputMaybe<Gates_Order_By>;
  gate_id?: InputMaybe<Order_By>;
  gate_users_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
  user_aggregate?: InputMaybe<Users_Aggregate_Order_By>;
  wallet?: InputMaybe<Order_By>;
};

/** select columns of table "whitelisted_wallets" */
export enum Whitelisted_Wallets_Select_Column {
  /** column name */
  Ens = 'ens',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Wallet = 'wallet'
}

/** input type for updating data in table "whitelisted_wallets" */
export type Whitelisted_Wallets_Set_Input = {
  ens?: InputMaybe<Scalars['String']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  wallet?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "whitelisted_wallets" */
export type Whitelisted_Wallets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Whitelisted_Wallets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Whitelisted_Wallets_Stream_Cursor_Value_Input = {
  ens?: InputMaybe<Scalars['String']>;
  gate_id?: InputMaybe<Scalars['uuid']>;
  wallet?: InputMaybe<Scalars['String']>;
};

/** update columns of table "whitelisted_wallets" */
export enum Whitelisted_Wallets_Update_Column {
  /** column name */
  Ens = 'ens',
  /** column name */
  GateId = 'gate_id',
  /** column name */
  Wallet = 'wallet'
}

export type Whitelisted_Wallets_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Whitelisted_Wallets_Set_Input>;
  where: Whitelisted_Wallets_Bool_Exp;
};

export type FileFragment = { __typename?: 'files', id: any, blur: string | null };

export type ExperienceFragment = { __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null };

export type Public_UserFragment = { __typename?: 'users', id: any, name: string | null, username: string | null, about: string | null, bio: string | null, pic_id: any | null, skills: any | null, languages: any | null, timezone: string | null, wallet: string | null, following_aggregate: { __typename?: 'user_following_aggregate', aggregate: { __typename?: 'user_following_aggregate_fields', count: number } | null }, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null }>, picture: { __typename?: 'files', id: any, blur: string | null } | null, cover: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'user_socials', network: string, url: string }>, experiences: Array<{ __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null }> };

export type Current_UserFragment = { __typename?: 'users', email_address: any | null, init: boolean, id: any, name: string | null, username: string | null, about: string | null, bio: string | null, pic_id: any | null, skills: any | null, languages: any | null, timezone: string | null, wallet: string | null, experiences: Array<{ __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, hidden_credentials: Array<{ __typename?: 'hidden_experience_credentials', credential: { __typename?: 'credentials', gate_id: any | null, id: any, name: string, image: string, description: string, categories: any } }>, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null }>, following_aggregate: { __typename?: 'user_following_aggregate', aggregate: { __typename?: 'user_following_aggregate_fields', count: number } | null }, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null }>, picture: { __typename?: 'files', id: any, blur: string | null } | null, cover: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'user_socials', network: string, url: string }> };

export type Get_NonceQueryVariables = Exact<{
  wallet: Scalars['String'];
}>;


export type Get_NonceQuery = { __typename?: 'query_root', get_nonce: { __typename?: 'NonceOutput', nonce: number } | null };

export type LoginMutationVariables = Exact<{
  signature: Scalars['String'];
  wallet: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'mutation_root', login: { __typename?: 'LoginOutput', refresh_token: string, token: string, user_id: string } | null };

export type RefreshMutationVariables = Exact<{
  refresh_token: Scalars['String'];
}>;


export type RefreshMutation = { __typename?: 'mutation_root', refresh: { __typename?: 'RefreshOutput', refresh_token: string, token: string } | null };

export type Create_Gate_Tasks_BasedMutationVariables = Exact<{
  id: InputMaybe<Scalars['uuid']>;
  dao_id: Scalars['uuid'];
  title: Scalars['String'];
  categories: InputMaybe<Scalars['jsonb']>;
  type: InputMaybe<Scalars['gate_type']>;
  description: InputMaybe<Scalars['String']>;
  skills: InputMaybe<Scalars['jsonb']>;
  permissions?: InputMaybe<Array<Permissions_Insert_Input> | Permissions_Insert_Input>;
  image: Scalars['String'];
  claim_limit: InputMaybe<Scalars['Int']>;
  expire_date: InputMaybe<Scalars['timestamptz']>;
  tasks?: InputMaybe<Array<Tasks_Insert_Input> | Tasks_Insert_Input>;
}>;


export type Create_Gate_Tasks_BasedMutation = { __typename?: 'mutation_root', insert_gates_one: { __typename?: 'gates', id: any, title: string | null, image: string | null, published: any } | null };

export type Create_Gate_DirectMutationVariables = Exact<{
  id: InputMaybe<Scalars['uuid']>;
  dao_id: Scalars['uuid'];
  title: Scalars['String'];
  categories: InputMaybe<Scalars['jsonb']>;
  type: InputMaybe<Scalars['gate_type']>;
  description: InputMaybe<Scalars['String']>;
  skills: InputMaybe<Scalars['jsonb']>;
  permissions?: InputMaybe<Array<Permissions_Insert_Input> | Permissions_Insert_Input>;
  claim_limit: InputMaybe<Scalars['Int']>;
  expire_date: InputMaybe<Scalars['timestamptz']>;
  image: Scalars['String'];
  whitelisted_wallets_file: Scalars['uuid'];
}>;


export type Create_Gate_DirectMutation = { __typename?: 'mutation_root', insert_gates_one: { __typename?: 'gates', id: any, type: any, title: string | null, image: string | null, published: any } | null };

export type Update_User_ProfileMutationVariables = Exact<{
  id: Scalars['uuid'];
  name: Scalars['String'];
  username: Scalars['String'];
  pic_id: InputMaybe<Scalars['uuid']>;
  email_address: Scalars['citext'];
}>;


export type Update_User_ProfileMutation = { __typename?: 'mutation_root', update_users_by_pk: { __typename?: 'users', id: any, name: string | null, username: string | null, email_address: any | null, picture: { __typename?: 'files', id: any, blur: string | null } | null } | null };

export type Create_CodeMutationVariables = Exact<{
  user_id: Scalars['String'];
  email: Scalars['String'];
}>;


export type Create_CodeMutation = { __typename?: 'mutation_root', create_code: { __typename?: 'CreateCodeOutput', success: boolean } | null };

export type Verify_CodeMutationVariables = Exact<{
  user_id: Scalars['String'];
  email: Scalars['String'];
  code: Scalars['String'];
}>;


export type Verify_CodeMutation = { __typename?: 'mutation_root', verify_code: { __typename?: 'VerifyCodeOutput', success: boolean } | null };

export type Follow_UserMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Follow_UserMutation = { __typename?: 'mutation_root', follow_user: { __typename?: 'user_following', user_id: any } | null };

export type Unfollow_UserMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Unfollow_UserMutation = { __typename?: 'mutation_root', unfollow_user: { __typename?: 'user_following', user_id: any } | null };

export type Follow_DaoMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Follow_DaoMutation = { __typename?: 'mutation_root', follow_dao: { __typename?: 'dao_following', dao_id: any, dao: { __typename?: 'daos', id: any, logo_url: string | null, name: string, is_admin: boolean | null } } | null };

export type Unfollow_DaoMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Unfollow_DaoMutation = { __typename?: 'mutation_root', unfollow_dao: { __typename?: 'dao_following', dao_id: any } | null };

export type Publish_GateMutationVariables = Exact<{
  gate_id: Scalars['uuid'];
}>;


export type Publish_GateMutation = { __typename?: 'mutation_root', publish_gate: { __typename?: 'PublishGateOutput', published: string, gate_id: any } | null };

export type Toggle_Gate_StateMutationVariables = Exact<{
  gate_id: Scalars['uuid'];
  state: Scalars['gate_state'];
}>;


export type Toggle_Gate_StateMutation = { __typename?: 'mutation_root', update_gates_by_pk: { __typename?: 'gates', published: any, dao: { __typename?: 'daos', gates: Array<{ __typename?: 'gates', id: any, title: string | null }> } } | null };

export type DeleteGateMutationVariables = Exact<{
  gate_id: Scalars['uuid'];
}>;


export type DeleteGateMutation = { __typename?: 'mutation_root', delete_gates_by_pk: { __typename?: 'gates', id: any, title: string | null, dao_id: any } | null };

export type Mint_CredentialMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Mint_CredentialMutation = { __typename?: 'mutation_root', mint_credential: { __typename?: 'MintCredentialOutput', status: string, message: string, info: { __typename?: 'MintCredentialInfo', transaction_hash: string, chain_id: string, wallet: string } } | null };

export type Subscribe_To_NewsletterMutationVariables = Exact<{
  email_address: InputMaybe<Scalars['email']>;
}>;


export type Subscribe_To_NewsletterMutation = { __typename?: 'mutation_root', subscribe_to_newsletter: { __typename?: 'email_subscribers', email: any } | null };

export type Delete_TasksMutationVariables = Exact<{
  task_ids: InputMaybe<Array<Tasks_Bool_Exp> | Tasks_Bool_Exp>;
}>;


export type Delete_TasksMutation = { __typename?: 'mutation_root', delete_tasks: { __typename?: 'tasks_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'tasks', id: any }> } | null };

export type Delete_Tasks_By_PkMutationVariables = Exact<{
  task_id: Scalars['uuid'];
}>;


export type Delete_Tasks_By_PkMutation = { __typename?: 'mutation_root', delete_tasks_by_pk: { __typename?: 'tasks', id: any } | null };

export type Complete_TaskMutationVariables = Exact<{
  task_id: Scalars['uuid'];
  info: InputMaybe<Scalars['json']>;
}>;


export type Complete_TaskMutation = { __typename?: 'mutation_root', verify_key: { __typename?: 'VerifyOutput', task_info: any } | null };

export type Complete_GateMutationVariables = Exact<{
  gateId: Scalars['uuid'];
  recaptcha: Scalars['String'];
}>;


export type Complete_GateMutation = { __typename?: 'mutation_root', complete_gate: any };

export type Upload_ImageMutationVariables = Exact<{
  base64: Scalars['String'];
  name: Scalars['String'];
}>;


export type Upload_ImageMutation = { __typename?: 'mutation_root', upload_image: { __typename?: 'UploadOutput', id: any } | null };

export type Get_Admin_DataQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_Admin_DataQuery = { __typename?: 'query_root', credential_count: { __typename?: 'credentials_aggregate', aggregate: { __typename?: 'credentials_aggregate_fields', count: number } | null }, minted_credential_count: { __typename?: 'credentials_aggregate', aggregate: { __typename?: 'credentials_aggregate_fields', count: number } | null }, credential_data: Array<{ __typename?: 'all_credential_count', count: any | null, name: string | null, gate: { __typename?: 'gates', image: string | null } | null }>, user_data: { __typename?: 'users_aggregate', aggregate: { __typename?: 'users_aggregate_fields', count: number } | null } };

export type All_CredentialsQueryVariables = Exact<{ [key: string]: never; }>;


export type All_CredentialsQuery = { __typename?: 'query_root', credentials: Array<{ __typename?: 'credentials', id: any, name: string, description: string, categories: any, skills: any | null, created_at: any, pow: any | null, image: string, uri: string | null, status: any, transaction_url: string | null, gate: { __typename?: 'gates', creator: { __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null } | null, holders: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> | null } | null, dao: { __typename?: 'daos', name: string, slug: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null }> };

export type CredentialQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type CredentialQuery = { __typename?: 'query_root', credentials_by_pk: { __typename?: 'credentials', id: any, target_id: any, name: string, description: string, categories: any, skills: any | null, created_at: any, pow: any | null, image: string, uri: string | null, status: any, transaction_url: string | null, gate: { __typename?: 'gates', type: any, creator: { __typename?: 'users', id: any, name: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null } | null, holders: Array<{ __typename?: 'users', id: any, name: string | null, pfp: string | null }> | null, tasks: Array<{ __typename?: 'tasks', id: any }> } | null, dao: { __typename?: 'daos', name: string, slug: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null } | null };

export type Count_Total_HoldersQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Count_Total_HoldersQuery = { __typename?: 'query_root', credentials_aggregate: { __typename?: 'credentials_aggregate', aggregate: { __typename?: 'credentials_aggregate_fields', count: number } | null } };

export type Holders_By_GateQueryVariables = Exact<{
  id: Scalars['uuid'];
  offset: Scalars['Int'];
}>;


export type Holders_By_GateQuery = { __typename?: 'query_root', gates_by_pk: { __typename?: 'gates', holders: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, wallet: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> | null } | null };

export type Holders_By_SearchQueryVariables = Exact<{
  id: Scalars['uuid'];
  search: Scalars['String'];
  offset: Scalars['Int'];
}>;


export type Holders_By_SearchQuery = { __typename?: 'query_root', gates_by_pk: { __typename?: 'gates', title: string | null, holders: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, wallet: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> | null } | null };

export type Update_Credential_StatusMutationVariables = Exact<{
  id: Scalars['uuid'];
  status: Scalars['credential_state'];
  transaction_url: Scalars['String'];
}>;


export type Update_Credential_StatusMutation = { __typename?: 'mutation_root', update_credentials_by_pk: { __typename?: 'credentials', id: any, target_id: any, name: string, description: string, categories: any, skills: any | null, created_at: any, pow: any | null, image: string, uri: string | null, status: any, transaction_url: string | null, gate: { __typename?: 'gates', creator: { __typename?: 'users', id: any, name: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null } | null, holders: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> | null } | null, dao: { __typename?: 'daos', name: string, slug: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null } | null };

export type Direct_Credential_InfoQueryVariables = Exact<{
  gate_id: Scalars['uuid'];
  wallet: Scalars['String'];
}>;


export type Direct_Credential_InfoQuery = { __typename?: 'query_root', hasCredential: { __typename?: 'whitelisted_wallets_aggregate', aggregate: { __typename?: 'whitelisted_wallets_aggregate_fields', count: number } | null }, whitelisted_wallets_aggregate: { __typename?: 'whitelisted_wallets_aggregate', aggregate: { __typename?: 'whitelisted_wallets_aggregate_fields', count: number } | null } };

export type Direct_Credential_HoldersQueryVariables = Exact<{
  gate_id: Scalars['uuid'];
  offset: Scalars['Int'];
}>;


export type Direct_Credential_HoldersQuery = { __typename?: 'query_root', whitelisted_wallets: Array<{ __typename?: 'whitelisted_wallets', wallet: string, user: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> | null }> };

export type Direct_Credential_Holders_SearchQueryVariables = Exact<{
  gate_id: Scalars['uuid'];
  offset: Scalars['Int'];
  search: Scalars['String'];
}>;


export type Direct_Credential_Holders_SearchQuery = { __typename?: 'query_root', whitelisted_wallets: Array<{ __typename?: 'whitelisted_wallets', wallet: string, user: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> | null }> };

export type Dao_ProfileFragment = { __typename?: 'daos', id: any, name: string, description: string, slug: string | null, logo_url: string | null, background_url: string | null, categories: any | null, background: { __typename?: 'files', id: any, blur: string | null } | null, logo: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'dao_socials', network: string, url: string }>, gates: Array<{ __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, image: string | null, published: any }>, followers_aggregate: { __typename?: 'dao_following_aggregate', aggregate: { __typename?: 'dao_following_aggregate_fields', count: number } | null } };

export type Dao_PagesQueryVariables = Exact<{ [key: string]: never; }>;


export type Dao_PagesQuery = { __typename?: 'query_root', daos: Array<{ __typename?: 'daos', id: any, slug: string | null }> };

export type Dao_ProfileQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Dao_ProfileQuery = { __typename?: 'query_root', daos_by_pk: { __typename?: 'daos', id: any, name: string, description: string, slug: string | null, logo_url: string | null, background_url: string | null, categories: any | null, followers: Array<{ __typename?: 'dao_following', user: { __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null, permissions: Array<{ __typename?: 'permissions', permission: any | null }> } }>, background: { __typename?: 'files', id: any, blur: string | null } | null, logo: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'dao_socials', network: string, url: string }>, gates: Array<{ __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, image: string | null, published: any }>, followers_aggregate: { __typename?: 'dao_following_aggregate', aggregate: { __typename?: 'dao_following_aggregate_fields', count: number } | null } } | null };

export type Dao_Profile_By_SlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type Dao_Profile_By_SlugQuery = { __typename?: 'query_root', daos: Array<{ __typename?: 'daos', id: any, name: string, description: string, slug: string | null, logo_url: string | null, background_url: string | null, categories: any | null, followers: Array<{ __typename?: 'dao_following', user: { __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null, permissions: Array<{ __typename?: 'permissions', permission: any | null }> } }>, background: { __typename?: 'files', id: any, blur: string | null } | null, logo: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'dao_socials', network: string, url: string }>, gates: Array<{ __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, image: string | null, published: any }>, followers_aggregate: { __typename?: 'dao_following_aggregate', aggregate: { __typename?: 'dao_following_aggregate_fields', count: number } | null } }> };

export type Dao_Gates_TabQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Dao_Gates_TabQuery = { __typename?: 'query_root', daos_by_pk: { __typename?: 'daos', gates: Array<{ __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, image: string | null, published: any, dao: { __typename?: 'daos', id: any } }> } | null };

export type Dao_Profile_PeopleQueryVariables = Exact<{
  id: Scalars['uuid'];
  offset: Scalars['Int'];
}>;


export type Dao_Profile_PeopleQuery = { __typename?: 'query_root', daos_by_pk: { __typename?: 'daos', followers: Array<{ __typename?: 'dao_following', user: { __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null, permissions: Array<{ __typename?: 'permissions', permission: any | null }> } }> } | null };

export type Create_DaoMutationVariables = Exact<{
  logo_id: Scalars['uuid'];
  name: Scalars['String'];
  description: Scalars['String'];
  categories: Scalars['jsonb'];
  background_id: Scalars['uuid'];
  socials: Array<Dao_Socials_Insert_Input> | Dao_Socials_Insert_Input;
}>;


export type Create_DaoMutation = { __typename?: 'mutation_root', insert_daos_one: { __typename?: 'daos', id: any, logo_url: string | null, name: string, is_admin: boolean | null, slug: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null };

export type Edit_DaoMutationVariables = Exact<{
  id: Scalars['uuid'];
  logo_id: Scalars['uuid'];
  name: Scalars['String'];
  description: Scalars['String'];
  categories: Scalars['jsonb'];
  background_id: Scalars['uuid'];
  socials: Array<Dao_Socials_Insert_Input> | Dao_Socials_Insert_Input;
}>;


export type Edit_DaoMutation = { __typename?: 'mutation_root', update_daos_by_pk: { __typename?: 'daos', id: any, logo_url: string | null, name: string, is_admin: boolean | null, slug: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, delete_dao_socials: { __typename?: 'dao_socials_mutation_response', affected_rows: number } | null, insert_dao_socials: { __typename?: 'dao_socials_mutation_response', affected_rows: number } | null };

export type Dao_Set_User_AdminMutationVariables = Exact<{
  dao_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
  permission?: InputMaybe<Scalars['permission_types']>;
}>;


export type Dao_Set_User_AdminMutation = { __typename?: 'mutation_root', insert_permissions: { __typename?: 'permissions_mutation_response', affected_rows: number } | null };

export type Dao_Set_User_MemberMutationVariables = Exact<{
  dao_id: Scalars['uuid'];
  user_id: Scalars['uuid'];
  permission?: InputMaybe<Scalars['permission_types']>;
}>;


export type Dao_Set_User_MemberMutation = { __typename?: 'mutation_root', insert_permissions: { __typename?: 'permissions_mutation_response', affected_rows: number } | null };

export type All_GatesQueryVariables = Exact<{ [key: string]: never; }>;


export type All_GatesQuery = { __typename?: 'query_root', gates: Array<{ __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, skills: any, published: any, links: any, image: string | null }> };

export type GateQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GateQuery = { __typename?: 'query_root', gates_by_pk: { __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, skills: any, published: any, links: any, image: string | null, type: any, claim_limit: number | null, expire_date: any | null, holder_count: any | null, creator: { __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null } | null, holders: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, wallet: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> | null, dao: { __typename?: 'daos', id: any, name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null }, tasks: Array<{ __typename?: 'tasks', description: string | null, gate_id: any, id: any, task_data: any | null, task_type: any, title: string | null, order: number | null }>, whitelisted_wallets: Array<{ __typename?: 'whitelisted_wallets', ens: string | null, wallet: string }>, whitelisted_wallets_file: { __typename?: 'files', id: any, metadata: any } | null } | null };

export type Get_Create_GateQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type Get_Create_GateQuery = { __typename?: 'query_root', gates_by_pk: { __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, skills: any, published: any, links: any, image: string | null, type: any, holder_count: any | null, creator: { __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null } | null, holders: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, pfp: string | null, wallet: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> | null, dao: { __typename?: 'daos', id: any, name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null }, tasks: Array<{ __typename?: 'tasks', description: string | null, gate_id: any, id: any, task_data: any | null, task_type: any, title: string | null, order: number | null }>, whitelisted_wallets_file: { __typename?: 'files', id: any, metadata: any } | null } | null };

export type Verify_Csv_ProgressQueryVariables = Exact<{
  file_id: Scalars['uuid'];
}>;


export type Verify_Csv_ProgressQuery = { __typename?: 'query_root', verify_csv_progress: { __typename?: 'VerifyCSVProgressOutput', id: string, invalid: number, invalidList: Array<string | null> | null, isDone: boolean, total: number, uploadedTime: number, valid: number, validList: Array<string | null> | null } | null };

export type GateProgressQueryVariables = Exact<{
  gateID: Scalars['uuid'];
  userID: Scalars['uuid'];
}>;


export type GateProgressQuery = { __typename?: 'query_root', credentials: Array<{ __typename?: 'credentials', created_at: any }> };

export type Get_HomeQueryVariables = Exact<{
  daos_where?: InputMaybe<Daos_Bool_Exp>;
}>;


export type Get_HomeQuery = { __typename?: 'query_root', gates: Array<{ __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, image: string | null, published: any, dao: { __typename?: 'daos', id: any, logo_url: string | null, slug: string | null, name: string, logo: { __typename?: 'files', id: any, blur: string | null } | null } }>, daos: Array<{ __typename?: 'daos', id: any, name: string, slug: string | null, logo_url: string | null, background_url: string | null, description: string, categories: any | null, logo: { __typename?: 'files', id: any, blur: string | null } | null, background: { __typename?: 'files', id: any, blur: string | null } | null, followers_aggregate: { __typename?: 'dao_following_aggregate', aggregate: { __typename?: 'dao_following_aggregate_fields', count: number } | null }, gates_aggregate: { __typename?: 'gates_aggregate', aggregate: { __typename?: 'gates_aggregate_fields', count: number } | null }, permissions: Array<{ __typename?: 'permissions', user_id: any, permission: any | null }> }>, people: Array<{ __typename?: 'users', id: any, name: string | null, about: string | null, username: string | null, wallet: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> };

export type Gates_TabQueryVariables = Exact<{ [key: string]: never; }>;


export type Gates_TabQuery = { __typename?: 'query_root', gates: Array<{ __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, image: string | null, published: any, dao: { __typename?: 'daos', id: any, logo_url: string | null, slug: string | null, name: string, logo: { __typename?: 'files', id: any, blur: string | null } | null } }> };

export type Daos_TabQueryVariables = Exact<{ [key: string]: never; }>;


export type Daos_TabQuery = { __typename?: 'query_root', daos: Array<{ __typename?: 'daos', id: any, name: string, slug: string | null, logo_url: string | null, background_url: string | null, description: string, categories: any | null, logo: { __typename?: 'files', id: any, blur: string | null } | null, background: { __typename?: 'files', id: any, blur: string | null } | null, followers_aggregate: { __typename?: 'dao_following_aggregate', aggregate: { __typename?: 'dao_following_aggregate_fields', count: number } | null }, gates_aggregate: { __typename?: 'gates_aggregate', aggregate: { __typename?: 'gates_aggregate_fields', count: number } | null }, permissions: Array<{ __typename?: 'permissions', user_id: any, permission: any | null }> }> };

export type People_TabQueryVariables = Exact<{
  offset: Scalars['Int'];
}>;


export type People_TabQuery = { __typename?: 'query_root', people: Array<{ __typename?: 'users', id: any, name: string | null, about: string | null, username: string | null, wallet: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'query_root', me: { __typename?: 'users', email_address: any | null, init: boolean, id: any, name: string | null, username: string | null, about: string | null, bio: string | null, pic_id: any | null, skills: any | null, languages: any | null, timezone: string | null, wallet: string | null, permissions: Array<{ __typename?: 'permissions', gate_id: any | null, dao_id: any | null, permission: any | null, dao: { __typename?: 'daos', is_admin: boolean | null } | null }>, picture: { __typename?: 'files', id: any, blur: string | null } | null, following: Array<{ __typename?: 'user_following', user_id: any }>, task_progresses: Array<{ __typename?: 'task_progress', task_id: any, gate_id: any, completed: any, updated_at: any }>, following_dao: Array<{ __typename?: 'dao_following', dao_id: any, dao: { __typename?: 'daos', id: any, logo_url: string | null, slug: string | null, name: string, is_admin: boolean | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } }>, experiences: Array<{ __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, hidden_credentials: Array<{ __typename?: 'hidden_experience_credentials', credential: { __typename?: 'credentials', gate_id: any | null, id: any, name: string, image: string, description: string, categories: any } }>, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null }>, following_aggregate: { __typename?: 'user_following_aggregate', aggregate: { __typename?: 'user_following_aggregate_fields', count: number } | null }, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null }>, cover: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'user_socials', network: string, url: string }> } | null };

export type Me_User_InfoQueryVariables = Exact<{ [key: string]: never; }>;


export type Me_User_InfoQuery = { __typename?: 'query_root', me: { __typename?: 'users', email_address: any | null, init: boolean, id: any, name: string | null, username: string | null, about: string | null, bio: string | null, pic_id: any | null, skills: any | null, languages: any | null, timezone: string | null, wallet: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null, experiences: Array<{ __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, hidden_credentials: Array<{ __typename?: 'hidden_experience_credentials', credential: { __typename?: 'credentials', gate_id: any | null, id: any, name: string, image: string, description: string, categories: any } }>, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null }>, following_aggregate: { __typename?: 'user_following_aggregate', aggregate: { __typename?: 'user_following_aggregate_fields', count: number } | null }, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null }>, cover: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'user_socials', network: string, url: string }> } | null };

export type Me_PermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Me_PermissionsQuery = { __typename?: 'query_root', me: { __typename?: 'users', permissions: Array<{ __typename?: 'permissions', gate_id: any | null, dao_id: any | null, permission: any | null, dao: { __typename?: 'daos', is_admin: boolean | null } | null }> } | null };

export type Me_FollowingQueryVariables = Exact<{ [key: string]: never; }>;


export type Me_FollowingQuery = { __typename?: 'query_root', me: { __typename?: 'users', following: Array<{ __typename?: 'user_following', user_id: any }>, following_dao: Array<{ __typename?: 'dao_following', dao_id: any, dao: { __typename?: 'daos', id: any, logo_url: string | null, slug: string | null, name: string, is_admin: boolean | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } }> } | null };

export type Me_Task_ProgressesQueryVariables = Exact<{ [key: string]: never; }>;


export type Me_Task_ProgressesQuery = { __typename?: 'query_root', me: { __typename?: 'users', task_progresses: Array<{ __typename?: 'task_progress', task_id: any, gate_id: any, completed: any, updated_at: any }> } | null };

export type User_From_WalletQueryVariables = Exact<{
  wallet: Scalars['String'];
}>;


export type User_From_WalletQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: any, wallet: string | null, name: string | null, username: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> };

export type SearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'query_root', gates: Array<{ __typename?: 'gates', id: any, title: string | null, description: string | null, categories: any, skills: any, published: any, links: any, image: string | null }>, daos: Array<{ __typename?: 'daos', id: any, name: string, slug: string | null, logo_url: string | null, background_url: string | null, description: string, categories: any | null, logo: { __typename?: 'files', id: any, blur: string | null } | null, background: { __typename?: 'files', id: any, blur: string | null } | null, followers_aggregate: { __typename?: 'dao_following_aggregate', aggregate: { __typename?: 'dao_following_aggregate_fields', count: number } | null }, gates_aggregate: { __typename?: 'gates_aggregate', aggregate: { __typename?: 'gates_aggregate_fields', count: number } | null }, permissions: Array<{ __typename?: 'permissions', user_id: any, permission: any | null }> }>, users: Array<{ __typename?: 'users', pfp: string | null, id: any, name: string | null, username: string | null, about: string | null, bio: string | null, pic_id: any | null, skills: any | null, languages: any | null, timezone: string | null, wallet: string | null, following_aggregate: { __typename?: 'user_following_aggregate', aggregate: { __typename?: 'user_following_aggregate_fields', count: number } | null }, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null }>, picture: { __typename?: 'files', id: any, blur: string | null } | null, cover: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'user_socials', network: string, url: string }>, experiences: Array<{ __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null }> }> };

export type Twitter_DataQueryVariables = Exact<{
  userName: Scalars['String'];
}>;


export type Twitter_DataQuery = { __typename?: 'query_root', get_twitter_user_data: { __typename?: 'TwitterUser', verified: boolean | null, username: string | null, protected: boolean | null, profile_image_url: string | null, name: string | null, location: string | null, id: string | null, description: string | null, public_metrics: { __typename?: 'TwitterPublicMetrics', followers_count: number | null, following_count: number | null, listed_count: number | null, tweet_count: number | null } | null } | null };

export type Twitter_TweetQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type Twitter_TweetQuery = { __typename?: 'query_root', get_twitter_tweet: { __typename?: 'TwitterTweet', id: string | null, author_id: string | null, text: string | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', pfp: string | null, id: any, name: string | null, username: string | null, about: string | null, bio: string | null, pic_id: any | null, skills: any | null, languages: any | null, timezone: string | null, wallet: string | null, following_aggregate: { __typename?: 'user_following_aggregate', aggregate: { __typename?: 'user_following_aggregate_fields', count: number } | null }, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null }>, picture: { __typename?: 'files', id: any, blur: string | null } | null, cover: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'user_socials', network: string, url: string }>, experiences: Array<{ __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null }> }> };

export type Get_User_By_UsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type Get_User_By_UsernameQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', wallet: string | null, pfp: string | null, id: any, name: string | null, username: string | null, about: string | null, bio: string | null, pic_id: any | null, skills: any | null, languages: any | null, timezone: string | null, following_aggregate: { __typename?: 'user_following_aggregate', aggregate: { __typename?: 'user_following_aggregate_fields', count: number } | null }, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null }>, picture: { __typename?: 'files', id: any, blur: string | null } | null, cover: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'user_socials', network: string, url: string }>, experiences: Array<{ __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null }> }> };

export type Users_By_WalletsQueryVariables = Exact<{
  wallets: Array<Scalars['String']> | Scalars['String'];
}>;


export type Users_By_WalletsQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', id: any, name: string | null, username: string | null, wallet: string | null, picture: { __typename?: 'files', id: any, blur: string | null } | null }> };

export type Edit_UserMutationVariables = Exact<{
  id: Scalars['uuid'];
  bio: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  pic_id: InputMaybe<Scalars['uuid']>;
  skills: InputMaybe<Scalars['jsonb']>;
  username: InputMaybe<Scalars['String']>;
  timezone: InputMaybe<Scalars['String']>;
  cover_id: InputMaybe<Scalars['uuid']>;
  languages: InputMaybe<Scalars['jsonb']>;
  socials: Array<User_Socials_Insert_Input> | User_Socials_Insert_Input;
}>;


export type Edit_UserMutation = { __typename?: 'mutation_root', update_users_by_pk: { __typename?: 'users', email_address: any | null, init: boolean, id: any, name: string | null, username: string | null, about: string | null, bio: string | null, pic_id: any | null, skills: any | null, languages: any | null, timezone: string | null, wallet: string | null, experiences: Array<{ __typename?: 'experiences', start_date: any | null, end_date: any | null, working: boolean, description: string | null, visible: boolean, hidden_credentials: Array<{ __typename?: 'hidden_experience_credentials', credential: { __typename?: 'credentials', gate_id: any | null, id: any, name: string, image: string, description: string, categories: any } }>, dao: { __typename?: 'daos', name: string, slug: string | null, logo_url: string | null, logo: { __typename?: 'files', id: any, blur: string | null } | null } | null, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null, target_id: any, uri: string | null, transaction_url: string | null, name: string, image: string, description: string, categories: any, status: any }> | null }>, following_aggregate: { __typename?: 'user_following_aggregate', aggregate: { __typename?: 'user_following_aggregate_fields', count: number } | null }, credentials: Array<{ __typename?: 'credentials', id: any, gate_id: any | null }>, picture: { __typename?: 'files', id: any, blur: string | null } | null, cover: { __typename?: 'files', id: any, blur: string | null } | null, socials: Array<{ __typename?: 'user_socials', network: string, url: string }> } | null, delete_user_socials: { __typename?: 'user_socials_mutation_response', affected_rows: number } | null, insert_user_socials: { __typename?: 'user_socials_mutation_response', affected_rows: number } | null };

export const FileFragmentDoc = gql`
    fragment file on files {
  id
  blur
}
    `;
export const ExperienceFragmentDoc = gql`
    fragment experience on experiences {
  dao {
    name
    slug
    logo {
      ...file
    }
    logo_url
  }
  credentials {
    id
    gate_id
    target_id
    uri
    transaction_url
    name
    image
    description
    categories
    status
  }
  start_date
  end_date
  working
  description
  visible
}
    ${FileFragmentDoc}`;
export const Public_UserFragmentDoc = gql`
    fragment public_user on users {
  id
  name
  username
  about
  bio
  pic_id
  skills
  languages
  timezone
  wallet
  following_aggregate {
    aggregate {
      count
    }
  }
  credentials {
    id
    gate_id
  }
  picture {
    ...file
  }
  cover {
    ...file
  }
  socials {
    network
    url
  }
  experiences {
    ...experience
  }
}
    ${FileFragmentDoc}
${ExperienceFragmentDoc}`;
export const Current_UserFragmentDoc = gql`
    fragment current_user on users {
  ...public_user
  email_address
  init
  experiences {
    ...experience
    hidden_credentials {
      credential {
        gate_id
        id
        name
        image
        description
        categories
      }
    }
  }
}
    ${Public_UserFragmentDoc}
${ExperienceFragmentDoc}`;
export const Dao_ProfileFragmentDoc = gql`
    fragment dao_profile on daos {
  id
  name
  description
  slug
  background {
    id
    blur
  }
  logo {
    id
    blur
  }
  logo_url
  background_url
  categories
  socials {
    network
    url
  }
  gates(where: {published: {_eq: "published"}}, limit: 3) {
    id
    title
    description
    categories
    image
    published
  }
  followers_aggregate(where: {status: {_eq: "following"}}) {
    aggregate {
      count
    }
  }
}
    `;
export const Get_NonceDocument = gql`
    query get_nonce($wallet: String!) {
  get_nonce(wallet: $wallet) {
    nonce
  }
}
    `;
export const LoginDocument = gql`
    mutation login($signature: String!, $wallet: String!) {
  login(signature: $signature, wallet: $wallet) {
    refresh_token
    token
    user_id
  }
}
    `;
export const RefreshDocument = gql`
    mutation refresh($refresh_token: String!) {
  refresh(token: $refresh_token) {
    refresh_token
    token
  }
}
    `;
export const Create_Gate_Tasks_BasedDocument = gql`
    mutation create_gate_tasks_based($id: uuid, $dao_id: uuid!, $title: String!, $categories: jsonb, $type: gate_type, $description: String, $skills: jsonb, $permissions: [permissions_insert_input!] = [], $image: String!, $claim_limit: Int, $expire_date: timestamptz, $tasks: [tasks_insert_input!] = []) {
  insert_gates_one(
    object: {id: $id, dao_id: $dao_id, title: $title, type: $type, categories: $categories, description: $description, skills: $skills, claim_limit: $claim_limit, expire_date: $expire_date, permissions: {data: $permissions, on_conflict: {constraint: permissions_dao_id_user_id_credential_id_key, update_columns: [permission]}}, image: $image, tasks: {data: $tasks, on_conflict: {constraint: keys_pk, update_columns: [title, description, task_data, task_type, order]}}, published: "not_published"}
    on_conflict: {constraint: gates_pk, update_columns: [title, type, categories, description, skills, image, published, expire_date, claim_limit]}
  ) {
    id
    title
    image
    published
  }
}
    `;
export const Create_Gate_DirectDocument = gql`
    mutation create_gate_direct($id: uuid, $dao_id: uuid!, $title: String!, $categories: jsonb, $type: gate_type, $description: String, $skills: jsonb, $permissions: [permissions_insert_input!] = [], $claim_limit: Int, $expire_date: timestamptz, $image: String!, $whitelisted_wallets_file: uuid!) {
  insert_gates_one(
    object: {id: $id, dao_id: $dao_id, title: $title, type: $type, categories: $categories, description: $description, skills: $skills, claim_limit: $claim_limit, expire_date: $expire_date, permissions: {data: $permissions, on_conflict: {constraint: permissions_dao_id_user_id_credential_id_key, update_columns: [permission]}}, image: $image, published: "not_published", whitelisted_wallets_file_id: $whitelisted_wallets_file}
    on_conflict: {constraint: gates_pk, update_columns: [type, title, categories, description, skills, image, published, whitelisted_wallets_file_id, expire_date, claim_limit]}
  ) {
    id
    type
    title
    image
    published
  }
}
    `;
export const Update_User_ProfileDocument = gql`
    mutation update_user_profile($id: uuid!, $name: String!, $username: String!, $pic_id: uuid, $email_address: citext!) {
  update_users_by_pk(
    pk_columns: {id: $id}
    _set: {name: $name, username: $username, pic_id: $pic_id, email_address: $email_address, init: true}
  ) {
    id
    name
    username
    picture {
      ...file
    }
    email_address
  }
}
    ${FileFragmentDoc}`;
export const Create_CodeDocument = gql`
    mutation create_code($user_id: String!, $email: String!) {
  create_code(user_id: $user_id, email: $email) {
    success
  }
}
    `;
export const Verify_CodeDocument = gql`
    mutation verify_code($user_id: String!, $email: String!, $code: String!) {
  verify_code(user_id: $user_id, email: $email, code: $code) {
    success
  }
}
    `;
export const Follow_UserDocument = gql`
    mutation follow_user($id: uuid!) {
  follow_user(args: {id: $id}) {
    user_id
  }
}
    `;
export const Unfollow_UserDocument = gql`
    mutation unfollow_user($id: uuid!) {
  unfollow_user(args: {id: $id}) {
    user_id
  }
}
    `;
export const Follow_DaoDocument = gql`
    mutation follow_dao($id: uuid!) {
  follow_dao(args: {id: $id}) {
    dao_id
    dao {
      id
      logo_url
      name
      is_admin
    }
  }
}
    `;
export const Unfollow_DaoDocument = gql`
    mutation unfollow_dao($id: uuid!) {
  unfollow_dao(args: {id: $id}) {
    dao_id
  }
}
    `;
export const Publish_GateDocument = gql`
    mutation publish_gate($gate_id: uuid!) {
  publish_gate(gate_id: $gate_id) {
    published
    gate_id
  }
}
    `;
export const Toggle_Gate_StateDocument = gql`
    mutation toggle_gate_state($gate_id: uuid!, $state: gate_state!) {
  update_gates_by_pk(pk_columns: {id: $gate_id}, _set: {published: $state}) {
    dao {
      gates {
        id
        title
      }
    }
    published
  }
}
    `;
export const DeleteGateDocument = gql`
    mutation deleteGate($gate_id: uuid!) {
  delete_gates_by_pk(id: $gate_id) {
    id
    title
    dao_id
  }
}
    `;
export const Mint_CredentialDocument = gql`
    mutation mint_credential($id: uuid!) {
  mint_credential(credential_id: $id) {
    status
    message
    info {
      transaction_hash
      chain_id
      wallet
    }
  }
}
    `;
export const Subscribe_To_NewsletterDocument = gql`
    mutation subscribe_to_newsletter($email_address: email) {
  subscribe_to_newsletter(args: {email_address: $email_address}) {
    email
  }
}
    `;
export const Delete_TasksDocument = gql`
    mutation delete_tasks($task_ids: [tasks_bool_exp!]) {
  delete_tasks(where: {_and: $task_ids}) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
export const Delete_Tasks_By_PkDocument = gql`
    mutation delete_tasks_by_pk($task_id: uuid!) {
  delete_tasks_by_pk(id: $task_id) {
    id
  }
}
    `;
export const Complete_TaskDocument = gql`
    mutation complete_task($task_id: uuid!, $info: json) {
  verify_key(input: {task_id: $task_id, info: $info}) {
    task_info
  }
}
    `;
export const Complete_GateDocument = gql`
    mutation complete_gate($gateId: uuid!, $recaptcha: String!) {
  complete_gate(gate_id: $gateId, recaptcha: $recaptcha)
}
    `;
export const Upload_ImageDocument = gql`
    mutation upload_image($base64: String!, $name: String!) {
  upload_image(base64: $base64, metadata: {name: $name}) {
    id
  }
}
    `;
export const Get_Admin_DataDocument = gql`
    query get_admin_data {
  credential_count: credentials_aggregate {
    aggregate {
      count
    }
  }
  minted_credential_count: credentials_aggregate(where: {status: {_eq: "minted"}}) {
    aggregate {
      count
    }
  }
  credential_data: all_credential_count {
    count
    gate {
      image
    }
    name
  }
  user_data: users_aggregate {
    aggregate {
      count
    }
  }
}
    `;
export const All_CredentialsDocument = gql`
    query all_credentials {
  credentials {
    id
    name
    description
    categories
    skills
    created_at
    pow
    image
    uri
    status
    transaction_url
    gate {
      creator {
        id
        name
        username
        pfp
        picture {
          ...file
        }
      }
      holders {
        id
        name
        username
        pfp
        picture {
          ...file
        }
      }
    }
    dao {
      name
      slug
      logo {
        ...file
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const CredentialDocument = gql`
    query credential($id: uuid!) {
  credentials_by_pk(id: $id) {
    id
    target_id
    name
    description
    categories
    skills
    created_at
    pow
    image
    uri
    status
    transaction_url
    gate {
      type
      creator {
        id
        name
        picture {
          ...file
        }
      }
      holders {
        id
        name
        pfp
      }
      tasks {
        id
      }
    }
    dao {
      name
      slug
      logo {
        ...file
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const Count_Total_HoldersDocument = gql`
    query count_total_holders($id: uuid!) {
  credentials_aggregate(where: {gate_id: {_eq: $id}}) {
    aggregate {
      count
    }
  }
}
    `;
export const Holders_By_GateDocument = gql`
    query holders_by_gate($id: uuid!, $offset: Int!) {
  gates_by_pk(id: $id) {
    holders(limit: 6, offset: $offset) {
      id
      name
      username
      pfp
      wallet
      picture {
        ...file
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const Holders_By_SearchDocument = gql`
    query holders_by_search($id: uuid!, $search: String!, $offset: Int!) {
  gates_by_pk(id: $id) {
    title
    holders(where: {_or: {name: {_ilike: $search}}}, limit: 6, offset: $offset) {
      id
      name
      username
      pfp
      wallet
      picture {
        ...file
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const Update_Credential_StatusDocument = gql`
    mutation update_credential_status($id: uuid!, $status: credential_state!, $transaction_url: String!) {
  update_credentials_by_pk(
    pk_columns: {id: $id}
    _set: {status: $status, transaction_url: $transaction_url}
  ) {
    id
    target_id
    name
    description
    categories
    skills
    created_at
    pow
    image
    uri
    status
    transaction_url
    gate {
      creator {
        id
        name
        picture {
          id
          blur
        }
      }
      holders {
        id
        name
        username
        pfp
        picture {
          ...file
        }
      }
    }
    dao {
      name
      slug
      logo {
        ...file
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const Direct_Credential_InfoDocument = gql`
    query direct_credential_info($gate_id: uuid!, $wallet: String!) {
  hasCredential: whitelisted_wallets_aggregate(
    where: {gate_id: {_eq: $gate_id}, user: {wallet: {_eq: $wallet}}}
  ) {
    aggregate {
      count
    }
  }
  whitelisted_wallets_aggregate(where: {gate_id: {_eq: $gate_id}}) {
    aggregate {
      count
    }
  }
}
    `;
export const Direct_Credential_HoldersDocument = gql`
    query direct_credential_holders($gate_id: uuid!, $offset: Int!) {
  whitelisted_wallets(
    limit: 15
    offset: $offset
    where: {gate_id: {_eq: $gate_id}}
  ) {
    wallet
    user {
      id
      name
      username
      pfp
      picture {
        ...file
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const Direct_Credential_Holders_SearchDocument = gql`
    query direct_credential_holders_search($gate_id: uuid!, $offset: Int!, $search: String!) {
  whitelisted_wallets(
    limit: 15
    offset: $offset
    where: {gate_id: {_eq: $gate_id}, _or: [{user: {name: {_ilike: $search}}}, {user: {username: {_ilike: $search}}}, {wallet: {_ilike: $search}}]}
  ) {
    wallet
    user {
      id
      name
      username
      pfp
      picture {
        ...file
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const Dao_PagesDocument = gql`
    query dao_pages {
  daos(limit: 10) {
    id
    slug
  }
}
    `;
export const Dao_ProfileDocument = gql`
    query dao_profile($id: uuid!) {
  daos_by_pk(id: $id) {
    ...dao_profile
    followers(where: {status: {_eq: "following"}}, limit: 6) {
      user {
        id
        name
        username
        pfp
        picture {
          ...file
        }
        permissions(where: {dao_id: {_eq: $id}}) {
          permission
        }
      }
    }
  }
}
    ${Dao_ProfileFragmentDoc}
${FileFragmentDoc}`;
export const Dao_Profile_By_SlugDocument = gql`
    query dao_profile_by_slug($slug: String!) {
  daos(where: {slug: {_eq: $slug}}) {
    ...dao_profile
    followers(where: {status: {_eq: "following"}}, limit: 6) {
      user {
        id
        name
        username
        pfp
        picture {
          ...file
        }
        permissions(where: {dao: {slug: {_eq: $slug}}}) {
          permission
        }
      }
    }
  }
}
    ${Dao_ProfileFragmentDoc}
${FileFragmentDoc}`;
export const Dao_Gates_TabDocument = gql`
    query dao_gates_tab($id: uuid!) {
  daos_by_pk(id: $id) {
    gates {
      id
      title
      description
      categories
      image
      published
      dao {
        id
      }
    }
  }
}
    `;
export const Dao_Profile_PeopleDocument = gql`
    query dao_profile_people($id: uuid!, $offset: Int!) {
  daos_by_pk(id: $id) {
    followers(
      where: {status: {_eq: "following"}}
      order_by: {user: {name: asc}}
      limit: 15
      offset: $offset
    ) {
      user {
        id
        name
        username
        pfp
        picture {
          ...file
        }
        permissions(where: {dao_id: {_eq: $id}}) {
          permission
        }
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const Create_DaoDocument = gql`
    mutation create_dao($logo_id: uuid!, $name: String!, $description: String!, $categories: jsonb!, $background_id: uuid!, $socials: [dao_socials_insert_input!]!) {
  insert_daos_one(
    object: {logo_id: $logo_id, name: $name, description: $description, categories: $categories, background_id: $background_id, socials: {data: $socials}}
  ) {
    id
    logo_url
    name
    is_admin
    slug
    logo {
      ...file
    }
  }
}
    ${FileFragmentDoc}`;
export const Edit_DaoDocument = gql`
    mutation edit_dao($id: uuid!, $logo_id: uuid!, $name: String!, $description: String!, $categories: jsonb!, $background_id: uuid!, $socials: [dao_socials_insert_input!]!) {
  update_daos_by_pk(
    _set: {logo_id: $logo_id, name: $name, description: $description, categories: $categories, background_id: $background_id}
    pk_columns: {id: $id}
  ) {
    id
    logo_url
    name
    is_admin
    slug
    logo {
      ...file
    }
  }
  delete_dao_socials(where: {dao_id: {_eq: $id}}) {
    affected_rows
  }
  insert_dao_socials(objects: $socials) {
    affected_rows
  }
}
    ${FileFragmentDoc}`;
export const Dao_Set_User_AdminDocument = gql`
    mutation dao_set_user_admin($dao_id: uuid!, $user_id: uuid!, $permission: permission_types = "dao_admin") {
  insert_permissions(
    objects: {dao_id: $dao_id, user_id: $user_id, permission: $permission}
    on_conflict: {constraint: permissions_dao_id_user_id_credential_id_key, update_columns: [permission]}
  ) {
    affected_rows
  }
}
    `;
export const Dao_Set_User_MemberDocument = gql`
    mutation dao_set_user_member($dao_id: uuid!, $user_id: uuid!, $permission: permission_types = "member") {
  insert_permissions(
    objects: {dao_id: $dao_id, user_id: $user_id, permission: $permission}
    on_conflict: {constraint: permissions_dao_id_user_id_credential_id_key, update_columns: [permission]}
  ) {
    affected_rows
  }
}
    `;
export const All_GatesDocument = gql`
    query all_gates {
  gates {
    id
    title
    description
    categories
    skills
    published
    links
    image
  }
}
    `;
export const GateDocument = gql`
    query gate($id: uuid!) {
  gates_by_pk(id: $id) {
    id
    title
    description
    categories
    skills
    published
    links
    image
    type
    creator {
      id
      name
      username
      pfp
      picture {
        ...file
      }
    }
    claim_limit
    expire_date
    holder_count
    holders(limit: 4) {
      id
      name
      username
      pfp
      wallet
      picture {
        ...file
      }
    }
    dao {
      id
      name
      slug
      logo_url
      logo {
        id
        blur
      }
    }
    tasks {
      description
      gate_id
      id
      task_data
      task_type
      title
      order
    }
    whitelisted_wallets {
      ens
      wallet
    }
    whitelisted_wallets_file {
      id
      metadata
    }
  }
}
    ${FileFragmentDoc}`;
export const Get_Create_GateDocument = gql`
    query get_create_gate($id: uuid!) {
  gates_by_pk(id: $id) {
    id
    title
    description
    categories
    skills
    published
    links
    image
    type
    creator {
      id
      name
      username
      pfp
      picture {
        ...file
      }
    }
    holder_count
    holders(limit: 4) {
      id
      name
      username
      pfp
      wallet
      picture {
        ...file
      }
    }
    dao {
      id
      name
      slug
      logo_url
      logo {
        id
        blur
      }
    }
    tasks {
      description
      gate_id
      id
      task_data
      task_type
      title
      order
    }
    whitelisted_wallets_file {
      id
      metadata
    }
  }
}
    ${FileFragmentDoc}`;
export const Verify_Csv_ProgressDocument = gql`
    query verify_csv_progress($file_id: uuid!) {
  verify_csv_progress(id: $file_id) {
    id
    invalid
    invalidList
    isDone
    total
    uploadedTime
    valid
    validList
  }
}
    `;
export const GateProgressDocument = gql`
    query GateProgress($gateID: uuid!, $userID: uuid!) {
  credentials(where: {gate_id: {_eq: $gateID}, target_id: {_eq: $userID}}) {
    created_at
  }
}
    `;
export const Get_HomeDocument = gql`
    query get_home($daos_where: daos_bool_exp = {}) {
  gates(
    where: {published: {_eq: "published"}}
    limit: 4
    order_by: {published_at: desc, updated_at: desc}
  ) {
    id
    title
    description
    categories
    image
    published
    dao {
      id
      logo_url
      slug
      logo {
        ...file
      }
      name
    }
  }
  daos(limit: 3, where: $daos_where) {
    id
    name
    slug
    logo {
      ...file
    }
    logo_url
    background {
      ...file
    }
    followers_aggregate {
      aggregate {
        count
      }
    }
    gates_aggregate {
      aggregate {
        count
      }
    }
    background_url
    description
    categories
    permissions {
      user_id
      permission
    }
  }
  people: users(limit: 9) {
    id
    name
    about
    username
    wallet
    picture {
      ...file
    }
  }
}
    ${FileFragmentDoc}`;
export const Gates_TabDocument = gql`
    query gates_tab {
  gates(order_by: {published_at: desc, updated_at: desc}) {
    id
    title
    description
    categories
    image
    published
    dao {
      id
      logo_url
      slug
      logo {
        ...file
      }
      name
    }
  }
}
    ${FileFragmentDoc}`;
export const Daos_TabDocument = gql`
    query daos_tab {
  daos(order_by: {name: asc}) {
    id
    name
    slug
    logo {
      ...file
    }
    logo_url
    background {
      ...file
    }
    followers_aggregate {
      aggregate {
        count
      }
    }
    gates_aggregate {
      aggregate {
        count
      }
    }
    background_url
    description
    categories
    permissions {
      user_id
      permission
    }
  }
}
    ${FileFragmentDoc}`;
export const People_TabDocument = gql`
    query people_tab($offset: Int!) {
  people: users(order_by: {name: asc}, limit: 15, offset: $offset) {
    id
    name
    picture {
      ...file
    }
    about
    username
    wallet
  }
}
    ${FileFragmentDoc}`;
export const MeDocument = gql`
    query me {
  me {
    ...current_user
    permissions {
      gate_id
      dao_id
      dao {
        is_admin
      }
      permission
    }
    picture {
      ...file
    }
    following {
      user_id
    }
    task_progresses {
      task_id
      gate_id
      completed
      updated_at
    }
    following_dao {
      dao_id
      dao {
        id
        logo_url
        slug
        name
        is_admin
        logo {
          ...file
        }
      }
    }
  }
}
    ${Current_UserFragmentDoc}
${FileFragmentDoc}`;
export const Me_User_InfoDocument = gql`
    query me_user_info {
  me {
    ...current_user
    picture {
      ...file
    }
  }
}
    ${Current_UserFragmentDoc}
${FileFragmentDoc}`;
export const Me_PermissionsDocument = gql`
    query me_permissions {
  me {
    permissions {
      gate_id
      dao_id
      dao {
        is_admin
      }
      permission
    }
  }
}
    `;
export const Me_FollowingDocument = gql`
    query me_following {
  me {
    following {
      user_id
    }
    following_dao(where: {status: {_eq: "following"}}) {
      dao_id
      dao {
        id
        logo_url
        slug
        name
        is_admin
        logo {
          ...file
        }
      }
    }
  }
}
    ${FileFragmentDoc}`;
export const Me_Task_ProgressesDocument = gql`
    query me_task_progresses {
  me {
    task_progresses {
      task_id
      gate_id
      completed
      updated_at
    }
  }
}
    `;
export const User_From_WalletDocument = gql`
    query user_from_wallet($wallet: String!) {
  users(where: {wallet: {_eq: $wallet}}) {
    id
    wallet
    name
    username
    picture {
      ...file
    }
  }
}
    ${FileFragmentDoc}`;
export const SearchDocument = gql`
    query search($query: String!) {
  gates: search_gates(args: {search: $query}) {
    id
    title
    description
    categories
    skills
    published
    links
    image
  }
  daos: search_daos(args: {search: $query}) {
    id
    name
    slug
    logo {
      ...file
    }
    logo_url
    background {
      ...file
    }
    followers_aggregate {
      aggregate {
        count
      }
    }
    gates_aggregate {
      aggregate {
        count
      }
    }
    background_url
    description
    categories
    permissions {
      user_id
      permission
    }
  }
  users: search_users(args: {search: $query}) {
    ...public_user
    pfp
  }
}
    ${FileFragmentDoc}
${Public_UserFragmentDoc}`;
export const Twitter_DataDocument = gql`
    query twitter_data($userName: String!) {
  get_twitter_user_data(userName: $userName) {
    verified
    username
    protected
    profile_image_url
    name
    location
    id
    description
    public_metrics {
      followers_count
      following_count
      listed_count
      tweet_count
    }
  }
}
    `;
export const Twitter_TweetDocument = gql`
    query twitter_tweet($id: String!) {
  get_twitter_tweet(id: $id) {
    id
    author_id
    text
  }
}
    `;
export const UsersDocument = gql`
    query Users {
  users {
    ...public_user
    pfp
  }
}
    ${Public_UserFragmentDoc}`;
export const Get_User_By_UsernameDocument = gql`
    query get_user_by_username($username: String!) {
  users(where: {username: {_eq: $username}}) {
    ...public_user
    wallet
    pfp
  }
}
    ${Public_UserFragmentDoc}`;
export const Users_By_WalletsDocument = gql`
    query users_by_wallets($wallets: [String!]!) {
  users(where: {wallet: {_in: $wallets}}) {
    id
    name
    username
    wallet
    picture {
      ...file
    }
  }
}
    ${FileFragmentDoc}`;
export const Edit_UserDocument = gql`
    mutation edit_user($id: uuid!, $bio: String, $name: String, $pic_id: uuid, $skills: jsonb, $username: String, $timezone: String, $cover_id: uuid, $languages: jsonb, $socials: [user_socials_insert_input!]!) {
  update_users_by_pk(
    pk_columns: {id: $id}
    _set: {bio: $bio, cover_id: $cover_id, languages: $languages, name: $name, pic_id: $pic_id, skills: $skills, timezone: $timezone, username: $username}
  ) {
    ...current_user
  }
  delete_user_socials(where: {user_id: {_eq: $id}}) {
    affected_rows
  }
  insert_user_socials(objects: $socials) {
    affected_rows
  }
}
    ${Current_UserFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    get_nonce(variables: Get_NonceQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Get_NonceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Get_NonceQuery>(Get_NonceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'get_nonce', 'query');
    },
    login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login', 'mutation');
    },
    refresh(variables: RefreshMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RefreshMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RefreshMutation>(RefreshDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'refresh', 'mutation');
    },
    create_gate_tasks_based(variables: Create_Gate_Tasks_BasedMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Create_Gate_Tasks_BasedMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Create_Gate_Tasks_BasedMutation>(Create_Gate_Tasks_BasedDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'create_gate_tasks_based', 'mutation');
    },
    create_gate_direct(variables: Create_Gate_DirectMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Create_Gate_DirectMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Create_Gate_DirectMutation>(Create_Gate_DirectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'create_gate_direct', 'mutation');
    },
    update_user_profile(variables: Update_User_ProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Update_User_ProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Update_User_ProfileMutation>(Update_User_ProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'update_user_profile', 'mutation');
    },
    create_code(variables: Create_CodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Create_CodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Create_CodeMutation>(Create_CodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'create_code', 'mutation');
    },
    verify_code(variables: Verify_CodeMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Verify_CodeMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Verify_CodeMutation>(Verify_CodeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verify_code', 'mutation');
    },
    follow_user(variables: Follow_UserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Follow_UserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Follow_UserMutation>(Follow_UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'follow_user', 'mutation');
    },
    unfollow_user(variables: Unfollow_UserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Unfollow_UserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Unfollow_UserMutation>(Unfollow_UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unfollow_user', 'mutation');
    },
    follow_dao(variables: Follow_DaoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Follow_DaoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Follow_DaoMutation>(Follow_DaoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'follow_dao', 'mutation');
    },
    unfollow_dao(variables: Unfollow_DaoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Unfollow_DaoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Unfollow_DaoMutation>(Unfollow_DaoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'unfollow_dao', 'mutation');
    },
    publish_gate(variables: Publish_GateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Publish_GateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Publish_GateMutation>(Publish_GateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'publish_gate', 'mutation');
    },
    toggle_gate_state(variables: Toggle_Gate_StateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Toggle_Gate_StateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Toggle_Gate_StateMutation>(Toggle_Gate_StateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'toggle_gate_state', 'mutation');
    },
    deleteGate(variables: DeleteGateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteGateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteGateMutation>(DeleteGateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteGate', 'mutation');
    },
    mint_credential(variables: Mint_CredentialMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Mint_CredentialMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Mint_CredentialMutation>(Mint_CredentialDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'mint_credential', 'mutation');
    },
    subscribe_to_newsletter(variables?: Subscribe_To_NewsletterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Subscribe_To_NewsletterMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Subscribe_To_NewsletterMutation>(Subscribe_To_NewsletterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'subscribe_to_newsletter', 'mutation');
    },
    delete_tasks(variables?: Delete_TasksMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Delete_TasksMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Delete_TasksMutation>(Delete_TasksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'delete_tasks', 'mutation');
    },
    delete_tasks_by_pk(variables: Delete_Tasks_By_PkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Delete_Tasks_By_PkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Delete_Tasks_By_PkMutation>(Delete_Tasks_By_PkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'delete_tasks_by_pk', 'mutation');
    },
    complete_task(variables: Complete_TaskMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Complete_TaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Complete_TaskMutation>(Complete_TaskDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'complete_task', 'mutation');
    },
    complete_gate(variables: Complete_GateMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Complete_GateMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Complete_GateMutation>(Complete_GateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'complete_gate', 'mutation');
    },
    upload_image(variables: Upload_ImageMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Upload_ImageMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Upload_ImageMutation>(Upload_ImageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'upload_image', 'mutation');
    },
    get_admin_data(variables?: Get_Admin_DataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Get_Admin_DataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Get_Admin_DataQuery>(Get_Admin_DataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'get_admin_data', 'query');
    },
    all_credentials(variables?: All_CredentialsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<All_CredentialsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<All_CredentialsQuery>(All_CredentialsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'all_credentials', 'query');
    },
    credential(variables: CredentialQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CredentialQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CredentialQuery>(CredentialDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'credential', 'query');
    },
    count_total_holders(variables: Count_Total_HoldersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Count_Total_HoldersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Count_Total_HoldersQuery>(Count_Total_HoldersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'count_total_holders', 'query');
    },
    holders_by_gate(variables: Holders_By_GateQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Holders_By_GateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Holders_By_GateQuery>(Holders_By_GateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'holders_by_gate', 'query');
    },
    holders_by_search(variables: Holders_By_SearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Holders_By_SearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Holders_By_SearchQuery>(Holders_By_SearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'holders_by_search', 'query');
    },
    update_credential_status(variables: Update_Credential_StatusMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Update_Credential_StatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Update_Credential_StatusMutation>(Update_Credential_StatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'update_credential_status', 'mutation');
    },
    direct_credential_info(variables: Direct_Credential_InfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Direct_Credential_InfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Direct_Credential_InfoQuery>(Direct_Credential_InfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'direct_credential_info', 'query');
    },
    direct_credential_holders(variables: Direct_Credential_HoldersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Direct_Credential_HoldersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Direct_Credential_HoldersQuery>(Direct_Credential_HoldersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'direct_credential_holders', 'query');
    },
    direct_credential_holders_search(variables: Direct_Credential_Holders_SearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Direct_Credential_Holders_SearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Direct_Credential_Holders_SearchQuery>(Direct_Credential_Holders_SearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'direct_credential_holders_search', 'query');
    },
    dao_pages(variables?: Dao_PagesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Dao_PagesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Dao_PagesQuery>(Dao_PagesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dao_pages', 'query');
    },
    dao_profile(variables: Dao_ProfileQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Dao_ProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Dao_ProfileQuery>(Dao_ProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dao_profile', 'query');
    },
    dao_profile_by_slug(variables: Dao_Profile_By_SlugQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Dao_Profile_By_SlugQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Dao_Profile_By_SlugQuery>(Dao_Profile_By_SlugDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dao_profile_by_slug', 'query');
    },
    dao_gates_tab(variables: Dao_Gates_TabQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Dao_Gates_TabQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Dao_Gates_TabQuery>(Dao_Gates_TabDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dao_gates_tab', 'query');
    },
    dao_profile_people(variables: Dao_Profile_PeopleQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Dao_Profile_PeopleQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Dao_Profile_PeopleQuery>(Dao_Profile_PeopleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dao_profile_people', 'query');
    },
    create_dao(variables: Create_DaoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Create_DaoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Create_DaoMutation>(Create_DaoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'create_dao', 'mutation');
    },
    edit_dao(variables: Edit_DaoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Edit_DaoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Edit_DaoMutation>(Edit_DaoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'edit_dao', 'mutation');
    },
    dao_set_user_admin(variables: Dao_Set_User_AdminMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Dao_Set_User_AdminMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Dao_Set_User_AdminMutation>(Dao_Set_User_AdminDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dao_set_user_admin', 'mutation');
    },
    dao_set_user_member(variables: Dao_Set_User_MemberMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Dao_Set_User_MemberMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Dao_Set_User_MemberMutation>(Dao_Set_User_MemberDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'dao_set_user_member', 'mutation');
    },
    all_gates(variables?: All_GatesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<All_GatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<All_GatesQuery>(All_GatesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'all_gates', 'query');
    },
    gate(variables: GateQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GateQuery>(GateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'gate', 'query');
    },
    get_create_gate(variables: Get_Create_GateQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Get_Create_GateQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Get_Create_GateQuery>(Get_Create_GateDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'get_create_gate', 'query');
    },
    verify_csv_progress(variables: Verify_Csv_ProgressQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Verify_Csv_ProgressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Verify_Csv_ProgressQuery>(Verify_Csv_ProgressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'verify_csv_progress', 'query');
    },
    GateProgress(variables: GateProgressQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GateProgressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GateProgressQuery>(GateProgressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GateProgress', 'query');
    },
    get_home(variables?: Get_HomeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Get_HomeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Get_HomeQuery>(Get_HomeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'get_home', 'query');
    },
    gates_tab(variables?: Gates_TabQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Gates_TabQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Gates_TabQuery>(Gates_TabDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'gates_tab', 'query');
    },
    daos_tab(variables?: Daos_TabQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Daos_TabQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Daos_TabQuery>(Daos_TabDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'daos_tab', 'query');
    },
    people_tab(variables: People_TabQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<People_TabQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<People_TabQuery>(People_TabDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'people_tab', 'query');
    },
    me(variables?: MeQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<MeQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MeQuery>(MeDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me', 'query');
    },
    me_user_info(variables?: Me_User_InfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Me_User_InfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Me_User_InfoQuery>(Me_User_InfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me_user_info', 'query');
    },
    me_permissions(variables?: Me_PermissionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Me_PermissionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Me_PermissionsQuery>(Me_PermissionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me_permissions', 'query');
    },
    me_following(variables?: Me_FollowingQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Me_FollowingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Me_FollowingQuery>(Me_FollowingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me_following', 'query');
    },
    me_task_progresses(variables?: Me_Task_ProgressesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Me_Task_ProgressesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Me_Task_ProgressesQuery>(Me_Task_ProgressesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'me_task_progresses', 'query');
    },
    user_from_wallet(variables: User_From_WalletQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<User_From_WalletQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<User_From_WalletQuery>(User_From_WalletDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'user_from_wallet', 'query');
    },
    search(variables: SearchQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SearchQuery>(SearchDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'search', 'query');
    },
    twitter_data(variables: Twitter_DataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Twitter_DataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Twitter_DataQuery>(Twitter_DataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'twitter_data', 'query');
    },
    twitter_tweet(variables: Twitter_TweetQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Twitter_TweetQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Twitter_TweetQuery>(Twitter_TweetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'twitter_tweet', 'query');
    },
    Users(variables?: UsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersQuery>(UsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Users', 'query');
    },
    get_user_by_username(variables: Get_User_By_UsernameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Get_User_By_UsernameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Get_User_By_UsernameQuery>(Get_User_By_UsernameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'get_user_by_username', 'query');
    },
    users_by_wallets(variables: Users_By_WalletsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Users_By_WalletsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Users_By_WalletsQuery>(Users_By_WalletsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'users_by_wallets', 'query');
    },
    edit_user(variables: Edit_UserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Edit_UserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Edit_UserMutation>(Edit_UserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'edit_user', 'mutation');
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
  AlgoliaPaginationInput: ResolverTypeWrapper<Partial<AlgoliaPaginationInput>>;
  AlgoliaSearchResults: ResolverTypeWrapper<Partial<AlgoliaSearchResults>>;
  ApproveCredentialOutput: ResolverTypeWrapper<Partial<ApproveCredentialOutput>>;
  ApproveMTInput: ResolverTypeWrapper<Partial<ApproveMtInput>>;
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>;
  Boolean_comparison_exp: ResolverTypeWrapper<Partial<Boolean_Comparison_Exp>>;
  ClaimCredentialOutput: ResolverTypeWrapper<Partial<ClaimCredentialOutput>>;
  CreateCodeOutput: ResolverTypeWrapper<Partial<CreateCodeOutput>>;
  Float: ResolverTypeWrapper<Partial<Scalars['Float']>>;
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>;
  Int_comparison_exp: ResolverTypeWrapper<Partial<Int_Comparison_Exp>>;
  LinkPreviewOutput: ResolverTypeWrapper<Partial<LinkPreviewOutput>>;
  LoginOutput: ResolverTypeWrapper<Partial<LoginOutput>>;
  MetadataInput: ResolverTypeWrapper<Partial<MetadataInput>>;
  MintCredentialInfo: ResolverTypeWrapper<Partial<MintCredentialInfo>>;
  MintCredentialOutput: ResolverTypeWrapper<Partial<MintCredentialOutput>>;
  NonceOutput: ResolverTypeWrapper<Partial<NonceOutput>>;
  OptionsInput: ResolverTypeWrapper<Partial<OptionsInput>>;
  PublishGateOutput: ResolverTypeWrapper<Partial<PublishGateOutput>>;
  RefreshOutput: ResolverTypeWrapper<Partial<RefreshOutput>>;
  RejectMTOutput: ResolverTypeWrapper<Partial<RejectMtOutput>>;
  Resize: ResolverTypeWrapper<Partial<Resize>>;
  ResizeInput: ResolverTypeWrapper<Partial<ResizeInput>>;
  String: ResolverTypeWrapper<Partial<Scalars['String']>>;
  String_comparison_exp: ResolverTypeWrapper<Partial<String_Comparison_Exp>>;
  TransformOptions: ResolverTypeWrapper<Partial<TransformOptions>>;
  TransformOutput: ResolverTypeWrapper<Partial<TransformOutput>>;
  TransformedImage: ResolverTypeWrapper<Partial<TransformedImage>>;
  TwitterPublicMetrics: ResolverTypeWrapper<Partial<TwitterPublicMetrics>>;
  TwitterTweet: ResolverTypeWrapper<Partial<TwitterTweet>>;
  TwitterUser: ResolverTypeWrapper<Partial<TwitterUser>>;
  UploadOutput: ResolverTypeWrapper<Partial<UploadOutput>>;
  VerifyCSVOutput: ResolverTypeWrapper<Partial<VerifyCsvOutput>>;
  VerifyCSVProgressOutput: ResolverTypeWrapper<Partial<VerifyCsvProgressOutput>>;
  VerifyCodeOutput: ResolverTypeWrapper<Partial<VerifyCodeOutput>>;
  VerifyInput: ResolverTypeWrapper<Partial<VerifyInput>>;
  VerifyOutput: ResolverTypeWrapper<Partial<VerifyOutput>>;
  _text: ResolverTypeWrapper<Partial<Scalars['_text']>>;
  _text_comparison_exp: ResolverTypeWrapper<Partial<_Text_Comparison_Exp>>;
  access_tokens: ResolverTypeWrapper<Partial<Access_Tokens>>;
  access_tokens_aggregate: ResolverTypeWrapper<Partial<Access_Tokens_Aggregate>>;
  access_tokens_aggregate_fields: ResolverTypeWrapper<Partial<Access_Tokens_Aggregate_Fields>>;
  access_tokens_bool_exp: ResolverTypeWrapper<Partial<Access_Tokens_Bool_Exp>>;
  access_tokens_constraint: ResolverTypeWrapper<Partial<Access_Tokens_Constraint>>;
  access_tokens_insert_input: ResolverTypeWrapper<Partial<Access_Tokens_Insert_Input>>;
  access_tokens_max_fields: ResolverTypeWrapper<Partial<Access_Tokens_Max_Fields>>;
  access_tokens_min_fields: ResolverTypeWrapper<Partial<Access_Tokens_Min_Fields>>;
  access_tokens_mutation_response: ResolverTypeWrapper<Partial<Access_Tokens_Mutation_Response>>;
  access_tokens_obj_rel_insert_input: ResolverTypeWrapper<Partial<Access_Tokens_Obj_Rel_Insert_Input>>;
  access_tokens_on_conflict: ResolverTypeWrapper<Partial<Access_Tokens_On_Conflict>>;
  access_tokens_order_by: ResolverTypeWrapper<Partial<Access_Tokens_Order_By>>;
  access_tokens_select_column: ResolverTypeWrapper<Partial<Access_Tokens_Select_Column>>;
  access_tokens_set_input: ResolverTypeWrapper<Partial<Access_Tokens_Set_Input>>;
  access_tokens_stream_cursor_input: ResolverTypeWrapper<Partial<Access_Tokens_Stream_Cursor_Input>>;
  access_tokens_stream_cursor_value_input: ResolverTypeWrapper<Partial<Access_Tokens_Stream_Cursor_Value_Input>>;
  access_tokens_update_column: ResolverTypeWrapper<Partial<Access_Tokens_Update_Column>>;
  access_tokens_updates: ResolverTypeWrapper<Partial<Access_Tokens_Updates>>;
  all_credential_count: ResolverTypeWrapper<Partial<All_Credential_Count>>;
  all_credential_count_aggregate: ResolverTypeWrapper<Partial<All_Credential_Count_Aggregate>>;
  all_credential_count_aggregate_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Aggregate_Fields>>;
  all_credential_count_avg_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Avg_Fields>>;
  all_credential_count_bool_exp: ResolverTypeWrapper<Partial<All_Credential_Count_Bool_Exp>>;
  all_credential_count_max_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Max_Fields>>;
  all_credential_count_min_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Min_Fields>>;
  all_credential_count_order_by: ResolverTypeWrapper<Partial<All_Credential_Count_Order_By>>;
  all_credential_count_select_column: ResolverTypeWrapper<Partial<All_Credential_Count_Select_Column>>;
  all_credential_count_stddev_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Stddev_Fields>>;
  all_credential_count_stddev_pop_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Stddev_Pop_Fields>>;
  all_credential_count_stddev_samp_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Stddev_Samp_Fields>>;
  all_credential_count_stream_cursor_input: ResolverTypeWrapper<Partial<All_Credential_Count_Stream_Cursor_Input>>;
  all_credential_count_stream_cursor_value_input: ResolverTypeWrapper<Partial<All_Credential_Count_Stream_Cursor_Value_Input>>;
  all_credential_count_sum_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Sum_Fields>>;
  all_credential_count_var_pop_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Var_Pop_Fields>>;
  all_credential_count_var_samp_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Var_Samp_Fields>>;
  all_credential_count_variance_fields: ResolverTypeWrapper<Partial<All_Credential_Count_Variance_Fields>>;
  bigint: ResolverTypeWrapper<Partial<Scalars['bigint']>>;
  bigint_comparison_exp: ResolverTypeWrapper<Partial<Bigint_Comparison_Exp>>;
  bookmarks: ResolverTypeWrapper<Partial<Bookmarks>>;
  bookmarks_aggregate: ResolverTypeWrapper<Partial<Bookmarks_Aggregate>>;
  bookmarks_aggregate_bool_exp: ResolverTypeWrapper<Partial<Bookmarks_Aggregate_Bool_Exp>>;
  bookmarks_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Bookmarks_Aggregate_Bool_Exp_Count>>;
  bookmarks_aggregate_fields: ResolverTypeWrapper<Partial<Bookmarks_Aggregate_Fields>>;
  bookmarks_aggregate_order_by: ResolverTypeWrapper<Partial<Bookmarks_Aggregate_Order_By>>;
  bookmarks_arr_rel_insert_input: ResolverTypeWrapper<Partial<Bookmarks_Arr_Rel_Insert_Input>>;
  bookmarks_bool_exp: ResolverTypeWrapper<Partial<Bookmarks_Bool_Exp>>;
  bookmarks_constraint: ResolverTypeWrapper<Partial<Bookmarks_Constraint>>;
  bookmarks_insert_input: ResolverTypeWrapper<Partial<Bookmarks_Insert_Input>>;
  bookmarks_max_fields: ResolverTypeWrapper<Partial<Bookmarks_Max_Fields>>;
  bookmarks_max_order_by: ResolverTypeWrapper<Partial<Bookmarks_Max_Order_By>>;
  bookmarks_min_fields: ResolverTypeWrapper<Partial<Bookmarks_Min_Fields>>;
  bookmarks_min_order_by: ResolverTypeWrapper<Partial<Bookmarks_Min_Order_By>>;
  bookmarks_mutation_response: ResolverTypeWrapper<Partial<Bookmarks_Mutation_Response>>;
  bookmarks_on_conflict: ResolverTypeWrapper<Partial<Bookmarks_On_Conflict>>;
  bookmarks_order_by: ResolverTypeWrapper<Partial<Bookmarks_Order_By>>;
  bookmarks_select_column: ResolverTypeWrapper<Partial<Bookmarks_Select_Column>>;
  bookmarks_set_input: ResolverTypeWrapper<Partial<Bookmarks_Set_Input>>;
  bookmarks_stream_cursor_input: ResolverTypeWrapper<Partial<Bookmarks_Stream_Cursor_Input>>;
  bookmarks_stream_cursor_value_input: ResolverTypeWrapper<Partial<Bookmarks_Stream_Cursor_Value_Input>>;
  bookmarks_update_column: ResolverTypeWrapper<Partial<Bookmarks_Update_Column>>;
  bookmarks_updates: ResolverTypeWrapper<Partial<Bookmarks_Updates>>;
  bounties: ResolverTypeWrapper<Partial<Bounties>>;
  bounties_aggregate: ResolverTypeWrapper<Partial<Bounties_Aggregate>>;
  bounties_aggregate_bool_exp: ResolverTypeWrapper<Partial<Bounties_Aggregate_Bool_Exp>>;
  bounties_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Bounties_Aggregate_Bool_Exp_Count>>;
  bounties_aggregate_fields: ResolverTypeWrapper<Partial<Bounties_Aggregate_Fields>>;
  bounties_aggregate_order_by: ResolverTypeWrapper<Partial<Bounties_Aggregate_Order_By>>;
  bounties_arr_rel_insert_input: ResolverTypeWrapper<Partial<Bounties_Arr_Rel_Insert_Input>>;
  bounties_bool_exp: ResolverTypeWrapper<Partial<Bounties_Bool_Exp>>;
  bounties_constraint: ResolverTypeWrapper<Partial<Bounties_Constraint>>;
  bounties_insert_input: ResolverTypeWrapper<Partial<Bounties_Insert_Input>>;
  bounties_max_fields: ResolverTypeWrapper<Partial<Bounties_Max_Fields>>;
  bounties_max_order_by: ResolverTypeWrapper<Partial<Bounties_Max_Order_By>>;
  bounties_min_fields: ResolverTypeWrapper<Partial<Bounties_Min_Fields>>;
  bounties_min_order_by: ResolverTypeWrapper<Partial<Bounties_Min_Order_By>>;
  bounties_mutation_response: ResolverTypeWrapper<Partial<Bounties_Mutation_Response>>;
  bounties_on_conflict: ResolverTypeWrapper<Partial<Bounties_On_Conflict>>;
  bounties_order_by: ResolverTypeWrapper<Partial<Bounties_Order_By>>;
  bounties_pk_columns_input: ResolverTypeWrapper<Partial<Bounties_Pk_Columns_Input>>;
  bounties_select_column: ResolverTypeWrapper<Partial<Bounties_Select_Column>>;
  bounties_set_input: ResolverTypeWrapper<Partial<Bounties_Set_Input>>;
  bounties_stream_cursor_input: ResolverTypeWrapper<Partial<Bounties_Stream_Cursor_Input>>;
  bounties_stream_cursor_value_input: ResolverTypeWrapper<Partial<Bounties_Stream_Cursor_Value_Input>>;
  bounties_update_column: ResolverTypeWrapper<Partial<Bounties_Update_Column>>;
  bounties_updates: ResolverTypeWrapper<Partial<Bounties_Updates>>;
  citext: ResolverTypeWrapper<Partial<Scalars['citext']>>;
  citext_comparison_exp: ResolverTypeWrapper<Partial<Citext_Comparison_Exp>>;
  credential_group: ResolverTypeWrapper<Partial<Credential_Group>>;
  credential_group_aggregate: ResolverTypeWrapper<Partial<Credential_Group_Aggregate>>;
  credential_group_aggregate_bool_exp: ResolverTypeWrapper<Partial<Credential_Group_Aggregate_Bool_Exp>>;
  credential_group_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Credential_Group_Aggregate_Bool_Exp_Count>>;
  credential_group_aggregate_fields: ResolverTypeWrapper<Partial<Credential_Group_Aggregate_Fields>>;
  credential_group_aggregate_order_by: ResolverTypeWrapper<Partial<Credential_Group_Aggregate_Order_By>>;
  credential_group_append_input: ResolverTypeWrapper<Partial<Credential_Group_Append_Input>>;
  credential_group_arr_rel_insert_input: ResolverTypeWrapper<Partial<Credential_Group_Arr_Rel_Insert_Input>>;
  credential_group_bool_exp: ResolverTypeWrapper<Partial<Credential_Group_Bool_Exp>>;
  credential_group_constraint: ResolverTypeWrapper<Partial<Credential_Group_Constraint>>;
  credential_group_delete_at_path_input: ResolverTypeWrapper<Partial<Credential_Group_Delete_At_Path_Input>>;
  credential_group_delete_elem_input: ResolverTypeWrapper<Partial<Credential_Group_Delete_Elem_Input>>;
  credential_group_delete_key_input: ResolverTypeWrapper<Partial<Credential_Group_Delete_Key_Input>>;
  credential_group_insert_input: ResolverTypeWrapper<Partial<Credential_Group_Insert_Input>>;
  credential_group_max_fields: ResolverTypeWrapper<Partial<Credential_Group_Max_Fields>>;
  credential_group_max_order_by: ResolverTypeWrapper<Partial<Credential_Group_Max_Order_By>>;
  credential_group_min_fields: ResolverTypeWrapper<Partial<Credential_Group_Min_Fields>>;
  credential_group_min_order_by: ResolverTypeWrapper<Partial<Credential_Group_Min_Order_By>>;
  credential_group_mutation_response: ResolverTypeWrapper<Partial<Credential_Group_Mutation_Response>>;
  credential_group_obj_rel_insert_input: ResolverTypeWrapper<Partial<Credential_Group_Obj_Rel_Insert_Input>>;
  credential_group_on_conflict: ResolverTypeWrapper<Partial<Credential_Group_On_Conflict>>;
  credential_group_order_by: ResolverTypeWrapper<Partial<Credential_Group_Order_By>>;
  credential_group_pk_columns_input: ResolverTypeWrapper<Partial<Credential_Group_Pk_Columns_Input>>;
  credential_group_prepend_input: ResolverTypeWrapper<Partial<Credential_Group_Prepend_Input>>;
  credential_group_select_column: ResolverTypeWrapper<Partial<Credential_Group_Select_Column>>;
  credential_group_set_input: ResolverTypeWrapper<Partial<Credential_Group_Set_Input>>;
  credential_group_stream_cursor_input: ResolverTypeWrapper<Partial<Credential_Group_Stream_Cursor_Input>>;
  credential_group_stream_cursor_value_input: ResolverTypeWrapper<Partial<Credential_Group_Stream_Cursor_Value_Input>>;
  credential_group_update_column: ResolverTypeWrapper<Partial<Credential_Group_Update_Column>>;
  credential_group_updates: ResolverTypeWrapper<Partial<Credential_Group_Updates>>;
  credential_state: ResolverTypeWrapper<Partial<Scalars['credential_state']>>;
  credential_state_comparison_exp: ResolverTypeWrapper<Partial<Credential_State_Comparison_Exp>>;
  credentials: ResolverTypeWrapper<Partial<Credentials>>;
  credentials_aggregate: ResolverTypeWrapper<Partial<Credentials_Aggregate>>;
  credentials_aggregate_bool_exp: ResolverTypeWrapper<Partial<Credentials_Aggregate_Bool_Exp>>;
  credentials_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Credentials_Aggregate_Bool_Exp_Count>>;
  credentials_aggregate_fields: ResolverTypeWrapper<Partial<Credentials_Aggregate_Fields>>;
  credentials_aggregate_order_by: ResolverTypeWrapper<Partial<Credentials_Aggregate_Order_By>>;
  credentials_append_input: ResolverTypeWrapper<Partial<Credentials_Append_Input>>;
  credentials_arr_rel_insert_input: ResolverTypeWrapper<Partial<Credentials_Arr_Rel_Insert_Input>>;
  credentials_bool_exp: ResolverTypeWrapper<Partial<Credentials_Bool_Exp>>;
  credentials_constraint: ResolverTypeWrapper<Partial<Credentials_Constraint>>;
  credentials_delete_at_path_input: ResolverTypeWrapper<Partial<Credentials_Delete_At_Path_Input>>;
  credentials_delete_elem_input: ResolverTypeWrapper<Partial<Credentials_Delete_Elem_Input>>;
  credentials_delete_key_input: ResolverTypeWrapper<Partial<Credentials_Delete_Key_Input>>;
  credentials_insert_input: ResolverTypeWrapper<Partial<Credentials_Insert_Input>>;
  credentials_max_fields: ResolverTypeWrapper<Partial<Credentials_Max_Fields>>;
  credentials_max_order_by: ResolverTypeWrapper<Partial<Credentials_Max_Order_By>>;
  credentials_min_fields: ResolverTypeWrapper<Partial<Credentials_Min_Fields>>;
  credentials_min_order_by: ResolverTypeWrapper<Partial<Credentials_Min_Order_By>>;
  credentials_mutation_response: ResolverTypeWrapper<Partial<Credentials_Mutation_Response>>;
  credentials_obj_rel_insert_input: ResolverTypeWrapper<Partial<Credentials_Obj_Rel_Insert_Input>>;
  credentials_on_conflict: ResolverTypeWrapper<Partial<Credentials_On_Conflict>>;
  credentials_order_by: ResolverTypeWrapper<Partial<Credentials_Order_By>>;
  credentials_pk_columns_input: ResolverTypeWrapper<Partial<Credentials_Pk_Columns_Input>>;
  credentials_prepend_input: ResolverTypeWrapper<Partial<Credentials_Prepend_Input>>;
  credentials_select_column: ResolverTypeWrapper<Partial<Credentials_Select_Column>>;
  credentials_set_input: ResolverTypeWrapper<Partial<Credentials_Set_Input>>;
  credentials_stream_cursor_input: ResolverTypeWrapper<Partial<Credentials_Stream_Cursor_Input>>;
  credentials_stream_cursor_value_input: ResolverTypeWrapper<Partial<Credentials_Stream_Cursor_Value_Input>>;
  credentials_update_column: ResolverTypeWrapper<Partial<Credentials_Update_Column>>;
  credentials_updates: ResolverTypeWrapper<Partial<Credentials_Updates>>;
  cursor_ordering: ResolverTypeWrapper<Partial<Cursor_Ordering>>;
  dao_following: ResolverTypeWrapper<Partial<Dao_Following>>;
  dao_following_aggregate: ResolverTypeWrapper<Partial<Dao_Following_Aggregate>>;
  dao_following_aggregate_bool_exp: ResolverTypeWrapper<Partial<Dao_Following_Aggregate_Bool_Exp>>;
  dao_following_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Dao_Following_Aggregate_Bool_Exp_Count>>;
  dao_following_aggregate_fields: ResolverTypeWrapper<Partial<Dao_Following_Aggregate_Fields>>;
  dao_following_aggregate_order_by: ResolverTypeWrapper<Partial<Dao_Following_Aggregate_Order_By>>;
  dao_following_arr_rel_insert_input: ResolverTypeWrapper<Partial<Dao_Following_Arr_Rel_Insert_Input>>;
  dao_following_bool_exp: ResolverTypeWrapper<Partial<Dao_Following_Bool_Exp>>;
  dao_following_constraint: ResolverTypeWrapper<Partial<Dao_Following_Constraint>>;
  dao_following_insert_input: ResolverTypeWrapper<Partial<Dao_Following_Insert_Input>>;
  dao_following_max_fields: ResolverTypeWrapper<Partial<Dao_Following_Max_Fields>>;
  dao_following_max_order_by: ResolverTypeWrapper<Partial<Dao_Following_Max_Order_By>>;
  dao_following_min_fields: ResolverTypeWrapper<Partial<Dao_Following_Min_Fields>>;
  dao_following_min_order_by: ResolverTypeWrapper<Partial<Dao_Following_Min_Order_By>>;
  dao_following_mutation_response: ResolverTypeWrapper<Partial<Dao_Following_Mutation_Response>>;
  dao_following_on_conflict: ResolverTypeWrapper<Partial<Dao_Following_On_Conflict>>;
  dao_following_order_by: ResolverTypeWrapper<Partial<Dao_Following_Order_By>>;
  dao_following_select_column: ResolverTypeWrapper<Partial<Dao_Following_Select_Column>>;
  dao_following_set_input: ResolverTypeWrapper<Partial<Dao_Following_Set_Input>>;
  dao_following_stream_cursor_input: ResolverTypeWrapper<Partial<Dao_Following_Stream_Cursor_Input>>;
  dao_following_stream_cursor_value_input: ResolverTypeWrapper<Partial<Dao_Following_Stream_Cursor_Value_Input>>;
  dao_following_update_column: ResolverTypeWrapper<Partial<Dao_Following_Update_Column>>;
  dao_following_updates: ResolverTypeWrapper<Partial<Dao_Following_Updates>>;
  dao_socials: ResolverTypeWrapper<Partial<Dao_Socials>>;
  dao_socials_aggregate: ResolverTypeWrapper<Partial<Dao_Socials_Aggregate>>;
  dao_socials_aggregate_bool_exp: ResolverTypeWrapper<Partial<Dao_Socials_Aggregate_Bool_Exp>>;
  dao_socials_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Dao_Socials_Aggregate_Bool_Exp_Count>>;
  dao_socials_aggregate_fields: ResolverTypeWrapper<Partial<Dao_Socials_Aggregate_Fields>>;
  dao_socials_aggregate_order_by: ResolverTypeWrapper<Partial<Dao_Socials_Aggregate_Order_By>>;
  dao_socials_arr_rel_insert_input: ResolverTypeWrapper<Partial<Dao_Socials_Arr_Rel_Insert_Input>>;
  dao_socials_bool_exp: ResolverTypeWrapper<Partial<Dao_Socials_Bool_Exp>>;
  dao_socials_constraint: ResolverTypeWrapper<Partial<Dao_Socials_Constraint>>;
  dao_socials_insert_input: ResolverTypeWrapper<Partial<Dao_Socials_Insert_Input>>;
  dao_socials_max_fields: ResolverTypeWrapper<Partial<Dao_Socials_Max_Fields>>;
  dao_socials_max_order_by: ResolverTypeWrapper<Partial<Dao_Socials_Max_Order_By>>;
  dao_socials_min_fields: ResolverTypeWrapper<Partial<Dao_Socials_Min_Fields>>;
  dao_socials_min_order_by: ResolverTypeWrapper<Partial<Dao_Socials_Min_Order_By>>;
  dao_socials_mutation_response: ResolverTypeWrapper<Partial<Dao_Socials_Mutation_Response>>;
  dao_socials_on_conflict: ResolverTypeWrapper<Partial<Dao_Socials_On_Conflict>>;
  dao_socials_order_by: ResolverTypeWrapper<Partial<Dao_Socials_Order_By>>;
  dao_socials_select_column: ResolverTypeWrapper<Partial<Dao_Socials_Select_Column>>;
  dao_socials_set_input: ResolverTypeWrapper<Partial<Dao_Socials_Set_Input>>;
  dao_socials_stream_cursor_input: ResolverTypeWrapper<Partial<Dao_Socials_Stream_Cursor_Input>>;
  dao_socials_stream_cursor_value_input: ResolverTypeWrapper<Partial<Dao_Socials_Stream_Cursor_Value_Input>>;
  dao_socials_update_column: ResolverTypeWrapper<Partial<Dao_Socials_Update_Column>>;
  dao_socials_updates: ResolverTypeWrapper<Partial<Dao_Socials_Updates>>;
  daos: ResolverTypeWrapper<Partial<Daos>>;
  daos_aggregate: ResolverTypeWrapper<Partial<Daos_Aggregate>>;
  daos_aggregate_fields: ResolverTypeWrapper<Partial<Daos_Aggregate_Fields>>;
  daos_append_input: ResolverTypeWrapper<Partial<Daos_Append_Input>>;
  daos_bool_exp: ResolverTypeWrapper<Partial<Daos_Bool_Exp>>;
  daos_constraint: ResolverTypeWrapper<Partial<Daos_Constraint>>;
  daos_delete_at_path_input: ResolverTypeWrapper<Partial<Daos_Delete_At_Path_Input>>;
  daos_delete_elem_input: ResolverTypeWrapper<Partial<Daos_Delete_Elem_Input>>;
  daos_delete_key_input: ResolverTypeWrapper<Partial<Daos_Delete_Key_Input>>;
  daos_insert_input: ResolverTypeWrapper<Partial<Daos_Insert_Input>>;
  daos_max_fields: ResolverTypeWrapper<Partial<Daos_Max_Fields>>;
  daos_min_fields: ResolverTypeWrapper<Partial<Daos_Min_Fields>>;
  daos_mutation_response: ResolverTypeWrapper<Partial<Daos_Mutation_Response>>;
  daos_obj_rel_insert_input: ResolverTypeWrapper<Partial<Daos_Obj_Rel_Insert_Input>>;
  daos_on_conflict: ResolverTypeWrapper<Partial<Daos_On_Conflict>>;
  daos_order_by: ResolverTypeWrapper<Partial<Daos_Order_By>>;
  daos_pk_columns_input: ResolverTypeWrapper<Partial<Daos_Pk_Columns_Input>>;
  daos_prepend_input: ResolverTypeWrapper<Partial<Daos_Prepend_Input>>;
  daos_select_column: ResolverTypeWrapper<Partial<Daos_Select_Column>>;
  daos_set_input: ResolverTypeWrapper<Partial<Daos_Set_Input>>;
  daos_stream_cursor_input: ResolverTypeWrapper<Partial<Daos_Stream_Cursor_Input>>;
  daos_stream_cursor_value_input: ResolverTypeWrapper<Partial<Daos_Stream_Cursor_Value_Input>>;
  daos_update_column: ResolverTypeWrapper<Partial<Daos_Update_Column>>;
  daos_updates: ResolverTypeWrapper<Partial<Daos_Updates>>;
  earners: ResolverTypeWrapper<Partial<Earners>>;
  earners_aggregate: ResolverTypeWrapper<Partial<Earners_Aggregate>>;
  earners_aggregate_bool_exp: ResolverTypeWrapper<Partial<Earners_Aggregate_Bool_Exp>>;
  earners_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Earners_Aggregate_Bool_Exp_Count>>;
  earners_aggregate_fields: ResolverTypeWrapper<Partial<Earners_Aggregate_Fields>>;
  earners_aggregate_order_by: ResolverTypeWrapper<Partial<Earners_Aggregate_Order_By>>;
  earners_arr_rel_insert_input: ResolverTypeWrapper<Partial<Earners_Arr_Rel_Insert_Input>>;
  earners_bool_exp: ResolverTypeWrapper<Partial<Earners_Bool_Exp>>;
  earners_constraint: ResolverTypeWrapper<Partial<Earners_Constraint>>;
  earners_insert_input: ResolverTypeWrapper<Partial<Earners_Insert_Input>>;
  earners_max_fields: ResolverTypeWrapper<Partial<Earners_Max_Fields>>;
  earners_max_order_by: ResolverTypeWrapper<Partial<Earners_Max_Order_By>>;
  earners_min_fields: ResolverTypeWrapper<Partial<Earners_Min_Fields>>;
  earners_min_order_by: ResolverTypeWrapper<Partial<Earners_Min_Order_By>>;
  earners_mutation_response: ResolverTypeWrapper<Partial<Earners_Mutation_Response>>;
  earners_on_conflict: ResolverTypeWrapper<Partial<Earners_On_Conflict>>;
  earners_order_by: ResolverTypeWrapper<Partial<Earners_Order_By>>;
  earners_pk_columns_input: ResolverTypeWrapper<Partial<Earners_Pk_Columns_Input>>;
  earners_select_column: ResolverTypeWrapper<Partial<Earners_Select_Column>>;
  earners_set_input: ResolverTypeWrapper<Partial<Earners_Set_Input>>;
  earners_stream_cursor_input: ResolverTypeWrapper<Partial<Earners_Stream_Cursor_Input>>;
  earners_stream_cursor_value_input: ResolverTypeWrapper<Partial<Earners_Stream_Cursor_Value_Input>>;
  earners_update_column: ResolverTypeWrapper<Partial<Earners_Update_Column>>;
  earners_updates: ResolverTypeWrapper<Partial<Earners_Updates>>;
  email: ResolverTypeWrapper<Partial<Scalars['email']>>;
  email_subscribers: ResolverTypeWrapper<Partial<Email_Subscribers>>;
  email_subscribers_aggregate: ResolverTypeWrapper<Partial<Email_Subscribers_Aggregate>>;
  email_subscribers_aggregate_fields: ResolverTypeWrapper<Partial<Email_Subscribers_Aggregate_Fields>>;
  email_subscribers_bool_exp: ResolverTypeWrapper<Partial<Email_Subscribers_Bool_Exp>>;
  email_subscribers_constraint: ResolverTypeWrapper<Partial<Email_Subscribers_Constraint>>;
  email_subscribers_insert_input: ResolverTypeWrapper<Partial<Email_Subscribers_Insert_Input>>;
  email_subscribers_max_fields: ResolverTypeWrapper<Partial<Email_Subscribers_Max_Fields>>;
  email_subscribers_min_fields: ResolverTypeWrapper<Partial<Email_Subscribers_Min_Fields>>;
  email_subscribers_mutation_response: ResolverTypeWrapper<Partial<Email_Subscribers_Mutation_Response>>;
  email_subscribers_on_conflict: ResolverTypeWrapper<Partial<Email_Subscribers_On_Conflict>>;
  email_subscribers_order_by: ResolverTypeWrapper<Partial<Email_Subscribers_Order_By>>;
  email_subscribers_pk_columns_input: ResolverTypeWrapper<Partial<Email_Subscribers_Pk_Columns_Input>>;
  email_subscribers_select_column: ResolverTypeWrapper<Partial<Email_Subscribers_Select_Column>>;
  email_subscribers_set_input: ResolverTypeWrapper<Partial<Email_Subscribers_Set_Input>>;
  email_subscribers_stream_cursor_input: ResolverTypeWrapper<Partial<Email_Subscribers_Stream_Cursor_Input>>;
  email_subscribers_stream_cursor_value_input: ResolverTypeWrapper<Partial<Email_Subscribers_Stream_Cursor_Value_Input>>;
  email_subscribers_update_column: ResolverTypeWrapper<Partial<Email_Subscribers_Update_Column>>;
  email_subscribers_updates: ResolverTypeWrapper<Partial<Email_Subscribers_Updates>>;
  experiences: ResolverTypeWrapper<Partial<Experiences>>;
  experiences_aggregate: ResolverTypeWrapper<Partial<Experiences_Aggregate>>;
  experiences_aggregate_bool_exp: ResolverTypeWrapper<Partial<Experiences_Aggregate_Bool_Exp>>;
  experiences_aggregate_bool_exp_bool_and: ResolverTypeWrapper<Partial<Experiences_Aggregate_Bool_Exp_Bool_And>>;
  experiences_aggregate_bool_exp_bool_or: ResolverTypeWrapper<Partial<Experiences_Aggregate_Bool_Exp_Bool_Or>>;
  experiences_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Experiences_Aggregate_Bool_Exp_Count>>;
  experiences_aggregate_fields: ResolverTypeWrapper<Partial<Experiences_Aggregate_Fields>>;
  experiences_aggregate_order_by: ResolverTypeWrapper<Partial<Experiences_Aggregate_Order_By>>;
  experiences_arr_rel_insert_input: ResolverTypeWrapper<Partial<Experiences_Arr_Rel_Insert_Input>>;
  experiences_bool_exp: ResolverTypeWrapper<Partial<Experiences_Bool_Exp>>;
  experiences_constraint: ResolverTypeWrapper<Partial<Experiences_Constraint>>;
  experiences_insert_input: ResolverTypeWrapper<Partial<Experiences_Insert_Input>>;
  experiences_max_fields: ResolverTypeWrapper<Partial<Experiences_Max_Fields>>;
  experiences_max_order_by: ResolverTypeWrapper<Partial<Experiences_Max_Order_By>>;
  experiences_min_fields: ResolverTypeWrapper<Partial<Experiences_Min_Fields>>;
  experiences_min_order_by: ResolverTypeWrapper<Partial<Experiences_Min_Order_By>>;
  experiences_mutation_response: ResolverTypeWrapper<Partial<Experiences_Mutation_Response>>;
  experiences_obj_rel_insert_input: ResolverTypeWrapper<Partial<Experiences_Obj_Rel_Insert_Input>>;
  experiences_on_conflict: ResolverTypeWrapper<Partial<Experiences_On_Conflict>>;
  experiences_order_by: ResolverTypeWrapper<Partial<Experiences_Order_By>>;
  experiences_select_column: ResolverTypeWrapper<Partial<Experiences_Select_Column>>;
  experiences_select_column_experiences_aggregate_bool_exp_bool_and_arguments_columns: ResolverTypeWrapper<Partial<Experiences_Select_Column_Experiences_Aggregate_Bool_Exp_Bool_And_Arguments_Columns>>;
  experiences_select_column_experiences_aggregate_bool_exp_bool_or_arguments_columns: ResolverTypeWrapper<Partial<Experiences_Select_Column_Experiences_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns>>;
  experiences_set_input: ResolverTypeWrapper<Partial<Experiences_Set_Input>>;
  experiences_stream_cursor_input: ResolverTypeWrapper<Partial<Experiences_Stream_Cursor_Input>>;
  experiences_stream_cursor_value_input: ResolverTypeWrapper<Partial<Experiences_Stream_Cursor_Value_Input>>;
  experiences_update_column: ResolverTypeWrapper<Partial<Experiences_Update_Column>>;
  experiences_updates: ResolverTypeWrapper<Partial<Experiences_Updates>>;
  files: ResolverTypeWrapper<Partial<Files>>;
  files_aggregate: ResolverTypeWrapper<Partial<Files_Aggregate>>;
  files_aggregate_fields: ResolverTypeWrapper<Partial<Files_Aggregate_Fields>>;
  files_append_input: ResolverTypeWrapper<Partial<Files_Append_Input>>;
  files_bool_exp: ResolverTypeWrapper<Partial<Files_Bool_Exp>>;
  files_constraint: ResolverTypeWrapper<Partial<Files_Constraint>>;
  files_delete_at_path_input: ResolverTypeWrapper<Partial<Files_Delete_At_Path_Input>>;
  files_delete_elem_input: ResolverTypeWrapper<Partial<Files_Delete_Elem_Input>>;
  files_delete_key_input: ResolverTypeWrapper<Partial<Files_Delete_Key_Input>>;
  files_insert_input: ResolverTypeWrapper<Partial<Files_Insert_Input>>;
  files_max_fields: ResolverTypeWrapper<Partial<Files_Max_Fields>>;
  files_min_fields: ResolverTypeWrapper<Partial<Files_Min_Fields>>;
  files_mutation_response: ResolverTypeWrapper<Partial<Files_Mutation_Response>>;
  files_obj_rel_insert_input: ResolverTypeWrapper<Partial<Files_Obj_Rel_Insert_Input>>;
  files_on_conflict: ResolverTypeWrapper<Partial<Files_On_Conflict>>;
  files_order_by: ResolverTypeWrapper<Partial<Files_Order_By>>;
  files_pk_columns_input: ResolverTypeWrapper<Partial<Files_Pk_Columns_Input>>;
  files_prepend_input: ResolverTypeWrapper<Partial<Files_Prepend_Input>>;
  files_select_column: ResolverTypeWrapper<Partial<Files_Select_Column>>;
  files_set_input: ResolverTypeWrapper<Partial<Files_Set_Input>>;
  files_stream_cursor_input: ResolverTypeWrapper<Partial<Files_Stream_Cursor_Input>>;
  files_stream_cursor_value_input: ResolverTypeWrapper<Partial<Files_Stream_Cursor_Value_Input>>;
  files_update_column: ResolverTypeWrapper<Partial<Files_Update_Column>>;
  files_updates: ResolverTypeWrapper<Partial<Files_Updates>>;
  follow_dao_args: ResolverTypeWrapper<Partial<Follow_Dao_Args>>;
  follow_user_args: ResolverTypeWrapper<Partial<Follow_User_Args>>;
  following_state: ResolverTypeWrapper<Partial<Scalars['following_state']>>;
  following_state_comparison_exp: ResolverTypeWrapper<Partial<Following_State_Comparison_Exp>>;
  gate_progress: ResolverTypeWrapper<Partial<Gate_Progress>>;
  gate_progress_aggregate: ResolverTypeWrapper<Partial<Gate_Progress_Aggregate>>;
  gate_progress_aggregate_bool_exp: ResolverTypeWrapper<Partial<Gate_Progress_Aggregate_Bool_Exp>>;
  gate_progress_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Gate_Progress_Aggregate_Bool_Exp_Count>>;
  gate_progress_aggregate_fields: ResolverTypeWrapper<Partial<Gate_Progress_Aggregate_Fields>>;
  gate_progress_aggregate_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Aggregate_Order_By>>;
  gate_progress_arr_rel_insert_input: ResolverTypeWrapper<Partial<Gate_Progress_Arr_Rel_Insert_Input>>;
  gate_progress_avg_fields: ResolverTypeWrapper<Partial<Gate_Progress_Avg_Fields>>;
  gate_progress_avg_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Avg_Order_By>>;
  gate_progress_bool_exp: ResolverTypeWrapper<Partial<Gate_Progress_Bool_Exp>>;
  gate_progress_constraint: ResolverTypeWrapper<Partial<Gate_Progress_Constraint>>;
  gate_progress_inc_input: ResolverTypeWrapper<Partial<Gate_Progress_Inc_Input>>;
  gate_progress_insert_input: ResolverTypeWrapper<Partial<Gate_Progress_Insert_Input>>;
  gate_progress_max_fields: ResolverTypeWrapper<Partial<Gate_Progress_Max_Fields>>;
  gate_progress_max_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Max_Order_By>>;
  gate_progress_min_fields: ResolverTypeWrapper<Partial<Gate_Progress_Min_Fields>>;
  gate_progress_min_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Min_Order_By>>;
  gate_progress_mutation_response: ResolverTypeWrapper<Partial<Gate_Progress_Mutation_Response>>;
  gate_progress_on_conflict: ResolverTypeWrapper<Partial<Gate_Progress_On_Conflict>>;
  gate_progress_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Order_By>>;
  gate_progress_pk_columns_input: ResolverTypeWrapper<Partial<Gate_Progress_Pk_Columns_Input>>;
  gate_progress_select_column: ResolverTypeWrapper<Partial<Gate_Progress_Select_Column>>;
  gate_progress_set_input: ResolverTypeWrapper<Partial<Gate_Progress_Set_Input>>;
  gate_progress_stddev_fields: ResolverTypeWrapper<Partial<Gate_Progress_Stddev_Fields>>;
  gate_progress_stddev_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Stddev_Order_By>>;
  gate_progress_stddev_pop_fields: ResolverTypeWrapper<Partial<Gate_Progress_Stddev_Pop_Fields>>;
  gate_progress_stddev_pop_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Stddev_Pop_Order_By>>;
  gate_progress_stddev_samp_fields: ResolverTypeWrapper<Partial<Gate_Progress_Stddev_Samp_Fields>>;
  gate_progress_stddev_samp_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Stddev_Samp_Order_By>>;
  gate_progress_stream_cursor_input: ResolverTypeWrapper<Partial<Gate_Progress_Stream_Cursor_Input>>;
  gate_progress_stream_cursor_value_input: ResolverTypeWrapper<Partial<Gate_Progress_Stream_Cursor_Value_Input>>;
  gate_progress_sum_fields: ResolverTypeWrapper<Partial<Gate_Progress_Sum_Fields>>;
  gate_progress_sum_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Sum_Order_By>>;
  gate_progress_update_column: ResolverTypeWrapper<Partial<Gate_Progress_Update_Column>>;
  gate_progress_updates: ResolverTypeWrapper<Partial<Gate_Progress_Updates>>;
  gate_progress_var_pop_fields: ResolverTypeWrapper<Partial<Gate_Progress_Var_Pop_Fields>>;
  gate_progress_var_pop_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Var_Pop_Order_By>>;
  gate_progress_var_samp_fields: ResolverTypeWrapper<Partial<Gate_Progress_Var_Samp_Fields>>;
  gate_progress_var_samp_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Var_Samp_Order_By>>;
  gate_progress_variance_fields: ResolverTypeWrapper<Partial<Gate_Progress_Variance_Fields>>;
  gate_progress_variance_order_by: ResolverTypeWrapper<Partial<Gate_Progress_Variance_Order_By>>;
  gate_state: ResolverTypeWrapper<Partial<Scalars['gate_state']>>;
  gate_state_comparison_exp: ResolverTypeWrapper<Partial<Gate_State_Comparison_Exp>>;
  gate_status: ResolverTypeWrapper<Partial<Scalars['gate_status']>>;
  gate_status_comparison_exp: ResolverTypeWrapper<Partial<Gate_Status_Comparison_Exp>>;
  gate_type: ResolverTypeWrapper<Partial<Scalars['gate_type']>>;
  gate_type_comparison_exp: ResolverTypeWrapper<Partial<Gate_Type_Comparison_Exp>>;
  gates: ResolverTypeWrapper<Partial<Gates>>;
  gates_aggregate: ResolverTypeWrapper<Partial<Gates_Aggregate>>;
  gates_aggregate_bool_exp: ResolverTypeWrapper<Partial<Gates_Aggregate_Bool_Exp>>;
  gates_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Gates_Aggregate_Bool_Exp_Count>>;
  gates_aggregate_fields: ResolverTypeWrapper<Partial<Gates_Aggregate_Fields>>;
  gates_aggregate_order_by: ResolverTypeWrapper<Partial<Gates_Aggregate_Order_By>>;
  gates_append_input: ResolverTypeWrapper<Partial<Gates_Append_Input>>;
  gates_arr_rel_insert_input: ResolverTypeWrapper<Partial<Gates_Arr_Rel_Insert_Input>>;
  gates_avg_fields: ResolverTypeWrapper<Partial<Gates_Avg_Fields>>;
  gates_avg_order_by: ResolverTypeWrapper<Partial<Gates_Avg_Order_By>>;
  gates_bool_exp: ResolverTypeWrapper<Partial<Gates_Bool_Exp>>;
  gates_constraint: ResolverTypeWrapper<Partial<Gates_Constraint>>;
  gates_delete_at_path_input: ResolverTypeWrapper<Partial<Gates_Delete_At_Path_Input>>;
  gates_delete_elem_input: ResolverTypeWrapper<Partial<Gates_Delete_Elem_Input>>;
  gates_delete_key_input: ResolverTypeWrapper<Partial<Gates_Delete_Key_Input>>;
  gates_inc_input: ResolverTypeWrapper<Partial<Gates_Inc_Input>>;
  gates_insert_input: ResolverTypeWrapper<Partial<Gates_Insert_Input>>;
  gates_max_fields: ResolverTypeWrapper<Partial<Gates_Max_Fields>>;
  gates_max_order_by: ResolverTypeWrapper<Partial<Gates_Max_Order_By>>;
  gates_min_fields: ResolverTypeWrapper<Partial<Gates_Min_Fields>>;
  gates_min_order_by: ResolverTypeWrapper<Partial<Gates_Min_Order_By>>;
  gates_mutation_response: ResolverTypeWrapper<Partial<Gates_Mutation_Response>>;
  gates_obj_rel_insert_input: ResolverTypeWrapper<Partial<Gates_Obj_Rel_Insert_Input>>;
  gates_on_conflict: ResolverTypeWrapper<Partial<Gates_On_Conflict>>;
  gates_order_by: ResolverTypeWrapper<Partial<Gates_Order_By>>;
  gates_pk_columns_input: ResolverTypeWrapper<Partial<Gates_Pk_Columns_Input>>;
  gates_prepend_input: ResolverTypeWrapper<Partial<Gates_Prepend_Input>>;
  gates_select_column: ResolverTypeWrapper<Partial<Gates_Select_Column>>;
  gates_set_input: ResolverTypeWrapper<Partial<Gates_Set_Input>>;
  gates_stddev_fields: ResolverTypeWrapper<Partial<Gates_Stddev_Fields>>;
  gates_stddev_order_by: ResolverTypeWrapper<Partial<Gates_Stddev_Order_By>>;
  gates_stddev_pop_fields: ResolverTypeWrapper<Partial<Gates_Stddev_Pop_Fields>>;
  gates_stddev_pop_order_by: ResolverTypeWrapper<Partial<Gates_Stddev_Pop_Order_By>>;
  gates_stddev_samp_fields: ResolverTypeWrapper<Partial<Gates_Stddev_Samp_Fields>>;
  gates_stddev_samp_order_by: ResolverTypeWrapper<Partial<Gates_Stddev_Samp_Order_By>>;
  gates_stream_cursor_input: ResolverTypeWrapper<Partial<Gates_Stream_Cursor_Input>>;
  gates_stream_cursor_value_input: ResolverTypeWrapper<Partial<Gates_Stream_Cursor_Value_Input>>;
  gates_sum_fields: ResolverTypeWrapper<Partial<Gates_Sum_Fields>>;
  gates_sum_order_by: ResolverTypeWrapper<Partial<Gates_Sum_Order_By>>;
  gates_update_column: ResolverTypeWrapper<Partial<Gates_Update_Column>>;
  gates_updates: ResolverTypeWrapper<Partial<Gates_Updates>>;
  gates_var_pop_fields: ResolverTypeWrapper<Partial<Gates_Var_Pop_Fields>>;
  gates_var_pop_order_by: ResolverTypeWrapper<Partial<Gates_Var_Pop_Order_By>>;
  gates_var_samp_fields: ResolverTypeWrapper<Partial<Gates_Var_Samp_Fields>>;
  gates_var_samp_order_by: ResolverTypeWrapper<Partial<Gates_Var_Samp_Order_By>>;
  gates_variance_fields: ResolverTypeWrapper<Partial<Gates_Variance_Fields>>;
  gates_variance_order_by: ResolverTypeWrapper<Partial<Gates_Variance_Order_By>>;
  get_claimable_credentials_args: ResolverTypeWrapper<Partial<Get_Claimable_Credentials_Args>>;
  hidden_experience_credentials: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials>>;
  hidden_experience_credentials_aggregate: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Aggregate>>;
  hidden_experience_credentials_aggregate_bool_exp: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Aggregate_Bool_Exp>>;
  hidden_experience_credentials_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Aggregate_Bool_Exp_Count>>;
  hidden_experience_credentials_aggregate_fields: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Aggregate_Fields>>;
  hidden_experience_credentials_aggregate_order_by: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Aggregate_Order_By>>;
  hidden_experience_credentials_arr_rel_insert_input: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Arr_Rel_Insert_Input>>;
  hidden_experience_credentials_bool_exp: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Bool_Exp>>;
  hidden_experience_credentials_constraint: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Constraint>>;
  hidden_experience_credentials_insert_input: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Insert_Input>>;
  hidden_experience_credentials_max_fields: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Max_Fields>>;
  hidden_experience_credentials_max_order_by: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Max_Order_By>>;
  hidden_experience_credentials_min_fields: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Min_Fields>>;
  hidden_experience_credentials_min_order_by: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Min_Order_By>>;
  hidden_experience_credentials_mutation_response: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Mutation_Response>>;
  hidden_experience_credentials_on_conflict: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_On_Conflict>>;
  hidden_experience_credentials_order_by: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Order_By>>;
  hidden_experience_credentials_select_column: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Select_Column>>;
  hidden_experience_credentials_set_input: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Set_Input>>;
  hidden_experience_credentials_stream_cursor_input: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Stream_Cursor_Input>>;
  hidden_experience_credentials_stream_cursor_value_input: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Stream_Cursor_Value_Input>>;
  hidden_experience_credentials_update_column: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Update_Column>>;
  hidden_experience_credentials_updates: ResolverTypeWrapper<Partial<Hidden_Experience_Credentials_Updates>>;
  json: ResolverTypeWrapper<Partial<Scalars['json']>>;
  jsonb: ResolverTypeWrapper<Partial<Scalars['jsonb']>>;
  jsonb_cast_exp: ResolverTypeWrapper<Partial<Jsonb_Cast_Exp>>;
  jsonb_comparison_exp: ResolverTypeWrapper<Partial<Jsonb_Comparison_Exp>>;
  key_status: ResolverTypeWrapper<Partial<Scalars['key_status']>>;
  key_status_comparison_exp: ResolverTypeWrapper<Partial<Key_Status_Comparison_Exp>>;
  manual_task_event_type: ResolverTypeWrapper<Partial<Scalars['manual_task_event_type']>>;
  manual_task_event_type_comparison_exp: ResolverTypeWrapper<Partial<Manual_Task_Event_Type_Comparison_Exp>>;
  manual_task_events: ResolverTypeWrapper<Partial<Manual_Task_Events>>;
  manual_task_events_aggregate: ResolverTypeWrapper<Partial<Manual_Task_Events_Aggregate>>;
  manual_task_events_aggregate_fields: ResolverTypeWrapper<Partial<Manual_Task_Events_Aggregate_Fields>>;
  manual_task_events_append_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Append_Input>>;
  manual_task_events_bool_exp: ResolverTypeWrapper<Partial<Manual_Task_Events_Bool_Exp>>;
  manual_task_events_constraint: ResolverTypeWrapper<Partial<Manual_Task_Events_Constraint>>;
  manual_task_events_delete_at_path_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Delete_At_Path_Input>>;
  manual_task_events_delete_elem_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Delete_Elem_Input>>;
  manual_task_events_delete_key_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Delete_Key_Input>>;
  manual_task_events_insert_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Insert_Input>>;
  manual_task_events_max_fields: ResolverTypeWrapper<Partial<Manual_Task_Events_Max_Fields>>;
  manual_task_events_min_fields: ResolverTypeWrapper<Partial<Manual_Task_Events_Min_Fields>>;
  manual_task_events_mutation_response: ResolverTypeWrapper<Partial<Manual_Task_Events_Mutation_Response>>;
  manual_task_events_on_conflict: ResolverTypeWrapper<Partial<Manual_Task_Events_On_Conflict>>;
  manual_task_events_order_by: ResolverTypeWrapper<Partial<Manual_Task_Events_Order_By>>;
  manual_task_events_pk_columns_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Pk_Columns_Input>>;
  manual_task_events_prepend_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Prepend_Input>>;
  manual_task_events_select_column: ResolverTypeWrapper<Partial<Manual_Task_Events_Select_Column>>;
  manual_task_events_set_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Set_Input>>;
  manual_task_events_stream_cursor_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Stream_Cursor_Input>>;
  manual_task_events_stream_cursor_value_input: ResolverTypeWrapper<Partial<Manual_Task_Events_Stream_Cursor_Value_Input>>;
  manual_task_events_update_column: ResolverTypeWrapper<Partial<Manual_Task_Events_Update_Column>>;
  manual_task_events_updates: ResolverTypeWrapper<Partial<Manual_Task_Events_Updates>>;
  manual_task_submission: ResolverTypeWrapper<Partial<Manual_Task_Submission>>;
  manual_task_submission_aggregate: ResolverTypeWrapper<Partial<Manual_Task_Submission_Aggregate>>;
  manual_task_submission_aggregate_fields: ResolverTypeWrapper<Partial<Manual_Task_Submission_Aggregate_Fields>>;
  manual_task_submission_bool_exp: ResolverTypeWrapper<Partial<Manual_Task_Submission_Bool_Exp>>;
  manual_task_submission_constraint: ResolverTypeWrapper<Partial<Manual_Task_Submission_Constraint>>;
  manual_task_submission_insert_input: ResolverTypeWrapper<Partial<Manual_Task_Submission_Insert_Input>>;
  manual_task_submission_max_fields: ResolverTypeWrapper<Partial<Manual_Task_Submission_Max_Fields>>;
  manual_task_submission_min_fields: ResolverTypeWrapper<Partial<Manual_Task_Submission_Min_Fields>>;
  manual_task_submission_mutation_response: ResolverTypeWrapper<Partial<Manual_Task_Submission_Mutation_Response>>;
  manual_task_submission_on_conflict: ResolverTypeWrapper<Partial<Manual_Task_Submission_On_Conflict>>;
  manual_task_submission_order_by: ResolverTypeWrapper<Partial<Manual_Task_Submission_Order_By>>;
  manual_task_submission_pk_columns_input: ResolverTypeWrapper<Partial<Manual_Task_Submission_Pk_Columns_Input>>;
  manual_task_submission_select_column: ResolverTypeWrapper<Partial<Manual_Task_Submission_Select_Column>>;
  manual_task_submission_set_input: ResolverTypeWrapper<Partial<Manual_Task_Submission_Set_Input>>;
  manual_task_submission_stream_cursor_input: ResolverTypeWrapper<Partial<Manual_Task_Submission_Stream_Cursor_Input>>;
  manual_task_submission_stream_cursor_value_input: ResolverTypeWrapper<Partial<Manual_Task_Submission_Stream_Cursor_Value_Input>>;
  manual_task_submission_update_column: ResolverTypeWrapper<Partial<Manual_Task_Submission_Update_Column>>;
  manual_task_submission_updates: ResolverTypeWrapper<Partial<Manual_Task_Submission_Updates>>;
  mutation_root: ResolverTypeWrapper<{}>;
  order_by: ResolverTypeWrapper<Partial<Order_By>>;
  permission_types: ResolverTypeWrapper<Partial<Scalars['permission_types']>>;
  permission_types_comparison_exp: ResolverTypeWrapper<Partial<Permission_Types_Comparison_Exp>>;
  permissions: ResolverTypeWrapper<Partial<Permissions>>;
  permissions_aggregate: ResolverTypeWrapper<Partial<Permissions_Aggregate>>;
  permissions_aggregate_bool_exp: ResolverTypeWrapper<Partial<Permissions_Aggregate_Bool_Exp>>;
  permissions_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Permissions_Aggregate_Bool_Exp_Count>>;
  permissions_aggregate_fields: ResolverTypeWrapper<Partial<Permissions_Aggregate_Fields>>;
  permissions_aggregate_order_by: ResolverTypeWrapper<Partial<Permissions_Aggregate_Order_By>>;
  permissions_arr_rel_insert_input: ResolverTypeWrapper<Partial<Permissions_Arr_Rel_Insert_Input>>;
  permissions_bool_exp: ResolverTypeWrapper<Partial<Permissions_Bool_Exp>>;
  permissions_constraint: ResolverTypeWrapper<Partial<Permissions_Constraint>>;
  permissions_insert_input: ResolverTypeWrapper<Partial<Permissions_Insert_Input>>;
  permissions_max_fields: ResolverTypeWrapper<Partial<Permissions_Max_Fields>>;
  permissions_max_order_by: ResolverTypeWrapper<Partial<Permissions_Max_Order_By>>;
  permissions_min_fields: ResolverTypeWrapper<Partial<Permissions_Min_Fields>>;
  permissions_min_order_by: ResolverTypeWrapper<Partial<Permissions_Min_Order_By>>;
  permissions_mutation_response: ResolverTypeWrapper<Partial<Permissions_Mutation_Response>>;
  permissions_on_conflict: ResolverTypeWrapper<Partial<Permissions_On_Conflict>>;
  permissions_order_by: ResolverTypeWrapper<Partial<Permissions_Order_By>>;
  permissions_pk_columns_input: ResolverTypeWrapper<Partial<Permissions_Pk_Columns_Input>>;
  permissions_select_column: ResolverTypeWrapper<Partial<Permissions_Select_Column>>;
  permissions_set_input: ResolverTypeWrapper<Partial<Permissions_Set_Input>>;
  permissions_stream_cursor_input: ResolverTypeWrapper<Partial<Permissions_Stream_Cursor_Input>>;
  permissions_stream_cursor_value_input: ResolverTypeWrapper<Partial<Permissions_Stream_Cursor_Value_Input>>;
  permissions_update_column: ResolverTypeWrapper<Partial<Permissions_Update_Column>>;
  permissions_updates: ResolverTypeWrapper<Partial<Permissions_Updates>>;
  query_root: ResolverTypeWrapper<{}>;
  search_daos_args: ResolverTypeWrapper<Partial<Search_Daos_Args>>;
  search_gates_args: ResolverTypeWrapper<Partial<Search_Gates_Args>>;
  search_users_args: ResolverTypeWrapper<Partial<Search_Users_Args>>;
  submission_state: ResolverTypeWrapper<Partial<Scalars['submission_state']>>;
  submission_state_comparison_exp: ResolverTypeWrapper<Partial<Submission_State_Comparison_Exp>>;
  subscribe_to_newsletter_args: ResolverTypeWrapper<Partial<Subscribe_To_Newsletter_Args>>;
  subscription_root: ResolverTypeWrapper<{}>;
  task_progress: ResolverTypeWrapper<Partial<Task_Progress>>;
  task_progress_aggregate: ResolverTypeWrapper<Partial<Task_Progress_Aggregate>>;
  task_progress_aggregate_bool_exp: ResolverTypeWrapper<Partial<Task_Progress_Aggregate_Bool_Exp>>;
  task_progress_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Task_Progress_Aggregate_Bool_Exp_Count>>;
  task_progress_aggregate_fields: ResolverTypeWrapper<Partial<Task_Progress_Aggregate_Fields>>;
  task_progress_aggregate_order_by: ResolverTypeWrapper<Partial<Task_Progress_Aggregate_Order_By>>;
  task_progress_arr_rel_insert_input: ResolverTypeWrapper<Partial<Task_Progress_Arr_Rel_Insert_Input>>;
  task_progress_bool_exp: ResolverTypeWrapper<Partial<Task_Progress_Bool_Exp>>;
  task_progress_constraint: ResolverTypeWrapper<Partial<Task_Progress_Constraint>>;
  task_progress_insert_input: ResolverTypeWrapper<Partial<Task_Progress_Insert_Input>>;
  task_progress_max_fields: ResolverTypeWrapper<Partial<Task_Progress_Max_Fields>>;
  task_progress_max_order_by: ResolverTypeWrapper<Partial<Task_Progress_Max_Order_By>>;
  task_progress_min_fields: ResolverTypeWrapper<Partial<Task_Progress_Min_Fields>>;
  task_progress_min_order_by: ResolverTypeWrapper<Partial<Task_Progress_Min_Order_By>>;
  task_progress_mutation_response: ResolverTypeWrapper<Partial<Task_Progress_Mutation_Response>>;
  task_progress_obj_rel_insert_input: ResolverTypeWrapper<Partial<Task_Progress_Obj_Rel_Insert_Input>>;
  task_progress_on_conflict: ResolverTypeWrapper<Partial<Task_Progress_On_Conflict>>;
  task_progress_order_by: ResolverTypeWrapper<Partial<Task_Progress_Order_By>>;
  task_progress_pk_columns_input: ResolverTypeWrapper<Partial<Task_Progress_Pk_Columns_Input>>;
  task_progress_select_column: ResolverTypeWrapper<Partial<Task_Progress_Select_Column>>;
  task_progress_set_input: ResolverTypeWrapper<Partial<Task_Progress_Set_Input>>;
  task_progress_stream_cursor_input: ResolverTypeWrapper<Partial<Task_Progress_Stream_Cursor_Input>>;
  task_progress_stream_cursor_value_input: ResolverTypeWrapper<Partial<Task_Progress_Stream_Cursor_Value_Input>>;
  task_progress_update_column: ResolverTypeWrapper<Partial<Task_Progress_Update_Column>>;
  task_progress_updates: ResolverTypeWrapper<Partial<Task_Progress_Updates>>;
  task_type: ResolverTypeWrapper<Partial<Scalars['task_type']>>;
  task_type_comparison_exp: ResolverTypeWrapper<Partial<Task_Type_Comparison_Exp>>;
  tasks: ResolverTypeWrapper<Partial<Tasks>>;
  tasks_aggregate: ResolverTypeWrapper<Partial<Tasks_Aggregate>>;
  tasks_aggregate_bool_exp: ResolverTypeWrapper<Partial<Tasks_Aggregate_Bool_Exp>>;
  tasks_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Tasks_Aggregate_Bool_Exp_Count>>;
  tasks_aggregate_fields: ResolverTypeWrapper<Partial<Tasks_Aggregate_Fields>>;
  tasks_aggregate_order_by: ResolverTypeWrapper<Partial<Tasks_Aggregate_Order_By>>;
  tasks_append_input: ResolverTypeWrapper<Partial<Tasks_Append_Input>>;
  tasks_arr_rel_insert_input: ResolverTypeWrapper<Partial<Tasks_Arr_Rel_Insert_Input>>;
  tasks_avg_fields: ResolverTypeWrapper<Partial<Tasks_Avg_Fields>>;
  tasks_avg_order_by: ResolverTypeWrapper<Partial<Tasks_Avg_Order_By>>;
  tasks_bool_exp: ResolverTypeWrapper<Partial<Tasks_Bool_Exp>>;
  tasks_constraint: ResolverTypeWrapper<Partial<Tasks_Constraint>>;
  tasks_delete_at_path_input: ResolverTypeWrapper<Partial<Tasks_Delete_At_Path_Input>>;
  tasks_delete_elem_input: ResolverTypeWrapper<Partial<Tasks_Delete_Elem_Input>>;
  tasks_delete_key_input: ResolverTypeWrapper<Partial<Tasks_Delete_Key_Input>>;
  tasks_inc_input: ResolverTypeWrapper<Partial<Tasks_Inc_Input>>;
  tasks_insert_input: ResolverTypeWrapper<Partial<Tasks_Insert_Input>>;
  tasks_max_fields: ResolverTypeWrapper<Partial<Tasks_Max_Fields>>;
  tasks_max_order_by: ResolverTypeWrapper<Partial<Tasks_Max_Order_By>>;
  tasks_min_fields: ResolverTypeWrapper<Partial<Tasks_Min_Fields>>;
  tasks_min_order_by: ResolverTypeWrapper<Partial<Tasks_Min_Order_By>>;
  tasks_mutation_response: ResolverTypeWrapper<Partial<Tasks_Mutation_Response>>;
  tasks_obj_rel_insert_input: ResolverTypeWrapper<Partial<Tasks_Obj_Rel_Insert_Input>>;
  tasks_on_conflict: ResolverTypeWrapper<Partial<Tasks_On_Conflict>>;
  tasks_order_by: ResolverTypeWrapper<Partial<Tasks_Order_By>>;
  tasks_pk_columns_input: ResolverTypeWrapper<Partial<Tasks_Pk_Columns_Input>>;
  tasks_prepend_input: ResolverTypeWrapper<Partial<Tasks_Prepend_Input>>;
  tasks_select_column: ResolverTypeWrapper<Partial<Tasks_Select_Column>>;
  tasks_set_input: ResolverTypeWrapper<Partial<Tasks_Set_Input>>;
  tasks_stddev_fields: ResolverTypeWrapper<Partial<Tasks_Stddev_Fields>>;
  tasks_stddev_order_by: ResolverTypeWrapper<Partial<Tasks_Stddev_Order_By>>;
  tasks_stddev_pop_fields: ResolverTypeWrapper<Partial<Tasks_Stddev_Pop_Fields>>;
  tasks_stddev_pop_order_by: ResolverTypeWrapper<Partial<Tasks_Stddev_Pop_Order_By>>;
  tasks_stddev_samp_fields: ResolverTypeWrapper<Partial<Tasks_Stddev_Samp_Fields>>;
  tasks_stddev_samp_order_by: ResolverTypeWrapper<Partial<Tasks_Stddev_Samp_Order_By>>;
  tasks_stream_cursor_input: ResolverTypeWrapper<Partial<Tasks_Stream_Cursor_Input>>;
  tasks_stream_cursor_value_input: ResolverTypeWrapper<Partial<Tasks_Stream_Cursor_Value_Input>>;
  tasks_sum_fields: ResolverTypeWrapper<Partial<Tasks_Sum_Fields>>;
  tasks_sum_order_by: ResolverTypeWrapper<Partial<Tasks_Sum_Order_By>>;
  tasks_update_column: ResolverTypeWrapper<Partial<Tasks_Update_Column>>;
  tasks_updates: ResolverTypeWrapper<Partial<Tasks_Updates>>;
  tasks_var_pop_fields: ResolverTypeWrapper<Partial<Tasks_Var_Pop_Fields>>;
  tasks_var_pop_order_by: ResolverTypeWrapper<Partial<Tasks_Var_Pop_Order_By>>;
  tasks_var_samp_fields: ResolverTypeWrapper<Partial<Tasks_Var_Samp_Fields>>;
  tasks_var_samp_order_by: ResolverTypeWrapper<Partial<Tasks_Var_Samp_Order_By>>;
  tasks_variance_fields: ResolverTypeWrapper<Partial<Tasks_Variance_Fields>>;
  tasks_variance_order_by: ResolverTypeWrapper<Partial<Tasks_Variance_Order_By>>;
  timestamp: ResolverTypeWrapper<Partial<Scalars['timestamp']>>;
  timestamp_comparison_exp: ResolverTypeWrapper<Partial<Timestamp_Comparison_Exp>>;
  timestamptz: ResolverTypeWrapper<Partial<Scalars['timestamptz']>>;
  timestamptz_comparison_exp: ResolverTypeWrapper<Partial<Timestamptz_Comparison_Exp>>;
  token_benefits: ResolverTypeWrapper<Partial<Token_Benefits>>;
  token_benefits_aggregate: ResolverTypeWrapper<Partial<Token_Benefits_Aggregate>>;
  token_benefits_aggregate_bool_exp: ResolverTypeWrapper<Partial<Token_Benefits_Aggregate_Bool_Exp>>;
  token_benefits_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Token_Benefits_Aggregate_Bool_Exp_Count>>;
  token_benefits_aggregate_fields: ResolverTypeWrapper<Partial<Token_Benefits_Aggregate_Fields>>;
  token_benefits_aggregate_order_by: ResolverTypeWrapper<Partial<Token_Benefits_Aggregate_Order_By>>;
  token_benefits_arr_rel_insert_input: ResolverTypeWrapper<Partial<Token_Benefits_Arr_Rel_Insert_Input>>;
  token_benefits_bool_exp: ResolverTypeWrapper<Partial<Token_Benefits_Bool_Exp>>;
  token_benefits_constraint: ResolverTypeWrapper<Partial<Token_Benefits_Constraint>>;
  token_benefits_insert_input: ResolverTypeWrapper<Partial<Token_Benefits_Insert_Input>>;
  token_benefits_max_fields: ResolverTypeWrapper<Partial<Token_Benefits_Max_Fields>>;
  token_benefits_max_order_by: ResolverTypeWrapper<Partial<Token_Benefits_Max_Order_By>>;
  token_benefits_min_fields: ResolverTypeWrapper<Partial<Token_Benefits_Min_Fields>>;
  token_benefits_min_order_by: ResolverTypeWrapper<Partial<Token_Benefits_Min_Order_By>>;
  token_benefits_mutation_response: ResolverTypeWrapper<Partial<Token_Benefits_Mutation_Response>>;
  token_benefits_on_conflict: ResolverTypeWrapper<Partial<Token_Benefits_On_Conflict>>;
  token_benefits_order_by: ResolverTypeWrapper<Partial<Token_Benefits_Order_By>>;
  token_benefits_pk_columns_input: ResolverTypeWrapper<Partial<Token_Benefits_Pk_Columns_Input>>;
  token_benefits_select_column: ResolverTypeWrapper<Partial<Token_Benefits_Select_Column>>;
  token_benefits_set_input: ResolverTypeWrapper<Partial<Token_Benefits_Set_Input>>;
  token_benefits_stream_cursor_input: ResolverTypeWrapper<Partial<Token_Benefits_Stream_Cursor_Input>>;
  token_benefits_stream_cursor_value_input: ResolverTypeWrapper<Partial<Token_Benefits_Stream_Cursor_Value_Input>>;
  token_benefits_update_column: ResolverTypeWrapper<Partial<Token_Benefits_Update_Column>>;
  token_benefits_updates: ResolverTypeWrapper<Partial<Token_Benefits_Updates>>;
  unfollow_dao_args: ResolverTypeWrapper<Partial<Unfollow_Dao_Args>>;
  unfollow_user_args: ResolverTypeWrapper<Partial<Unfollow_User_Args>>;
  unsubscribe_to_newsletter_args: ResolverTypeWrapper<Partial<Unsubscribe_To_Newsletter_Args>>;
  user_following: ResolverTypeWrapper<Partial<User_Following>>;
  user_following_aggregate: ResolverTypeWrapper<Partial<User_Following_Aggregate>>;
  user_following_aggregate_bool_exp: ResolverTypeWrapper<Partial<User_Following_Aggregate_Bool_Exp>>;
  user_following_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<User_Following_Aggregate_Bool_Exp_Count>>;
  user_following_aggregate_fields: ResolverTypeWrapper<Partial<User_Following_Aggregate_Fields>>;
  user_following_aggregate_order_by: ResolverTypeWrapper<Partial<User_Following_Aggregate_Order_By>>;
  user_following_arr_rel_insert_input: ResolverTypeWrapper<Partial<User_Following_Arr_Rel_Insert_Input>>;
  user_following_bool_exp: ResolverTypeWrapper<Partial<User_Following_Bool_Exp>>;
  user_following_constraint: ResolverTypeWrapper<Partial<User_Following_Constraint>>;
  user_following_insert_input: ResolverTypeWrapper<Partial<User_Following_Insert_Input>>;
  user_following_max_fields: ResolverTypeWrapper<Partial<User_Following_Max_Fields>>;
  user_following_max_order_by: ResolverTypeWrapper<Partial<User_Following_Max_Order_By>>;
  user_following_min_fields: ResolverTypeWrapper<Partial<User_Following_Min_Fields>>;
  user_following_min_order_by: ResolverTypeWrapper<Partial<User_Following_Min_Order_By>>;
  user_following_mutation_response: ResolverTypeWrapper<Partial<User_Following_Mutation_Response>>;
  user_following_on_conflict: ResolverTypeWrapper<Partial<User_Following_On_Conflict>>;
  user_following_order_by: ResolverTypeWrapper<Partial<User_Following_Order_By>>;
  user_following_select_column: ResolverTypeWrapper<Partial<User_Following_Select_Column>>;
  user_following_set_input: ResolverTypeWrapper<Partial<User_Following_Set_Input>>;
  user_following_stream_cursor_input: ResolverTypeWrapper<Partial<User_Following_Stream_Cursor_Input>>;
  user_following_stream_cursor_value_input: ResolverTypeWrapper<Partial<User_Following_Stream_Cursor_Value_Input>>;
  user_following_update_column: ResolverTypeWrapper<Partial<User_Following_Update_Column>>;
  user_following_updates: ResolverTypeWrapper<Partial<User_Following_Updates>>;
  user_socials: ResolverTypeWrapper<Partial<User_Socials>>;
  user_socials_aggregate: ResolverTypeWrapper<Partial<User_Socials_Aggregate>>;
  user_socials_aggregate_bool_exp: ResolverTypeWrapper<Partial<User_Socials_Aggregate_Bool_Exp>>;
  user_socials_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<User_Socials_Aggregate_Bool_Exp_Count>>;
  user_socials_aggregate_fields: ResolverTypeWrapper<Partial<User_Socials_Aggregate_Fields>>;
  user_socials_aggregate_order_by: ResolverTypeWrapper<Partial<User_Socials_Aggregate_Order_By>>;
  user_socials_arr_rel_insert_input: ResolverTypeWrapper<Partial<User_Socials_Arr_Rel_Insert_Input>>;
  user_socials_bool_exp: ResolverTypeWrapper<Partial<User_Socials_Bool_Exp>>;
  user_socials_constraint: ResolverTypeWrapper<Partial<User_Socials_Constraint>>;
  user_socials_insert_input: ResolverTypeWrapper<Partial<User_Socials_Insert_Input>>;
  user_socials_max_fields: ResolverTypeWrapper<Partial<User_Socials_Max_Fields>>;
  user_socials_max_order_by: ResolverTypeWrapper<Partial<User_Socials_Max_Order_By>>;
  user_socials_min_fields: ResolverTypeWrapper<Partial<User_Socials_Min_Fields>>;
  user_socials_min_order_by: ResolverTypeWrapper<Partial<User_Socials_Min_Order_By>>;
  user_socials_mutation_response: ResolverTypeWrapper<Partial<User_Socials_Mutation_Response>>;
  user_socials_on_conflict: ResolverTypeWrapper<Partial<User_Socials_On_Conflict>>;
  user_socials_order_by: ResolverTypeWrapper<Partial<User_Socials_Order_By>>;
  user_socials_select_column: ResolverTypeWrapper<Partial<User_Socials_Select_Column>>;
  user_socials_set_input: ResolverTypeWrapper<Partial<User_Socials_Set_Input>>;
  user_socials_stream_cursor_input: ResolverTypeWrapper<Partial<User_Socials_Stream_Cursor_Input>>;
  user_socials_stream_cursor_value_input: ResolverTypeWrapper<Partial<User_Socials_Stream_Cursor_Value_Input>>;
  user_socials_update_column: ResolverTypeWrapper<Partial<User_Socials_Update_Column>>;
  user_socials_updates: ResolverTypeWrapper<Partial<User_Socials_Updates>>;
  users: ResolverTypeWrapper<Partial<Users>>;
  users_aggregate: ResolverTypeWrapper<Partial<Users_Aggregate>>;
  users_aggregate_fields: ResolverTypeWrapper<Partial<Users_Aggregate_Fields>>;
  users_aggregate_order_by: ResolverTypeWrapper<Partial<Users_Aggregate_Order_By>>;
  users_append_input: ResolverTypeWrapper<Partial<Users_Append_Input>>;
  users_avg_fields: ResolverTypeWrapper<Partial<Users_Avg_Fields>>;
  users_avg_order_by: ResolverTypeWrapper<Partial<Users_Avg_Order_By>>;
  users_bool_exp: ResolverTypeWrapper<Partial<Users_Bool_Exp>>;
  users_constraint: ResolverTypeWrapper<Partial<Users_Constraint>>;
  users_delete_at_path_input: ResolverTypeWrapper<Partial<Users_Delete_At_Path_Input>>;
  users_delete_elem_input: ResolverTypeWrapper<Partial<Users_Delete_Elem_Input>>;
  users_delete_key_input: ResolverTypeWrapper<Partial<Users_Delete_Key_Input>>;
  users_inc_input: ResolverTypeWrapper<Partial<Users_Inc_Input>>;
  users_insert_input: ResolverTypeWrapper<Partial<Users_Insert_Input>>;
  users_max_fields: ResolverTypeWrapper<Partial<Users_Max_Fields>>;
  users_max_order_by: ResolverTypeWrapper<Partial<Users_Max_Order_By>>;
  users_min_fields: ResolverTypeWrapper<Partial<Users_Min_Fields>>;
  users_min_order_by: ResolverTypeWrapper<Partial<Users_Min_Order_By>>;
  users_mutation_response: ResolverTypeWrapper<Partial<Users_Mutation_Response>>;
  users_obj_rel_insert_input: ResolverTypeWrapper<Partial<Users_Obj_Rel_Insert_Input>>;
  users_on_conflict: ResolverTypeWrapper<Partial<Users_On_Conflict>>;
  users_order_by: ResolverTypeWrapper<Partial<Users_Order_By>>;
  users_pk_columns_input: ResolverTypeWrapper<Partial<Users_Pk_Columns_Input>>;
  users_prepend_input: ResolverTypeWrapper<Partial<Users_Prepend_Input>>;
  users_scalar: ResolverTypeWrapper<Partial<Scalars['users_scalar']>>;
  users_select_column: ResolverTypeWrapper<Partial<Users_Select_Column>>;
  users_set_input: ResolverTypeWrapper<Partial<Users_Set_Input>>;
  users_stddev_fields: ResolverTypeWrapper<Partial<Users_Stddev_Fields>>;
  users_stddev_order_by: ResolverTypeWrapper<Partial<Users_Stddev_Order_By>>;
  users_stddev_pop_fields: ResolverTypeWrapper<Partial<Users_Stddev_Pop_Fields>>;
  users_stddev_pop_order_by: ResolverTypeWrapper<Partial<Users_Stddev_Pop_Order_By>>;
  users_stddev_samp_fields: ResolverTypeWrapper<Partial<Users_Stddev_Samp_Fields>>;
  users_stddev_samp_order_by: ResolverTypeWrapper<Partial<Users_Stddev_Samp_Order_By>>;
  users_stream_cursor_input: ResolverTypeWrapper<Partial<Users_Stream_Cursor_Input>>;
  users_stream_cursor_value_input: ResolverTypeWrapper<Partial<Users_Stream_Cursor_Value_Input>>;
  users_sum_fields: ResolverTypeWrapper<Partial<Users_Sum_Fields>>;
  users_sum_order_by: ResolverTypeWrapper<Partial<Users_Sum_Order_By>>;
  users_update_column: ResolverTypeWrapper<Partial<Users_Update_Column>>;
  users_updates: ResolverTypeWrapper<Partial<Users_Updates>>;
  users_var_pop_fields: ResolverTypeWrapper<Partial<Users_Var_Pop_Fields>>;
  users_var_pop_order_by: ResolverTypeWrapper<Partial<Users_Var_Pop_Order_By>>;
  users_var_samp_fields: ResolverTypeWrapper<Partial<Users_Var_Samp_Fields>>;
  users_var_samp_order_by: ResolverTypeWrapper<Partial<Users_Var_Samp_Order_By>>;
  users_variance_fields: ResolverTypeWrapper<Partial<Users_Variance_Fields>>;
  users_variance_order_by: ResolverTypeWrapper<Partial<Users_Variance_Order_By>>;
  uuid: ResolverTypeWrapper<Partial<Scalars['uuid']>>;
  uuid_comparison_exp: ResolverTypeWrapper<Partial<Uuid_Comparison_Exp>>;
  whitelisted_wallets: ResolverTypeWrapper<Partial<Whitelisted_Wallets>>;
  whitelisted_wallets_aggregate: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Aggregate>>;
  whitelisted_wallets_aggregate_bool_exp: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Aggregate_Bool_Exp>>;
  whitelisted_wallets_aggregate_bool_exp_count: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Aggregate_Bool_Exp_Count>>;
  whitelisted_wallets_aggregate_fields: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Aggregate_Fields>>;
  whitelisted_wallets_aggregate_order_by: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Aggregate_Order_By>>;
  whitelisted_wallets_arr_rel_insert_input: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Arr_Rel_Insert_Input>>;
  whitelisted_wallets_bool_exp: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Bool_Exp>>;
  whitelisted_wallets_constraint: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Constraint>>;
  whitelisted_wallets_insert_input: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Insert_Input>>;
  whitelisted_wallets_max_fields: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Max_Fields>>;
  whitelisted_wallets_max_order_by: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Max_Order_By>>;
  whitelisted_wallets_min_fields: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Min_Fields>>;
  whitelisted_wallets_min_order_by: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Min_Order_By>>;
  whitelisted_wallets_mutation_response: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Mutation_Response>>;
  whitelisted_wallets_on_conflict: ResolverTypeWrapper<Partial<Whitelisted_Wallets_On_Conflict>>;
  whitelisted_wallets_order_by: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Order_By>>;
  whitelisted_wallets_select_column: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Select_Column>>;
  whitelisted_wallets_set_input: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Set_Input>>;
  whitelisted_wallets_stream_cursor_input: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Stream_Cursor_Input>>;
  whitelisted_wallets_stream_cursor_value_input: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Stream_Cursor_Value_Input>>;
  whitelisted_wallets_update_column: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Update_Column>>;
  whitelisted_wallets_updates: ResolverTypeWrapper<Partial<Whitelisted_Wallets_Updates>>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AlgoliaPaginationInput: Partial<AlgoliaPaginationInput>;
  AlgoliaSearchResults: Partial<AlgoliaSearchResults>;
  ApproveCredentialOutput: Partial<ApproveCredentialOutput>;
  ApproveMTInput: Partial<ApproveMtInput>;
  Boolean: Partial<Scalars['Boolean']>;
  Boolean_comparison_exp: Partial<Boolean_Comparison_Exp>;
  ClaimCredentialOutput: Partial<ClaimCredentialOutput>;
  CreateCodeOutput: Partial<CreateCodeOutput>;
  Float: Partial<Scalars['Float']>;
  Int: Partial<Scalars['Int']>;
  Int_comparison_exp: Partial<Int_Comparison_Exp>;
  LinkPreviewOutput: Partial<LinkPreviewOutput>;
  LoginOutput: Partial<LoginOutput>;
  MetadataInput: Partial<MetadataInput>;
  MintCredentialInfo: Partial<MintCredentialInfo>;
  MintCredentialOutput: Partial<MintCredentialOutput>;
  NonceOutput: Partial<NonceOutput>;
  OptionsInput: Partial<OptionsInput>;
  PublishGateOutput: Partial<PublishGateOutput>;
  RefreshOutput: Partial<RefreshOutput>;
  RejectMTOutput: Partial<RejectMtOutput>;
  Resize: Partial<Resize>;
  ResizeInput: Partial<ResizeInput>;
  String: Partial<Scalars['String']>;
  String_comparison_exp: Partial<String_Comparison_Exp>;
  TransformOptions: Partial<TransformOptions>;
  TransformOutput: Partial<TransformOutput>;
  TransformedImage: Partial<TransformedImage>;
  TwitterPublicMetrics: Partial<TwitterPublicMetrics>;
  TwitterTweet: Partial<TwitterTweet>;
  TwitterUser: Partial<TwitterUser>;
  UploadOutput: Partial<UploadOutput>;
  VerifyCSVOutput: Partial<VerifyCsvOutput>;
  VerifyCSVProgressOutput: Partial<VerifyCsvProgressOutput>;
  VerifyCodeOutput: Partial<VerifyCodeOutput>;
  VerifyInput: Partial<VerifyInput>;
  VerifyOutput: Partial<VerifyOutput>;
  _text: Partial<Scalars['_text']>;
  _text_comparison_exp: Partial<_Text_Comparison_Exp>;
  access_tokens: Partial<Access_Tokens>;
  access_tokens_aggregate: Partial<Access_Tokens_Aggregate>;
  access_tokens_aggregate_fields: Partial<Access_Tokens_Aggregate_Fields>;
  access_tokens_bool_exp: Partial<Access_Tokens_Bool_Exp>;
  access_tokens_insert_input: Partial<Access_Tokens_Insert_Input>;
  access_tokens_max_fields: Partial<Access_Tokens_Max_Fields>;
  access_tokens_min_fields: Partial<Access_Tokens_Min_Fields>;
  access_tokens_mutation_response: Partial<Access_Tokens_Mutation_Response>;
  access_tokens_obj_rel_insert_input: Partial<Access_Tokens_Obj_Rel_Insert_Input>;
  access_tokens_on_conflict: Partial<Access_Tokens_On_Conflict>;
  access_tokens_order_by: Partial<Access_Tokens_Order_By>;
  access_tokens_set_input: Partial<Access_Tokens_Set_Input>;
  access_tokens_stream_cursor_input: Partial<Access_Tokens_Stream_Cursor_Input>;
  access_tokens_stream_cursor_value_input: Partial<Access_Tokens_Stream_Cursor_Value_Input>;
  access_tokens_updates: Partial<Access_Tokens_Updates>;
  all_credential_count: Partial<All_Credential_Count>;
  all_credential_count_aggregate: Partial<All_Credential_Count_Aggregate>;
  all_credential_count_aggregate_fields: Partial<All_Credential_Count_Aggregate_Fields>;
  all_credential_count_avg_fields: Partial<All_Credential_Count_Avg_Fields>;
  all_credential_count_bool_exp: Partial<All_Credential_Count_Bool_Exp>;
  all_credential_count_max_fields: Partial<All_Credential_Count_Max_Fields>;
  all_credential_count_min_fields: Partial<All_Credential_Count_Min_Fields>;
  all_credential_count_order_by: Partial<All_Credential_Count_Order_By>;
  all_credential_count_stddev_fields: Partial<All_Credential_Count_Stddev_Fields>;
  all_credential_count_stddev_pop_fields: Partial<All_Credential_Count_Stddev_Pop_Fields>;
  all_credential_count_stddev_samp_fields: Partial<All_Credential_Count_Stddev_Samp_Fields>;
  all_credential_count_stream_cursor_input: Partial<All_Credential_Count_Stream_Cursor_Input>;
  all_credential_count_stream_cursor_value_input: Partial<All_Credential_Count_Stream_Cursor_Value_Input>;
  all_credential_count_sum_fields: Partial<All_Credential_Count_Sum_Fields>;
  all_credential_count_var_pop_fields: Partial<All_Credential_Count_Var_Pop_Fields>;
  all_credential_count_var_samp_fields: Partial<All_Credential_Count_Var_Samp_Fields>;
  all_credential_count_variance_fields: Partial<All_Credential_Count_Variance_Fields>;
  bigint: Partial<Scalars['bigint']>;
  bigint_comparison_exp: Partial<Bigint_Comparison_Exp>;
  bookmarks: Partial<Bookmarks>;
  bookmarks_aggregate: Partial<Bookmarks_Aggregate>;
  bookmarks_aggregate_bool_exp: Partial<Bookmarks_Aggregate_Bool_Exp>;
  bookmarks_aggregate_bool_exp_count: Partial<Bookmarks_Aggregate_Bool_Exp_Count>;
  bookmarks_aggregate_fields: Partial<Bookmarks_Aggregate_Fields>;
  bookmarks_aggregate_order_by: Partial<Bookmarks_Aggregate_Order_By>;
  bookmarks_arr_rel_insert_input: Partial<Bookmarks_Arr_Rel_Insert_Input>;
  bookmarks_bool_exp: Partial<Bookmarks_Bool_Exp>;
  bookmarks_insert_input: Partial<Bookmarks_Insert_Input>;
  bookmarks_max_fields: Partial<Bookmarks_Max_Fields>;
  bookmarks_max_order_by: Partial<Bookmarks_Max_Order_By>;
  bookmarks_min_fields: Partial<Bookmarks_Min_Fields>;
  bookmarks_min_order_by: Partial<Bookmarks_Min_Order_By>;
  bookmarks_mutation_response: Partial<Bookmarks_Mutation_Response>;
  bookmarks_on_conflict: Partial<Bookmarks_On_Conflict>;
  bookmarks_order_by: Partial<Bookmarks_Order_By>;
  bookmarks_set_input: Partial<Bookmarks_Set_Input>;
  bookmarks_stream_cursor_input: Partial<Bookmarks_Stream_Cursor_Input>;
  bookmarks_stream_cursor_value_input: Partial<Bookmarks_Stream_Cursor_Value_Input>;
  bookmarks_updates: Partial<Bookmarks_Updates>;
  bounties: Partial<Bounties>;
  bounties_aggregate: Partial<Bounties_Aggregate>;
  bounties_aggregate_bool_exp: Partial<Bounties_Aggregate_Bool_Exp>;
  bounties_aggregate_bool_exp_count: Partial<Bounties_Aggregate_Bool_Exp_Count>;
  bounties_aggregate_fields: Partial<Bounties_Aggregate_Fields>;
  bounties_aggregate_order_by: Partial<Bounties_Aggregate_Order_By>;
  bounties_arr_rel_insert_input: Partial<Bounties_Arr_Rel_Insert_Input>;
  bounties_bool_exp: Partial<Bounties_Bool_Exp>;
  bounties_insert_input: Partial<Bounties_Insert_Input>;
  bounties_max_fields: Partial<Bounties_Max_Fields>;
  bounties_max_order_by: Partial<Bounties_Max_Order_By>;
  bounties_min_fields: Partial<Bounties_Min_Fields>;
  bounties_min_order_by: Partial<Bounties_Min_Order_By>;
  bounties_mutation_response: Partial<Bounties_Mutation_Response>;
  bounties_on_conflict: Partial<Bounties_On_Conflict>;
  bounties_order_by: Partial<Bounties_Order_By>;
  bounties_pk_columns_input: Partial<Bounties_Pk_Columns_Input>;
  bounties_set_input: Partial<Bounties_Set_Input>;
  bounties_stream_cursor_input: Partial<Bounties_Stream_Cursor_Input>;
  bounties_stream_cursor_value_input: Partial<Bounties_Stream_Cursor_Value_Input>;
  bounties_updates: Partial<Bounties_Updates>;
  citext: Partial<Scalars['citext']>;
  citext_comparison_exp: Partial<Citext_Comparison_Exp>;
  credential_group: Partial<Credential_Group>;
  credential_group_aggregate: Partial<Credential_Group_Aggregate>;
  credential_group_aggregate_bool_exp: Partial<Credential_Group_Aggregate_Bool_Exp>;
  credential_group_aggregate_bool_exp_count: Partial<Credential_Group_Aggregate_Bool_Exp_Count>;
  credential_group_aggregate_fields: Partial<Credential_Group_Aggregate_Fields>;
  credential_group_aggregate_order_by: Partial<Credential_Group_Aggregate_Order_By>;
  credential_group_append_input: Partial<Credential_Group_Append_Input>;
  credential_group_arr_rel_insert_input: Partial<Credential_Group_Arr_Rel_Insert_Input>;
  credential_group_bool_exp: Partial<Credential_Group_Bool_Exp>;
  credential_group_delete_at_path_input: Partial<Credential_Group_Delete_At_Path_Input>;
  credential_group_delete_elem_input: Partial<Credential_Group_Delete_Elem_Input>;
  credential_group_delete_key_input: Partial<Credential_Group_Delete_Key_Input>;
  credential_group_insert_input: Partial<Credential_Group_Insert_Input>;
  credential_group_max_fields: Partial<Credential_Group_Max_Fields>;
  credential_group_max_order_by: Partial<Credential_Group_Max_Order_By>;
  credential_group_min_fields: Partial<Credential_Group_Min_Fields>;
  credential_group_min_order_by: Partial<Credential_Group_Min_Order_By>;
  credential_group_mutation_response: Partial<Credential_Group_Mutation_Response>;
  credential_group_obj_rel_insert_input: Partial<Credential_Group_Obj_Rel_Insert_Input>;
  credential_group_on_conflict: Partial<Credential_Group_On_Conflict>;
  credential_group_order_by: Partial<Credential_Group_Order_By>;
  credential_group_pk_columns_input: Partial<Credential_Group_Pk_Columns_Input>;
  credential_group_prepend_input: Partial<Credential_Group_Prepend_Input>;
  credential_group_set_input: Partial<Credential_Group_Set_Input>;
  credential_group_stream_cursor_input: Partial<Credential_Group_Stream_Cursor_Input>;
  credential_group_stream_cursor_value_input: Partial<Credential_Group_Stream_Cursor_Value_Input>;
  credential_group_updates: Partial<Credential_Group_Updates>;
  credential_state: Partial<Scalars['credential_state']>;
  credential_state_comparison_exp: Partial<Credential_State_Comparison_Exp>;
  credentials: Partial<Credentials>;
  credentials_aggregate: Partial<Credentials_Aggregate>;
  credentials_aggregate_bool_exp: Partial<Credentials_Aggregate_Bool_Exp>;
  credentials_aggregate_bool_exp_count: Partial<Credentials_Aggregate_Bool_Exp_Count>;
  credentials_aggregate_fields: Partial<Credentials_Aggregate_Fields>;
  credentials_aggregate_order_by: Partial<Credentials_Aggregate_Order_By>;
  credentials_append_input: Partial<Credentials_Append_Input>;
  credentials_arr_rel_insert_input: Partial<Credentials_Arr_Rel_Insert_Input>;
  credentials_bool_exp: Partial<Credentials_Bool_Exp>;
  credentials_delete_at_path_input: Partial<Credentials_Delete_At_Path_Input>;
  credentials_delete_elem_input: Partial<Credentials_Delete_Elem_Input>;
  credentials_delete_key_input: Partial<Credentials_Delete_Key_Input>;
  credentials_insert_input: Partial<Credentials_Insert_Input>;
  credentials_max_fields: Partial<Credentials_Max_Fields>;
  credentials_max_order_by: Partial<Credentials_Max_Order_By>;
  credentials_min_fields: Partial<Credentials_Min_Fields>;
  credentials_min_order_by: Partial<Credentials_Min_Order_By>;
  credentials_mutation_response: Partial<Credentials_Mutation_Response>;
  credentials_obj_rel_insert_input: Partial<Credentials_Obj_Rel_Insert_Input>;
  credentials_on_conflict: Partial<Credentials_On_Conflict>;
  credentials_order_by: Partial<Credentials_Order_By>;
  credentials_pk_columns_input: Partial<Credentials_Pk_Columns_Input>;
  credentials_prepend_input: Partial<Credentials_Prepend_Input>;
  credentials_set_input: Partial<Credentials_Set_Input>;
  credentials_stream_cursor_input: Partial<Credentials_Stream_Cursor_Input>;
  credentials_stream_cursor_value_input: Partial<Credentials_Stream_Cursor_Value_Input>;
  credentials_updates: Partial<Credentials_Updates>;
  dao_following: Partial<Dao_Following>;
  dao_following_aggregate: Partial<Dao_Following_Aggregate>;
  dao_following_aggregate_bool_exp: Partial<Dao_Following_Aggregate_Bool_Exp>;
  dao_following_aggregate_bool_exp_count: Partial<Dao_Following_Aggregate_Bool_Exp_Count>;
  dao_following_aggregate_fields: Partial<Dao_Following_Aggregate_Fields>;
  dao_following_aggregate_order_by: Partial<Dao_Following_Aggregate_Order_By>;
  dao_following_arr_rel_insert_input: Partial<Dao_Following_Arr_Rel_Insert_Input>;
  dao_following_bool_exp: Partial<Dao_Following_Bool_Exp>;
  dao_following_insert_input: Partial<Dao_Following_Insert_Input>;
  dao_following_max_fields: Partial<Dao_Following_Max_Fields>;
  dao_following_max_order_by: Partial<Dao_Following_Max_Order_By>;
  dao_following_min_fields: Partial<Dao_Following_Min_Fields>;
  dao_following_min_order_by: Partial<Dao_Following_Min_Order_By>;
  dao_following_mutation_response: Partial<Dao_Following_Mutation_Response>;
  dao_following_on_conflict: Partial<Dao_Following_On_Conflict>;
  dao_following_order_by: Partial<Dao_Following_Order_By>;
  dao_following_set_input: Partial<Dao_Following_Set_Input>;
  dao_following_stream_cursor_input: Partial<Dao_Following_Stream_Cursor_Input>;
  dao_following_stream_cursor_value_input: Partial<Dao_Following_Stream_Cursor_Value_Input>;
  dao_following_updates: Partial<Dao_Following_Updates>;
  dao_socials: Partial<Dao_Socials>;
  dao_socials_aggregate: Partial<Dao_Socials_Aggregate>;
  dao_socials_aggregate_bool_exp: Partial<Dao_Socials_Aggregate_Bool_Exp>;
  dao_socials_aggregate_bool_exp_count: Partial<Dao_Socials_Aggregate_Bool_Exp_Count>;
  dao_socials_aggregate_fields: Partial<Dao_Socials_Aggregate_Fields>;
  dao_socials_aggregate_order_by: Partial<Dao_Socials_Aggregate_Order_By>;
  dao_socials_arr_rel_insert_input: Partial<Dao_Socials_Arr_Rel_Insert_Input>;
  dao_socials_bool_exp: Partial<Dao_Socials_Bool_Exp>;
  dao_socials_insert_input: Partial<Dao_Socials_Insert_Input>;
  dao_socials_max_fields: Partial<Dao_Socials_Max_Fields>;
  dao_socials_max_order_by: Partial<Dao_Socials_Max_Order_By>;
  dao_socials_min_fields: Partial<Dao_Socials_Min_Fields>;
  dao_socials_min_order_by: Partial<Dao_Socials_Min_Order_By>;
  dao_socials_mutation_response: Partial<Dao_Socials_Mutation_Response>;
  dao_socials_on_conflict: Partial<Dao_Socials_On_Conflict>;
  dao_socials_order_by: Partial<Dao_Socials_Order_By>;
  dao_socials_set_input: Partial<Dao_Socials_Set_Input>;
  dao_socials_stream_cursor_input: Partial<Dao_Socials_Stream_Cursor_Input>;
  dao_socials_stream_cursor_value_input: Partial<Dao_Socials_Stream_Cursor_Value_Input>;
  dao_socials_updates: Partial<Dao_Socials_Updates>;
  daos: Partial<Daos>;
  daos_aggregate: Partial<Daos_Aggregate>;
  daos_aggregate_fields: Partial<Daos_Aggregate_Fields>;
  daos_append_input: Partial<Daos_Append_Input>;
  daos_bool_exp: Partial<Daos_Bool_Exp>;
  daos_delete_at_path_input: Partial<Daos_Delete_At_Path_Input>;
  daos_delete_elem_input: Partial<Daos_Delete_Elem_Input>;
  daos_delete_key_input: Partial<Daos_Delete_Key_Input>;
  daos_insert_input: Partial<Daos_Insert_Input>;
  daos_max_fields: Partial<Daos_Max_Fields>;
  daos_min_fields: Partial<Daos_Min_Fields>;
  daos_mutation_response: Partial<Daos_Mutation_Response>;
  daos_obj_rel_insert_input: Partial<Daos_Obj_Rel_Insert_Input>;
  daos_on_conflict: Partial<Daos_On_Conflict>;
  daos_order_by: Partial<Daos_Order_By>;
  daos_pk_columns_input: Partial<Daos_Pk_Columns_Input>;
  daos_prepend_input: Partial<Daos_Prepend_Input>;
  daos_set_input: Partial<Daos_Set_Input>;
  daos_stream_cursor_input: Partial<Daos_Stream_Cursor_Input>;
  daos_stream_cursor_value_input: Partial<Daos_Stream_Cursor_Value_Input>;
  daos_updates: Partial<Daos_Updates>;
  earners: Partial<Earners>;
  earners_aggregate: Partial<Earners_Aggregate>;
  earners_aggregate_bool_exp: Partial<Earners_Aggregate_Bool_Exp>;
  earners_aggregate_bool_exp_count: Partial<Earners_Aggregate_Bool_Exp_Count>;
  earners_aggregate_fields: Partial<Earners_Aggregate_Fields>;
  earners_aggregate_order_by: Partial<Earners_Aggregate_Order_By>;
  earners_arr_rel_insert_input: Partial<Earners_Arr_Rel_Insert_Input>;
  earners_bool_exp: Partial<Earners_Bool_Exp>;
  earners_insert_input: Partial<Earners_Insert_Input>;
  earners_max_fields: Partial<Earners_Max_Fields>;
  earners_max_order_by: Partial<Earners_Max_Order_By>;
  earners_min_fields: Partial<Earners_Min_Fields>;
  earners_min_order_by: Partial<Earners_Min_Order_By>;
  earners_mutation_response: Partial<Earners_Mutation_Response>;
  earners_on_conflict: Partial<Earners_On_Conflict>;
  earners_order_by: Partial<Earners_Order_By>;
  earners_pk_columns_input: Partial<Earners_Pk_Columns_Input>;
  earners_set_input: Partial<Earners_Set_Input>;
  earners_stream_cursor_input: Partial<Earners_Stream_Cursor_Input>;
  earners_stream_cursor_value_input: Partial<Earners_Stream_Cursor_Value_Input>;
  earners_updates: Partial<Earners_Updates>;
  email: Partial<Scalars['email']>;
  email_subscribers: Partial<Email_Subscribers>;
  email_subscribers_aggregate: Partial<Email_Subscribers_Aggregate>;
  email_subscribers_aggregate_fields: Partial<Email_Subscribers_Aggregate_Fields>;
  email_subscribers_bool_exp: Partial<Email_Subscribers_Bool_Exp>;
  email_subscribers_insert_input: Partial<Email_Subscribers_Insert_Input>;
  email_subscribers_max_fields: Partial<Email_Subscribers_Max_Fields>;
  email_subscribers_min_fields: Partial<Email_Subscribers_Min_Fields>;
  email_subscribers_mutation_response: Partial<Email_Subscribers_Mutation_Response>;
  email_subscribers_on_conflict: Partial<Email_Subscribers_On_Conflict>;
  email_subscribers_order_by: Partial<Email_Subscribers_Order_By>;
  email_subscribers_pk_columns_input: Partial<Email_Subscribers_Pk_Columns_Input>;
  email_subscribers_set_input: Partial<Email_Subscribers_Set_Input>;
  email_subscribers_stream_cursor_input: Partial<Email_Subscribers_Stream_Cursor_Input>;
  email_subscribers_stream_cursor_value_input: Partial<Email_Subscribers_Stream_Cursor_Value_Input>;
  email_subscribers_updates: Partial<Email_Subscribers_Updates>;
  experiences: Partial<Experiences>;
  experiences_aggregate: Partial<Experiences_Aggregate>;
  experiences_aggregate_bool_exp: Partial<Experiences_Aggregate_Bool_Exp>;
  experiences_aggregate_bool_exp_bool_and: Partial<Experiences_Aggregate_Bool_Exp_Bool_And>;
  experiences_aggregate_bool_exp_bool_or: Partial<Experiences_Aggregate_Bool_Exp_Bool_Or>;
  experiences_aggregate_bool_exp_count: Partial<Experiences_Aggregate_Bool_Exp_Count>;
  experiences_aggregate_fields: Partial<Experiences_Aggregate_Fields>;
  experiences_aggregate_order_by: Partial<Experiences_Aggregate_Order_By>;
  experiences_arr_rel_insert_input: Partial<Experiences_Arr_Rel_Insert_Input>;
  experiences_bool_exp: Partial<Experiences_Bool_Exp>;
  experiences_insert_input: Partial<Experiences_Insert_Input>;
  experiences_max_fields: Partial<Experiences_Max_Fields>;
  experiences_max_order_by: Partial<Experiences_Max_Order_By>;
  experiences_min_fields: Partial<Experiences_Min_Fields>;
  experiences_min_order_by: Partial<Experiences_Min_Order_By>;
  experiences_mutation_response: Partial<Experiences_Mutation_Response>;
  experiences_obj_rel_insert_input: Partial<Experiences_Obj_Rel_Insert_Input>;
  experiences_on_conflict: Partial<Experiences_On_Conflict>;
  experiences_order_by: Partial<Experiences_Order_By>;
  experiences_set_input: Partial<Experiences_Set_Input>;
  experiences_stream_cursor_input: Partial<Experiences_Stream_Cursor_Input>;
  experiences_stream_cursor_value_input: Partial<Experiences_Stream_Cursor_Value_Input>;
  experiences_updates: Partial<Experiences_Updates>;
  files: Partial<Files>;
  files_aggregate: Partial<Files_Aggregate>;
  files_aggregate_fields: Partial<Files_Aggregate_Fields>;
  files_append_input: Partial<Files_Append_Input>;
  files_bool_exp: Partial<Files_Bool_Exp>;
  files_delete_at_path_input: Partial<Files_Delete_At_Path_Input>;
  files_delete_elem_input: Partial<Files_Delete_Elem_Input>;
  files_delete_key_input: Partial<Files_Delete_Key_Input>;
  files_insert_input: Partial<Files_Insert_Input>;
  files_max_fields: Partial<Files_Max_Fields>;
  files_min_fields: Partial<Files_Min_Fields>;
  files_mutation_response: Partial<Files_Mutation_Response>;
  files_obj_rel_insert_input: Partial<Files_Obj_Rel_Insert_Input>;
  files_on_conflict: Partial<Files_On_Conflict>;
  files_order_by: Partial<Files_Order_By>;
  files_pk_columns_input: Partial<Files_Pk_Columns_Input>;
  files_prepend_input: Partial<Files_Prepend_Input>;
  files_set_input: Partial<Files_Set_Input>;
  files_stream_cursor_input: Partial<Files_Stream_Cursor_Input>;
  files_stream_cursor_value_input: Partial<Files_Stream_Cursor_Value_Input>;
  files_updates: Partial<Files_Updates>;
  follow_dao_args: Partial<Follow_Dao_Args>;
  follow_user_args: Partial<Follow_User_Args>;
  following_state: Partial<Scalars['following_state']>;
  following_state_comparison_exp: Partial<Following_State_Comparison_Exp>;
  gate_progress: Partial<Gate_Progress>;
  gate_progress_aggregate: Partial<Gate_Progress_Aggregate>;
  gate_progress_aggregate_bool_exp: Partial<Gate_Progress_Aggregate_Bool_Exp>;
  gate_progress_aggregate_bool_exp_count: Partial<Gate_Progress_Aggregate_Bool_Exp_Count>;
  gate_progress_aggregate_fields: Partial<Gate_Progress_Aggregate_Fields>;
  gate_progress_aggregate_order_by: Partial<Gate_Progress_Aggregate_Order_By>;
  gate_progress_arr_rel_insert_input: Partial<Gate_Progress_Arr_Rel_Insert_Input>;
  gate_progress_avg_fields: Partial<Gate_Progress_Avg_Fields>;
  gate_progress_avg_order_by: Partial<Gate_Progress_Avg_Order_By>;
  gate_progress_bool_exp: Partial<Gate_Progress_Bool_Exp>;
  gate_progress_inc_input: Partial<Gate_Progress_Inc_Input>;
  gate_progress_insert_input: Partial<Gate_Progress_Insert_Input>;
  gate_progress_max_fields: Partial<Gate_Progress_Max_Fields>;
  gate_progress_max_order_by: Partial<Gate_Progress_Max_Order_By>;
  gate_progress_min_fields: Partial<Gate_Progress_Min_Fields>;
  gate_progress_min_order_by: Partial<Gate_Progress_Min_Order_By>;
  gate_progress_mutation_response: Partial<Gate_Progress_Mutation_Response>;
  gate_progress_on_conflict: Partial<Gate_Progress_On_Conflict>;
  gate_progress_order_by: Partial<Gate_Progress_Order_By>;
  gate_progress_pk_columns_input: Partial<Gate_Progress_Pk_Columns_Input>;
  gate_progress_set_input: Partial<Gate_Progress_Set_Input>;
  gate_progress_stddev_fields: Partial<Gate_Progress_Stddev_Fields>;
  gate_progress_stddev_order_by: Partial<Gate_Progress_Stddev_Order_By>;
  gate_progress_stddev_pop_fields: Partial<Gate_Progress_Stddev_Pop_Fields>;
  gate_progress_stddev_pop_order_by: Partial<Gate_Progress_Stddev_Pop_Order_By>;
  gate_progress_stddev_samp_fields: Partial<Gate_Progress_Stddev_Samp_Fields>;
  gate_progress_stddev_samp_order_by: Partial<Gate_Progress_Stddev_Samp_Order_By>;
  gate_progress_stream_cursor_input: Partial<Gate_Progress_Stream_Cursor_Input>;
  gate_progress_stream_cursor_value_input: Partial<Gate_Progress_Stream_Cursor_Value_Input>;
  gate_progress_sum_fields: Partial<Gate_Progress_Sum_Fields>;
  gate_progress_sum_order_by: Partial<Gate_Progress_Sum_Order_By>;
  gate_progress_updates: Partial<Gate_Progress_Updates>;
  gate_progress_var_pop_fields: Partial<Gate_Progress_Var_Pop_Fields>;
  gate_progress_var_pop_order_by: Partial<Gate_Progress_Var_Pop_Order_By>;
  gate_progress_var_samp_fields: Partial<Gate_Progress_Var_Samp_Fields>;
  gate_progress_var_samp_order_by: Partial<Gate_Progress_Var_Samp_Order_By>;
  gate_progress_variance_fields: Partial<Gate_Progress_Variance_Fields>;
  gate_progress_variance_order_by: Partial<Gate_Progress_Variance_Order_By>;
  gate_state: Partial<Scalars['gate_state']>;
  gate_state_comparison_exp: Partial<Gate_State_Comparison_Exp>;
  gate_status: Partial<Scalars['gate_status']>;
  gate_status_comparison_exp: Partial<Gate_Status_Comparison_Exp>;
  gate_type: Partial<Scalars['gate_type']>;
  gate_type_comparison_exp: Partial<Gate_Type_Comparison_Exp>;
  gates: Partial<Gates>;
  gates_aggregate: Partial<Gates_Aggregate>;
  gates_aggregate_bool_exp: Partial<Gates_Aggregate_Bool_Exp>;
  gates_aggregate_bool_exp_count: Partial<Gates_Aggregate_Bool_Exp_Count>;
  gates_aggregate_fields: Partial<Gates_Aggregate_Fields>;
  gates_aggregate_order_by: Partial<Gates_Aggregate_Order_By>;
  gates_append_input: Partial<Gates_Append_Input>;
  gates_arr_rel_insert_input: Partial<Gates_Arr_Rel_Insert_Input>;
  gates_avg_fields: Partial<Gates_Avg_Fields>;
  gates_avg_order_by: Partial<Gates_Avg_Order_By>;
  gates_bool_exp: Partial<Gates_Bool_Exp>;
  gates_delete_at_path_input: Partial<Gates_Delete_At_Path_Input>;
  gates_delete_elem_input: Partial<Gates_Delete_Elem_Input>;
  gates_delete_key_input: Partial<Gates_Delete_Key_Input>;
  gates_inc_input: Partial<Gates_Inc_Input>;
  gates_insert_input: Partial<Gates_Insert_Input>;
  gates_max_fields: Partial<Gates_Max_Fields>;
  gates_max_order_by: Partial<Gates_Max_Order_By>;
  gates_min_fields: Partial<Gates_Min_Fields>;
  gates_min_order_by: Partial<Gates_Min_Order_By>;
  gates_mutation_response: Partial<Gates_Mutation_Response>;
  gates_obj_rel_insert_input: Partial<Gates_Obj_Rel_Insert_Input>;
  gates_on_conflict: Partial<Gates_On_Conflict>;
  gates_order_by: Partial<Gates_Order_By>;
  gates_pk_columns_input: Partial<Gates_Pk_Columns_Input>;
  gates_prepend_input: Partial<Gates_Prepend_Input>;
  gates_set_input: Partial<Gates_Set_Input>;
  gates_stddev_fields: Partial<Gates_Stddev_Fields>;
  gates_stddev_order_by: Partial<Gates_Stddev_Order_By>;
  gates_stddev_pop_fields: Partial<Gates_Stddev_Pop_Fields>;
  gates_stddev_pop_order_by: Partial<Gates_Stddev_Pop_Order_By>;
  gates_stddev_samp_fields: Partial<Gates_Stddev_Samp_Fields>;
  gates_stddev_samp_order_by: Partial<Gates_Stddev_Samp_Order_By>;
  gates_stream_cursor_input: Partial<Gates_Stream_Cursor_Input>;
  gates_stream_cursor_value_input: Partial<Gates_Stream_Cursor_Value_Input>;
  gates_sum_fields: Partial<Gates_Sum_Fields>;
  gates_sum_order_by: Partial<Gates_Sum_Order_By>;
  gates_updates: Partial<Gates_Updates>;
  gates_var_pop_fields: Partial<Gates_Var_Pop_Fields>;
  gates_var_pop_order_by: Partial<Gates_Var_Pop_Order_By>;
  gates_var_samp_fields: Partial<Gates_Var_Samp_Fields>;
  gates_var_samp_order_by: Partial<Gates_Var_Samp_Order_By>;
  gates_variance_fields: Partial<Gates_Variance_Fields>;
  gates_variance_order_by: Partial<Gates_Variance_Order_By>;
  get_claimable_credentials_args: Partial<Get_Claimable_Credentials_Args>;
  hidden_experience_credentials: Partial<Hidden_Experience_Credentials>;
  hidden_experience_credentials_aggregate: Partial<Hidden_Experience_Credentials_Aggregate>;
  hidden_experience_credentials_aggregate_bool_exp: Partial<Hidden_Experience_Credentials_Aggregate_Bool_Exp>;
  hidden_experience_credentials_aggregate_bool_exp_count: Partial<Hidden_Experience_Credentials_Aggregate_Bool_Exp_Count>;
  hidden_experience_credentials_aggregate_fields: Partial<Hidden_Experience_Credentials_Aggregate_Fields>;
  hidden_experience_credentials_aggregate_order_by: Partial<Hidden_Experience_Credentials_Aggregate_Order_By>;
  hidden_experience_credentials_arr_rel_insert_input: Partial<Hidden_Experience_Credentials_Arr_Rel_Insert_Input>;
  hidden_experience_credentials_bool_exp: Partial<Hidden_Experience_Credentials_Bool_Exp>;
  hidden_experience_credentials_insert_input: Partial<Hidden_Experience_Credentials_Insert_Input>;
  hidden_experience_credentials_max_fields: Partial<Hidden_Experience_Credentials_Max_Fields>;
  hidden_experience_credentials_max_order_by: Partial<Hidden_Experience_Credentials_Max_Order_By>;
  hidden_experience_credentials_min_fields: Partial<Hidden_Experience_Credentials_Min_Fields>;
  hidden_experience_credentials_min_order_by: Partial<Hidden_Experience_Credentials_Min_Order_By>;
  hidden_experience_credentials_mutation_response: Partial<Hidden_Experience_Credentials_Mutation_Response>;
  hidden_experience_credentials_on_conflict: Partial<Hidden_Experience_Credentials_On_Conflict>;
  hidden_experience_credentials_order_by: Partial<Hidden_Experience_Credentials_Order_By>;
  hidden_experience_credentials_set_input: Partial<Hidden_Experience_Credentials_Set_Input>;
  hidden_experience_credentials_stream_cursor_input: Partial<Hidden_Experience_Credentials_Stream_Cursor_Input>;
  hidden_experience_credentials_stream_cursor_value_input: Partial<Hidden_Experience_Credentials_Stream_Cursor_Value_Input>;
  hidden_experience_credentials_updates: Partial<Hidden_Experience_Credentials_Updates>;
  json: Partial<Scalars['json']>;
  jsonb: Partial<Scalars['jsonb']>;
  jsonb_cast_exp: Partial<Jsonb_Cast_Exp>;
  jsonb_comparison_exp: Partial<Jsonb_Comparison_Exp>;
  key_status: Partial<Scalars['key_status']>;
  key_status_comparison_exp: Partial<Key_Status_Comparison_Exp>;
  manual_task_event_type: Partial<Scalars['manual_task_event_type']>;
  manual_task_event_type_comparison_exp: Partial<Manual_Task_Event_Type_Comparison_Exp>;
  manual_task_events: Partial<Manual_Task_Events>;
  manual_task_events_aggregate: Partial<Manual_Task_Events_Aggregate>;
  manual_task_events_aggregate_fields: Partial<Manual_Task_Events_Aggregate_Fields>;
  manual_task_events_append_input: Partial<Manual_Task_Events_Append_Input>;
  manual_task_events_bool_exp: Partial<Manual_Task_Events_Bool_Exp>;
  manual_task_events_delete_at_path_input: Partial<Manual_Task_Events_Delete_At_Path_Input>;
  manual_task_events_delete_elem_input: Partial<Manual_Task_Events_Delete_Elem_Input>;
  manual_task_events_delete_key_input: Partial<Manual_Task_Events_Delete_Key_Input>;
  manual_task_events_insert_input: Partial<Manual_Task_Events_Insert_Input>;
  manual_task_events_max_fields: Partial<Manual_Task_Events_Max_Fields>;
  manual_task_events_min_fields: Partial<Manual_Task_Events_Min_Fields>;
  manual_task_events_mutation_response: Partial<Manual_Task_Events_Mutation_Response>;
  manual_task_events_on_conflict: Partial<Manual_Task_Events_On_Conflict>;
  manual_task_events_order_by: Partial<Manual_Task_Events_Order_By>;
  manual_task_events_pk_columns_input: Partial<Manual_Task_Events_Pk_Columns_Input>;
  manual_task_events_prepend_input: Partial<Manual_Task_Events_Prepend_Input>;
  manual_task_events_set_input: Partial<Manual_Task_Events_Set_Input>;
  manual_task_events_stream_cursor_input: Partial<Manual_Task_Events_Stream_Cursor_Input>;
  manual_task_events_stream_cursor_value_input: Partial<Manual_Task_Events_Stream_Cursor_Value_Input>;
  manual_task_events_updates: Partial<Manual_Task_Events_Updates>;
  manual_task_submission: Partial<Manual_Task_Submission>;
  manual_task_submission_aggregate: Partial<Manual_Task_Submission_Aggregate>;
  manual_task_submission_aggregate_fields: Partial<Manual_Task_Submission_Aggregate_Fields>;
  manual_task_submission_bool_exp: Partial<Manual_Task_Submission_Bool_Exp>;
  manual_task_submission_insert_input: Partial<Manual_Task_Submission_Insert_Input>;
  manual_task_submission_max_fields: Partial<Manual_Task_Submission_Max_Fields>;
  manual_task_submission_min_fields: Partial<Manual_Task_Submission_Min_Fields>;
  manual_task_submission_mutation_response: Partial<Manual_Task_Submission_Mutation_Response>;
  manual_task_submission_on_conflict: Partial<Manual_Task_Submission_On_Conflict>;
  manual_task_submission_order_by: Partial<Manual_Task_Submission_Order_By>;
  manual_task_submission_pk_columns_input: Partial<Manual_Task_Submission_Pk_Columns_Input>;
  manual_task_submission_set_input: Partial<Manual_Task_Submission_Set_Input>;
  manual_task_submission_stream_cursor_input: Partial<Manual_Task_Submission_Stream_Cursor_Input>;
  manual_task_submission_stream_cursor_value_input: Partial<Manual_Task_Submission_Stream_Cursor_Value_Input>;
  manual_task_submission_updates: Partial<Manual_Task_Submission_Updates>;
  mutation_root: {};
  permission_types: Partial<Scalars['permission_types']>;
  permission_types_comparison_exp: Partial<Permission_Types_Comparison_Exp>;
  permissions: Partial<Permissions>;
  permissions_aggregate: Partial<Permissions_Aggregate>;
  permissions_aggregate_bool_exp: Partial<Permissions_Aggregate_Bool_Exp>;
  permissions_aggregate_bool_exp_count: Partial<Permissions_Aggregate_Bool_Exp_Count>;
  permissions_aggregate_fields: Partial<Permissions_Aggregate_Fields>;
  permissions_aggregate_order_by: Partial<Permissions_Aggregate_Order_By>;
  permissions_arr_rel_insert_input: Partial<Permissions_Arr_Rel_Insert_Input>;
  permissions_bool_exp: Partial<Permissions_Bool_Exp>;
  permissions_insert_input: Partial<Permissions_Insert_Input>;
  permissions_max_fields: Partial<Permissions_Max_Fields>;
  permissions_max_order_by: Partial<Permissions_Max_Order_By>;
  permissions_min_fields: Partial<Permissions_Min_Fields>;
  permissions_min_order_by: Partial<Permissions_Min_Order_By>;
  permissions_mutation_response: Partial<Permissions_Mutation_Response>;
  permissions_on_conflict: Partial<Permissions_On_Conflict>;
  permissions_order_by: Partial<Permissions_Order_By>;
  permissions_pk_columns_input: Partial<Permissions_Pk_Columns_Input>;
  permissions_set_input: Partial<Permissions_Set_Input>;
  permissions_stream_cursor_input: Partial<Permissions_Stream_Cursor_Input>;
  permissions_stream_cursor_value_input: Partial<Permissions_Stream_Cursor_Value_Input>;
  permissions_updates: Partial<Permissions_Updates>;
  query_root: {};
  search_daos_args: Partial<Search_Daos_Args>;
  search_gates_args: Partial<Search_Gates_Args>;
  search_users_args: Partial<Search_Users_Args>;
  submission_state: Partial<Scalars['submission_state']>;
  submission_state_comparison_exp: Partial<Submission_State_Comparison_Exp>;
  subscribe_to_newsletter_args: Partial<Subscribe_To_Newsletter_Args>;
  subscription_root: {};
  task_progress: Partial<Task_Progress>;
  task_progress_aggregate: Partial<Task_Progress_Aggregate>;
  task_progress_aggregate_bool_exp: Partial<Task_Progress_Aggregate_Bool_Exp>;
  task_progress_aggregate_bool_exp_count: Partial<Task_Progress_Aggregate_Bool_Exp_Count>;
  task_progress_aggregate_fields: Partial<Task_Progress_Aggregate_Fields>;
  task_progress_aggregate_order_by: Partial<Task_Progress_Aggregate_Order_By>;
  task_progress_arr_rel_insert_input: Partial<Task_Progress_Arr_Rel_Insert_Input>;
  task_progress_bool_exp: Partial<Task_Progress_Bool_Exp>;
  task_progress_insert_input: Partial<Task_Progress_Insert_Input>;
  task_progress_max_fields: Partial<Task_Progress_Max_Fields>;
  task_progress_max_order_by: Partial<Task_Progress_Max_Order_By>;
  task_progress_min_fields: Partial<Task_Progress_Min_Fields>;
  task_progress_min_order_by: Partial<Task_Progress_Min_Order_By>;
  task_progress_mutation_response: Partial<Task_Progress_Mutation_Response>;
  task_progress_obj_rel_insert_input: Partial<Task_Progress_Obj_Rel_Insert_Input>;
  task_progress_on_conflict: Partial<Task_Progress_On_Conflict>;
  task_progress_order_by: Partial<Task_Progress_Order_By>;
  task_progress_pk_columns_input: Partial<Task_Progress_Pk_Columns_Input>;
  task_progress_set_input: Partial<Task_Progress_Set_Input>;
  task_progress_stream_cursor_input: Partial<Task_Progress_Stream_Cursor_Input>;
  task_progress_stream_cursor_value_input: Partial<Task_Progress_Stream_Cursor_Value_Input>;
  task_progress_updates: Partial<Task_Progress_Updates>;
  task_type: Partial<Scalars['task_type']>;
  task_type_comparison_exp: Partial<Task_Type_Comparison_Exp>;
  tasks: Partial<Tasks>;
  tasks_aggregate: Partial<Tasks_Aggregate>;
  tasks_aggregate_bool_exp: Partial<Tasks_Aggregate_Bool_Exp>;
  tasks_aggregate_bool_exp_count: Partial<Tasks_Aggregate_Bool_Exp_Count>;
  tasks_aggregate_fields: Partial<Tasks_Aggregate_Fields>;
  tasks_aggregate_order_by: Partial<Tasks_Aggregate_Order_By>;
  tasks_append_input: Partial<Tasks_Append_Input>;
  tasks_arr_rel_insert_input: Partial<Tasks_Arr_Rel_Insert_Input>;
  tasks_avg_fields: Partial<Tasks_Avg_Fields>;
  tasks_avg_order_by: Partial<Tasks_Avg_Order_By>;
  tasks_bool_exp: Partial<Tasks_Bool_Exp>;
  tasks_delete_at_path_input: Partial<Tasks_Delete_At_Path_Input>;
  tasks_delete_elem_input: Partial<Tasks_Delete_Elem_Input>;
  tasks_delete_key_input: Partial<Tasks_Delete_Key_Input>;
  tasks_inc_input: Partial<Tasks_Inc_Input>;
  tasks_insert_input: Partial<Tasks_Insert_Input>;
  tasks_max_fields: Partial<Tasks_Max_Fields>;
  tasks_max_order_by: Partial<Tasks_Max_Order_By>;
  tasks_min_fields: Partial<Tasks_Min_Fields>;
  tasks_min_order_by: Partial<Tasks_Min_Order_By>;
  tasks_mutation_response: Partial<Tasks_Mutation_Response>;
  tasks_obj_rel_insert_input: Partial<Tasks_Obj_Rel_Insert_Input>;
  tasks_on_conflict: Partial<Tasks_On_Conflict>;
  tasks_order_by: Partial<Tasks_Order_By>;
  tasks_pk_columns_input: Partial<Tasks_Pk_Columns_Input>;
  tasks_prepend_input: Partial<Tasks_Prepend_Input>;
  tasks_set_input: Partial<Tasks_Set_Input>;
  tasks_stddev_fields: Partial<Tasks_Stddev_Fields>;
  tasks_stddev_order_by: Partial<Tasks_Stddev_Order_By>;
  tasks_stddev_pop_fields: Partial<Tasks_Stddev_Pop_Fields>;
  tasks_stddev_pop_order_by: Partial<Tasks_Stddev_Pop_Order_By>;
  tasks_stddev_samp_fields: Partial<Tasks_Stddev_Samp_Fields>;
  tasks_stddev_samp_order_by: Partial<Tasks_Stddev_Samp_Order_By>;
  tasks_stream_cursor_input: Partial<Tasks_Stream_Cursor_Input>;
  tasks_stream_cursor_value_input: Partial<Tasks_Stream_Cursor_Value_Input>;
  tasks_sum_fields: Partial<Tasks_Sum_Fields>;
  tasks_sum_order_by: Partial<Tasks_Sum_Order_By>;
  tasks_updates: Partial<Tasks_Updates>;
  tasks_var_pop_fields: Partial<Tasks_Var_Pop_Fields>;
  tasks_var_pop_order_by: Partial<Tasks_Var_Pop_Order_By>;
  tasks_var_samp_fields: Partial<Tasks_Var_Samp_Fields>;
  tasks_var_samp_order_by: Partial<Tasks_Var_Samp_Order_By>;
  tasks_variance_fields: Partial<Tasks_Variance_Fields>;
  tasks_variance_order_by: Partial<Tasks_Variance_Order_By>;
  timestamp: Partial<Scalars['timestamp']>;
  timestamp_comparison_exp: Partial<Timestamp_Comparison_Exp>;
  timestamptz: Partial<Scalars['timestamptz']>;
  timestamptz_comparison_exp: Partial<Timestamptz_Comparison_Exp>;
  token_benefits: Partial<Token_Benefits>;
  token_benefits_aggregate: Partial<Token_Benefits_Aggregate>;
  token_benefits_aggregate_bool_exp: Partial<Token_Benefits_Aggregate_Bool_Exp>;
  token_benefits_aggregate_bool_exp_count: Partial<Token_Benefits_Aggregate_Bool_Exp_Count>;
  token_benefits_aggregate_fields: Partial<Token_Benefits_Aggregate_Fields>;
  token_benefits_aggregate_order_by: Partial<Token_Benefits_Aggregate_Order_By>;
  token_benefits_arr_rel_insert_input: Partial<Token_Benefits_Arr_Rel_Insert_Input>;
  token_benefits_bool_exp: Partial<Token_Benefits_Bool_Exp>;
  token_benefits_insert_input: Partial<Token_Benefits_Insert_Input>;
  token_benefits_max_fields: Partial<Token_Benefits_Max_Fields>;
  token_benefits_max_order_by: Partial<Token_Benefits_Max_Order_By>;
  token_benefits_min_fields: Partial<Token_Benefits_Min_Fields>;
  token_benefits_min_order_by: Partial<Token_Benefits_Min_Order_By>;
  token_benefits_mutation_response: Partial<Token_Benefits_Mutation_Response>;
  token_benefits_on_conflict: Partial<Token_Benefits_On_Conflict>;
  token_benefits_order_by: Partial<Token_Benefits_Order_By>;
  token_benefits_pk_columns_input: Partial<Token_Benefits_Pk_Columns_Input>;
  token_benefits_set_input: Partial<Token_Benefits_Set_Input>;
  token_benefits_stream_cursor_input: Partial<Token_Benefits_Stream_Cursor_Input>;
  token_benefits_stream_cursor_value_input: Partial<Token_Benefits_Stream_Cursor_Value_Input>;
  token_benefits_updates: Partial<Token_Benefits_Updates>;
  unfollow_dao_args: Partial<Unfollow_Dao_Args>;
  unfollow_user_args: Partial<Unfollow_User_Args>;
  unsubscribe_to_newsletter_args: Partial<Unsubscribe_To_Newsletter_Args>;
  user_following: Partial<User_Following>;
  user_following_aggregate: Partial<User_Following_Aggregate>;
  user_following_aggregate_bool_exp: Partial<User_Following_Aggregate_Bool_Exp>;
  user_following_aggregate_bool_exp_count: Partial<User_Following_Aggregate_Bool_Exp_Count>;
  user_following_aggregate_fields: Partial<User_Following_Aggregate_Fields>;
  user_following_aggregate_order_by: Partial<User_Following_Aggregate_Order_By>;
  user_following_arr_rel_insert_input: Partial<User_Following_Arr_Rel_Insert_Input>;
  user_following_bool_exp: Partial<User_Following_Bool_Exp>;
  user_following_insert_input: Partial<User_Following_Insert_Input>;
  user_following_max_fields: Partial<User_Following_Max_Fields>;
  user_following_max_order_by: Partial<User_Following_Max_Order_By>;
  user_following_min_fields: Partial<User_Following_Min_Fields>;
  user_following_min_order_by: Partial<User_Following_Min_Order_By>;
  user_following_mutation_response: Partial<User_Following_Mutation_Response>;
  user_following_on_conflict: Partial<User_Following_On_Conflict>;
  user_following_order_by: Partial<User_Following_Order_By>;
  user_following_set_input: Partial<User_Following_Set_Input>;
  user_following_stream_cursor_input: Partial<User_Following_Stream_Cursor_Input>;
  user_following_stream_cursor_value_input: Partial<User_Following_Stream_Cursor_Value_Input>;
  user_following_updates: Partial<User_Following_Updates>;
  user_socials: Partial<User_Socials>;
  user_socials_aggregate: Partial<User_Socials_Aggregate>;
  user_socials_aggregate_bool_exp: Partial<User_Socials_Aggregate_Bool_Exp>;
  user_socials_aggregate_bool_exp_count: Partial<User_Socials_Aggregate_Bool_Exp_Count>;
  user_socials_aggregate_fields: Partial<User_Socials_Aggregate_Fields>;
  user_socials_aggregate_order_by: Partial<User_Socials_Aggregate_Order_By>;
  user_socials_arr_rel_insert_input: Partial<User_Socials_Arr_Rel_Insert_Input>;
  user_socials_bool_exp: Partial<User_Socials_Bool_Exp>;
  user_socials_insert_input: Partial<User_Socials_Insert_Input>;
  user_socials_max_fields: Partial<User_Socials_Max_Fields>;
  user_socials_max_order_by: Partial<User_Socials_Max_Order_By>;
  user_socials_min_fields: Partial<User_Socials_Min_Fields>;
  user_socials_min_order_by: Partial<User_Socials_Min_Order_By>;
  user_socials_mutation_response: Partial<User_Socials_Mutation_Response>;
  user_socials_on_conflict: Partial<User_Socials_On_Conflict>;
  user_socials_order_by: Partial<User_Socials_Order_By>;
  user_socials_set_input: Partial<User_Socials_Set_Input>;
  user_socials_stream_cursor_input: Partial<User_Socials_Stream_Cursor_Input>;
  user_socials_stream_cursor_value_input: Partial<User_Socials_Stream_Cursor_Value_Input>;
  user_socials_updates: Partial<User_Socials_Updates>;
  users: Partial<Users>;
  users_aggregate: Partial<Users_Aggregate>;
  users_aggregate_fields: Partial<Users_Aggregate_Fields>;
  users_aggregate_order_by: Partial<Users_Aggregate_Order_By>;
  users_append_input: Partial<Users_Append_Input>;
  users_avg_fields: Partial<Users_Avg_Fields>;
  users_avg_order_by: Partial<Users_Avg_Order_By>;
  users_bool_exp: Partial<Users_Bool_Exp>;
  users_delete_at_path_input: Partial<Users_Delete_At_Path_Input>;
  users_delete_elem_input: Partial<Users_Delete_Elem_Input>;
  users_delete_key_input: Partial<Users_Delete_Key_Input>;
  users_inc_input: Partial<Users_Inc_Input>;
  users_insert_input: Partial<Users_Insert_Input>;
  users_max_fields: Partial<Users_Max_Fields>;
  users_max_order_by: Partial<Users_Max_Order_By>;
  users_min_fields: Partial<Users_Min_Fields>;
  users_min_order_by: Partial<Users_Min_Order_By>;
  users_mutation_response: Partial<Users_Mutation_Response>;
  users_obj_rel_insert_input: Partial<Users_Obj_Rel_Insert_Input>;
  users_on_conflict: Partial<Users_On_Conflict>;
  users_order_by: Partial<Users_Order_By>;
  users_pk_columns_input: Partial<Users_Pk_Columns_Input>;
  users_prepend_input: Partial<Users_Prepend_Input>;
  users_scalar: Partial<Scalars['users_scalar']>;
  users_set_input: Partial<Users_Set_Input>;
  users_stddev_fields: Partial<Users_Stddev_Fields>;
  users_stddev_order_by: Partial<Users_Stddev_Order_By>;
  users_stddev_pop_fields: Partial<Users_Stddev_Pop_Fields>;
  users_stddev_pop_order_by: Partial<Users_Stddev_Pop_Order_By>;
  users_stddev_samp_fields: Partial<Users_Stddev_Samp_Fields>;
  users_stddev_samp_order_by: Partial<Users_Stddev_Samp_Order_By>;
  users_stream_cursor_input: Partial<Users_Stream_Cursor_Input>;
  users_stream_cursor_value_input: Partial<Users_Stream_Cursor_Value_Input>;
  users_sum_fields: Partial<Users_Sum_Fields>;
  users_sum_order_by: Partial<Users_Sum_Order_By>;
  users_updates: Partial<Users_Updates>;
  users_var_pop_fields: Partial<Users_Var_Pop_Fields>;
  users_var_pop_order_by: Partial<Users_Var_Pop_Order_By>;
  users_var_samp_fields: Partial<Users_Var_Samp_Fields>;
  users_var_samp_order_by: Partial<Users_Var_Samp_Order_By>;
  users_variance_fields: Partial<Users_Variance_Fields>;
  users_variance_order_by: Partial<Users_Variance_Order_By>;
  uuid: Partial<Scalars['uuid']>;
  uuid_comparison_exp: Partial<Uuid_Comparison_Exp>;
  whitelisted_wallets: Partial<Whitelisted_Wallets>;
  whitelisted_wallets_aggregate: Partial<Whitelisted_Wallets_Aggregate>;
  whitelisted_wallets_aggregate_bool_exp: Partial<Whitelisted_Wallets_Aggregate_Bool_Exp>;
  whitelisted_wallets_aggregate_bool_exp_count: Partial<Whitelisted_Wallets_Aggregate_Bool_Exp_Count>;
  whitelisted_wallets_aggregate_fields: Partial<Whitelisted_Wallets_Aggregate_Fields>;
  whitelisted_wallets_aggregate_order_by: Partial<Whitelisted_Wallets_Aggregate_Order_By>;
  whitelisted_wallets_arr_rel_insert_input: Partial<Whitelisted_Wallets_Arr_Rel_Insert_Input>;
  whitelisted_wallets_bool_exp: Partial<Whitelisted_Wallets_Bool_Exp>;
  whitelisted_wallets_insert_input: Partial<Whitelisted_Wallets_Insert_Input>;
  whitelisted_wallets_max_fields: Partial<Whitelisted_Wallets_Max_Fields>;
  whitelisted_wallets_max_order_by: Partial<Whitelisted_Wallets_Max_Order_By>;
  whitelisted_wallets_min_fields: Partial<Whitelisted_Wallets_Min_Fields>;
  whitelisted_wallets_min_order_by: Partial<Whitelisted_Wallets_Min_Order_By>;
  whitelisted_wallets_mutation_response: Partial<Whitelisted_Wallets_Mutation_Response>;
  whitelisted_wallets_on_conflict: Partial<Whitelisted_Wallets_On_Conflict>;
  whitelisted_wallets_order_by: Partial<Whitelisted_Wallets_Order_By>;
  whitelisted_wallets_set_input: Partial<Whitelisted_Wallets_Set_Input>;
  whitelisted_wallets_stream_cursor_input: Partial<Whitelisted_Wallets_Stream_Cursor_Input>;
  whitelisted_wallets_stream_cursor_value_input: Partial<Whitelisted_Wallets_Stream_Cursor_Value_Input>;
  whitelisted_wallets_updates: Partial<Whitelisted_Wallets_Updates>;
};

export type CachedDirectiveArgs = {
  refresh?: Scalars['Boolean'];
  ttl?: Scalars['Int'];
};

export type CachedDirectiveResolver<Result, Parent, ContextType = any, Args = CachedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AlgoliaSearchResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AlgoliaSearchResults'] = ResolversParentTypes['AlgoliaSearchResults']> = {
  hits?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApproveCredentialOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApproveCredentialOutput'] = ResolversParentTypes['ApproveCredentialOutput']> = {
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ClaimCredentialOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ClaimCredentialOutput'] = ResolversParentTypes['ClaimCredentialOutput']> = {
  admin_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  credential?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCodeOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCodeOutput'] = ResolversParentTypes['CreateCodeOutput']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LinkPreviewOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['LinkPreviewOutput'] = ResolversParentTypes['LinkPreviewOutput']> = {
  contentType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  favicons?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  mediaType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  siteName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  videos?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginOutput'] = ResolversParentTypes['LoginOutput']> = {
  refresh_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MintCredentialInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['MintCredentialInfo'] = ResolversParentTypes['MintCredentialInfo']> = {
  chain_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wallet?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MintCredentialOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['MintCredentialOutput'] = ResolversParentTypes['MintCredentialOutput']> = {
  info?: Resolver<ResolversTypes['MintCredentialInfo'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NonceOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['NonceOutput'] = ResolversParentTypes['NonceOutput']> = {
  nonce?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PublishGateOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublishGateOutput'] = ResolversParentTypes['PublishGateOutput']> = {
  gate?: Resolver<Maybe<ResolversTypes['gates']>, ParentType, ContextType>;
  gate_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  published?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RefreshOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RefreshOutput'] = ResolversParentTypes['RefreshOutput']> = {
  refresh_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RejectMtOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RejectMTOutput'] = ResolversParentTypes['RejectMTOutput']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResizeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Resize'] = ResolversParentTypes['Resize']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransformOptionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransformOptions'] = ResolversParentTypes['TransformOptions']> = {
  blur?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  q?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  resize?: Resolver<Maybe<ResolversTypes['Resize']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransformOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransformOutput'] = ResolversParentTypes['TransformOutput']> = {
  original_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transformed?: Resolver<Maybe<ResolversTypes['TransformedImage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransformedImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransformedImage'] = ResolversParentTypes['TransformedImage']> = {
  args?: Resolver<Maybe<ResolversTypes['TransformOptions']>, ParentType, ContextType>;
  base64?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TwitterPublicMetricsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TwitterPublicMetrics'] = ResolversParentTypes['TwitterPublicMetrics']> = {
  followers_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  following_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  listed_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  tweet_count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TwitterTweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['TwitterTweet'] = ResolversParentTypes['TwitterTweet']> = {
  author_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TwitterUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['TwitterUser'] = ResolversParentTypes['TwitterUser']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  profile_image_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  protected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  public_metrics?: Resolver<Maybe<ResolversTypes['TwitterPublicMetrics']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UploadOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UploadOutput'] = ResolversParentTypes['UploadOutput']> = {
  author_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  blur?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyCsvOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyCSVOutput'] = ResolversParentTypes['VerifyCSVOutput']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyCsvProgressOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyCSVProgressOutput'] = ResolversParentTypes['VerifyCSVProgressOutput']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  invalid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  invalidList?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  isDone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  uploadedTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  valid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  validList?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyCodeOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyCodeOutput'] = ResolversParentTypes['VerifyCodeOutput']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyOutput'] = ResolversParentTypes['VerifyOutput']> = {
  task_info?: Resolver<ResolversTypes['json'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface _TextScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_text'], any> {
  name: '_text';
}

export type Access_TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['access_tokens'] = ResolversParentTypes['access_tokens']> = {
  github_access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter_access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Access_Tokens_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['access_tokens_aggregate'] = ResolversParentTypes['access_tokens_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['access_tokens_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['access_tokens']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Access_Tokens_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['access_tokens_aggregate_fields'] = ResolversParentTypes['access_tokens_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Access_Tokens_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['access_tokens_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['access_tokens_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Access_Tokens_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['access_tokens_max_fields'] = ResolversParentTypes['access_tokens_max_fields']> = {
  github_access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter_access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Access_Tokens_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['access_tokens_min_fields'] = ResolversParentTypes['access_tokens_min_fields']> = {
  github_access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter_access_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Access_Tokens_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['access_tokens_mutation_response'] = ResolversParentTypes['access_tokens_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['access_tokens']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_CountResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count'] = ResolversParentTypes['all_credential_count']> = {
  count?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  gate?: Resolver<Maybe<ResolversTypes['gates']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_aggregate'] = ResolversParentTypes['all_credential_count_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['all_credential_count_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['all_credential_count']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_aggregate_fields'] = ResolversParentTypes['all_credential_count_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['all_credential_count_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<All_Credential_Count_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['all_credential_count_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['all_credential_count_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['all_credential_count_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['all_credential_count_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['all_credential_count_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['all_credential_count_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['all_credential_count_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['all_credential_count_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['all_credential_count_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_avg_fields'] = ResolversParentTypes['all_credential_count_avg_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_max_fields'] = ResolversParentTypes['all_credential_count_max_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_min_fields'] = ResolversParentTypes['all_credential_count_min_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_stddev_fields'] = ResolversParentTypes['all_credential_count_stddev_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_stddev_pop_fields'] = ResolversParentTypes['all_credential_count_stddev_pop_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_stddev_samp_fields'] = ResolversParentTypes['all_credential_count_stddev_samp_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_sum_fields'] = ResolversParentTypes['all_credential_count_sum_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_var_pop_fields'] = ResolversParentTypes['all_credential_count_var_pop_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_var_samp_fields'] = ResolversParentTypes['all_credential_count_var_samp_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type All_Credential_Count_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['all_credential_count_variance_fields'] = ResolversParentTypes['all_credential_count_variance_fields']> = {
  count?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigintScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['bigint'], any> {
  name: 'bigint';
}

export type BookmarksResolvers<ContextType = any, ParentType extends ResolversParentTypes['bookmarks'] = ResolversParentTypes['bookmarks']> = {
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  gate_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bookmarks_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['bookmarks_aggregate'] = ResolversParentTypes['bookmarks_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['bookmarks_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['bookmarks']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bookmarks_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['bookmarks_aggregate_fields'] = ResolversParentTypes['bookmarks_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Bookmarks_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['bookmarks_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['bookmarks_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bookmarks_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['bookmarks_max_fields'] = ResolversParentTypes['bookmarks_max_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bookmarks_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['bookmarks_min_fields'] = ResolversParentTypes['bookmarks_min_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bookmarks_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['bookmarks_mutation_response'] = ResolversParentTypes['bookmarks_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['bookmarks']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BountiesResolvers<ContextType = any, ParentType extends ResolversParentTypes['bounties'] = ResolversParentTypes['bounties']> = {
  categories?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  dao_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  directions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_date?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  headline?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  links?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  post_date?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  reward?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bounties_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['bounties_aggregate'] = ResolversParentTypes['bounties_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['bounties_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['bounties']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bounties_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['bounties_aggregate_fields'] = ResolversParentTypes['bounties_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Bounties_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['bounties_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['bounties_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bounties_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['bounties_max_fields'] = ResolversParentTypes['bounties_max_fields']> = {
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  directions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  headline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  reward?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bounties_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['bounties_min_fields'] = ResolversParentTypes['bounties_min_fields']> = {
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  directions?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  headline?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  post_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  reward?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Bounties_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['bounties_mutation_response'] = ResolversParentTypes['bounties_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['bounties']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface CitextScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['citext'], any> {
  name: 'citext';
}

export type Credential_GroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['credential_group'] = ResolversParentTypes['credential_group']> = {
  admin?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  admin_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wallets?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<Credential_GroupWalletsArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credential_Group_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['credential_group_aggregate'] = ResolversParentTypes['credential_group_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['credential_group_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['credential_group']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credential_Group_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['credential_group_aggregate_fields'] = ResolversParentTypes['credential_group_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Credential_Group_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['credential_group_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['credential_group_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credential_Group_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['credential_group_max_fields'] = ResolversParentTypes['credential_group_max_fields']> = {
  admin_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credential_Group_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['credential_group_min_fields'] = ResolversParentTypes['credential_group_min_fields']> = {
  admin_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credential_Group_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['credential_group_mutation_response'] = ResolversParentTypes['credential_group_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['credential_group']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Credential_StateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['credential_state'], any> {
  name: 'credential_state';
}

export type CredentialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['credentials'] = ResolversParentTypes['credentials']> = {
  admin_comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  attitudes?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<CredentialsAttitudesArgs>>;
  categories?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<CredentialsCategoriesArgs>>;
  ceramic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  credential_group?: Resolver<Maybe<ResolversTypes['credential_group']>, ParentType, ContextType>;
  dao?: Resolver<Maybe<ResolversTypes['daos']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  details?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<CredentialsDetailsArgs>>;
  gate?: Resolver<Maybe<ResolversTypes['gates']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  group_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  issuer?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  issuer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  knowledges?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<CredentialsKnowledgesArgs>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pow?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<CredentialsPowArgs>>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skills?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<CredentialsSkillsArgs>>;
  status?: Resolver<ResolversTypes['credential_state'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  target_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  transaction_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credentials_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['credentials_aggregate'] = ResolversParentTypes['credentials_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['credentials_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['credentials']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credentials_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['credentials_aggregate_fields'] = ResolversParentTypes['credentials_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Credentials_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['credentials_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['credentials_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credentials_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['credentials_max_fields'] = ResolversParentTypes['credentials_max_fields']> = {
  admin_comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ceramic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  group_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  issuer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  namespace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['credential_state']>, ParentType, ContextType>;
  target_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  transaction_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credentials_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['credentials_min_fields'] = ResolversParentTypes['credentials_min_fields']> = {
  admin_comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ceramic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  group_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  issuer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  namespace?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['credential_state']>, ParentType, ContextType>;
  target_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  transaction_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  uri?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Credentials_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['credentials_mutation_response'] = ResolversParentTypes['credentials_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['credentials']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_FollowingResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_following'] = ResolversParentTypes['dao_following']> = {
  dao?: Resolver<ResolversTypes['daos'], ParentType, ContextType>;
  dao_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  followed_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  follower_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['following_state'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Following_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_following_aggregate'] = ResolversParentTypes['dao_following_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['dao_following_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['dao_following']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Following_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_following_aggregate_fields'] = ResolversParentTypes['dao_following_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Dao_Following_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['dao_following_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['dao_following_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Following_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_following_max_fields'] = ResolversParentTypes['dao_following_max_fields']> = {
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  followed_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  follower_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['following_state']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Following_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_following_min_fields'] = ResolversParentTypes['dao_following_min_fields']> = {
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  followed_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  follower_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['following_state']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Following_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_following_mutation_response'] = ResolversParentTypes['dao_following_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['dao_following']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_SocialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_socials'] = ResolversParentTypes['dao_socials']> = {
  dao_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  network?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Socials_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_socials_aggregate'] = ResolversParentTypes['dao_socials_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['dao_socials_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['dao_socials']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Socials_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_socials_aggregate_fields'] = ResolversParentTypes['dao_socials_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Dao_Socials_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['dao_socials_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['dao_socials_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Socials_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_socials_max_fields'] = ResolversParentTypes['dao_socials_max_fields']> = {
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Socials_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_socials_min_fields'] = ResolversParentTypes['dao_socials_min_fields']> = {
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Dao_Socials_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['dao_socials_mutation_response'] = ResolversParentTypes['dao_socials_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['dao_socials']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaosResolvers<ContextType = any, ParentType extends ResolversParentTypes['daos'] = ResolversParentTypes['daos']> = {
  accomplishments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  background?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType>;
  background_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  background_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blacklisted_flags?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<DaosBlacklisted_FlagsArgs>>;
  bounties?: Resolver<Array<ResolversTypes['bounties']>, ParentType, ContextType, Partial<DaosBountiesArgs>>;
  bounties_aggregate?: Resolver<ResolversTypes['bounties_aggregate'], ParentType, ContextType, Partial<DaosBounties_AggregateArgs>>;
  categories?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<DaosCategoriesArgs>>;
  chains?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<DaosChainsArgs>>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  faq?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<DaosFaqArgs>>;
  followers?: Resolver<Array<ResolversTypes['dao_following']>, ParentType, ContextType, Partial<DaosFollowersArgs>>;
  followers_aggregate?: Resolver<ResolversTypes['dao_following_aggregate'], ParentType, ContextType, Partial<DaosFollowers_AggregateArgs>>;
  gates?: Resolver<Array<ResolversTypes['gates']>, ParentType, ContextType, Partial<DaosGatesArgs>>;
  gates_aggregate?: Resolver<ResolversTypes['gates_aggregate'], ParentType, ContextType, Partial<DaosGates_AggregateArgs>>;
  guild_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hangouts?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  how_to_join?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<DaosHow_To_JoinArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  is_admin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  logo?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType>;
  logo_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  logo_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mv?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<DaosMvArgs>>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['permissions']>, ParentType, ContextType, Partial<DaosPermissionsArgs>>;
  permissions_aggregate?: Resolver<ResolversTypes['permissions_aggregate'], ParentType, ContextType, Partial<DaosPermissions_AggregateArgs>>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socials?: Resolver<Array<ResolversTypes['dao_socials']>, ParentType, ContextType, Partial<DaosSocialsArgs>>;
  socials_aggregate?: Resolver<ResolversTypes['dao_socials_aggregate'], ParentType, ContextType, Partial<DaosSocials_AggregateArgs>>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token_benefits?: Resolver<Array<ResolversTypes['token_benefits']>, ParentType, ContextType, Partial<DaosToken_BenefitsArgs>>;
  token_benefits_aggregate?: Resolver<ResolversTypes['token_benefits_aggregate'], ParentType, ContextType, Partial<DaosToken_Benefits_AggregateArgs>>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  wdwd?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  whitelisted_flags?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<DaosWhitelisted_FlagsArgs>>;
  youtube_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Daos_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['daos_aggregate'] = ResolversParentTypes['daos_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['daos_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['daos']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Daos_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['daos_aggregate_fields'] = ResolversParentTypes['daos_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Daos_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['daos_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['daos_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Daos_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['daos_max_fields'] = ResolversParentTypes['daos_max_fields']> = {
  accomplishments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  background_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  background_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guild_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hangouts?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  logo_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  logo_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  wdwd?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Daos_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['daos_min_fields'] = ResolversParentTypes['daos_min_fields']> = {
  accomplishments?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  background_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  background_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  guild_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hangouts?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  logo_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  logo_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  wdwd?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Daos_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['daos_mutation_response'] = ResolversParentTypes['daos_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['daos']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EarnersResolvers<ContextType = any, ParentType extends ResolversParentTypes['earners'] = ResolversParentTypes['earners']> = {
  gate?: Resolver<ResolversTypes['gates'], ParentType, ContextType>;
  gate_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Earners_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['earners_aggregate'] = ResolversParentTypes['earners_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['earners_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['earners']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Earners_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['earners_aggregate_fields'] = ResolversParentTypes['earners_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Earners_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['earners_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['earners_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Earners_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['earners_max_fields'] = ResolversParentTypes['earners_max_fields']> = {
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Earners_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['earners_min_fields'] = ResolversParentTypes['earners_min_fields']> = {
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Earners_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['earners_mutation_response'] = ResolversParentTypes['earners_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['earners']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['email'], any> {
  name: 'email';
}

export type Email_SubscribersResolvers<ContextType = any, ParentType extends ResolversParentTypes['email_subscribers'] = ResolversParentTypes['email_subscribers']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['citext'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  subscribed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Email_Subscribers_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['email_subscribers_aggregate'] = ResolversParentTypes['email_subscribers_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['email_subscribers_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['email_subscribers']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Email_Subscribers_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['email_subscribers_aggregate_fields'] = ResolversParentTypes['email_subscribers_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Email_Subscribers_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['email_subscribers_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['email_subscribers_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Email_Subscribers_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['email_subscribers_max_fields'] = ResolversParentTypes['email_subscribers_max_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['citext']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Email_Subscribers_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['email_subscribers_min_fields'] = ResolversParentTypes['email_subscribers_min_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['citext']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Email_Subscribers_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['email_subscribers_mutation_response'] = ResolversParentTypes['email_subscribers_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['email_subscribers']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExperiencesResolvers<ContextType = any, ParentType extends ResolversParentTypes['experiences'] = ResolversParentTypes['experiences']> = {
  credentials?: Resolver<Maybe<Array<ResolversTypes['credentials']>>, ParentType, ContextType, Partial<ExperiencesCredentialsArgs>>;
  dao?: Resolver<Maybe<ResolversTypes['daos']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  hidden_credentials?: Resolver<Array<ResolversTypes['hidden_experience_credentials']>, ParentType, ContextType, Partial<ExperiencesHidden_CredentialsArgs>>;
  hidden_credentials_aggregate?: Resolver<ResolversTypes['hidden_experience_credentials_aggregate'], ParentType, ContextType, Partial<ExperiencesHidden_Credentials_AggregateArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  start_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  visible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  working?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Experiences_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['experiences_aggregate'] = ResolversParentTypes['experiences_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['experiences_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['experiences']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Experiences_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['experiences_aggregate_fields'] = ResolversParentTypes['experiences_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Experiences_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['experiences_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['experiences_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Experiences_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['experiences_max_fields'] = ResolversParentTypes['experiences_max_fields']> = {
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  start_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Experiences_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['experiences_min_fields'] = ResolversParentTypes['experiences_min_fields']> = {
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  end_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  start_date?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Experiences_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['experiences_mutation_response'] = ResolversParentTypes['experiences_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['experiences']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FilesResolvers<ContextType = any, ParentType extends ResolversParentTypes['files'] = ResolversParentTypes['files']> = {
  author_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  blur?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  metadata?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<FilesMetadataArgs>>;
  s3_key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Files_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['files_aggregate'] = ResolversParentTypes['files_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['files_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['files']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Files_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['files_aggregate_fields'] = ResolversParentTypes['files_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Files_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['files_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['files_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Files_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['files_max_fields'] = ResolversParentTypes['files_max_fields']> = {
  author_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  blur?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  s3_key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Files_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['files_min_fields'] = ResolversParentTypes['files_min_fields']> = {
  author_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  blur?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  s3_key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Files_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['files_mutation_response'] = ResolversParentTypes['files_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['files']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Following_StateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['following_state'], any> {
  name: 'following_state';
}

export type Gate_ProgressResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress'] = ResolversParentTypes['gate_progress']> = {
  completed_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  gate?: Resolver<ResolversTypes['gates'], ParentType, ContextType>;
  gate_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['gate_status'], ParentType, ContextType>;
  tasks_completed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_aggregate'] = ResolversParentTypes['gate_progress_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['gate_progress_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['gate_progress']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_aggregate_fields'] = ResolversParentTypes['gate_progress_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['gate_progress_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Gate_Progress_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['gate_progress_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['gate_progress_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['gate_progress_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['gate_progress_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['gate_progress_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['gate_progress_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['gate_progress_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['gate_progress_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['gate_progress_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_avg_fields'] = ResolversParentTypes['gate_progress_avg_fields']> = {
  tasks_completed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_max_fields'] = ResolversParentTypes['gate_progress_max_fields']> = {
  completed_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['gate_status']>, ParentType, ContextType>;
  tasks_completed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_min_fields'] = ResolversParentTypes['gate_progress_min_fields']> = {
  completed_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['gate_status']>, ParentType, ContextType>;
  tasks_completed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_mutation_response'] = ResolversParentTypes['gate_progress_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['gate_progress']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_stddev_fields'] = ResolversParentTypes['gate_progress_stddev_fields']> = {
  tasks_completed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_stddev_pop_fields'] = ResolversParentTypes['gate_progress_stddev_pop_fields']> = {
  tasks_completed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_stddev_samp_fields'] = ResolversParentTypes['gate_progress_stddev_samp_fields']> = {
  tasks_completed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_sum_fields'] = ResolversParentTypes['gate_progress_sum_fields']> = {
  tasks_completed?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_var_pop_fields'] = ResolversParentTypes['gate_progress_var_pop_fields']> = {
  tasks_completed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_var_samp_fields'] = ResolversParentTypes['gate_progress_var_samp_fields']> = {
  tasks_completed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gate_Progress_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gate_progress_variance_fields'] = ResolversParentTypes['gate_progress_variance_fields']> = {
  tasks_completed?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Gate_StateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['gate_state'], any> {
  name: 'gate_state';
}

export interface Gate_StatusScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['gate_status'], any> {
  name: 'gate_status';
}

export interface Gate_TypeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['gate_type'], any> {
  name: 'gate_type';
}

export type GatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates'] = ResolversParentTypes['gates']> = {
  attitudes?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<GatesAttitudesArgs>>;
  categories?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<GatesCategoriesArgs>>;
  claim_limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  dao?: Resolver<ResolversTypes['daos'], ParentType, ContextType>;
  dao_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  earners?: Resolver<Array<ResolversTypes['earners']>, ParentType, ContextType, Partial<GatesEarnersArgs>>;
  earners_aggregate?: Resolver<ResolversTypes['earners_aggregate'], ParentType, ContextType, Partial<GatesEarners_AggregateArgs>>;
  expire_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  holder_count?: Resolver<Maybe<ResolversTypes['bigint']>, ParentType, ContextType>;
  holders?: Resolver<Maybe<Array<ResolversTypes['users']>>, ParentType, ContextType, Partial<GatesHoldersArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  knowledge?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<GatesKnowledgeArgs>>;
  links?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<GatesLinksArgs>>;
  permissions?: Resolver<Array<ResolversTypes['permissions']>, ParentType, ContextType, Partial<GatesPermissionsArgs>>;
  permissions_aggregate?: Resolver<ResolversTypes['permissions_aggregate'], ParentType, ContextType, Partial<GatesPermissions_AggregateArgs>>;
  published?: Resolver<ResolversTypes['gate_state'], ParentType, ContextType>;
  published_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  skills?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, Partial<GatesSkillsArgs>>;
  tasks?: Resolver<Array<ResolversTypes['tasks']>, ParentType, ContextType, Partial<GatesTasksArgs>>;
  tasks_aggregate?: Resolver<ResolversTypes['tasks_aggregate'], ParentType, ContextType, Partial<GatesTasks_AggregateArgs>>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['gate_type'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  whitelisted_wallets?: Resolver<Array<ResolversTypes['whitelisted_wallets']>, ParentType, ContextType, Partial<GatesWhitelisted_WalletsArgs>>;
  whitelisted_wallets_aggregate?: Resolver<ResolversTypes['whitelisted_wallets_aggregate'], ParentType, ContextType, Partial<GatesWhitelisted_Wallets_AggregateArgs>>;
  whitelisted_wallets_file?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType>;
  whitelisted_wallets_file_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_aggregate'] = ResolversParentTypes['gates_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['gates_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['gates']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_aggregate_fields'] = ResolversParentTypes['gates_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['gates_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Gates_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['gates_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['gates_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['gates_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['gates_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['gates_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['gates_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['gates_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['gates_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['gates_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_avg_fields'] = ResolversParentTypes['gates_avg_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_max_fields'] = ResolversParentTypes['gates_max_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expire_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['gate_state']>, ParentType, ContextType>;
  published_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['gate_type']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  whitelisted_wallets_file_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_min_fields'] = ResolversParentTypes['gates_min_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  creator_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  expire_date?: Resolver<Maybe<ResolversTypes['timestamptz']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  published?: Resolver<Maybe<ResolversTypes['gate_state']>, ParentType, ContextType>;
  published_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['gate_type']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  whitelisted_wallets_file_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_mutation_response'] = ResolversParentTypes['gates_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['gates']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_stddev_fields'] = ResolversParentTypes['gates_stddev_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_stddev_pop_fields'] = ResolversParentTypes['gates_stddev_pop_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_stddev_samp_fields'] = ResolversParentTypes['gates_stddev_samp_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_sum_fields'] = ResolversParentTypes['gates_sum_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_var_pop_fields'] = ResolversParentTypes['gates_var_pop_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_var_samp_fields'] = ResolversParentTypes['gates_var_samp_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Gates_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['gates_variance_fields'] = ResolversParentTypes['gates_variance_fields']> = {
  claim_limit?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Hidden_Experience_CredentialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['hidden_experience_credentials'] = ResolversParentTypes['hidden_experience_credentials']> = {
  credential?: Resolver<ResolversTypes['credentials'], ParentType, ContextType>;
  credential_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  experience?: Resolver<ResolversTypes['experiences'], ParentType, ContextType>;
  experience_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Hidden_Experience_Credentials_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['hidden_experience_credentials_aggregate'] = ResolversParentTypes['hidden_experience_credentials_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['hidden_experience_credentials_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['hidden_experience_credentials']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Hidden_Experience_Credentials_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['hidden_experience_credentials_aggregate_fields'] = ResolversParentTypes['hidden_experience_credentials_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Hidden_Experience_Credentials_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['hidden_experience_credentials_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['hidden_experience_credentials_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Hidden_Experience_Credentials_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['hidden_experience_credentials_max_fields'] = ResolversParentTypes['hidden_experience_credentials_max_fields']> = {
  credential_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  experience_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Hidden_Experience_Credentials_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['hidden_experience_credentials_min_fields'] = ResolversParentTypes['hidden_experience_credentials_min_fields']> = {
  credential_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  experience_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Hidden_Experience_Credentials_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['hidden_experience_credentials_mutation_response'] = ResolversParentTypes['hidden_experience_credentials_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['hidden_experience_credentials']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['json'], any> {
  name: 'json';
}

export interface JsonbScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['jsonb'], any> {
  name: 'jsonb';
}

export interface Key_StatusScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['key_status'], any> {
  name: 'key_status';
}

export interface Manual_Task_Event_TypeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['manual_task_event_type'], any> {
  name: 'manual_task_event_type';
}

export type Manual_Task_EventsResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_events'] = ResolversParentTypes['manual_task_events']> = {
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<Manual_Task_EventsDataArgs>>;
  event_type?: Resolver<ResolversTypes['manual_task_event_type'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  issuer?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  issuer_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  task_progress?: Resolver<ResolversTypes['task_progress'], ParentType, ContextType>;
  task_progress_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Events_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_events_aggregate'] = ResolversParentTypes['manual_task_events_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['manual_task_events_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['manual_task_events']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Events_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_events_aggregate_fields'] = ResolversParentTypes['manual_task_events_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Manual_Task_Events_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['manual_task_events_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['manual_task_events_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Events_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_events_max_fields'] = ResolversParentTypes['manual_task_events_max_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  event_type?: Resolver<Maybe<ResolversTypes['manual_task_event_type']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  issuer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  task_progress_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Events_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_events_min_fields'] = ResolversParentTypes['manual_task_events_min_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  event_type?: Resolver<Maybe<ResolversTypes['manual_task_event_type']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  issuer_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  task_progress_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Events_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_events_mutation_response'] = ResolversParentTypes['manual_task_events_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['manual_task_events']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_SubmissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_submission'] = ResolversParentTypes['manual_task_submission']> = {
  admin?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType>;
  admin_comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admin_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['submission_state'], ParentType, ContextType>;
  submission_url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  task_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  wallet?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Submission_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_submission_aggregate'] = ResolversParentTypes['manual_task_submission_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['manual_task_submission_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['manual_task_submission']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Submission_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_submission_aggregate_fields'] = ResolversParentTypes['manual_task_submission_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Manual_Task_Submission_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['manual_task_submission_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['manual_task_submission_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Submission_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_submission_max_fields'] = ResolversParentTypes['manual_task_submission_max_fields']> = {
  admin_comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admin_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['submission_state']>, ParentType, ContextType>;
  submission_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  task_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Submission_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_submission_min_fields'] = ResolversParentTypes['manual_task_submission_min_fields']> = {
  admin_comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  admin_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  comment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['submission_state']>, ParentType, ContextType>;
  submission_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  task_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Manual_Task_Submission_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['manual_task_submission_mutation_response'] = ResolversParentTypes['manual_task_submission_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['manual_task_submission']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Mutation_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['mutation_root'] = ResolversParentTypes['mutation_root']> = {
  approve_credential?: Resolver<Maybe<ResolversTypes['ApproveCredentialOutput']>, ParentType, ContextType, RequireFields<Mutation_RootApprove_CredentialArgs, 'comment' | 'credential_id'>>;
  approve_manual_task?: Resolver<Maybe<ResolversTypes['VerifyOutput']>, ParentType, ContextType, RequireFields<Mutation_RootApprove_Manual_TaskArgs, 'input'>>;
  claim_credential?: Resolver<Maybe<ResolversTypes['ClaimCredentialOutput']>, ParentType, ContextType, RequireFields<Mutation_RootClaim_CredentialArgs, 'group_id'>>;
  complete_gate?: Resolver<ResolversTypes['jsonb'], ParentType, ContextType, RequireFields<Mutation_RootComplete_GateArgs, 'gate_id' | 'recaptcha'>>;
  create_code?: Resolver<Maybe<ResolversTypes['CreateCodeOutput']>, ParentType, ContextType, RequireFields<Mutation_RootCreate_CodeArgs, 'email' | 'user_id'>>;
  delete_access_tokens?: Resolver<Maybe<ResolversTypes['access_tokens_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Access_TokensArgs, 'where'>>;
  delete_bookmarks?: Resolver<Maybe<ResolversTypes['bookmarks_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_BookmarksArgs, 'where'>>;
  delete_bounties?: Resolver<Maybe<ResolversTypes['bounties_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_BountiesArgs, 'where'>>;
  delete_bounties_by_pk?: Resolver<Maybe<ResolversTypes['bounties']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Bounties_By_PkArgs, 'id'>>;
  delete_credential_group?: Resolver<Maybe<ResolversTypes['credential_group_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Credential_GroupArgs, 'where'>>;
  delete_credential_group_by_pk?: Resolver<Maybe<ResolversTypes['credential_group']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Credential_Group_By_PkArgs, 'id'>>;
  delete_credentials?: Resolver<Maybe<ResolversTypes['credentials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_CredentialsArgs, 'where'>>;
  delete_credentials_by_pk?: Resolver<Maybe<ResolversTypes['credentials']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Credentials_By_PkArgs, 'id'>>;
  delete_dao_following?: Resolver<Maybe<ResolversTypes['dao_following_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Dao_FollowingArgs, 'where'>>;
  delete_dao_socials?: Resolver<Maybe<ResolversTypes['dao_socials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Dao_SocialsArgs, 'where'>>;
  delete_daos?: Resolver<Maybe<ResolversTypes['daos_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_DaosArgs, 'where'>>;
  delete_daos_by_pk?: Resolver<Maybe<ResolversTypes['daos']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Daos_By_PkArgs, 'id'>>;
  delete_earners?: Resolver<Maybe<ResolversTypes['earners_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_EarnersArgs, 'where'>>;
  delete_earners_by_pk?: Resolver<Maybe<ResolversTypes['earners']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Earners_By_PkArgs, 'id'>>;
  delete_email_subscribers?: Resolver<Maybe<ResolversTypes['email_subscribers_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Email_SubscribersArgs, 'where'>>;
  delete_email_subscribers_by_pk?: Resolver<Maybe<ResolversTypes['email_subscribers']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Email_Subscribers_By_PkArgs, 'id'>>;
  delete_experiences?: Resolver<Maybe<ResolversTypes['experiences_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_ExperiencesArgs, 'where'>>;
  delete_files?: Resolver<Maybe<ResolversTypes['files_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_FilesArgs, 'where'>>;
  delete_files_by_pk?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Files_By_PkArgs, 'id'>>;
  delete_gate_progress?: Resolver<Maybe<ResolversTypes['gate_progress_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Gate_ProgressArgs, 'where'>>;
  delete_gate_progress_by_pk?: Resolver<Maybe<ResolversTypes['gate_progress']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Gate_Progress_By_PkArgs, 'id'>>;
  delete_gates?: Resolver<Maybe<ResolversTypes['gates_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_GatesArgs, 'where'>>;
  delete_gates_by_pk?: Resolver<Maybe<ResolversTypes['gates']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Gates_By_PkArgs, 'id'>>;
  delete_hidden_experience_credentials?: Resolver<Maybe<ResolversTypes['hidden_experience_credentials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Hidden_Experience_CredentialsArgs, 'where'>>;
  delete_manual_task_events?: Resolver<Maybe<ResolversTypes['manual_task_events_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Manual_Task_EventsArgs, 'where'>>;
  delete_manual_task_events_by_pk?: Resolver<Maybe<ResolversTypes['manual_task_events']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Manual_Task_Events_By_PkArgs, 'id'>>;
  delete_manual_task_submission?: Resolver<Maybe<ResolversTypes['manual_task_submission_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Manual_Task_SubmissionArgs, 'where'>>;
  delete_manual_task_submission_by_pk?: Resolver<Maybe<ResolversTypes['manual_task_submission']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Manual_Task_Submission_By_PkArgs, 'id'>>;
  delete_permissions?: Resolver<Maybe<ResolversTypes['permissions_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_PermissionsArgs, 'where'>>;
  delete_permissions_by_pk?: Resolver<Maybe<ResolversTypes['permissions']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Permissions_By_PkArgs, 'id'>>;
  delete_task_progress?: Resolver<Maybe<ResolversTypes['task_progress_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Task_ProgressArgs, 'where'>>;
  delete_task_progress_by_pk?: Resolver<Maybe<ResolversTypes['task_progress']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Task_Progress_By_PkArgs, 'id'>>;
  delete_tasks?: Resolver<Maybe<ResolversTypes['tasks_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_TasksArgs, 'where'>>;
  delete_tasks_by_pk?: Resolver<Maybe<ResolversTypes['tasks']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Tasks_By_PkArgs, 'id'>>;
  delete_token_benefits?: Resolver<Maybe<ResolversTypes['token_benefits_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Token_BenefitsArgs, 'where'>>;
  delete_token_benefits_by_pk?: Resolver<Maybe<ResolversTypes['token_benefits']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Token_Benefits_By_PkArgs, 'id'>>;
  delete_user_following?: Resolver<Maybe<ResolversTypes['user_following_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_User_FollowingArgs, 'where'>>;
  delete_user_socials?: Resolver<Maybe<ResolversTypes['user_socials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_User_SocialsArgs, 'where'>>;
  delete_users?: Resolver<Maybe<ResolversTypes['users_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_UsersArgs, 'where'>>;
  delete_users_by_pk?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Users_By_PkArgs, 'id'>>;
  delete_whitelisted_wallets?: Resolver<Maybe<ResolversTypes['whitelisted_wallets_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootDelete_Whitelisted_WalletsArgs, 'where'>>;
  follow_dao?: Resolver<Maybe<ResolversTypes['dao_following']>, ParentType, ContextType, RequireFields<Mutation_RootFollow_DaoArgs, 'args'>>;
  follow_user?: Resolver<Maybe<ResolversTypes['user_following']>, ParentType, ContextType, RequireFields<Mutation_RootFollow_UserArgs, 'args'>>;
  insert_access_tokens?: Resolver<Maybe<ResolversTypes['access_tokens_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Access_TokensArgs, 'objects'>>;
  insert_access_tokens_one?: Resolver<Maybe<ResolversTypes['access_tokens']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Access_Tokens_OneArgs, 'object'>>;
  insert_bookmarks?: Resolver<Maybe<ResolversTypes['bookmarks_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_BookmarksArgs, 'objects'>>;
  insert_bookmarks_one?: Resolver<Maybe<ResolversTypes['bookmarks']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Bookmarks_OneArgs, 'object'>>;
  insert_bounties?: Resolver<Maybe<ResolversTypes['bounties_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_BountiesArgs, 'objects'>>;
  insert_bounties_one?: Resolver<Maybe<ResolversTypes['bounties']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Bounties_OneArgs, 'object'>>;
  insert_credential_group?: Resolver<Maybe<ResolversTypes['credential_group_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Credential_GroupArgs, 'objects'>>;
  insert_credential_group_one?: Resolver<Maybe<ResolversTypes['credential_group']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Credential_Group_OneArgs, 'object'>>;
  insert_credentials?: Resolver<Maybe<ResolversTypes['credentials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_CredentialsArgs, 'objects'>>;
  insert_credentials_one?: Resolver<Maybe<ResolversTypes['credentials']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Credentials_OneArgs, 'object'>>;
  insert_dao_following?: Resolver<Maybe<ResolversTypes['dao_following_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Dao_FollowingArgs, 'objects'>>;
  insert_dao_following_one?: Resolver<Maybe<ResolversTypes['dao_following']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Dao_Following_OneArgs, 'object'>>;
  insert_dao_socials?: Resolver<Maybe<ResolversTypes['dao_socials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Dao_SocialsArgs, 'objects'>>;
  insert_dao_socials_one?: Resolver<Maybe<ResolversTypes['dao_socials']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Dao_Socials_OneArgs, 'object'>>;
  insert_daos?: Resolver<Maybe<ResolversTypes['daos_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_DaosArgs, 'objects'>>;
  insert_daos_one?: Resolver<Maybe<ResolversTypes['daos']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Daos_OneArgs, 'object'>>;
  insert_earners?: Resolver<Maybe<ResolversTypes['earners_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_EarnersArgs, 'objects'>>;
  insert_earners_one?: Resolver<Maybe<ResolversTypes['earners']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Earners_OneArgs, 'object'>>;
  insert_email_subscribers?: Resolver<Maybe<ResolversTypes['email_subscribers_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Email_SubscribersArgs, 'objects'>>;
  insert_email_subscribers_one?: Resolver<Maybe<ResolversTypes['email_subscribers']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Email_Subscribers_OneArgs, 'object'>>;
  insert_experiences?: Resolver<Maybe<ResolversTypes['experiences_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_ExperiencesArgs, 'objects'>>;
  insert_experiences_one?: Resolver<Maybe<ResolversTypes['experiences']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Experiences_OneArgs, 'object'>>;
  insert_files?: Resolver<Maybe<ResolversTypes['files_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_FilesArgs, 'objects'>>;
  insert_files_one?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Files_OneArgs, 'object'>>;
  insert_gate_progress?: Resolver<Maybe<ResolversTypes['gate_progress_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Gate_ProgressArgs, 'objects'>>;
  insert_gate_progress_one?: Resolver<Maybe<ResolversTypes['gate_progress']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Gate_Progress_OneArgs, 'object'>>;
  insert_gates?: Resolver<Maybe<ResolversTypes['gates_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_GatesArgs, 'objects'>>;
  insert_gates_one?: Resolver<Maybe<ResolversTypes['gates']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Gates_OneArgs, 'object'>>;
  insert_hidden_experience_credentials?: Resolver<Maybe<ResolversTypes['hidden_experience_credentials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Hidden_Experience_CredentialsArgs, 'objects'>>;
  insert_hidden_experience_credentials_one?: Resolver<Maybe<ResolversTypes['hidden_experience_credentials']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Hidden_Experience_Credentials_OneArgs, 'object'>>;
  insert_manual_task_events?: Resolver<Maybe<ResolversTypes['manual_task_events_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manual_Task_EventsArgs, 'objects'>>;
  insert_manual_task_events_one?: Resolver<Maybe<ResolversTypes['manual_task_events']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manual_Task_Events_OneArgs, 'object'>>;
  insert_manual_task_submission?: Resolver<Maybe<ResolversTypes['manual_task_submission_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manual_Task_SubmissionArgs, 'objects'>>;
  insert_manual_task_submission_one?: Resolver<Maybe<ResolversTypes['manual_task_submission']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Manual_Task_Submission_OneArgs, 'object'>>;
  insert_permissions?: Resolver<Maybe<ResolversTypes['permissions_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_PermissionsArgs, 'objects'>>;
  insert_permissions_one?: Resolver<Maybe<ResolversTypes['permissions']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Permissions_OneArgs, 'object'>>;
  insert_task_progress?: Resolver<Maybe<ResolversTypes['task_progress_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Task_ProgressArgs, 'objects'>>;
  insert_task_progress_one?: Resolver<Maybe<ResolversTypes['task_progress']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Task_Progress_OneArgs, 'object'>>;
  insert_tasks?: Resolver<Maybe<ResolversTypes['tasks_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_TasksArgs, 'objects'>>;
  insert_tasks_one?: Resolver<Maybe<ResolversTypes['tasks']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Tasks_OneArgs, 'object'>>;
  insert_token_benefits?: Resolver<Maybe<ResolversTypes['token_benefits_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Token_BenefitsArgs, 'objects'>>;
  insert_token_benefits_one?: Resolver<Maybe<ResolversTypes['token_benefits']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Token_Benefits_OneArgs, 'object'>>;
  insert_user_following?: Resolver<Maybe<ResolversTypes['user_following_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_User_FollowingArgs, 'objects'>>;
  insert_user_following_one?: Resolver<Maybe<ResolversTypes['user_following']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_User_Following_OneArgs, 'object'>>;
  insert_user_socials?: Resolver<Maybe<ResolversTypes['user_socials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_User_SocialsArgs, 'objects'>>;
  insert_user_socials_one?: Resolver<Maybe<ResolversTypes['user_socials']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_User_Socials_OneArgs, 'object'>>;
  insert_users?: Resolver<Maybe<ResolversTypes['users_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_UsersArgs, 'objects'>>;
  insert_users_one?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Users_OneArgs, 'object'>>;
  insert_whitelisted_wallets?: Resolver<Maybe<ResolversTypes['whitelisted_wallets_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Whitelisted_WalletsArgs, 'objects'>>;
  insert_whitelisted_wallets_one?: Resolver<Maybe<ResolversTypes['whitelisted_wallets']>, ParentType, ContextType, RequireFields<Mutation_RootInsert_Whitelisted_Wallets_OneArgs, 'object'>>;
  link_preview?: Resolver<Maybe<ResolversTypes['LinkPreviewOutput']>, ParentType, ContextType, RequireFields<Mutation_RootLink_PreviewArgs, 'url'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginOutput']>, ParentType, ContextType, RequireFields<Mutation_RootLoginArgs, 'signature' | 'wallet'>>;
  mint_credential?: Resolver<Maybe<ResolversTypes['MintCredentialOutput']>, ParentType, ContextType, RequireFields<Mutation_RootMint_CredentialArgs, 'credential_id'>>;
  publish_gate?: Resolver<Maybe<ResolversTypes['PublishGateOutput']>, ParentType, ContextType, RequireFields<Mutation_RootPublish_GateArgs, 'gate_id'>>;
  refresh?: Resolver<Maybe<ResolversTypes['RefreshOutput']>, ParentType, ContextType, Partial<Mutation_RootRefreshArgs>>;
  reject_credential?: Resolver<Maybe<ResolversTypes['ApproveCredentialOutput']>, ParentType, ContextType, RequireFields<Mutation_RootReject_CredentialArgs, 'comment' | 'credential_id'>>;
  reject_manual_task?: Resolver<Maybe<ResolversTypes['RejectMTOutput']>, ParentType, ContextType, RequireFields<Mutation_RootReject_Manual_TaskArgs, 'input'>>;
  revoke?: Resolver<Maybe<ResolversTypes['LoginOutput']>, ParentType, ContextType, RequireFields<Mutation_RootRevokeArgs, 'token'>>;
  subscribe_to_newsletter?: Resolver<Maybe<ResolversTypes['email_subscribers']>, ParentType, ContextType, RequireFields<Mutation_RootSubscribe_To_NewsletterArgs, 'args'>>;
  unfollow_dao?: Resolver<Maybe<ResolversTypes['dao_following']>, ParentType, ContextType, RequireFields<Mutation_RootUnfollow_DaoArgs, 'args'>>;
  unfollow_user?: Resolver<Maybe<ResolversTypes['user_following']>, ParentType, ContextType, RequireFields<Mutation_RootUnfollow_UserArgs, 'args'>>;
  unsubscribe_to_newsletter?: Resolver<Maybe<ResolversTypes['email_subscribers']>, ParentType, ContextType, RequireFields<Mutation_RootUnsubscribe_To_NewsletterArgs, 'args'>>;
  update_access_tokens?: Resolver<Maybe<ResolversTypes['access_tokens_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Access_TokensArgs, 'where'>>;
  update_access_tokens_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['access_tokens_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Access_Tokens_ManyArgs, 'updates'>>;
  update_bookmarks?: Resolver<Maybe<ResolversTypes['bookmarks_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_BookmarksArgs, 'where'>>;
  update_bookmarks_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['bookmarks_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Bookmarks_ManyArgs, 'updates'>>;
  update_bounties?: Resolver<Maybe<ResolversTypes['bounties_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_BountiesArgs, 'where'>>;
  update_bounties_by_pk?: Resolver<Maybe<ResolversTypes['bounties']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Bounties_By_PkArgs, 'pk_columns'>>;
  update_bounties_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['bounties_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Bounties_ManyArgs, 'updates'>>;
  update_credential_group?: Resolver<Maybe<ResolversTypes['credential_group_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Credential_GroupArgs, 'where'>>;
  update_credential_group_by_pk?: Resolver<Maybe<ResolversTypes['credential_group']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Credential_Group_By_PkArgs, 'pk_columns'>>;
  update_credential_group_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['credential_group_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Credential_Group_ManyArgs, 'updates'>>;
  update_credentials?: Resolver<Maybe<ResolversTypes['credentials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_CredentialsArgs, 'where'>>;
  update_credentials_by_pk?: Resolver<Maybe<ResolversTypes['credentials']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Credentials_By_PkArgs, 'pk_columns'>>;
  update_credentials_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['credentials_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Credentials_ManyArgs, 'updates'>>;
  update_dao_following?: Resolver<Maybe<ResolversTypes['dao_following_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Dao_FollowingArgs, 'where'>>;
  update_dao_following_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['dao_following_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Dao_Following_ManyArgs, 'updates'>>;
  update_dao_socials?: Resolver<Maybe<ResolversTypes['dao_socials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Dao_SocialsArgs, 'where'>>;
  update_dao_socials_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['dao_socials_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Dao_Socials_ManyArgs, 'updates'>>;
  update_daos?: Resolver<Maybe<ResolversTypes['daos_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_DaosArgs, 'where'>>;
  update_daos_by_pk?: Resolver<Maybe<ResolversTypes['daos']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Daos_By_PkArgs, 'pk_columns'>>;
  update_daos_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['daos_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Daos_ManyArgs, 'updates'>>;
  update_earners?: Resolver<Maybe<ResolversTypes['earners_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_EarnersArgs, 'where'>>;
  update_earners_by_pk?: Resolver<Maybe<ResolversTypes['earners']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Earners_By_PkArgs, 'pk_columns'>>;
  update_earners_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['earners_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Earners_ManyArgs, 'updates'>>;
  update_email_subscribers?: Resolver<Maybe<ResolversTypes['email_subscribers_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Email_SubscribersArgs, 'where'>>;
  update_email_subscribers_by_pk?: Resolver<Maybe<ResolversTypes['email_subscribers']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Email_Subscribers_By_PkArgs, 'pk_columns'>>;
  update_email_subscribers_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['email_subscribers_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Email_Subscribers_ManyArgs, 'updates'>>;
  update_experiences?: Resolver<Maybe<ResolversTypes['experiences_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_ExperiencesArgs, 'where'>>;
  update_experiences_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['experiences_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Experiences_ManyArgs, 'updates'>>;
  update_files?: Resolver<Maybe<ResolversTypes['files_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_FilesArgs, 'where'>>;
  update_files_by_pk?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Files_By_PkArgs, 'pk_columns'>>;
  update_files_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['files_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Files_ManyArgs, 'updates'>>;
  update_gate_progress?: Resolver<Maybe<ResolversTypes['gate_progress_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Gate_ProgressArgs, 'where'>>;
  update_gate_progress_by_pk?: Resolver<Maybe<ResolversTypes['gate_progress']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Gate_Progress_By_PkArgs, 'pk_columns'>>;
  update_gate_progress_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['gate_progress_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Gate_Progress_ManyArgs, 'updates'>>;
  update_gates?: Resolver<Maybe<ResolversTypes['gates_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_GatesArgs, 'where'>>;
  update_gates_by_pk?: Resolver<Maybe<ResolversTypes['gates']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Gates_By_PkArgs, 'pk_columns'>>;
  update_gates_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['gates_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Gates_ManyArgs, 'updates'>>;
  update_hidden_experience_credentials?: Resolver<Maybe<ResolversTypes['hidden_experience_credentials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Hidden_Experience_CredentialsArgs, 'where'>>;
  update_hidden_experience_credentials_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['hidden_experience_credentials_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Hidden_Experience_Credentials_ManyArgs, 'updates'>>;
  update_manual_task_events?: Resolver<Maybe<ResolversTypes['manual_task_events_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manual_Task_EventsArgs, 'where'>>;
  update_manual_task_events_by_pk?: Resolver<Maybe<ResolversTypes['manual_task_events']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manual_Task_Events_By_PkArgs, 'pk_columns'>>;
  update_manual_task_events_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['manual_task_events_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manual_Task_Events_ManyArgs, 'updates'>>;
  update_manual_task_submission?: Resolver<Maybe<ResolversTypes['manual_task_submission_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manual_Task_SubmissionArgs, 'where'>>;
  update_manual_task_submission_by_pk?: Resolver<Maybe<ResolversTypes['manual_task_submission']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manual_Task_Submission_By_PkArgs, 'pk_columns'>>;
  update_manual_task_submission_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['manual_task_submission_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Manual_Task_Submission_ManyArgs, 'updates'>>;
  update_permissions?: Resolver<Maybe<ResolversTypes['permissions_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_PermissionsArgs, 'where'>>;
  update_permissions_by_pk?: Resolver<Maybe<ResolversTypes['permissions']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Permissions_By_PkArgs, 'pk_columns'>>;
  update_permissions_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['permissions_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Permissions_ManyArgs, 'updates'>>;
  update_task_progress?: Resolver<Maybe<ResolversTypes['task_progress_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Task_ProgressArgs, 'where'>>;
  update_task_progress_by_pk?: Resolver<Maybe<ResolversTypes['task_progress']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Task_Progress_By_PkArgs, 'pk_columns'>>;
  update_task_progress_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['task_progress_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Task_Progress_ManyArgs, 'updates'>>;
  update_tasks?: Resolver<Maybe<ResolversTypes['tasks_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_TasksArgs, 'where'>>;
  update_tasks_by_pk?: Resolver<Maybe<ResolversTypes['tasks']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Tasks_By_PkArgs, 'pk_columns'>>;
  update_tasks_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['tasks_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Tasks_ManyArgs, 'updates'>>;
  update_token_benefits?: Resolver<Maybe<ResolversTypes['token_benefits_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Token_BenefitsArgs, 'where'>>;
  update_token_benefits_by_pk?: Resolver<Maybe<ResolversTypes['token_benefits']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Token_Benefits_By_PkArgs, 'pk_columns'>>;
  update_token_benefits_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['token_benefits_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Token_Benefits_ManyArgs, 'updates'>>;
  update_user_following?: Resolver<Maybe<ResolversTypes['user_following_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_User_FollowingArgs, 'where'>>;
  update_user_following_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_following_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_User_Following_ManyArgs, 'updates'>>;
  update_user_socials?: Resolver<Maybe<ResolversTypes['user_socials_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_User_SocialsArgs, 'where'>>;
  update_user_socials_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['user_socials_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_User_Socials_ManyArgs, 'updates'>>;
  update_users?: Resolver<Maybe<ResolversTypes['users_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_UsersArgs, 'where'>>;
  update_users_by_pk?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Users_By_PkArgs, 'pk_columns'>>;
  update_users_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['users_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Users_ManyArgs, 'updates'>>;
  update_whitelisted_wallets?: Resolver<Maybe<ResolversTypes['whitelisted_wallets_mutation_response']>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Whitelisted_WalletsArgs, 'where'>>;
  update_whitelisted_wallets_many?: Resolver<Maybe<Array<Maybe<ResolversTypes['whitelisted_wallets_mutation_response']>>>, ParentType, ContextType, RequireFields<Mutation_RootUpdate_Whitelisted_Wallets_ManyArgs, 'updates'>>;
  upload_image?: Resolver<Maybe<ResolversTypes['UploadOutput']>, ParentType, ContextType, RequireFields<Mutation_RootUpload_ImageArgs, 'base64' | 'metadata'>>;
  verify_code?: Resolver<Maybe<ResolversTypes['VerifyCodeOutput']>, ParentType, ContextType, RequireFields<Mutation_RootVerify_CodeArgs, 'code' | 'email' | 'user_id'>>;
  verify_csv?: Resolver<Maybe<ResolversTypes['VerifyCSVOutput']>, ParentType, ContextType, RequireFields<Mutation_RootVerify_CsvArgs, 'id'>>;
  verify_key?: Resolver<Maybe<ResolversTypes['VerifyOutput']>, ParentType, ContextType, Partial<Mutation_RootVerify_KeyArgs>>;
};

export interface Permission_TypesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['permission_types'], any> {
  name: 'permission_types';
}

export type PermissionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['permissions'] = ResolversParentTypes['permissions']> = {
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  credential_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  dao?: Resolver<Maybe<ResolversTypes['daos']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  gate?: Resolver<Maybe<ResolversTypes['gates']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  permission?: Resolver<Maybe<ResolversTypes['permission_types']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Permissions_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['permissions_aggregate'] = ResolversParentTypes['permissions_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['permissions_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['permissions']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Permissions_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['permissions_aggregate_fields'] = ResolversParentTypes['permissions_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Permissions_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['permissions_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['permissions_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Permissions_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['permissions_max_fields'] = ResolversParentTypes['permissions_max_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  credential_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  permission?: Resolver<Maybe<ResolversTypes['permission_types']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Permissions_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['permissions_min_fields'] = ResolversParentTypes['permissions_min_fields']> = {
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  credential_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  permission?: Resolver<Maybe<ResolversTypes['permission_types']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Permissions_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['permissions_mutation_response'] = ResolversParentTypes['permissions_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['permissions']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Query_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['query_root'] = ResolversParentTypes['query_root']> = {
  access_tokens?: Resolver<Array<ResolversTypes['access_tokens']>, ParentType, ContextType, Partial<Query_RootAccess_TokensArgs>>;
  access_tokens_aggregate?: Resolver<ResolversTypes['access_tokens_aggregate'], ParentType, ContextType, Partial<Query_RootAccess_Tokens_AggregateArgs>>;
  all_credential_count?: Resolver<Array<ResolversTypes['all_credential_count']>, ParentType, ContextType, Partial<Query_RootAll_Credential_CountArgs>>;
  all_credential_count_aggregate?: Resolver<ResolversTypes['all_credential_count_aggregate'], ParentType, ContextType, Partial<Query_RootAll_Credential_Count_AggregateArgs>>;
  bookmarks?: Resolver<Array<ResolversTypes['bookmarks']>, ParentType, ContextType, Partial<Query_RootBookmarksArgs>>;
  bookmarks_aggregate?: Resolver<ResolversTypes['bookmarks_aggregate'], ParentType, ContextType, Partial<Query_RootBookmarks_AggregateArgs>>;
  bounties?: Resolver<Array<ResolversTypes['bounties']>, ParentType, ContextType, Partial<Query_RootBountiesArgs>>;
  bounties_aggregate?: Resolver<ResolversTypes['bounties_aggregate'], ParentType, ContextType, Partial<Query_RootBounties_AggregateArgs>>;
  bounties_by_pk?: Resolver<Maybe<ResolversTypes['bounties']>, ParentType, ContextType, RequireFields<Query_RootBounties_By_PkArgs, 'id'>>;
  credential_group?: Resolver<Array<ResolversTypes['credential_group']>, ParentType, ContextType, Partial<Query_RootCredential_GroupArgs>>;
  credential_group_aggregate?: Resolver<ResolversTypes['credential_group_aggregate'], ParentType, ContextType, Partial<Query_RootCredential_Group_AggregateArgs>>;
  credential_group_by_pk?: Resolver<Maybe<ResolversTypes['credential_group']>, ParentType, ContextType, RequireFields<Query_RootCredential_Group_By_PkArgs, 'id'>>;
  credentials?: Resolver<Array<ResolversTypes['credentials']>, ParentType, ContextType, Partial<Query_RootCredentialsArgs>>;
  credentials_aggregate?: Resolver<ResolversTypes['credentials_aggregate'], ParentType, ContextType, Partial<Query_RootCredentials_AggregateArgs>>;
  credentials_by_pk?: Resolver<Maybe<ResolversTypes['credentials']>, ParentType, ContextType, RequireFields<Query_RootCredentials_By_PkArgs, 'id'>>;
  dao_following?: Resolver<Array<ResolversTypes['dao_following']>, ParentType, ContextType, Partial<Query_RootDao_FollowingArgs>>;
  dao_following_aggregate?: Resolver<ResolversTypes['dao_following_aggregate'], ParentType, ContextType, Partial<Query_RootDao_Following_AggregateArgs>>;
  dao_socials?: Resolver<Array<ResolversTypes['dao_socials']>, ParentType, ContextType, Partial<Query_RootDao_SocialsArgs>>;
  dao_socials_aggregate?: Resolver<ResolversTypes['dao_socials_aggregate'], ParentType, ContextType, Partial<Query_RootDao_Socials_AggregateArgs>>;
  daos?: Resolver<Array<ResolversTypes['daos']>, ParentType, ContextType, Partial<Query_RootDaosArgs>>;
  daos_aggregate?: Resolver<ResolversTypes['daos_aggregate'], ParentType, ContextType, Partial<Query_RootDaos_AggregateArgs>>;
  daos_by_pk?: Resolver<Maybe<ResolversTypes['daos']>, ParentType, ContextType, RequireFields<Query_RootDaos_By_PkArgs, 'id'>>;
  earners?: Resolver<Array<ResolversTypes['earners']>, ParentType, ContextType, Partial<Query_RootEarnersArgs>>;
  earners_aggregate?: Resolver<ResolversTypes['earners_aggregate'], ParentType, ContextType, Partial<Query_RootEarners_AggregateArgs>>;
  earners_by_pk?: Resolver<Maybe<ResolversTypes['earners']>, ParentType, ContextType, RequireFields<Query_RootEarners_By_PkArgs, 'id'>>;
  email_subscribers?: Resolver<Array<ResolversTypes['email_subscribers']>, ParentType, ContextType, Partial<Query_RootEmail_SubscribersArgs>>;
  email_subscribers_aggregate?: Resolver<ResolversTypes['email_subscribers_aggregate'], ParentType, ContextType, Partial<Query_RootEmail_Subscribers_AggregateArgs>>;
  email_subscribers_by_pk?: Resolver<Maybe<ResolversTypes['email_subscribers']>, ParentType, ContextType, RequireFields<Query_RootEmail_Subscribers_By_PkArgs, 'id'>>;
  experiences?: Resolver<Array<ResolversTypes['experiences']>, ParentType, ContextType, Partial<Query_RootExperiencesArgs>>;
  experiences_aggregate?: Resolver<ResolversTypes['experiences_aggregate'], ParentType, ContextType, Partial<Query_RootExperiences_AggregateArgs>>;
  files?: Resolver<Array<ResolversTypes['files']>, ParentType, ContextType, Partial<Query_RootFilesArgs>>;
  files_aggregate?: Resolver<ResolversTypes['files_aggregate'], ParentType, ContextType, Partial<Query_RootFiles_AggregateArgs>>;
  files_by_pk?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType, RequireFields<Query_RootFiles_By_PkArgs, 'id'>>;
  gate_progress?: Resolver<Array<ResolversTypes['gate_progress']>, ParentType, ContextType, Partial<Query_RootGate_ProgressArgs>>;
  gate_progress_aggregate?: Resolver<ResolversTypes['gate_progress_aggregate'], ParentType, ContextType, Partial<Query_RootGate_Progress_AggregateArgs>>;
  gate_progress_by_pk?: Resolver<Maybe<ResolversTypes['gate_progress']>, ParentType, ContextType, RequireFields<Query_RootGate_Progress_By_PkArgs, 'id'>>;
  gates?: Resolver<Array<ResolversTypes['gates']>, ParentType, ContextType, Partial<Query_RootGatesArgs>>;
  gates_aggregate?: Resolver<ResolversTypes['gates_aggregate'], ParentType, ContextType, Partial<Query_RootGates_AggregateArgs>>;
  gates_by_pk?: Resolver<Maybe<ResolversTypes['gates']>, ParentType, ContextType, RequireFields<Query_RootGates_By_PkArgs, 'id'>>;
  get_claimable_credentials?: Resolver<Array<ResolversTypes['credential_group']>, ParentType, ContextType, RequireFields<Query_RootGet_Claimable_CredentialsArgs, 'args'>>;
  get_claimable_credentials_aggregate?: Resolver<ResolversTypes['credential_group_aggregate'], ParentType, ContextType, RequireFields<Query_RootGet_Claimable_Credentials_AggregateArgs, 'args'>>;
  get_nonce?: Resolver<Maybe<ResolversTypes['NonceOutput']>, ParentType, ContextType, RequireFields<Query_RootGet_NonceArgs, 'wallet'>>;
  get_twitter_tweet?: Resolver<Maybe<ResolversTypes['TwitterTweet']>, ParentType, ContextType, RequireFields<Query_RootGet_Twitter_TweetArgs, 'id'>>;
  get_twitter_user_data?: Resolver<Maybe<ResolversTypes['TwitterUser']>, ParentType, ContextType, RequireFields<Query_RootGet_Twitter_User_DataArgs, 'userName'>>;
  hidden_experience_credentials?: Resolver<Array<ResolversTypes['hidden_experience_credentials']>, ParentType, ContextType, Partial<Query_RootHidden_Experience_CredentialsArgs>>;
  hidden_experience_credentials_aggregate?: Resolver<ResolversTypes['hidden_experience_credentials_aggregate'], ParentType, ContextType, Partial<Query_RootHidden_Experience_Credentials_AggregateArgs>>;
  manual_task_events?: Resolver<Array<ResolversTypes['manual_task_events']>, ParentType, ContextType, Partial<Query_RootManual_Task_EventsArgs>>;
  manual_task_events_aggregate?: Resolver<ResolversTypes['manual_task_events_aggregate'], ParentType, ContextType, Partial<Query_RootManual_Task_Events_AggregateArgs>>;
  manual_task_events_by_pk?: Resolver<Maybe<ResolversTypes['manual_task_events']>, ParentType, ContextType, RequireFields<Query_RootManual_Task_Events_By_PkArgs, 'id'>>;
  manual_task_submission?: Resolver<Array<ResolversTypes['manual_task_submission']>, ParentType, ContextType, Partial<Query_RootManual_Task_SubmissionArgs>>;
  manual_task_submission_aggregate?: Resolver<ResolversTypes['manual_task_submission_aggregate'], ParentType, ContextType, Partial<Query_RootManual_Task_Submission_AggregateArgs>>;
  manual_task_submission_by_pk?: Resolver<Maybe<ResolversTypes['manual_task_submission']>, ParentType, ContextType, RequireFields<Query_RootManual_Task_Submission_By_PkArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, Partial<Query_RootMeArgs>>;
  me_aggregate?: Resolver<ResolversTypes['users_aggregate'], ParentType, ContextType, Partial<Query_RootMe_AggregateArgs>>;
  permissions?: Resolver<Array<ResolversTypes['permissions']>, ParentType, ContextType, Partial<Query_RootPermissionsArgs>>;
  permissions_aggregate?: Resolver<ResolversTypes['permissions_aggregate'], ParentType, ContextType, Partial<Query_RootPermissions_AggregateArgs>>;
  permissions_by_pk?: Resolver<Maybe<ResolversTypes['permissions']>, ParentType, ContextType, RequireFields<Query_RootPermissions_By_PkArgs, 'id'>>;
  search_credentials?: Resolver<Maybe<ResolversTypes['AlgoliaSearchResults']>, ParentType, ContextType, RequireFields<Query_RootSearch_CredentialsArgs, 'query'>>;
  search_daos?: Resolver<Array<ResolversTypes['daos']>, ParentType, ContextType, RequireFields<Query_RootSearch_DaosArgs, 'args'>>;
  search_daos_aggregate?: Resolver<ResolversTypes['daos_aggregate'], ParentType, ContextType, RequireFields<Query_RootSearch_Daos_AggregateArgs, 'args'>>;
  search_gates?: Resolver<Array<ResolversTypes['gates']>, ParentType, ContextType, RequireFields<Query_RootSearch_GatesArgs, 'args'>>;
  search_gates_aggregate?: Resolver<ResolversTypes['gates_aggregate'], ParentType, ContextType, RequireFields<Query_RootSearch_Gates_AggregateArgs, 'args'>>;
  search_users?: Resolver<Array<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Query_RootSearch_UsersArgs, 'args'>>;
  search_users_aggregate?: Resolver<ResolversTypes['users_aggregate'], ParentType, ContextType, RequireFields<Query_RootSearch_Users_AggregateArgs, 'args'>>;
  task_progress?: Resolver<Array<ResolversTypes['task_progress']>, ParentType, ContextType, Partial<Query_RootTask_ProgressArgs>>;
  task_progress_aggregate?: Resolver<ResolversTypes['task_progress_aggregate'], ParentType, ContextType, Partial<Query_RootTask_Progress_AggregateArgs>>;
  task_progress_by_pk?: Resolver<Maybe<ResolversTypes['task_progress']>, ParentType, ContextType, RequireFields<Query_RootTask_Progress_By_PkArgs, 'id'>>;
  tasks?: Resolver<Array<ResolversTypes['tasks']>, ParentType, ContextType, Partial<Query_RootTasksArgs>>;
  tasks_aggregate?: Resolver<ResolversTypes['tasks_aggregate'], ParentType, ContextType, Partial<Query_RootTasks_AggregateArgs>>;
  tasks_by_pk?: Resolver<Maybe<ResolversTypes['tasks']>, ParentType, ContextType, RequireFields<Query_RootTasks_By_PkArgs, 'id'>>;
  token_benefits?: Resolver<Array<ResolversTypes['token_benefits']>, ParentType, ContextType, Partial<Query_RootToken_BenefitsArgs>>;
  token_benefits_aggregate?: Resolver<ResolversTypes['token_benefits_aggregate'], ParentType, ContextType, Partial<Query_RootToken_Benefits_AggregateArgs>>;
  token_benefits_by_pk?: Resolver<Maybe<ResolversTypes['token_benefits']>, ParentType, ContextType, RequireFields<Query_RootToken_Benefits_By_PkArgs, 'id'>>;
  transformed_image?: Resolver<Maybe<ResolversTypes['TransformOutput']>, ParentType, ContextType, RequireFields<Query_RootTransformed_ImageArgs, 'id'>>;
  user_following?: Resolver<Array<ResolversTypes['user_following']>, ParentType, ContextType, Partial<Query_RootUser_FollowingArgs>>;
  user_following_aggregate?: Resolver<ResolversTypes['user_following_aggregate'], ParentType, ContextType, Partial<Query_RootUser_Following_AggregateArgs>>;
  user_socials?: Resolver<Array<ResolversTypes['user_socials']>, ParentType, ContextType, Partial<Query_RootUser_SocialsArgs>>;
  user_socials_aggregate?: Resolver<ResolversTypes['user_socials_aggregate'], ParentType, ContextType, Partial<Query_RootUser_Socials_AggregateArgs>>;
  users?: Resolver<Array<ResolversTypes['users']>, ParentType, ContextType, Partial<Query_RootUsersArgs>>;
  users_aggregate?: Resolver<ResolversTypes['users_aggregate'], ParentType, ContextType, Partial<Query_RootUsers_AggregateArgs>>;
  users_by_pk?: Resolver<Maybe<ResolversTypes['users']>, ParentType, ContextType, RequireFields<Query_RootUsers_By_PkArgs, 'id'>>;
  verify_csv_progress?: Resolver<Maybe<ResolversTypes['VerifyCSVProgressOutput']>, ParentType, ContextType, RequireFields<Query_RootVerify_Csv_ProgressArgs, 'id'>>;
  whitelisted_wallets?: Resolver<Array<ResolversTypes['whitelisted_wallets']>, ParentType, ContextType, Partial<Query_RootWhitelisted_WalletsArgs>>;
  whitelisted_wallets_aggregate?: Resolver<ResolversTypes['whitelisted_wallets_aggregate'], ParentType, ContextType, Partial<Query_RootWhitelisted_Wallets_AggregateArgs>>;
};

export interface Submission_StateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['submission_state'], any> {
  name: 'submission_state';
}

export type Subscription_RootResolvers<ContextType = any, ParentType extends ResolversParentTypes['subscription_root'] = ResolversParentTypes['subscription_root']> = {
  access_tokens?: SubscriptionResolver<Array<ResolversTypes['access_tokens']>, "access_tokens", ParentType, ContextType, Partial<Subscription_RootAccess_TokensArgs>>;
  access_tokens_aggregate?: SubscriptionResolver<ResolversTypes['access_tokens_aggregate'], "access_tokens_aggregate", ParentType, ContextType, Partial<Subscription_RootAccess_Tokens_AggregateArgs>>;
  access_tokens_stream?: SubscriptionResolver<Array<ResolversTypes['access_tokens']>, "access_tokens_stream", ParentType, ContextType, RequireFields<Subscription_RootAccess_Tokens_StreamArgs, 'batch_size' | 'cursor'>>;
  all_credential_count?: SubscriptionResolver<Array<ResolversTypes['all_credential_count']>, "all_credential_count", ParentType, ContextType, Partial<Subscription_RootAll_Credential_CountArgs>>;
  all_credential_count_aggregate?: SubscriptionResolver<ResolversTypes['all_credential_count_aggregate'], "all_credential_count_aggregate", ParentType, ContextType, Partial<Subscription_RootAll_Credential_Count_AggregateArgs>>;
  all_credential_count_stream?: SubscriptionResolver<Array<ResolversTypes['all_credential_count']>, "all_credential_count_stream", ParentType, ContextType, RequireFields<Subscription_RootAll_Credential_Count_StreamArgs, 'batch_size' | 'cursor'>>;
  bookmarks?: SubscriptionResolver<Array<ResolversTypes['bookmarks']>, "bookmarks", ParentType, ContextType, Partial<Subscription_RootBookmarksArgs>>;
  bookmarks_aggregate?: SubscriptionResolver<ResolversTypes['bookmarks_aggregate'], "bookmarks_aggregate", ParentType, ContextType, Partial<Subscription_RootBookmarks_AggregateArgs>>;
  bookmarks_stream?: SubscriptionResolver<Array<ResolversTypes['bookmarks']>, "bookmarks_stream", ParentType, ContextType, RequireFields<Subscription_RootBookmarks_StreamArgs, 'batch_size' | 'cursor'>>;
  bounties?: SubscriptionResolver<Array<ResolversTypes['bounties']>, "bounties", ParentType, ContextType, Partial<Subscription_RootBountiesArgs>>;
  bounties_aggregate?: SubscriptionResolver<ResolversTypes['bounties_aggregate'], "bounties_aggregate", ParentType, ContextType, Partial<Subscription_RootBounties_AggregateArgs>>;
  bounties_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['bounties']>, "bounties_by_pk", ParentType, ContextType, RequireFields<Subscription_RootBounties_By_PkArgs, 'id'>>;
  bounties_stream?: SubscriptionResolver<Array<ResolversTypes['bounties']>, "bounties_stream", ParentType, ContextType, RequireFields<Subscription_RootBounties_StreamArgs, 'batch_size' | 'cursor'>>;
  credential_group?: SubscriptionResolver<Array<ResolversTypes['credential_group']>, "credential_group", ParentType, ContextType, Partial<Subscription_RootCredential_GroupArgs>>;
  credential_group_aggregate?: SubscriptionResolver<ResolversTypes['credential_group_aggregate'], "credential_group_aggregate", ParentType, ContextType, Partial<Subscription_RootCredential_Group_AggregateArgs>>;
  credential_group_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['credential_group']>, "credential_group_by_pk", ParentType, ContextType, RequireFields<Subscription_RootCredential_Group_By_PkArgs, 'id'>>;
  credential_group_stream?: SubscriptionResolver<Array<ResolversTypes['credential_group']>, "credential_group_stream", ParentType, ContextType, RequireFields<Subscription_RootCredential_Group_StreamArgs, 'batch_size' | 'cursor'>>;
  credentials?: SubscriptionResolver<Array<ResolversTypes['credentials']>, "credentials", ParentType, ContextType, Partial<Subscription_RootCredentialsArgs>>;
  credentials_aggregate?: SubscriptionResolver<ResolversTypes['credentials_aggregate'], "credentials_aggregate", ParentType, ContextType, Partial<Subscription_RootCredentials_AggregateArgs>>;
  credentials_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['credentials']>, "credentials_by_pk", ParentType, ContextType, RequireFields<Subscription_RootCredentials_By_PkArgs, 'id'>>;
  credentials_stream?: SubscriptionResolver<Array<ResolversTypes['credentials']>, "credentials_stream", ParentType, ContextType, RequireFields<Subscription_RootCredentials_StreamArgs, 'batch_size' | 'cursor'>>;
  dao_following?: SubscriptionResolver<Array<ResolversTypes['dao_following']>, "dao_following", ParentType, ContextType, Partial<Subscription_RootDao_FollowingArgs>>;
  dao_following_aggregate?: SubscriptionResolver<ResolversTypes['dao_following_aggregate'], "dao_following_aggregate", ParentType, ContextType, Partial<Subscription_RootDao_Following_AggregateArgs>>;
  dao_following_stream?: SubscriptionResolver<Array<ResolversTypes['dao_following']>, "dao_following_stream", ParentType, ContextType, RequireFields<Subscription_RootDao_Following_StreamArgs, 'batch_size' | 'cursor'>>;
  dao_socials?: SubscriptionResolver<Array<ResolversTypes['dao_socials']>, "dao_socials", ParentType, ContextType, Partial<Subscription_RootDao_SocialsArgs>>;
  dao_socials_aggregate?: SubscriptionResolver<ResolversTypes['dao_socials_aggregate'], "dao_socials_aggregate", ParentType, ContextType, Partial<Subscription_RootDao_Socials_AggregateArgs>>;
  dao_socials_stream?: SubscriptionResolver<Array<ResolversTypes['dao_socials']>, "dao_socials_stream", ParentType, ContextType, RequireFields<Subscription_RootDao_Socials_StreamArgs, 'batch_size' | 'cursor'>>;
  daos?: SubscriptionResolver<Array<ResolversTypes['daos']>, "daos", ParentType, ContextType, Partial<Subscription_RootDaosArgs>>;
  daos_aggregate?: SubscriptionResolver<ResolversTypes['daos_aggregate'], "daos_aggregate", ParentType, ContextType, Partial<Subscription_RootDaos_AggregateArgs>>;
  daos_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['daos']>, "daos_by_pk", ParentType, ContextType, RequireFields<Subscription_RootDaos_By_PkArgs, 'id'>>;
  daos_stream?: SubscriptionResolver<Array<ResolversTypes['daos']>, "daos_stream", ParentType, ContextType, RequireFields<Subscription_RootDaos_StreamArgs, 'batch_size' | 'cursor'>>;
  earners?: SubscriptionResolver<Array<ResolversTypes['earners']>, "earners", ParentType, ContextType, Partial<Subscription_RootEarnersArgs>>;
  earners_aggregate?: SubscriptionResolver<ResolversTypes['earners_aggregate'], "earners_aggregate", ParentType, ContextType, Partial<Subscription_RootEarners_AggregateArgs>>;
  earners_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['earners']>, "earners_by_pk", ParentType, ContextType, RequireFields<Subscription_RootEarners_By_PkArgs, 'id'>>;
  earners_stream?: SubscriptionResolver<Array<ResolversTypes['earners']>, "earners_stream", ParentType, ContextType, RequireFields<Subscription_RootEarners_StreamArgs, 'batch_size' | 'cursor'>>;
  email_subscribers?: SubscriptionResolver<Array<ResolversTypes['email_subscribers']>, "email_subscribers", ParentType, ContextType, Partial<Subscription_RootEmail_SubscribersArgs>>;
  email_subscribers_aggregate?: SubscriptionResolver<ResolversTypes['email_subscribers_aggregate'], "email_subscribers_aggregate", ParentType, ContextType, Partial<Subscription_RootEmail_Subscribers_AggregateArgs>>;
  email_subscribers_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['email_subscribers']>, "email_subscribers_by_pk", ParentType, ContextType, RequireFields<Subscription_RootEmail_Subscribers_By_PkArgs, 'id'>>;
  email_subscribers_stream?: SubscriptionResolver<Array<ResolversTypes['email_subscribers']>, "email_subscribers_stream", ParentType, ContextType, RequireFields<Subscription_RootEmail_Subscribers_StreamArgs, 'batch_size' | 'cursor'>>;
  experiences?: SubscriptionResolver<Array<ResolversTypes['experiences']>, "experiences", ParentType, ContextType, Partial<Subscription_RootExperiencesArgs>>;
  experiences_aggregate?: SubscriptionResolver<ResolversTypes['experiences_aggregate'], "experiences_aggregate", ParentType, ContextType, Partial<Subscription_RootExperiences_AggregateArgs>>;
  experiences_stream?: SubscriptionResolver<Array<ResolversTypes['experiences']>, "experiences_stream", ParentType, ContextType, RequireFields<Subscription_RootExperiences_StreamArgs, 'batch_size' | 'cursor'>>;
  files?: SubscriptionResolver<Array<ResolversTypes['files']>, "files", ParentType, ContextType, Partial<Subscription_RootFilesArgs>>;
  files_aggregate?: SubscriptionResolver<ResolversTypes['files_aggregate'], "files_aggregate", ParentType, ContextType, Partial<Subscription_RootFiles_AggregateArgs>>;
  files_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['files']>, "files_by_pk", ParentType, ContextType, RequireFields<Subscription_RootFiles_By_PkArgs, 'id'>>;
  files_stream?: SubscriptionResolver<Array<ResolversTypes['files']>, "files_stream", ParentType, ContextType, RequireFields<Subscription_RootFiles_StreamArgs, 'batch_size' | 'cursor'>>;
  gate_progress?: SubscriptionResolver<Array<ResolversTypes['gate_progress']>, "gate_progress", ParentType, ContextType, Partial<Subscription_RootGate_ProgressArgs>>;
  gate_progress_aggregate?: SubscriptionResolver<ResolversTypes['gate_progress_aggregate'], "gate_progress_aggregate", ParentType, ContextType, Partial<Subscription_RootGate_Progress_AggregateArgs>>;
  gate_progress_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['gate_progress']>, "gate_progress_by_pk", ParentType, ContextType, RequireFields<Subscription_RootGate_Progress_By_PkArgs, 'id'>>;
  gate_progress_stream?: SubscriptionResolver<Array<ResolversTypes['gate_progress']>, "gate_progress_stream", ParentType, ContextType, RequireFields<Subscription_RootGate_Progress_StreamArgs, 'batch_size' | 'cursor'>>;
  gates?: SubscriptionResolver<Array<ResolversTypes['gates']>, "gates", ParentType, ContextType, Partial<Subscription_RootGatesArgs>>;
  gates_aggregate?: SubscriptionResolver<ResolversTypes['gates_aggregate'], "gates_aggregate", ParentType, ContextType, Partial<Subscription_RootGates_AggregateArgs>>;
  gates_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['gates']>, "gates_by_pk", ParentType, ContextType, RequireFields<Subscription_RootGates_By_PkArgs, 'id'>>;
  gates_stream?: SubscriptionResolver<Array<ResolversTypes['gates']>, "gates_stream", ParentType, ContextType, RequireFields<Subscription_RootGates_StreamArgs, 'batch_size' | 'cursor'>>;
  get_claimable_credentials?: SubscriptionResolver<Array<ResolversTypes['credential_group']>, "get_claimable_credentials", ParentType, ContextType, RequireFields<Subscription_RootGet_Claimable_CredentialsArgs, 'args'>>;
  get_claimable_credentials_aggregate?: SubscriptionResolver<ResolversTypes['credential_group_aggregate'], "get_claimable_credentials_aggregate", ParentType, ContextType, RequireFields<Subscription_RootGet_Claimable_Credentials_AggregateArgs, 'args'>>;
  hidden_experience_credentials?: SubscriptionResolver<Array<ResolversTypes['hidden_experience_credentials']>, "hidden_experience_credentials", ParentType, ContextType, Partial<Subscription_RootHidden_Experience_CredentialsArgs>>;
  hidden_experience_credentials_aggregate?: SubscriptionResolver<ResolversTypes['hidden_experience_credentials_aggregate'], "hidden_experience_credentials_aggregate", ParentType, ContextType, Partial<Subscription_RootHidden_Experience_Credentials_AggregateArgs>>;
  hidden_experience_credentials_stream?: SubscriptionResolver<Array<ResolversTypes['hidden_experience_credentials']>, "hidden_experience_credentials_stream", ParentType, ContextType, RequireFields<Subscription_RootHidden_Experience_Credentials_StreamArgs, 'batch_size' | 'cursor'>>;
  manual_task_events?: SubscriptionResolver<Array<ResolversTypes['manual_task_events']>, "manual_task_events", ParentType, ContextType, Partial<Subscription_RootManual_Task_EventsArgs>>;
  manual_task_events_aggregate?: SubscriptionResolver<ResolversTypes['manual_task_events_aggregate'], "manual_task_events_aggregate", ParentType, ContextType, Partial<Subscription_RootManual_Task_Events_AggregateArgs>>;
  manual_task_events_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['manual_task_events']>, "manual_task_events_by_pk", ParentType, ContextType, RequireFields<Subscription_RootManual_Task_Events_By_PkArgs, 'id'>>;
  manual_task_events_stream?: SubscriptionResolver<Array<ResolversTypes['manual_task_events']>, "manual_task_events_stream", ParentType, ContextType, RequireFields<Subscription_RootManual_Task_Events_StreamArgs, 'batch_size' | 'cursor'>>;
  manual_task_submission?: SubscriptionResolver<Array<ResolversTypes['manual_task_submission']>, "manual_task_submission", ParentType, ContextType, Partial<Subscription_RootManual_Task_SubmissionArgs>>;
  manual_task_submission_aggregate?: SubscriptionResolver<ResolversTypes['manual_task_submission_aggregate'], "manual_task_submission_aggregate", ParentType, ContextType, Partial<Subscription_RootManual_Task_Submission_AggregateArgs>>;
  manual_task_submission_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['manual_task_submission']>, "manual_task_submission_by_pk", ParentType, ContextType, RequireFields<Subscription_RootManual_Task_Submission_By_PkArgs, 'id'>>;
  manual_task_submission_stream?: SubscriptionResolver<Array<ResolversTypes['manual_task_submission']>, "manual_task_submission_stream", ParentType, ContextType, RequireFields<Subscription_RootManual_Task_Submission_StreamArgs, 'batch_size' | 'cursor'>>;
  me?: SubscriptionResolver<Maybe<ResolversTypes['users']>, "me", ParentType, ContextType, Partial<Subscription_RootMeArgs>>;
  me_aggregate?: SubscriptionResolver<ResolversTypes['users_aggregate'], "me_aggregate", ParentType, ContextType, Partial<Subscription_RootMe_AggregateArgs>>;
  permissions?: SubscriptionResolver<Array<ResolversTypes['permissions']>, "permissions", ParentType, ContextType, Partial<Subscription_RootPermissionsArgs>>;
  permissions_aggregate?: SubscriptionResolver<ResolversTypes['permissions_aggregate'], "permissions_aggregate", ParentType, ContextType, Partial<Subscription_RootPermissions_AggregateArgs>>;
  permissions_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['permissions']>, "permissions_by_pk", ParentType, ContextType, RequireFields<Subscription_RootPermissions_By_PkArgs, 'id'>>;
  permissions_stream?: SubscriptionResolver<Array<ResolversTypes['permissions']>, "permissions_stream", ParentType, ContextType, RequireFields<Subscription_RootPermissions_StreamArgs, 'batch_size' | 'cursor'>>;
  search_daos?: SubscriptionResolver<Array<ResolversTypes['daos']>, "search_daos", ParentType, ContextType, RequireFields<Subscription_RootSearch_DaosArgs, 'args'>>;
  search_daos_aggregate?: SubscriptionResolver<ResolversTypes['daos_aggregate'], "search_daos_aggregate", ParentType, ContextType, RequireFields<Subscription_RootSearch_Daos_AggregateArgs, 'args'>>;
  search_gates?: SubscriptionResolver<Array<ResolversTypes['gates']>, "search_gates", ParentType, ContextType, RequireFields<Subscription_RootSearch_GatesArgs, 'args'>>;
  search_gates_aggregate?: SubscriptionResolver<ResolversTypes['gates_aggregate'], "search_gates_aggregate", ParentType, ContextType, RequireFields<Subscription_RootSearch_Gates_AggregateArgs, 'args'>>;
  search_users?: SubscriptionResolver<Array<ResolversTypes['users']>, "search_users", ParentType, ContextType, RequireFields<Subscription_RootSearch_UsersArgs, 'args'>>;
  search_users_aggregate?: SubscriptionResolver<ResolversTypes['users_aggregate'], "search_users_aggregate", ParentType, ContextType, RequireFields<Subscription_RootSearch_Users_AggregateArgs, 'args'>>;
  task_progress?: SubscriptionResolver<Array<ResolversTypes['task_progress']>, "task_progress", ParentType, ContextType, Partial<Subscription_RootTask_ProgressArgs>>;
  task_progress_aggregate?: SubscriptionResolver<ResolversTypes['task_progress_aggregate'], "task_progress_aggregate", ParentType, ContextType, Partial<Subscription_RootTask_Progress_AggregateArgs>>;
  task_progress_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['task_progress']>, "task_progress_by_pk", ParentType, ContextType, RequireFields<Subscription_RootTask_Progress_By_PkArgs, 'id'>>;
  task_progress_stream?: SubscriptionResolver<Array<ResolversTypes['task_progress']>, "task_progress_stream", ParentType, ContextType, RequireFields<Subscription_RootTask_Progress_StreamArgs, 'batch_size' | 'cursor'>>;
  tasks?: SubscriptionResolver<Array<ResolversTypes['tasks']>, "tasks", ParentType, ContextType, Partial<Subscription_RootTasksArgs>>;
  tasks_aggregate?: SubscriptionResolver<ResolversTypes['tasks_aggregate'], "tasks_aggregate", ParentType, ContextType, Partial<Subscription_RootTasks_AggregateArgs>>;
  tasks_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['tasks']>, "tasks_by_pk", ParentType, ContextType, RequireFields<Subscription_RootTasks_By_PkArgs, 'id'>>;
  tasks_stream?: SubscriptionResolver<Array<ResolversTypes['tasks']>, "tasks_stream", ParentType, ContextType, RequireFields<Subscription_RootTasks_StreamArgs, 'batch_size' | 'cursor'>>;
  token_benefits?: SubscriptionResolver<Array<ResolversTypes['token_benefits']>, "token_benefits", ParentType, ContextType, Partial<Subscription_RootToken_BenefitsArgs>>;
  token_benefits_aggregate?: SubscriptionResolver<ResolversTypes['token_benefits_aggregate'], "token_benefits_aggregate", ParentType, ContextType, Partial<Subscription_RootToken_Benefits_AggregateArgs>>;
  token_benefits_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['token_benefits']>, "token_benefits_by_pk", ParentType, ContextType, RequireFields<Subscription_RootToken_Benefits_By_PkArgs, 'id'>>;
  token_benefits_stream?: SubscriptionResolver<Array<ResolversTypes['token_benefits']>, "token_benefits_stream", ParentType, ContextType, RequireFields<Subscription_RootToken_Benefits_StreamArgs, 'batch_size' | 'cursor'>>;
  user_following?: SubscriptionResolver<Array<ResolversTypes['user_following']>, "user_following", ParentType, ContextType, Partial<Subscription_RootUser_FollowingArgs>>;
  user_following_aggregate?: SubscriptionResolver<ResolversTypes['user_following_aggregate'], "user_following_aggregate", ParentType, ContextType, Partial<Subscription_RootUser_Following_AggregateArgs>>;
  user_following_stream?: SubscriptionResolver<Array<ResolversTypes['user_following']>, "user_following_stream", ParentType, ContextType, RequireFields<Subscription_RootUser_Following_StreamArgs, 'batch_size' | 'cursor'>>;
  user_socials?: SubscriptionResolver<Array<ResolversTypes['user_socials']>, "user_socials", ParentType, ContextType, Partial<Subscription_RootUser_SocialsArgs>>;
  user_socials_aggregate?: SubscriptionResolver<ResolversTypes['user_socials_aggregate'], "user_socials_aggregate", ParentType, ContextType, Partial<Subscription_RootUser_Socials_AggregateArgs>>;
  user_socials_stream?: SubscriptionResolver<Array<ResolversTypes['user_socials']>, "user_socials_stream", ParentType, ContextType, RequireFields<Subscription_RootUser_Socials_StreamArgs, 'batch_size' | 'cursor'>>;
  users?: SubscriptionResolver<Array<ResolversTypes['users']>, "users", ParentType, ContextType, Partial<Subscription_RootUsersArgs>>;
  users_aggregate?: SubscriptionResolver<ResolversTypes['users_aggregate'], "users_aggregate", ParentType, ContextType, Partial<Subscription_RootUsers_AggregateArgs>>;
  users_by_pk?: SubscriptionResolver<Maybe<ResolversTypes['users']>, "users_by_pk", ParentType, ContextType, RequireFields<Subscription_RootUsers_By_PkArgs, 'id'>>;
  users_stream?: SubscriptionResolver<Array<ResolversTypes['users']>, "users_stream", ParentType, ContextType, RequireFields<Subscription_RootUsers_StreamArgs, 'batch_size' | 'cursor'>>;
  whitelisted_wallets?: SubscriptionResolver<Array<ResolversTypes['whitelisted_wallets']>, "whitelisted_wallets", ParentType, ContextType, Partial<Subscription_RootWhitelisted_WalletsArgs>>;
  whitelisted_wallets_aggregate?: SubscriptionResolver<ResolversTypes['whitelisted_wallets_aggregate'], "whitelisted_wallets_aggregate", ParentType, ContextType, Partial<Subscription_RootWhitelisted_Wallets_AggregateArgs>>;
  whitelisted_wallets_stream?: SubscriptionResolver<Array<ResolversTypes['whitelisted_wallets']>, "whitelisted_wallets_stream", ParentType, ContextType, RequireFields<Subscription_RootWhitelisted_Wallets_StreamArgs, 'batch_size' | 'cursor'>>;
};

export type Task_ProgressResolvers<ContextType = any, ParentType extends ResolversParentTypes['task_progress'] = ResolversParentTypes['task_progress']> = {
  completed?: Resolver<ResolversTypes['key_status'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  gate?: Resolver<ResolversTypes['gates'], ParentType, ContextType>;
  gate_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  task?: Resolver<ResolversTypes['tasks'], ParentType, ContextType>;
  task_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Task_Progress_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['task_progress_aggregate'] = ResolversParentTypes['task_progress_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['task_progress_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['task_progress']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Task_Progress_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['task_progress_aggregate_fields'] = ResolversParentTypes['task_progress_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Task_Progress_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['task_progress_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['task_progress_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Task_Progress_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['task_progress_max_fields'] = ResolversParentTypes['task_progress_max_fields']> = {
  completed?: Resolver<Maybe<ResolversTypes['key_status']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  task_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Task_Progress_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['task_progress_min_fields'] = ResolversParentTypes['task_progress_min_fields']> = {
  completed?: Resolver<Maybe<ResolversTypes['key_status']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  task_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Task_Progress_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['task_progress_mutation_response'] = ResolversParentTypes['task_progress_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['task_progress']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Task_TypeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['task_type'], any> {
  name: 'task_type';
}

export type TasksResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks'] = ResolversParentTypes['tasks']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gate?: Resolver<ResolversTypes['gates'], ParentType, ContextType>;
  gate_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  task_data?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<TasksTask_DataArgs>>;
  task_type?: Resolver<ResolversTypes['task_type'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_aggregate'] = ResolversParentTypes['tasks_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['tasks_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['tasks']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_aggregate_fields'] = ResolversParentTypes['tasks_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['tasks_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Tasks_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['tasks_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['tasks_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['tasks_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['tasks_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['tasks_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['tasks_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['tasks_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['tasks_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['tasks_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_avg_fields'] = ResolversParentTypes['tasks_avg_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_max_fields'] = ResolversParentTypes['tasks_max_fields']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  task_type?: Resolver<Maybe<ResolversTypes['task_type']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_min_fields'] = ResolversParentTypes['tasks_min_fields']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  task_type?: Resolver<Maybe<ResolversTypes['task_type']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_mutation_response'] = ResolversParentTypes['tasks_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['tasks']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_stddev_fields'] = ResolversParentTypes['tasks_stddev_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_stddev_pop_fields'] = ResolversParentTypes['tasks_stddev_pop_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_stddev_samp_fields'] = ResolversParentTypes['tasks_stddev_samp_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_sum_fields'] = ResolversParentTypes['tasks_sum_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_var_pop_fields'] = ResolversParentTypes['tasks_var_pop_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_var_samp_fields'] = ResolversParentTypes['tasks_var_samp_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Tasks_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['tasks_variance_fields'] = ResolversParentTypes['tasks_variance_fields']> = {
  order?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamp'], any> {
  name: 'timestamp';
}

export interface TimestamptzScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['timestamptz'], any> {
  name: 'timestamptz';
}

export type Token_BenefitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['token_benefits'] = ResolversParentTypes['token_benefits']> = {
  amount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  dao_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Token_Benefits_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['token_benefits_aggregate'] = ResolversParentTypes['token_benefits_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['token_benefits_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['token_benefits']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Token_Benefits_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['token_benefits_aggregate_fields'] = ResolversParentTypes['token_benefits_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Token_Benefits_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['token_benefits_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['token_benefits_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Token_Benefits_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['token_benefits_max_fields'] = ResolversParentTypes['token_benefits_max_fields']> = {
  amount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Token_Benefits_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['token_benefits_min_fields'] = ResolversParentTypes['token_benefits_min_fields']> = {
  amount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  dao_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Token_Benefits_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['token_benefits_mutation_response'] = ResolversParentTypes['token_benefits_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['token_benefits']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_FollowingResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_following'] = ResolversParentTypes['user_following']> = {
  followed_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  follower?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  follower_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['following_state'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['users'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Following_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_following_aggregate'] = ResolversParentTypes['user_following_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['user_following_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['user_following']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Following_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_following_aggregate_fields'] = ResolversParentTypes['user_following_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<User_Following_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['user_following_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['user_following_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Following_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_following_max_fields'] = ResolversParentTypes['user_following_max_fields']> = {
  followed_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  follower_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['following_state']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Following_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_following_min_fields'] = ResolversParentTypes['user_following_min_fields']> = {
  followed_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  follower_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['following_state']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Following_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_following_mutation_response'] = ResolversParentTypes['user_following_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['user_following']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_SocialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_socials'] = ResolversParentTypes['user_socials']> = {
  network?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Socials_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_socials_aggregate'] = ResolversParentTypes['user_socials_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['user_socials_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['user_socials']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Socials_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_socials_aggregate_fields'] = ResolversParentTypes['user_socials_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<User_Socials_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['user_socials_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['user_socials_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Socials_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_socials_max_fields'] = ResolversParentTypes['user_socials_max_fields']> = {
  network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Socials_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_socials_min_fields'] = ResolversParentTypes['user_socials_min_fields']> = {
  network?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type User_Socials_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['user_socials_mutation_response'] = ResolversParentTypes['user_socials_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['user_socials']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['users'] = ResolversParentTypes['users']> = {
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  access_tokens?: Resolver<Maybe<ResolversTypes['access_tokens']>, ParentType, ContextType>;
  attitudes?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<UsersAttitudesArgs>>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blacklistedFlags?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  bookmarks?: Resolver<Array<ResolversTypes['bookmarks']>, ParentType, ContextType, Partial<UsersBookmarksArgs>>;
  bookmarks_aggregate?: Resolver<ResolversTypes['bookmarks_aggregate'], ParentType, ContextType, Partial<UsersBookmarks_AggregateArgs>>;
  claimable_credentials?: Resolver<Maybe<Array<ResolversTypes['credential_group']>>, ParentType, ContextType, Partial<UsersClaimable_CredentialsArgs>>;
  cover?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType>;
  cover_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  credential_groups?: Resolver<Array<ResolversTypes['credential_group']>, ParentType, ContextType, Partial<UsersCredential_GroupsArgs>>;
  credential_groups_aggregate?: Resolver<ResolversTypes['credential_group_aggregate'], ParentType, ContextType, Partial<UsersCredential_Groups_AggregateArgs>>;
  credentials?: Resolver<Array<ResolversTypes['credentials']>, ParentType, ContextType, Partial<UsersCredentialsArgs>>;
  credentials_aggregate?: Resolver<ResolversTypes['credentials_aggregate'], ParentType, ContextType, Partial<UsersCredentials_AggregateArgs>>;
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email_address?: Resolver<Maybe<ResolversTypes['citext']>, ParentType, ContextType>;
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  experiences?: Resolver<Array<ResolversTypes['experiences']>, ParentType, ContextType, Partial<UsersExperiencesArgs>>;
  experiences_aggregate?: Resolver<ResolversTypes['experiences_aggregate'], ParentType, ContextType, Partial<UsersExperiences_AggregateArgs>>;
  followed_by?: Resolver<Array<ResolversTypes['user_following']>, ParentType, ContextType, Partial<UsersFollowed_ByArgs>>;
  followed_by_aggregate?: Resolver<ResolversTypes['user_following_aggregate'], ParentType, ContextType, Partial<UsersFollowed_By_AggregateArgs>>;
  following?: Resolver<Array<ResolversTypes['user_following']>, ParentType, ContextType, Partial<UsersFollowingArgs>>;
  following_aggregate?: Resolver<ResolversTypes['user_following_aggregate'], ParentType, ContextType, Partial<UsersFollowing_AggregateArgs>>;
  following_dao?: Resolver<Array<ResolversTypes['dao_following']>, ParentType, ContextType, Partial<UsersFollowing_DaoArgs>>;
  following_dao_aggregate?: Resolver<ResolversTypes['dao_following_aggregate'], ParentType, ContextType, Partial<UsersFollowing_Dao_AggregateArgs>>;
  gate_progresses?: Resolver<Array<ResolversTypes['gate_progress']>, ParentType, ContextType, Partial<UsersGate_ProgressesArgs>>;
  gate_progresses_aggregate?: Resolver<ResolversTypes['gate_progress_aggregate'], ParentType, ContextType, Partial<UsersGate_Progresses_AggregateArgs>>;
  id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  init?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  is_poc_whitelisted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  knowledges?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<UsersKnowledgesArgs>>;
  languages?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<UsersLanguagesArgs>>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  permissions?: Resolver<Array<ResolversTypes['permissions']>, ParentType, ContextType, Partial<UsersPermissionsArgs>>;
  permissions_aggregate?: Resolver<ResolversTypes['permissions_aggregate'], ParentType, ContextType, Partial<UsersPermissions_AggregateArgs>>;
  pfp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pic_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['files']>, ParentType, ContextType>;
  refresh_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  skills?: Resolver<Maybe<ResolversTypes['jsonb']>, ParentType, ContextType, Partial<UsersSkillsArgs>>;
  socials?: Resolver<Array<ResolversTypes['user_socials']>, ParentType, ContextType, Partial<UsersSocialsArgs>>;
  socials_aggregate?: Resolver<ResolversTypes['user_socials_aggregate'], ParentType, ContextType, Partial<UsersSocials_AggregateArgs>>;
  task_progresses?: Resolver<Array<ResolversTypes['task_progress']>, ParentType, ContextType, Partial<UsersTask_ProgressesArgs>>;
  task_progresses_aggregate?: Resolver<ResolversTypes['task_progress_aggregate'], ParentType, ContextType, Partial<UsersTask_Progresses_AggregateArgs>>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['timestamp'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  whitelistedFlags?: Resolver<ResolversTypes['_text'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_aggregate'] = ResolversParentTypes['users_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['users_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['users']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_aggregate_fields'] = ResolversParentTypes['users_aggregate_fields']> = {
  avg?: Resolver<Maybe<ResolversTypes['users_avg_fields']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Users_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['users_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['users_min_fields']>, ParentType, ContextType>;
  stddev?: Resolver<Maybe<ResolversTypes['users_stddev_fields']>, ParentType, ContextType>;
  stddev_pop?: Resolver<Maybe<ResolversTypes['users_stddev_pop_fields']>, ParentType, ContextType>;
  stddev_samp?: Resolver<Maybe<ResolversTypes['users_stddev_samp_fields']>, ParentType, ContextType>;
  sum?: Resolver<Maybe<ResolversTypes['users_sum_fields']>, ParentType, ContextType>;
  var_pop?: Resolver<Maybe<ResolversTypes['users_var_pop_fields']>, ParentType, ContextType>;
  var_samp?: Resolver<Maybe<ResolversTypes['users_var_samp_fields']>, ParentType, ContextType>;
  variance?: Resolver<Maybe<ResolversTypes['users_variance_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Avg_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_avg_fields'] = ResolversParentTypes['users_avg_fields']> = {
  nonce?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_max_fields'] = ResolversParentTypes['users_max_fields']> = {
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cover_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email_address?: Resolver<Maybe<ResolversTypes['citext']>, ParentType, ContextType>;
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pfp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pic_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  refresh_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_min_fields'] = ResolversParentTypes['users_min_fields']> = {
  about?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cover_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discord_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email_address?: Resolver<Maybe<ResolversTypes['citext']>, ParentType, ContextType>;
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nonce?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pfp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  pic_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  refresh_token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['timestamp']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_mutation_response'] = ResolversParentTypes['users_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['users']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface Users_ScalarScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['users_scalar'], any> {
  name: 'users_scalar';
}

export type Users_Stddev_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_stddev_fields'] = ResolversParentTypes['users_stddev_fields']> = {
  nonce?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Stddev_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_stddev_pop_fields'] = ResolversParentTypes['users_stddev_pop_fields']> = {
  nonce?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Stddev_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_stddev_samp_fields'] = ResolversParentTypes['users_stddev_samp_fields']> = {
  nonce?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Sum_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_sum_fields'] = ResolversParentTypes['users_sum_fields']> = {
  nonce?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Var_Pop_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_var_pop_fields'] = ResolversParentTypes['users_var_pop_fields']> = {
  nonce?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Var_Samp_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_var_samp_fields'] = ResolversParentTypes['users_var_samp_fields']> = {
  nonce?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Users_Variance_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['users_variance_fields'] = ResolversParentTypes['users_variance_fields']> = {
  nonce?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['uuid'], any> {
  name: 'uuid';
}

export type Whitelisted_WalletsResolvers<ContextType = any, ParentType extends ResolversParentTypes['whitelisted_wallets'] = ResolversParentTypes['whitelisted_wallets']> = {
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gate?: Resolver<ResolversTypes['gates'], ParentType, ContextType>;
  gate_id?: Resolver<ResolversTypes['uuid'], ParentType, ContextType>;
  gate_users?: Resolver<Maybe<Array<ResolversTypes['users']>>, ParentType, ContextType, Partial<Whitelisted_WalletsGate_UsersArgs>>;
  user?: Resolver<Maybe<Array<ResolversTypes['users']>>, ParentType, ContextType, Partial<Whitelisted_WalletsUserArgs>>;
  wallet?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Whitelisted_Wallets_AggregateResolvers<ContextType = any, ParentType extends ResolversParentTypes['whitelisted_wallets_aggregate'] = ResolversParentTypes['whitelisted_wallets_aggregate']> = {
  aggregate?: Resolver<Maybe<ResolversTypes['whitelisted_wallets_aggregate_fields']>, ParentType, ContextType>;
  nodes?: Resolver<Array<ResolversTypes['whitelisted_wallets']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Whitelisted_Wallets_Aggregate_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['whitelisted_wallets_aggregate_fields'] = ResolversParentTypes['whitelisted_wallets_aggregate_fields']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<Whitelisted_Wallets_Aggregate_FieldsCountArgs>>;
  max?: Resolver<Maybe<ResolversTypes['whitelisted_wallets_max_fields']>, ParentType, ContextType>;
  min?: Resolver<Maybe<ResolversTypes['whitelisted_wallets_min_fields']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Whitelisted_Wallets_Max_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['whitelisted_wallets_max_fields'] = ResolversParentTypes['whitelisted_wallets_max_fields']> = {
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Whitelisted_Wallets_Min_FieldsResolvers<ContextType = any, ParentType extends ResolversParentTypes['whitelisted_wallets_min_fields'] = ResolversParentTypes['whitelisted_wallets_min_fields']> = {
  ens?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gate_id?: Resolver<Maybe<ResolversTypes['uuid']>, ParentType, ContextType>;
  wallet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Whitelisted_Wallets_Mutation_ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['whitelisted_wallets_mutation_response'] = ResolversParentTypes['whitelisted_wallets_mutation_response']> = {
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  returning?: Resolver<Array<ResolversTypes['whitelisted_wallets']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AlgoliaSearchResults?: AlgoliaSearchResultsResolvers<ContextType>;
  ApproveCredentialOutput?: ApproveCredentialOutputResolvers<ContextType>;
  ClaimCredentialOutput?: ClaimCredentialOutputResolvers<ContextType>;
  CreateCodeOutput?: CreateCodeOutputResolvers<ContextType>;
  LinkPreviewOutput?: LinkPreviewOutputResolvers<ContextType>;
  LoginOutput?: LoginOutputResolvers<ContextType>;
  MintCredentialInfo?: MintCredentialInfoResolvers<ContextType>;
  MintCredentialOutput?: MintCredentialOutputResolvers<ContextType>;
  NonceOutput?: NonceOutputResolvers<ContextType>;
  PublishGateOutput?: PublishGateOutputResolvers<ContextType>;
  RefreshOutput?: RefreshOutputResolvers<ContextType>;
  RejectMTOutput?: RejectMtOutputResolvers<ContextType>;
  Resize?: ResizeResolvers<ContextType>;
  TransformOptions?: TransformOptionsResolvers<ContextType>;
  TransformOutput?: TransformOutputResolvers<ContextType>;
  TransformedImage?: TransformedImageResolvers<ContextType>;
  TwitterPublicMetrics?: TwitterPublicMetricsResolvers<ContextType>;
  TwitterTweet?: TwitterTweetResolvers<ContextType>;
  TwitterUser?: TwitterUserResolvers<ContextType>;
  UploadOutput?: UploadOutputResolvers<ContextType>;
  VerifyCSVOutput?: VerifyCsvOutputResolvers<ContextType>;
  VerifyCSVProgressOutput?: VerifyCsvProgressOutputResolvers<ContextType>;
  VerifyCodeOutput?: VerifyCodeOutputResolvers<ContextType>;
  VerifyOutput?: VerifyOutputResolvers<ContextType>;
  _text?: GraphQLScalarType;
  access_tokens?: Access_TokensResolvers<ContextType>;
  access_tokens_aggregate?: Access_Tokens_AggregateResolvers<ContextType>;
  access_tokens_aggregate_fields?: Access_Tokens_Aggregate_FieldsResolvers<ContextType>;
  access_tokens_max_fields?: Access_Tokens_Max_FieldsResolvers<ContextType>;
  access_tokens_min_fields?: Access_Tokens_Min_FieldsResolvers<ContextType>;
  access_tokens_mutation_response?: Access_Tokens_Mutation_ResponseResolvers<ContextType>;
  all_credential_count?: All_Credential_CountResolvers<ContextType>;
  all_credential_count_aggregate?: All_Credential_Count_AggregateResolvers<ContextType>;
  all_credential_count_aggregate_fields?: All_Credential_Count_Aggregate_FieldsResolvers<ContextType>;
  all_credential_count_avg_fields?: All_Credential_Count_Avg_FieldsResolvers<ContextType>;
  all_credential_count_max_fields?: All_Credential_Count_Max_FieldsResolvers<ContextType>;
  all_credential_count_min_fields?: All_Credential_Count_Min_FieldsResolvers<ContextType>;
  all_credential_count_stddev_fields?: All_Credential_Count_Stddev_FieldsResolvers<ContextType>;
  all_credential_count_stddev_pop_fields?: All_Credential_Count_Stddev_Pop_FieldsResolvers<ContextType>;
  all_credential_count_stddev_samp_fields?: All_Credential_Count_Stddev_Samp_FieldsResolvers<ContextType>;
  all_credential_count_sum_fields?: All_Credential_Count_Sum_FieldsResolvers<ContextType>;
  all_credential_count_var_pop_fields?: All_Credential_Count_Var_Pop_FieldsResolvers<ContextType>;
  all_credential_count_var_samp_fields?: All_Credential_Count_Var_Samp_FieldsResolvers<ContextType>;
  all_credential_count_variance_fields?: All_Credential_Count_Variance_FieldsResolvers<ContextType>;
  bigint?: GraphQLScalarType;
  bookmarks?: BookmarksResolvers<ContextType>;
  bookmarks_aggregate?: Bookmarks_AggregateResolvers<ContextType>;
  bookmarks_aggregate_fields?: Bookmarks_Aggregate_FieldsResolvers<ContextType>;
  bookmarks_max_fields?: Bookmarks_Max_FieldsResolvers<ContextType>;
  bookmarks_min_fields?: Bookmarks_Min_FieldsResolvers<ContextType>;
  bookmarks_mutation_response?: Bookmarks_Mutation_ResponseResolvers<ContextType>;
  bounties?: BountiesResolvers<ContextType>;
  bounties_aggregate?: Bounties_AggregateResolvers<ContextType>;
  bounties_aggregate_fields?: Bounties_Aggregate_FieldsResolvers<ContextType>;
  bounties_max_fields?: Bounties_Max_FieldsResolvers<ContextType>;
  bounties_min_fields?: Bounties_Min_FieldsResolvers<ContextType>;
  bounties_mutation_response?: Bounties_Mutation_ResponseResolvers<ContextType>;
  citext?: GraphQLScalarType;
  credential_group?: Credential_GroupResolvers<ContextType>;
  credential_group_aggregate?: Credential_Group_AggregateResolvers<ContextType>;
  credential_group_aggregate_fields?: Credential_Group_Aggregate_FieldsResolvers<ContextType>;
  credential_group_max_fields?: Credential_Group_Max_FieldsResolvers<ContextType>;
  credential_group_min_fields?: Credential_Group_Min_FieldsResolvers<ContextType>;
  credential_group_mutation_response?: Credential_Group_Mutation_ResponseResolvers<ContextType>;
  credential_state?: GraphQLScalarType;
  credentials?: CredentialsResolvers<ContextType>;
  credentials_aggregate?: Credentials_AggregateResolvers<ContextType>;
  credentials_aggregate_fields?: Credentials_Aggregate_FieldsResolvers<ContextType>;
  credentials_max_fields?: Credentials_Max_FieldsResolvers<ContextType>;
  credentials_min_fields?: Credentials_Min_FieldsResolvers<ContextType>;
  credentials_mutation_response?: Credentials_Mutation_ResponseResolvers<ContextType>;
  dao_following?: Dao_FollowingResolvers<ContextType>;
  dao_following_aggregate?: Dao_Following_AggregateResolvers<ContextType>;
  dao_following_aggregate_fields?: Dao_Following_Aggregate_FieldsResolvers<ContextType>;
  dao_following_max_fields?: Dao_Following_Max_FieldsResolvers<ContextType>;
  dao_following_min_fields?: Dao_Following_Min_FieldsResolvers<ContextType>;
  dao_following_mutation_response?: Dao_Following_Mutation_ResponseResolvers<ContextType>;
  dao_socials?: Dao_SocialsResolvers<ContextType>;
  dao_socials_aggregate?: Dao_Socials_AggregateResolvers<ContextType>;
  dao_socials_aggregate_fields?: Dao_Socials_Aggregate_FieldsResolvers<ContextType>;
  dao_socials_max_fields?: Dao_Socials_Max_FieldsResolvers<ContextType>;
  dao_socials_min_fields?: Dao_Socials_Min_FieldsResolvers<ContextType>;
  dao_socials_mutation_response?: Dao_Socials_Mutation_ResponseResolvers<ContextType>;
  daos?: DaosResolvers<ContextType>;
  daos_aggregate?: Daos_AggregateResolvers<ContextType>;
  daos_aggregate_fields?: Daos_Aggregate_FieldsResolvers<ContextType>;
  daos_max_fields?: Daos_Max_FieldsResolvers<ContextType>;
  daos_min_fields?: Daos_Min_FieldsResolvers<ContextType>;
  daos_mutation_response?: Daos_Mutation_ResponseResolvers<ContextType>;
  earners?: EarnersResolvers<ContextType>;
  earners_aggregate?: Earners_AggregateResolvers<ContextType>;
  earners_aggregate_fields?: Earners_Aggregate_FieldsResolvers<ContextType>;
  earners_max_fields?: Earners_Max_FieldsResolvers<ContextType>;
  earners_min_fields?: Earners_Min_FieldsResolvers<ContextType>;
  earners_mutation_response?: Earners_Mutation_ResponseResolvers<ContextType>;
  email?: GraphQLScalarType;
  email_subscribers?: Email_SubscribersResolvers<ContextType>;
  email_subscribers_aggregate?: Email_Subscribers_AggregateResolvers<ContextType>;
  email_subscribers_aggregate_fields?: Email_Subscribers_Aggregate_FieldsResolvers<ContextType>;
  email_subscribers_max_fields?: Email_Subscribers_Max_FieldsResolvers<ContextType>;
  email_subscribers_min_fields?: Email_Subscribers_Min_FieldsResolvers<ContextType>;
  email_subscribers_mutation_response?: Email_Subscribers_Mutation_ResponseResolvers<ContextType>;
  experiences?: ExperiencesResolvers<ContextType>;
  experiences_aggregate?: Experiences_AggregateResolvers<ContextType>;
  experiences_aggregate_fields?: Experiences_Aggregate_FieldsResolvers<ContextType>;
  experiences_max_fields?: Experiences_Max_FieldsResolvers<ContextType>;
  experiences_min_fields?: Experiences_Min_FieldsResolvers<ContextType>;
  experiences_mutation_response?: Experiences_Mutation_ResponseResolvers<ContextType>;
  files?: FilesResolvers<ContextType>;
  files_aggregate?: Files_AggregateResolvers<ContextType>;
  files_aggregate_fields?: Files_Aggregate_FieldsResolvers<ContextType>;
  files_max_fields?: Files_Max_FieldsResolvers<ContextType>;
  files_min_fields?: Files_Min_FieldsResolvers<ContextType>;
  files_mutation_response?: Files_Mutation_ResponseResolvers<ContextType>;
  following_state?: GraphQLScalarType;
  gate_progress?: Gate_ProgressResolvers<ContextType>;
  gate_progress_aggregate?: Gate_Progress_AggregateResolvers<ContextType>;
  gate_progress_aggregate_fields?: Gate_Progress_Aggregate_FieldsResolvers<ContextType>;
  gate_progress_avg_fields?: Gate_Progress_Avg_FieldsResolvers<ContextType>;
  gate_progress_max_fields?: Gate_Progress_Max_FieldsResolvers<ContextType>;
  gate_progress_min_fields?: Gate_Progress_Min_FieldsResolvers<ContextType>;
  gate_progress_mutation_response?: Gate_Progress_Mutation_ResponseResolvers<ContextType>;
  gate_progress_stddev_fields?: Gate_Progress_Stddev_FieldsResolvers<ContextType>;
  gate_progress_stddev_pop_fields?: Gate_Progress_Stddev_Pop_FieldsResolvers<ContextType>;
  gate_progress_stddev_samp_fields?: Gate_Progress_Stddev_Samp_FieldsResolvers<ContextType>;
  gate_progress_sum_fields?: Gate_Progress_Sum_FieldsResolvers<ContextType>;
  gate_progress_var_pop_fields?: Gate_Progress_Var_Pop_FieldsResolvers<ContextType>;
  gate_progress_var_samp_fields?: Gate_Progress_Var_Samp_FieldsResolvers<ContextType>;
  gate_progress_variance_fields?: Gate_Progress_Variance_FieldsResolvers<ContextType>;
  gate_state?: GraphQLScalarType;
  gate_status?: GraphQLScalarType;
  gate_type?: GraphQLScalarType;
  gates?: GatesResolvers<ContextType>;
  gates_aggregate?: Gates_AggregateResolvers<ContextType>;
  gates_aggregate_fields?: Gates_Aggregate_FieldsResolvers<ContextType>;
  gates_avg_fields?: Gates_Avg_FieldsResolvers<ContextType>;
  gates_max_fields?: Gates_Max_FieldsResolvers<ContextType>;
  gates_min_fields?: Gates_Min_FieldsResolvers<ContextType>;
  gates_mutation_response?: Gates_Mutation_ResponseResolvers<ContextType>;
  gates_stddev_fields?: Gates_Stddev_FieldsResolvers<ContextType>;
  gates_stddev_pop_fields?: Gates_Stddev_Pop_FieldsResolvers<ContextType>;
  gates_stddev_samp_fields?: Gates_Stddev_Samp_FieldsResolvers<ContextType>;
  gates_sum_fields?: Gates_Sum_FieldsResolvers<ContextType>;
  gates_var_pop_fields?: Gates_Var_Pop_FieldsResolvers<ContextType>;
  gates_var_samp_fields?: Gates_Var_Samp_FieldsResolvers<ContextType>;
  gates_variance_fields?: Gates_Variance_FieldsResolvers<ContextType>;
  hidden_experience_credentials?: Hidden_Experience_CredentialsResolvers<ContextType>;
  hidden_experience_credentials_aggregate?: Hidden_Experience_Credentials_AggregateResolvers<ContextType>;
  hidden_experience_credentials_aggregate_fields?: Hidden_Experience_Credentials_Aggregate_FieldsResolvers<ContextType>;
  hidden_experience_credentials_max_fields?: Hidden_Experience_Credentials_Max_FieldsResolvers<ContextType>;
  hidden_experience_credentials_min_fields?: Hidden_Experience_Credentials_Min_FieldsResolvers<ContextType>;
  hidden_experience_credentials_mutation_response?: Hidden_Experience_Credentials_Mutation_ResponseResolvers<ContextType>;
  json?: GraphQLScalarType;
  jsonb?: GraphQLScalarType;
  key_status?: GraphQLScalarType;
  manual_task_event_type?: GraphQLScalarType;
  manual_task_events?: Manual_Task_EventsResolvers<ContextType>;
  manual_task_events_aggregate?: Manual_Task_Events_AggregateResolvers<ContextType>;
  manual_task_events_aggregate_fields?: Manual_Task_Events_Aggregate_FieldsResolvers<ContextType>;
  manual_task_events_max_fields?: Manual_Task_Events_Max_FieldsResolvers<ContextType>;
  manual_task_events_min_fields?: Manual_Task_Events_Min_FieldsResolvers<ContextType>;
  manual_task_events_mutation_response?: Manual_Task_Events_Mutation_ResponseResolvers<ContextType>;
  manual_task_submission?: Manual_Task_SubmissionResolvers<ContextType>;
  manual_task_submission_aggregate?: Manual_Task_Submission_AggregateResolvers<ContextType>;
  manual_task_submission_aggregate_fields?: Manual_Task_Submission_Aggregate_FieldsResolvers<ContextType>;
  manual_task_submission_max_fields?: Manual_Task_Submission_Max_FieldsResolvers<ContextType>;
  manual_task_submission_min_fields?: Manual_Task_Submission_Min_FieldsResolvers<ContextType>;
  manual_task_submission_mutation_response?: Manual_Task_Submission_Mutation_ResponseResolvers<ContextType>;
  mutation_root?: Mutation_RootResolvers<ContextType>;
  permission_types?: GraphQLScalarType;
  permissions?: PermissionsResolvers<ContextType>;
  permissions_aggregate?: Permissions_AggregateResolvers<ContextType>;
  permissions_aggregate_fields?: Permissions_Aggregate_FieldsResolvers<ContextType>;
  permissions_max_fields?: Permissions_Max_FieldsResolvers<ContextType>;
  permissions_min_fields?: Permissions_Min_FieldsResolvers<ContextType>;
  permissions_mutation_response?: Permissions_Mutation_ResponseResolvers<ContextType>;
  query_root?: Query_RootResolvers<ContextType>;
  submission_state?: GraphQLScalarType;
  subscription_root?: Subscription_RootResolvers<ContextType>;
  task_progress?: Task_ProgressResolvers<ContextType>;
  task_progress_aggregate?: Task_Progress_AggregateResolvers<ContextType>;
  task_progress_aggregate_fields?: Task_Progress_Aggregate_FieldsResolvers<ContextType>;
  task_progress_max_fields?: Task_Progress_Max_FieldsResolvers<ContextType>;
  task_progress_min_fields?: Task_Progress_Min_FieldsResolvers<ContextType>;
  task_progress_mutation_response?: Task_Progress_Mutation_ResponseResolvers<ContextType>;
  task_type?: GraphQLScalarType;
  tasks?: TasksResolvers<ContextType>;
  tasks_aggregate?: Tasks_AggregateResolvers<ContextType>;
  tasks_aggregate_fields?: Tasks_Aggregate_FieldsResolvers<ContextType>;
  tasks_avg_fields?: Tasks_Avg_FieldsResolvers<ContextType>;
  tasks_max_fields?: Tasks_Max_FieldsResolvers<ContextType>;
  tasks_min_fields?: Tasks_Min_FieldsResolvers<ContextType>;
  tasks_mutation_response?: Tasks_Mutation_ResponseResolvers<ContextType>;
  tasks_stddev_fields?: Tasks_Stddev_FieldsResolvers<ContextType>;
  tasks_stddev_pop_fields?: Tasks_Stddev_Pop_FieldsResolvers<ContextType>;
  tasks_stddev_samp_fields?: Tasks_Stddev_Samp_FieldsResolvers<ContextType>;
  tasks_sum_fields?: Tasks_Sum_FieldsResolvers<ContextType>;
  tasks_var_pop_fields?: Tasks_Var_Pop_FieldsResolvers<ContextType>;
  tasks_var_samp_fields?: Tasks_Var_Samp_FieldsResolvers<ContextType>;
  tasks_variance_fields?: Tasks_Variance_FieldsResolvers<ContextType>;
  timestamp?: GraphQLScalarType;
  timestamptz?: GraphQLScalarType;
  token_benefits?: Token_BenefitsResolvers<ContextType>;
  token_benefits_aggregate?: Token_Benefits_AggregateResolvers<ContextType>;
  token_benefits_aggregate_fields?: Token_Benefits_Aggregate_FieldsResolvers<ContextType>;
  token_benefits_max_fields?: Token_Benefits_Max_FieldsResolvers<ContextType>;
  token_benefits_min_fields?: Token_Benefits_Min_FieldsResolvers<ContextType>;
  token_benefits_mutation_response?: Token_Benefits_Mutation_ResponseResolvers<ContextType>;
  user_following?: User_FollowingResolvers<ContextType>;
  user_following_aggregate?: User_Following_AggregateResolvers<ContextType>;
  user_following_aggregate_fields?: User_Following_Aggregate_FieldsResolvers<ContextType>;
  user_following_max_fields?: User_Following_Max_FieldsResolvers<ContextType>;
  user_following_min_fields?: User_Following_Min_FieldsResolvers<ContextType>;
  user_following_mutation_response?: User_Following_Mutation_ResponseResolvers<ContextType>;
  user_socials?: User_SocialsResolvers<ContextType>;
  user_socials_aggregate?: User_Socials_AggregateResolvers<ContextType>;
  user_socials_aggregate_fields?: User_Socials_Aggregate_FieldsResolvers<ContextType>;
  user_socials_max_fields?: User_Socials_Max_FieldsResolvers<ContextType>;
  user_socials_min_fields?: User_Socials_Min_FieldsResolvers<ContextType>;
  user_socials_mutation_response?: User_Socials_Mutation_ResponseResolvers<ContextType>;
  users?: UsersResolvers<ContextType>;
  users_aggregate?: Users_AggregateResolvers<ContextType>;
  users_aggregate_fields?: Users_Aggregate_FieldsResolvers<ContextType>;
  users_avg_fields?: Users_Avg_FieldsResolvers<ContextType>;
  users_max_fields?: Users_Max_FieldsResolvers<ContextType>;
  users_min_fields?: Users_Min_FieldsResolvers<ContextType>;
  users_mutation_response?: Users_Mutation_ResponseResolvers<ContextType>;
  users_scalar?: GraphQLScalarType;
  users_stddev_fields?: Users_Stddev_FieldsResolvers<ContextType>;
  users_stddev_pop_fields?: Users_Stddev_Pop_FieldsResolvers<ContextType>;
  users_stddev_samp_fields?: Users_Stddev_Samp_FieldsResolvers<ContextType>;
  users_sum_fields?: Users_Sum_FieldsResolvers<ContextType>;
  users_var_pop_fields?: Users_Var_Pop_FieldsResolvers<ContextType>;
  users_var_samp_fields?: Users_Var_Samp_FieldsResolvers<ContextType>;
  users_variance_fields?: Users_Variance_FieldsResolvers<ContextType>;
  uuid?: GraphQLScalarType;
  whitelisted_wallets?: Whitelisted_WalletsResolvers<ContextType>;
  whitelisted_wallets_aggregate?: Whitelisted_Wallets_AggregateResolvers<ContextType>;
  whitelisted_wallets_aggregate_fields?: Whitelisted_Wallets_Aggregate_FieldsResolvers<ContextType>;
  whitelisted_wallets_max_fields?: Whitelisted_Wallets_Max_FieldsResolvers<ContextType>;
  whitelisted_wallets_min_fields?: Whitelisted_Wallets_Min_FieldsResolvers<ContextType>;
  whitelisted_wallets_mutation_response?: Whitelisted_Wallets_Mutation_ResponseResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  cached?: CachedDirectiveResolver<any, any, ContextType>;
};
