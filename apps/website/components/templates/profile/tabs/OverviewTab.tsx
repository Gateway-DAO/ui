import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

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

import { ROUTES } from '../../../../constants/routes';
import { useViewMode, ViewMode } from '../../../../hooks/use-view-modes';
import { useAuth } from '../../../../providers/auth';
import { Users } from '../../../../services/hasura/types';
import { SessionUser } from '../../../../types/user';
import { a11yTabProps, TabPanel, useTab } from '../../../atoms/tabs';
import NewElementCard from '../../../molecules/new-element-card';
import { SectionWithSliderResponsive } from '../../../molecules/sections';
import { ExperienceAccordion } from './experience';
import { ReceivedTab } from './recommendations/ReceivedTab';

type Props = {
  user: PartialDeep<Users> | SessionUser;
};

export function OverviewTab({ user }: Props) {
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

  const setActiveTab = (number: number) => console.log(number);

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
          <NewElementCard
            title={t('common:profile.new-credential.title')}
            description={t('common:profile.new-credential.description')}
            image="/images/new-credential-icon.png"
          />
          <Box></Box>
        </SectionWithSliderResponsive>
        <SectionWithSliderResponsive
          title={t('common:profile.issued')}
          caption=""
          action={
            <Button onClick={() => setActiveTab(1)}>
              {t('common:profile.issued_see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          <NewElementCard
            title={t('common:profile.new-credential.title')}
            description={t('common:profile.new-credential.description')}
            image="/images/new-credential-icon.png"
          />
          <Box></Box>
        </SectionWithSliderResponsive>
      </Stack>
    </Stack>
  );
}
