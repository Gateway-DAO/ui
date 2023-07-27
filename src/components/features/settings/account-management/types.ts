import { Protocol_Api_Auth } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { MigrationModalData } from './migration/migration-modal';

export type AuthenticationsItem = PartialDeep<Protocol_Api_Auth>;

export type Modals = {
  type: 'remove' | 'add' | 'migrate';
  authItem?: AuthenticationsItem;
  migrationData?: MigrationModalData;
};
