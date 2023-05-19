import { Gates } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { SessionUser } from '../types/user';

type Props = {
  gate: PartialDeep<Gates>;
  me: SessionUser;
};

export const isDaoAdmin = ({ me, gate }: Props) =>
  me?.permissions?.filter(
    (permission) =>
      permission.dao_id === gate?.dao?.id && permission.dao?.is_admin
  ).length > 0;
