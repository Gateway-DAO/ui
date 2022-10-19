import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { PartialDeep } from 'type-fest';
import { v4 as uuid } from 'uuid';

import { Button, Divider, Stack } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import { Gates, Users } from '../../../../../services/graphql/types.generated';
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
  const { dao, isAdmin } = useDaoProfile();

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
          title={t('common:featured-credentials.title')}
          caption={t('common:featured-credentials.caption')}
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
        <SectionWithGrid
          title={t('common:featured-people.title')}
          caption={t('common:featured-people.caption')}
          action={
            <Button onClick={() => setTab(2)}>
              {t('common:featured-people.see-more')}
            </Button>
          }
        >
          {people.slice(0, 6).map((person) => (
            <PersonCard
              key={person.id}
              user={person}
              isAdmin={person.permissions.some(
                ({ permission }) => permission === 'dao_admin'
              )}
            />
          ))}
        </SectionWithGrid>
      </Stack>
    </Stack>
  );
}
