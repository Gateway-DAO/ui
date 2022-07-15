import useTranslation from 'next-translate/useTranslation';

import { Button, Divider, Stack } from '@mui/material';

import { DaoCard } from '../../../../molecules/dao-card';
import { GatesCard } from '../../../../molecules/gates-card';
import { PersonCard } from '../../../../molecules/person-card';
import { MintCard } from '../../../../molecules/mint-card';
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
          title={t('featured-gates.title')}
          caption={t('featured-gates.caption')}
          action={
            <Button onClick={() => setActiveTab(1)}>
              {t('featured-gates.see-more')}
            </Button>
          }
          itemWidth={(theme) => theme.spacing(37.75)}
          gridSize={{ lg: 4 }}
        >
          {gates.map((gate) => (
            <GatesCard key={gate.id} {...gate} />
          ))}
        </SectionWithSliderResponsive>
        <SectionWithSliderResponsive
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
          <MintCard
            image="https://f8n-production-collection-assets.imgix.net/0x5F4b303d4083E6dF6A516a338b2b2B40D2e65C3e/1/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&h=640"
            title="Olympus Odissey"
            description="This is the beginning of your journey in OlympusDAO. Learn about what hekkk dsjhfkjds ksfhdslkafj dsfklhdsalkfh dskjfhksadhf  fdskahflkash ffsdkjahfksahdfk dssjkfhkjdshf "
            categories={['Nuno', 'Manish', 'Farouk']}
            minted={false}
            nftURL="https://polygonscan.com/"
            tokenURI="dfsvcxvsgdsfsafdsfdsfdsfd"
          />
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
            <PersonCard key={person.id} {...person} />
          ))}
        </SectionWithGrid>
      </Stack>
    </Stack>
  );
}
