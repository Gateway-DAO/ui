import useTranslation from 'next-translate/useTranslation';

import { Button } from '@mui/material';

import { mockDaos } from '../__mock__/daos';
import { DaoCard } from '../components/molecules/dao-card';
import { GatesCard } from '../components/molecules/gates-card';
import { PersonCard } from '../components/molecules/person-card';
import {
  HomeTemplate,
  IndexSectionWithGrid,
  IndexSectionWithSlider,
} from '../components/templates/home';

export default function Index() {
  const { t } = useTranslation('dashboard-home');
  return (
    <HomeTemplate
      title={t('title', { name: 'Lucas Inacio' })}
      DashboardProps={{
        followingDaos: mockDaos,
      }}
    >
      <IndexSectionWithSlider
        title={t('featured-gates.title')}
        caption={t('featured-gates.caption')}
        action={<Button>{t('featured-gates.see-more')}</Button>}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <GatesCard key={id} />
        ))}
      </IndexSectionWithSlider>
      <IndexSectionWithSlider
        title={t('featured-daos.title')}
        caption={t('featured-daos.caption')}
        action={<Button>{t('featured-daos.see-more')}</Button>}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
          <DaoCard key={id} />
        ))}
      </IndexSectionWithSlider>
      <IndexSectionWithGrid
        title={t('featured-people.title')}
        caption={t('featured-people.caption')}
        action={<Button>{t('featured-people.see-more')}</Button>}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
          <PersonCard key={id} />
        ))}
      </IndexSectionWithGrid>
    </HomeTemplate>
  );
}
