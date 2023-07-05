import { Protocol_Api_AuthType } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

export type AuthenticationsItem = PartialDeep<{
  type: Protocol_Api_AuthType;
  data: {
    [x: string]: string;
  };
  user: {
    email: string;
  };
}>;

export type Modals = {
  type: 'remove' | 'add';
  email?: string;
};
