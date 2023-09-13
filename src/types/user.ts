import {
  Protocol_Api_LoginOutput,
  MeQuery,
  Me_ProtocolQuery,
} from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

export type SessionToken = Omit<Protocol_Api_LoginOutput, 'user'> & {
  error?: any;
};

export type SessionUser = PartialDeep<MeQuery['me']> & {
  protocol?: PartialDeep<Me_ProtocolQuery['protocol']['me']>;
};
