import { ClientNav } from '@/components/organisms/navbar/client-nav';
import LeftSidebarTemplate from '@/components/templates/left-sidebar/left-sidebar';
import {
  Credentials,
  Loyalty_Program,
  Loyalty_Progress,
  Protocol_Credential,
} from '@/services/hasura/types';
import { TOKENS } from '@/theme';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';

import { CredentialsList } from './components/credentials-list';
import { LoyaltySidebar } from './components/loyalty-sidebar';
import { Tier } from './components/tier';

type Props = {
  loyalty: PartialDeep<Loyalty_Program>;
  loyaltyProgress: PartialDeep<Loyalty_Progress>;
  credentialsByLoyalty?: PartialDeep<Credentials>[];
  protocolCredential?: PartialDeep<Protocol_Credential>;
};

function MainContent({
  loyalty,
  credentialsByLoyalty,
  loyaltyProgress,
  protocolCredential,
}: Props) {
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
          <Tier
            loyalty={loyalty}
            loyaltyProgress={loyaltyProgress}
            protocolCredential={protocolCredential}
          />
          <CredentialsList
            gates={loyalty?.gates}
            credentialsByLoyalty={credentialsByLoyalty}
          />
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

export function LoyaltyProgram({
  loyalty,
  loyaltyProgress,
  credentialsByLoyalty,
}: Props) {
  return (
    <LeftSidebarTemplate
      sidebar={
        <LoyaltySidebar
          loyalty={loyalty}
          loyaltyProgress={loyaltyProgress}
          protocolCredential={loyaltyProgress?.loyalty_program_protocol}
        />
      }
      mainContent={
        <MainContent
          loyalty={loyalty}
          loyaltyProgress={loyaltyProgress}
          credentialsByLoyalty={credentialsByLoyalty}
          protocolCredential={loyaltyProgress?.loyalty_program_protocol}
        />
      }
    />
  );
}
