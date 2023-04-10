import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS } from '@gateway/theme';

import { Stack } from '@mui/material';

import { Loyalty_Program } from '../../../../../services/hasura/types';
import { ClientNav } from '../../../../organisms/navbar/client-nav';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
};

export function LoyaltyProgramMainContent({ loyalty }: Props) {
  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          px: TOKENS.CONTAINER_PX,
          flexGrow: {
            md: 0.5,
          },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <ClientNav />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          margin: { xs: '16px 16px 40px 16px', md: '40px 60px 60px' },
        }}
      >
        <p>Loyalty Program Main Content</p>
      </Stack>
    </>
  );
}
