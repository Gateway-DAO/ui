import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React, { useMemo } from 'react';

import DataGrid, {
  IColumnGrid,
} from 'apps/website/components/organisms/data-grid/data-grid';
import { PartialDeep } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { TOKENS } from '@gateway/theme';

import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import { Gates, Users } from '../../../../../services/hasura/types';
import { EmptyCard } from '../../../../atoms/empty-card';
import { GatesCard } from '../../../../molecules/gates-card';
import { PersonCard } from '../../../../molecules/person-card';
import {
  SectionWithSliderResponsive,
  SectionWithGrid,
} from '../../../../molecules/sections';
import { useDaoProfile } from '../../context';

type Props = {
  people: PartialDeep<Users>[];
  credentials: PartialDeep<Gates>[];
  setTab: (tab: number) => void;
};

export function OverviewTab({ people, setTab, credentials }: Props) {
  const { t } = useTranslation('explore');
  const { dao, isAdmin, issuedCredentials } = useDaoProfile();
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

  console.log(issuedCredentials, '$$$$$$$$$$$$$$$$$$$$$$$$$');

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
          title="Earn credentials"
          caption="People are really into these credentials. We thought you would too."
          action={
            gates.length > 0 && (
              <Button onClick={() => setTab(1)}>
                {t('common:featured-credentials.see-more')}
              </Button>
            )
          }
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          {gateList}
        </SectionWithSliderResponsive>
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
                <Typography variant="h6">Last issued credentials</Typography>
                <Typography variant="caption" color="text.secondary">
                  Lorem ipsum dolor et ex machina
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
                <Button onClick={() => setTab(1)}>View more</Button>
              </Box>
            </Stack>
            <Stack px={TOKENS.CONTAINER_PX} mb={4}>
              <DataGrid columns={columns} data={credentialsGrid} />
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
