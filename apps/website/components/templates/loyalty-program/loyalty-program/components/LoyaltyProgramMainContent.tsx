import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS } from '@gateway/theme';

import { Stack } from '@mui/material';

import { Loyalty_Program } from '../../../../../services/hasura/types';
import { ClientNav } from '../../../../organisms/navbar/client-nav';
import { Tier } from '../../components/Tier';
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
      <Tier loyalty={loyalty} />
      <CredentialsList gates={loyalty?.gates} />
      <Stack sx={{ mx: TOKENS.CONTAINER_PX, my: { xs: 5, md: 12 } }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {loyalty.details}
        </ReactMarkdown>
      </Stack>
    </>
  );
}
