import { PartialDeep } from 'type-fest';

import { MeQuery, LoginMutation } from '../services/graphql/types.generated';

export type SessionUser = PartialDeep<
  Omit<MeQuery['me'] & LoginMutation['login'], '__typename'> & {
    __typename?: any;
  }
>;
