import { ClientNav } from '@/components/organisms/navbar/client-nav';
import LeftSidebarTemplate from '@/components/templates/left-sidebar/left-sidebar';
import {
  Credentials,
  Loyalty_Program,
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

type MainContentProps = {
  loyalty: PartialDeep<Loyalty_Program>;
  loyaltyPoints: number;
  credentialsByLoyalty?: PartialDeep<Credentials>[];
  protocolCredential?: PartialDeep<Protocol_Credential>;
};

function MainContent({
  loyalty,
  loyaltyPoints = 0,
  credentialsByLoyalty,
  protocolCredential,
}: MainContentProps) {
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
            loyaltyPoints={loyaltyPoints}
            protocolCredentialId={protocolCredential?.id}
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

type LoyaltyProgramProps = {
  loyalty: PartialDeep<Loyalty_Program>;
  credentialsByLoyalty?: PartialDeep<Credentials>[];
  loyaltyCredential?: PartialDeep<Protocol_Credential>;
};

export function LoyaltyProgram({
  loyalty,
  loyaltyCredential,
  credentialsByLoyalty,
}: LoyaltyProgramProps) {
  return (
    <LeftSidebarTemplate
      sidebar={
        <LoyaltySidebar
          loyalty={loyalty}
          protocolCredential={loyaltyCredential}
          loyaltyPoints={loyaltyCredential?.claim?.points}
        />
      }
      mainContent={
        <MainContent
          loyalty={loyalty}
          protocolCredential={loyaltyCredential}
          credentialsByLoyalty={credentialsByLoyalty}
          loyaltyPoints={loyaltyCredential?.claim?.points}
        />
      }
    />
  );
}
