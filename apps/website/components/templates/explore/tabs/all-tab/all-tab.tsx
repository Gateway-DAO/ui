import useTranslation from 'next-translate/useTranslation';

import { PartialDeep } from 'type-fest';

import { Button, Divider, Stack } from '@mui/material';
import { brandColors, theme } from '@gateway/theme';

import { ROUTES } from '../../../../../constants/routes';
import { Protocol_Data_Model } from '../../../../../services/hasura/types';
import { DaoCard } from '../../../../molecules/dao-card';
import { DataModelCard } from '../../../../molecules/data-model-card';
import { GatesCard } from '../../../../molecules/gates-card';
import { LoyaltyProgramCard } from '../../../../molecules/loyalty-program-card/loyalty-program-card';
import { PersonCard } from '../../../../molecules/person-card';
import {
  SectionWithSliderResponsive,
  SectionWithGrid,
} from '../../../../molecules/sections';
import { ExploreProps } from '../../types';
import Banner from './banner/banner';
import { useRouter } from 'next/router';
import { CardEarnCredential } from './banner/card-earn-credential';
import { CardCreditScore } from './banner/card-credit-score';

type Props = {
  dataModels: PartialDeep<Protocol_Data_Model>[];
} & ExploreProps;

export function AllTab({
  daos,
  gates,
  people,
  dataModels,
  loyalty_program: passes,
}: Props) {
  const router = useRouter();
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
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        sx={{
          ml: { md: 5, xs: 0 },
          mr: { md: 5, xs: 2 },
          paddingBottom: 4,
          mt: '-2.5%',
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            rowGap: '20px',
            ml: 2,
          },
        }}
      >
        <CardCreditScore />
        <CardEarnCredential />
      </Stack>
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
            <Button
              id="explore-earn-button-viewmore"
              onClick={() => router.push(ROUTES.EXPLORE_EARN)}
            >
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
        {passes && passes.length > 0 && (
          <SectionWithSliderResponsive
            title={`${t('featured-passes.title')}`}
            caption={`${t('featured-passes.caption')}`}
            action={
              passes.length > 0 && (
                <Button
                  id="explore-pass-button-viewmore"
                  onClick={() => router.push(ROUTES.EXPLORE_PASSES)}
                >
                  {t('featured-passes.see-more')}
                </Button>
              )
            }
            itemWidth={(theme) => theme.spacing(37.75)}
            gridSize={{ lg: 4 }}
          >
            {passes.map((pass) => (
              <LoyaltyProgramCard
                href={ROUTES.LOYALTY_PROGRAM.replace('[id]', pass.id)}
                {...pass}
                key={pass.id}
              />
            ))}
          </SectionWithSliderResponsive>
        )}
        <SectionWithSliderResponsive
          title={t('featured-data-models.title')}
          caption={t('featured-data-models.caption')}
          action={
            <Button
              id="explore-issue-button-viewmore"
              onClick={() => router.push(ROUTES.EXPLORE_ISSUE)}
            >
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
            <Button
              id="explore-org-button-viewmore"
              onClick={() => router.push(ROUTES.EXPLORE_ORGANIZATIONS)}
            >
              {t('featured-organizations.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(41)}
        >
          
          {daos.map((dao) => (
            <DaoCard key={dao.id} {...dao} />
          ))}
        </SectionWithSliderResponsive>
      </Stack>
    </Stack>
  );
}
