import useTranslation from 'next-translate/useTranslation';

import { DaosTab, ExploreLayout } from '@/components/features/explore';
import { HeadContainer } from '@/components/molecules/head-container';

export default function Organizations() {
  const { t } = useTranslation('explore');

  return (
    <>
      <HeadContainer
        title={t('meta-data.organizations-title')}
        description={t('meta-data.organizations-description')}
      />
      <DaosTab />
    </>
  );
}

Organizations.PageLayout = ExploreLayout;
