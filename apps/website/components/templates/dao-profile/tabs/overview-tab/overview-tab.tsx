import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { Button, Divider, Stack } from '@mui/material';

import { Daos, Users } from '../../../../../services/graphql/types.generated';
import { GatesCard } from '../../../../molecules/gates-card';
import { PersonCard } from '../../../../molecules/person-card';
import {
  SectionWithSliderResponsive,
  SectionWithGrid,
} from '../../../../molecules/sections';

type Props = {
  dao: PartialDeep<Daos>;
  people: PartialDeep<Users>[];
  setTab: (tab: number) => void;
};

export function OverviewTab({ dao, people, setTab }: Props) {
  const { t } = useTranslation('explore');

  return (
    <Stack
      direction="column"
      sx={{
        section: {
          py: 4,
        },
      }}
    >
      {/* <NewsSection>
        <NewsItem isBig />
        <NewsItem />
        <NewsItem />
      </NewsSection> */}
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
            <Button onClick={() => setTab(1)}>
              {t('common:featured-gates.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          {dao.gates?.map((gate) => (
            <GatesCard key={gate.id} {...gate} />
          ))}
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
