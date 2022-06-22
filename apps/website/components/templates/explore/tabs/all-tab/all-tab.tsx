import useTranslation from 'next-translate/useTranslation';

import { Button, Divider, Stack } from '@mui/material';

import { DaoCard } from '../../../../molecules/dao-card';
import { GatesCard } from '../../../../molecules/gates-card';
import { PersonCard } from '../../../../molecules/person-card';
import {
  SectionWithSlider,
  SectionWithGrid,
} from '../../../../molecules/sections';
import { ExploreProps } from '../../types';

type Props = {
  setActiveTab: (tab: number) => void;
} & ExploreProps;

export function AllTab({ daos, gates, people, setActiveTab }: Props) {
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
        <SectionWithSlider
          title={t('featured-gates.title')}
          caption={t('featured-gates.caption')}
          action={
            <Button onClick={() => setActiveTab(1)}>
              {t('featured-gates.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(37.75)}
        >
          {gates.map((gate) => (
            <GatesCard key={gate.id} {...gate} />
          ))}
        </SectionWithSlider>
        <SectionWithSlider
          title={t('featured-daos.title')}
          caption={t('featured-daos.caption')}
          action={
            <Button onClick={() => setActiveTab(2)}>
              {t('featured-daos.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(51)}
        >
          {daos.map((dao) => (
            <DaoCard key={dao.id} {...dao} />
          ))}
        </SectionWithSlider>
        <SectionWithGrid
          title={t('featured-people.title')}
          caption={t('featured-people.caption')}
          action={
            <Button onClick={() => setActiveTab(3)}>
              {t('featured-people.see-more')}
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
