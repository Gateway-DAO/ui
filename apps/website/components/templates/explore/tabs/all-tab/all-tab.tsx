import useTranslation from 'next-translate/useTranslation';

import { Button, Divider, Stack } from '@mui/material';

import { DaoCard } from '../../../../molecules/dao-card';
import { DataModelCard } from '../../../../molecules/data-model-card';
import { GatesCard } from '../../../../molecules/gates-card';
import { PersonCard } from '../../../../molecules/person-card';
import {
  SectionWithSliderResponsive,
  SectionWithGrid,
} from '../../../../molecules/sections';
import { ExploreProps } from '../../types';

type Props = {
  setActiveTab: (tab: number) => void;
} & ExploreProps;

export function AllTab({ daos, gates, people, setActiveTab }: Props) {
  const { t } = useTranslation('explore');

  const dataModels = [
    {
      id: '01a2acec-3774-4e03-b315-42207d79615f',
      title: 'Model Felizardo',
      tags: ['person'],
      version: 1,
      description: 'Simple datamodel with firstname, lastname and age',
    },
    {
      id: '14765a96-3c6c-4ba3-bc06-273db08fb2b8',
      title: 'Model Ipsum',
      tags: ['person'],
      version: 1,
      description: 'Simple datamodel with firstname, lastname and age',
    },
    {
      id: '10581ad6-b2e5-4f8d-b72e-0e58c8feb380',
      title: 'Person Datamodel 3',
      tags: ['person'],
      version: 1,
      description: 'Simple datamodel with firstname, lastname and age',
    },
    {
      id: '081ce924-4f8a-4694-80d7-d0634833dcef',
      title: 'KYC Data Model',
      tags: ['kyc'],
      version: 1,
      description: 'Data Model for KYC Credentials',
    },
  ];

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
          action={
            <Button onClick={() => setActiveTab(3)}>
              {t('featured-people.see-more')}
            </Button>
          }
        >
          {people.map((person) => (
            <PersonCard key={person.id} user={person} />
          ))}
        </SectionWithGrid>
      </Stack>
    </Stack>
  );
}
