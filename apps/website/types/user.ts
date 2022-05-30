import type { DefaultSession } from 'next-auth';

import { LoginMutation, Users } from '../services/graphql/types.generated';

export type SessionUser = Pick<Users, 'id'> & {
  isFirstTime: boolean;
} & DefaultSession['user'] &
  LoginMutation['login'];
