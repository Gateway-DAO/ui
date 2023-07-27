import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { GatesCard } from '@/components/molecules/cards/gates-card';
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
import CreateCredentialDialog from './dialog-structure';
import { CreateOrgCard } from '@/components/molecules/cards/create-org-card';
import CreateQuestDialog from './quest/dialog-structure';
import CreateSendCredentialDialog from './direct-credential/dialog-structure';

type Props = {
  people: PartialDeep<Users>[];
  credentialsTaskType: PartialDeep<Gates>[];
  credentialsDirectType: PartialDeep<Gates>[];
  setTab: (tab: number) => void;
  loyaltyPrograms: PartialDeep<Loyalty_Program>[];
};

export function OverviewTab({
  setTab,
  credentialsTaskType,
  credentialsDirectType,
  loyaltyPrograms,
}: Props) {
  const { t } = useTranslation();
  const {
    dao,
    isAdmin,
    issuedCredentials,
    stats,
    openCreateQuestDialog,
    openCredentialCreationDialog,
    setOpenCreateQuestDialog,
    setOpenCredentialCreationDialog,
    setOpenSendDirectCredentialDialog,
    openSendDirectCredentialDialog,
  } = useDaoProfile();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const queryClient = useQueryClient();

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

  const gatesTaskType = credentialsTaskType ?? [];
  const gatesDirectType = credentialsDirectType ?? [];

  const newGateUrl = `${ROUTES.GATE_NEW}?dao=${dao?.id}`;

  const gateListTaskType = useMemo(() => {
    return [
      ...gatesTaskType.map((gate) => (
        <GatesCard {...gate} key={gate.id} showStatus={isAdmin} dao={dao} />
      )),
    ].slice(0, 4);
  }, [gatesTaskType, isAdmin, newGateUrl]);

  const gateListDirectType = useMemo(() => {
    return [
      ...gatesDirectType.map((gate) => (
        <GatesCard {...gate} key={gate.id} showStatus={isAdmin} dao={dao} />
      )),
    ].slice(0, 4);
  }, [gatesDirectType, isAdmin, newGateUrl]);

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
          <CreateSendCredentialDialog
            open={openSendDirectCredentialDialog}
            toggleDialog={setOpenSendDirectCredentialDialog}
          />
          {isAdmin && (
            <>
              <Stack px={TOKENS.CONTAINER_PX} mt={6}>
                <CreateOrgCard
                  icon={true}
                  title={t(
                    'dao-profile:overview-tab.create-credential-section.title'
                  )}
                  description={t(
                    'dao-profile:overview-tab.create-credential-section.description'
                  )}
                  buttonLabel={t(
                    'dao-profile:overview-tab.create-credential-section.cta'
                  )}
                  buttonAction={() => setOpenCredentialCreationDialog(true)}
                />
              </Stack>
              <Divider sx={{ mt: 3 }} />
            </>
          )}

          <SectionWithSliderResponsive
            title={`${t('dao-profile:overview-tab.credentials-section.title')}`}
            caption={`${t(
              'dao-profile:overview-tab.credentials-section.caption'
            )}`}
            action={
              gatesTaskType.length > 0 && (
                <Button onClick={() => setTab(1)}>
                  {t('dao-profile:overview-tab.credentials-section.action')}
                </Button>
              )
            }
            itemWidth={(theme) => theme.spacing(37.75)}
            gridSize={{ lg: 4 }}
          >
            {gateListTaskType}
          </SectionWithSliderResponsive>
        </Stack>
        {credentialsDirectType && credentialsDirectType.length > 0 && (
          <Stack mt={5}>
            <SectionWithSliderResponsive
              title={`${t(
                'dao-profile:overview-tab.issued-credentials-section.title'
              )}`}
              caption={`${t(
                'dao-profile:overview-tab.issued-credentials-section.caption'
              )}`}
              action={
                gatesTaskType.length > 0 && (
                  <Button onClick={() => setTab(2)}>
                    {t(
                      'dao-profile:overview-tab.issued-credentials-section.action'
                    )}
                  </Button>
                )
              }
              itemWidth={(theme) => theme.spacing(37.75)}
              gridSize={{ lg: 4 }}
            >
              {gateListDirectType}
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
