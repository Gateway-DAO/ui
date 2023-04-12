import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS } from '@gateway/theme';

import { Stack, Typography } from '@mui/material';

import { Loyalty_Program } from '../../../../../services/hasura/types';
import { ClientNav } from '../../../../organisms/navbar/client-nav';
import { useLoyaltyProgramContext } from '../../LoyaltyProgramContext';
import { CredentialsList } from './CredentialsList';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
};

export function LoyaltyProgramMainContent({ loyalty }: Props) {
  const { totalPoints } = useLoyaltyProgramContext();

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
      <Typography variant="h6" sx={{ m: '0px 60px 16px' }}>
        Total Points: {totalPoints}
      </Typography>
      <CredentialsList gates={loyalty?.gates} />
      <Stack sx={{ m: '100px 60px' }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {loyalty.details}
        </ReactMarkdown>
      </Stack>
    </>
  );
}
