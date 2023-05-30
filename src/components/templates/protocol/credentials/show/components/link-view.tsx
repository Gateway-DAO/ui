import { Protocol_Api_CredentialData } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Link } from '@mui/material';

export function LinkView(data: PartialDeep<Protocol_Api_CredentialData>) {
  return (
    <Link sx={{ textDecoration: 'none' }} href={data?.value} target="_blank">
      {data?.value}
    </Link>
  );
}
