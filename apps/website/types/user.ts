import { PartialDeep } from 'type-fest';

import { MeProtocolQuery } from '../services/gateway-protocol/types';
import { LoginMutation, MeQuery } from '../services/hasura/types';

export type SessionToken = Omit<
  LoginMutation['protocol']['login'],
  '__typename'
> & { error?: any };

export type SessionUser = PartialDeep<
  Omit<MeQuery['me'], '__typename'> & {
    __typename?: any;
  }
> & {
  protocol?: PartialDeep<MeProtocolQuery['me']>;
};
