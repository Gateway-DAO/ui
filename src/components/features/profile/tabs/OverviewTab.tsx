import useTranslation from 'next-translate/useTranslation';

import CredentialCard from '@/components/molecules/cards/credential-card';
import NewElementCard from '@/components/molecules/cards/new-element-card';
import { SectionWithSliderResponsive } from '@/components/molecules/sections';
import { query } from '@/constants/queries';
import { ROUTES } from '@/constants/routes';
import { hasuraPublicService } from '@/services/hasura/api';
import { Users } from '@/services/hasura/types';
import { SessionUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { Typography, Stack, Divider, Button } from '@mui/material';

type Props = {
  user: PartialDeep<Users> | SessionUser;
  isPrivateProfile?: boolean;
  setActiveTab: (tab: number) => void;
};

export function OverviewTab({ user, isPrivateProfile, setActiveTab }: Props) {
  const { t } = useTranslation();

  const receivedCredentials = useQuery(
    [`${query.credentialsByRecipientUser}_home`, user.id],
    async () => {
      const result =
        await hasuraPublicService.protocol_find_credentials_by_recipient_user({
          recipientUserId: (user as SessionUser).protocol?.id || user.id,
          skip: 0,
          take: 3,
        });
      return result.protocol.findCredentialsByRecipientUser;
    }
  );

  const issuedCredentials = useQuery(
    [`${query.credentialsByIssuerUser}_home`, user.id],
    async () => {
      const result =
        await hasuraPublicService.protocol_find_credentials_by_issuer_user({
          issuerUserId: (user as SessionUser).protocol?.id || user.id,
          skip: 0,
          take: 3,
        });
      return result.protocol.findCredentialsByIssuerUser;
    }
  );
  return (
    <Stack
      direction="column"
      sx={{
        section: {
          py: 4,
        },
      }}
    >
      <Stack
        direction="column"
        divider={<Divider />}
        sx={{
          section: {
            py: 4,
          },
        }}
      >
        <SectionWithSliderResponsive
          title={t('common:profile.received')}
          caption=""
          action={
            <Button onClick={() => setActiveTab(1)}>
              {t('common:profile.received_see-more')}
            </Button>
          }
          gridSize={{ lg: 4 }}
        >
          {isPrivateProfile &&
            receivedCredentials &&
            receivedCredentials.data &&
            receivedCredentials.data.length === 0 && (
              <NewElementCard
                title={t('common:profile.earn-credential.title')}
                description={t('common:profile.earn-credential.description')}
                image="/images/new-credential-icon.png"
                url={ROUTES.EXPLORE}
              />
            )}
          <>
            {receivedCredentials &&
              receivedCredentials.data &&
              receivedCredentials.data.length > 0 && (
                <>
                  {receivedCredentials.data.map((credential) => (
                    <CredentialCard
                      isRecipient
                      key={credential.id}
                      {...credential}
                    />
                  ))}
                </>
              )}
            {receivedCredentials &&
              !isPrivateProfile &&
              receivedCredentials.data &&
              receivedCredentials.data.length === 0 && (
                <Typography
                  component="h5"
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                  variant="h6"
                >
                  No credentials yet
                </Typography>
              )}
          </>
        </SectionWithSliderResponsive>
        <SectionWithSliderResponsive
          title={t('common:profile.issued')}
          caption=""
          action={
            <Button onClick={() => setActiveTab(2)}>
              {t('common:profile.issued_see-more')}
            </Button>
          }
          gridSize={{ lg: 4 }}
        >
          {isPrivateProfile &&
            issuedCredentials &&
            issuedCredentials.data &&
            issuedCredentials.data.length === 0 && (
              <NewElementCard
                title={t('common:profile.issue-credential.title')}
                description={t('common:profile.issue-credential.description')}
                image="/images/new-credential-icon.png"
                url={ROUTES.EXPLORE}
              />
            )}
          <>
            {issuedCredentials &&
              issuedCredentials.data &&
              issuedCredentials.data.length > 0 && (
                <>
                  {issuedCredentials.data.map((credential) => (
                    <CredentialCard
                      isRecipient
                      key={credential.id}
                      {...credential}
                    />
                  ))}
                </>
              )}
            {issuedCredentials &&
              !isPrivateProfile &&
              issuedCredentials.data &&
              issuedCredentials.data.length === 0 && (
                <Typography
                  component="h5"
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                  variant="h6"
                >
                  No credentials yet
                </Typography>
              )}
          </>
        </SectionWithSliderResponsive>
      </Stack>
    </Stack>
  );
}
