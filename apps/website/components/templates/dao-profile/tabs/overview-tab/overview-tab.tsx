import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { PartialDeep } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { theme, TOKENS } from '@gateway/theme';

import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import {
  Gates,
  Loyalty_Program,
  Users,
} from '../../../../../services/hasura/types';
import { EmptyCard } from '../../../../atoms/empty-card';
import { GatesCard } from '../../../../molecules/gates-card';
import { LoyaltyProgramCard } from '../../../../molecules/loyalty-program-card/loyalty-program-card';
import { SectionWithSliderResponsive } from '../../../../molecules/sections';
import DataGrid, {
  IColumnGrid,
} from '../../../../organisms/data-grid/data-grid';
import DashboardCard from '../../../protocol/components/dashboard-card';
import { useDaoProfile } from '../../context';

type Props = {
  people: PartialDeep<Users>[];
  credentials: PartialDeep<Gates>[];
  setTab: (tab: number) => void;
  loyaltyPrograms: PartialDeep<Loyalty_Program>[];
};

export function OverviewTab({
  people,
  setTab,
  credentials,
  loyaltyPrograms,
}: Props) {
  const { t } = useTranslation();
  const { dao, isAdmin, issuedCredentials, stats } = useDaoProfile();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const columns: IColumnGrid[] = [
    {
      column_name: 'credential_id',
      header_name: 'Credential ID',
    },
    {
      column_name: 'category',
      header_name: 'Category',
    },
    {
      column_name: 'recipient_id',
      header_name: 'Recipient ID',
    },
    {
      column_name: 'issuance_date',
      header_name: 'Issuance Date',
    },
    {
      column_name: 'status',
      header_name: 'Status',
    },
  ];

  const credentialsGrid = issuedCredentials
    ? { pages: [issuedCredentials] }
    : null;

  const gates = credentials ?? [];

  const newGateUrl = `${ROUTES.GATE_NEW}?dao=${dao?.id}`;

  const gateList = useMemo(() => {
    return [
      ...(isAdmin
        ? [
            <React.Fragment key={uuid()}>
              <Link key="create-credential" passHref href={newGateUrl}>
                <EmptyCard
                  title="Create Credential"
                  subtitle={
                    !gates.length
                      ? 'Create your first Credential and help talents find you'
                      : 'Engage with your community'
                  }
                  component="a"
                  sx={{ minHeight: 440 }}
                />
              </Link>
            </React.Fragment>,
          ]
        : []),
      ...gates.map((gate) => (
        <GatesCard {...gate} key={gate.id} showStatus={isAdmin} dao={dao} />
      )),
    ].slice(0, 4);
  }, [gates, isAdmin, newGateUrl]);

  const loyaltyProgramsList = useMemo(() => {
    return [
      ...loyaltyPrograms.map((program) => (
        <GatesCard {...program} key={program.id} showStatus dao={dao} />
      )),
    ].slice(0, 4);
  }, [loyaltyPrograms]);

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
        <Stack>
          {stats && (
            <Stack px={TOKENS.CONTAINER_PX} mt={6}>
              <Stack
                gap={isMobile ? 1 : 2}
                justifyContent="space-between"
                sx={{ flexDirection: { xs: 'column', md: 'row' }, mb: 2 }}
              >
                <DashboardCard
                  label={`${t(
                    'dao-profile:overview-tab.credentials_stats_card'
                  )}`}
                  value={dao.gates_aggregate?.aggregate?.count}
                />
                <DashboardCard
                  label={`${t(
                    'dao-profile:overview-tab.protocol_credentials_stats_card'
                  )}`}
                  value={stats?.getTotalodCredentialsIssuedByOrganization}
                />
              </Stack>
            </Stack>
          )}
          <SectionWithSliderResponsive
            title={`${t('dao-profile:overview-tab.credentials-section.title')}`}
            caption={`${t(
              'dao-profile:overview-tab.credentials-section.caption'
            )}`}
            action={
              gates.length > 0 && (
                <Button onClick={() => setTab(1)}>
                  {t('dao-profile:overview-tab.credentials-section.action')}
                </Button>
              )
            }
            itemWidth={(theme) => theme.spacing(37.75)}
            gridSize={{ lg: 4 }}
          >
            {gateList}
          </SectionWithSliderResponsive>
          {loyaltyPrograms && loyaltyPrograms.length > 0 && (
            <SectionWithSliderResponsive
              title={`${t('dao-profile:overview-tab.loyalty-section.title')}`}
              caption={`${t(
                'dao-profile:overview-tab.loyalty-section.caption'
              )}`}
              action={
                loyaltyPrograms.length > 0 && (
                  <Button onClick={() => setTab(1)}>
                    {t('dao-profile:overview-tab.loyalty-section.action')}
                  </Button>
                )
              }
              itemWidth={(theme) => theme.spacing(37.75)}
              gridSize={{ lg: 4 }}
            >
              {loyaltyPrograms.map((program) => (
                <LoyaltyProgramCard
                  href={ROUTES.LOYALTY_PROGRAM.replace('[id]', program.id)}
                  {...program}
                  key={program.id}
                />
              ))}
            </SectionWithSliderResponsive>
          )}
        </Stack>
        {issuedCredentials && issuedCredentials.length > 0 && (
          <Stack mt={5}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              px={TOKENS.CONTAINER_PX}
              mb={8}
            >
              <Box>
                <Typography variant="h6">
                  {t(
                    'dao-profile:overview-tab.issued-credentials-section.title'
                  )}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {t(
                    'dao-profile:overview-tab.issued-credentials-section.caption'
                  )}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: {
                    xs: 'none',
                    md: 'block',
                  },
                }}
              >
                <Button onClick={() => setTab(2)}>
                  {t(
                    'dao-profile:overview-tab.issued-credentials-section.action'
                  )}
                </Button>
              </Box>
            </Stack>
            <Stack mb={4}>
              <DataGrid columns={columns} data={credentialsGrid} />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
