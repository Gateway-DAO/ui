import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS } from '@gateway/theme';

import { Stack } from '@mui/material';

import { Loyalty_Program } from '../../../../../services/hasura/types';
import { ClientNav } from '../../../../organisms/navbar/client-nav';
import { CredentialsList } from './CredentialsList';

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
          mt: 1,
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
      <CredentialsList gates={loyalty?.gates} />
    </>
  );
}
