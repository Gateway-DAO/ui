import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { TOKENS } from '@/theme';

import { Stack } from '@mui/material';

import { Loyalty_Program } from '@/services/hasura/types';
import { ClientNav } from '@/components/organisms/navbar/client-nav';
import LoyaltyProgramTemplate from './LoyaltyProgramTemplate';
import { CredentialsList } from './components/CredentialsList';
import { LoyaltySidebar } from './components/LoyaltySidebar';
import { Tier } from './components/Tier';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  protocolCredential?: PartialDeep<Credential>;
};

function MainContent({ loyalty }: Props) {
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
      {loyalty?.gates?.length > 0 && (
        <>
          <Tier loyalty={loyalty} />
          <CredentialsList gates={loyalty?.gates} loyalty={loyalty} />
        </>
      )}
      <Stack sx={{ mx: TOKENS.CONTAINER_PX, mb: { xs: 5, md: 12 } }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {loyalty.details}
        </ReactMarkdown>
      </Stack>
    </>
  );
}

export function LoyaltyProgram({ loyalty, protocolCredential }: Props) {
  return (
    <LoyaltyProgramTemplate
      sidebar={
        <LoyaltySidebar
          loyalty={loyalty}
          protocolCredential={protocolCredential}
        />
      }
      mainContent={<MainContent loyalty={loyalty} />}
    />
  );
}
