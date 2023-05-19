import { CredentialData } from '@/services/gateway-protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Link } from '@mui/material';

export function LinkView(data: PartialDeep<CredentialData>) {
  return (
    <Link sx={{ textDecoration: 'none' }} href={data?.value} target="_blank">
      {data?.value}
    </Link>
  );
}
