import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { Button, Card, Divider, Stack, Typography } from '@mui/material';

import { DataModel } from '../../../../../services/gateway-protocol/types';
import { DaoCard } from '../../../../molecules/dao-card';
import { DataModelCard } from '../../../../molecules/data-model-card';
import { GatesCard } from '../../../../molecules/gates-card';
import { PersonCard } from '../../../../molecules/person-card';
import {
  SectionWithSliderResponsive,
  SectionWithGrid,
} from '../../../../molecules/sections';
import { ExploreProps } from '../../types';
import Banner from './banner/banner';
import Cred from './cred/cred';

type Props = {
  setActiveTab: (tab: number) => void;
  dataModels: PartialDeep<DataModel>[];
} & ExploreProps;

export function AllTab({
  daos,
  gates,
  people,
  dataModels,
  setActiveTab,
}: Props) {
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
      <Banner />
      <Cred />
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
          title={t('featured-credentials.title')}
          caption={t('featured-credentials.caption')}
          action={
            <Button onClick={() => setActiveTab(1)}>
              {t('featured-credentials.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          {gates
            .filter((gate) => gate.published === 'published')
            .map((gate) => (
              <GatesCard key={gate.id} {...gate} />
            ))}
        </SectionWithSliderResponsive>
        <SectionWithSliderResponsive
          title={t('featured-data-models.title')}
          caption={t('featured-data-models.caption')}
          action={
            <Button onClick={() => setActiveTab(2)}>
              {t('featured-data-models.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          {dataModels &&
            dataModels.map((model) => (
              <DataModelCard key={model.id} {...model} />
            ))}
        </SectionWithSliderResponsive>
        <SectionWithSliderResponsive
          title={t('featured-organizations.title')}
          caption={t('featured-organizations.caption')}
          action={
            <Button onClick={() => setActiveTab(2)}>
              {t('featured-organizations.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(41)}
        >
          {daos.map((dao) => (
            <DaoCard key={dao.id} {...dao} />
          ))}
        </SectionWithSliderResponsive>
        <SectionWithGrid
          title={t('featured-people.title')}
          caption={t('featured-people.caption')}
          action={null}
        >
          {people.map((person) => (
            <PersonCard key={person.id} user={person} />
          ))}
        </SectionWithGrid>
      </Stack>
    </Stack>
  );
}
