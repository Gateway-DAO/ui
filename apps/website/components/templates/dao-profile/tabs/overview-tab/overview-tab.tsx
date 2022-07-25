import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useMemo } from 'react';

import { PartialDeep } from 'type-fest';

import { Button, Divider, Stack } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import { Users } from '../../../../../services/graphql/types.generated';
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
  setTab: (tab: number) => void;
};

export function OverviewTab({ people, setTab }: Props) {
  const { t } = useTranslation('explore');
  const { dao, isAdmin } = useDaoProfile();

  const gates = dao?.gates ?? [];

  const newGateUrl = `${ROUTES.GATE_NEW}?dao=${dao?.id}`;

  const gateList = useMemo(() => {
    if (!gates.length) {
      return isAdmin
        ? [
            <Link key="create-gate" passHref href={newGateUrl}>
              <EmptyCard
                title="Create Gate"
                subtitle="Create your first Gate and help talents find you"
                component="a"
                sx={{ minHeight: 440 }}
              />
            </Link>,
          ]
        : [
            <EmptyCard
              key="empty"
              title="No Gates yet"
              subtitle="Follow us and get notificatons when a new Gate is created"
              disabled
              sx={{ minHeight: 440 }}
            />,
          ];
    }

    return gates.map((gate) => <GatesCard key={gate.id} {...gate} />);
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
          title={t('common:featured-gates.title')}
          caption={t('common:featured-gates.caption')}
          action={
            gates.length > 0 && (
              <Button onClick={() => setTab(1)}>
                {t('common:featured-gates.see-more')}
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
          {people.map((person) => (
            <PersonCard key={person.id} {...person} />
          ))}
        </SectionWithGrid>
      </Stack>
    </Stack>
  );
}
