import { PartialDeep } from 'type-fest';

import { MeQuery } from '../services/graphql/types.generated';

export type SessionUser = PartialDeep<
  Omit<MeQuery['me'], '__typename'> & {
    __typename?: any;
  }
>;
