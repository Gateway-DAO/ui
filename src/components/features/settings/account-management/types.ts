import { Protocol_Api_Auth } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

export type AuthenticationsItem = PartialDeep<Protocol_Api_Auth>;

export type Modals = {
  type: 'remove' | 'add';
  authItem?: AuthenticationsItem;
};
