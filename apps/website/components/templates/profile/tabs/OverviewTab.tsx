import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getTimeZones } from '@vvo/tzdb';
import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Stack,
  Chip,
  Divider,
  Button,
} from '@mui/material';

import { query } from '../../../../constants/queries';
import { ROUTES } from '../../../../constants/routes';
import { useViewMode, ViewMode } from '../../../../hooks/use-view-modes';
import { useAuth } from '../../../../providers/auth';
import { gatewayProtocolSDK } from '../../../../services/gateway-protocol/api';
import { Users } from '../../../../services/hasura/types';
import { SessionUser } from '../../../../types/user';
import CredentialCard from '../../..//molecules/credential-card';
import Loading from '../../../atoms/loading';
import { a11yTabProps, TabPanel, useTab } from '../../../atoms/tabs';
import NewElementCard from '../../../molecules/new-element-card';
import { SectionWithSliderResponsive } from '../../../molecules/sections';
import { ExperienceAccordion } from './experience';
import { ReceivedTab } from './recommendations/ReceivedTab';

type Props = {
  user: PartialDeep<Users> | SessionUser;
  isPrivateProfile?: boolean;
  setActiveTab: (tab: number) => void;
};

export function OverviewTab({ user, isPrivateProfile, setActiveTab }: Props) {
  const { view, toggleView } = useViewMode();
  const { t } = useTranslation();
  const { activeTab, handleTabChange, setTab } = useTab();
  const router = useRouter();
  const { me } = useAuth();
  const canEdit = user === me;

  const TZ = getTimeZones();

  const tabs = [
    {
      key: 'overview',
      label: t('Received'),
      section: <ReceivedTab />,
    },
    {
      key: 'activity',
      label: t('Given'),
    },
  ];

  const timezone = TZ.find((timeZone) => {
    return (
      user.timezone === timeZone.name || timeZone.group.includes(user.timezone)
    );
  });
  const hourToTimezone = DateTime.local()
    .setLocale('en-US')
    .setZone(user?.timezone);

  const receivedCredentials = useQuery(
    [`${query.credentialsByRecipientUser}_home`, user.id],
    async () => {
      const result = await gatewayProtocolSDK.findCredentialsByRecipientUser({
        recipientUserId: user.id,
        skip: 0,
        take: 3,
      });
      return result.findCredentialsByRecipientUser;
    }
  );

  const issuedCredentials = useQuery(
    [`${query.credentialsByIssuerUser}_home`, user.id],
    async () => {
      const result = await gatewayProtocolSDK.findCredentialsByIssuerUser({
        issuerUserId: user.id,
        skip: 0,
        take: 3,
      });
      return result.findCredentialsByIssuerUser;
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
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          {isPrivateProfile && (
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
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          {isPrivateProfile && (
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
          </>
        </SectionWithSliderResponsive>
      </Stack>
    </Stack>
  );
}
