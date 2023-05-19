import { CredentialData } from '@/services/gateway-protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack, alpha } from '@mui/material';

export function ImageView(data: PartialDeep<CredentialData>) {
  return (
    <Stack
      justifyContent="center"
      direction="row"
      sx={{
        background: alpha('rgba(0,0,0)', 0.25),
        mt: 1.5,
        borderRadius: 1,
        '& > img': {
          maxWidth: '350px',
        },
      }}
    >
      <img src={data?.value} alt={data?.label} width="100%" />
    </Stack>
  );
}
