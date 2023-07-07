import {
  Protocol_Api_LoginOutput,
  MeQuery,
  Me_ProtocolQuery,
} from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

export type SessionToken = Omit<
  Protocol_Api_LoginOutput,
  '__typename' | 'user'
> & {
  error?: any;
};

export type SessionUser = PartialDeep<
  Omit<MeQuery['me'], '__typename'> & {
    __typename?: any;
  }
> & {
  protocol?: PartialDeep<Me_ProtocolQuery['protocol']['me']>;
};
