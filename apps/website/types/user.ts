import { PartialDeep } from 'type-fest';

import { LoginMutation, MeQuery } from '../services/graphql/types.generated';

export type SessionToken = Omit<LoginMutation['login'], '__typename'>;

export type SessionUser = PartialDeep<
  Omit<MeQuery['me'], '__typename'> & {
    __typename?: any;
  }
>;
