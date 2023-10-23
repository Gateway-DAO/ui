import { ClientNav } from '@/components/organisms/navbar/client-nav';
import LeftSidebarTemplate from '@/components/templates/left-sidebar/left-sidebar';
import { Loyalty_Program, Protocol_Credential } from '@/services/hasura/types';
import { TOKENS } from '@/theme';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { Stack } from '@mui/material';

import { CredentialListItemSkeleton } from './components/credential-list-item-skeleton';
import { CredentialsList } from './components/credentials-list';
import { LoyaltySidebar } from './components/loyalty-sidebar';
import { Tier } from './components/tier';

type MainContentProps = {
  loyalty: PartialDeep<Loyalty_Program>;
  loyaltyPoints: number;
  pdas?: PartialDeep<Protocol_Credential>[];
  protocolCredential?: PartialDeep<Protocol_Credential>;
  isPDALoading?: boolean;
};

function MainContent({
  loyalty,
  loyaltyPoints = 0,
  pdas,
  protocolCredential,
  isPDALoading,
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
      <Tier
        loyalty={loyalty}
        loyaltyPoints={loyaltyPoints}
        protocolCredentialId={protocolCredential?.id}
        credential={protocolCredential}
      />
      {isPDALoading ? (
        <Stack>
          <CredentialListItemSkeleton />
          <CredentialListItemSkeleton />
          <CredentialListItemSkeleton />
          <CredentialListItemSkeleton />
          <CredentialListItemSkeleton />
        </Stack>
      ) : (
        loyalty?.gates?.length > 0 && <CredentialsList pdas={pdas} />
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
  credentialsByLoyalty?: PartialDeep<Protocol_Credential>[];
  loyaltyCredential?: PartialDeep<Protocol_Credential>;
  isGatesLoading?: boolean;
};

export function LoyaltyProgram({
  loyalty,
  loyaltyCredential,
  credentialsByLoyalty,
  isGatesLoading = false,
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
          isPDALoading={isGatesLoading}
          protocolCredential={loyaltyCredential}
          pdas={credentialsByLoyalty}
          loyaltyPoints={loyaltyCredential?.claim?.points}
        />
      }
    />
  );
}
