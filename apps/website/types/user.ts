import { PartialDeep } from 'type-fest';

import { LoginMutation, MeQuery } from '../services/hasura/types';

export type SessionToken = Omit<
  LoginMutation['login'],
  '__typename' | 'expiry'
> & { error?: any };

export type SessionUser = PartialDeep<
  Omit<MeQuery['me'], '__typename'> & {
    __typename?: any;
  }
>;
