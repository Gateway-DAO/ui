import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { EmptyCard } from '@/components/molecules/cards/empty-card';
import { GatesCard } from '@/components/molecules/cards/gates-card';
import { LoyaltyProgramCard } from '@/components/molecules/cards/loyalty-program-card';
import { SectionWithSliderResponsive } from '@/components/molecules/sections';
import DataGrid, {
  IColumnGrid,
} from '@/components/organisms/data-grid/data-grid';
import { query } from '@/constants/queries';
import { ROUTES } from '@/constants/routes';
import { Gates, Loyalty_Program, Users } from '@/services/hasura/types';
import { theme, TOKENS } from '@/theme';
import { useQueryClient } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';
import { v4 as uuid } from 'uuid';

import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

import DashboardCard from '../../../../protocol/components/dashboard-card';
import { useDaoProfile } from '../../context';
import { CreateOrgCardDashboard } from '@/components/templates/landing/create-org/create-org-dashboard';
import { useToggle } from 'react-use';
import CreateCredentialDialog from './dialog-structure';
import { CreateOrgCard } from '@/components/molecules/cards/create-org-card';
import CreateQuestDialog from './quest/dialog-structure';

type Props = {
  people: PartialDeep<Users>[];
  credentials: PartialDeep<Gates>[];
  setTab: (tab: number) => void;
  loyaltyPrograms: PartialDeep<Loyalty_Program>[];
};

export function OverviewTab({ setTab, credentials, loyaltyPrograms }: Props) {
  const { t } = useTranslation();
  const { dao, isAdmin, issuedCredentials, stats } = useDaoProfile();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const queryClient = useQueryClient();

  const [openCredentialCreationDialog, setOpenCredentialCreationDialog] =
    useToggle(false);

  const [openCreateQuestDialog, setOpenCreateQuestDialog] = useToggle(false);

  queryClient.removeQueries([query.org_pending_gate_creation]);

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
                  onClick={() => setDaoData()}
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

  const setDaoData = () => {
    if (dao.status === 'pending') {
      queryClient.setQueryData([query.org_pending_gate_creation], dao);
    }
  };

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
                  value={
                    stats?.protocol?.getTotalodCredentialsIssuedByOrganization
                  }
                />
              </Stack>
            </Stack>
          )}
          <CreateCredentialDialog
            open={openCredentialCreationDialog}
            toggleDialog={setOpenCredentialCreationDialog}
          />
          <CreateQuestDialog
            open={openCreateQuestDialog}
            toggleDialog={setOpenCreateQuestDialog}
          />
          {isAdmin && (
            <>
              <Stack px={TOKENS.CONTAINER_PX} mt={6}>
                <CreateOrgCard
                  title={'Create Credential'}
                  description={'Start creating quests or issuing credentials'}
                  buttonLabel={'CREATE NOW'}
                  buttonAction={() => setOpenCredentialCreationDialog(true)}
                />
              </Stack>
              <Divider sx={{ mt: 3 }} />
            </>
          )}
          <button onClick={() => setOpenCreateQuestDialog(true)}>
            openCreateQuestDialog
          </button>
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
        </Stack>
        {loyaltyPrograms && loyaltyPrograms.length > 0 && (
          <Stack mt={5}>
            <SectionWithSliderResponsive
              title={`${t('dao-profile:overview-tab.loyalty-section.title')}`}
              caption={`${t(
                'dao-profile:overview-tab.loyalty-section.caption'
              )}`}
              action={
                loyaltyPrograms.length > 0 && (
                  <Button onClick={() => setTab(2)}>
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
          </Stack>
        )}
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
                <Button onClick={() => setTab(3)}>
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
