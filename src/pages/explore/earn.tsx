import useTranslation from 'next-translate/useTranslation';

import { GatesTab, ExploreLayout } from '@/components/features/explore';
import { HeadContainer } from '@/components/molecules/head-container';

export default function Earn() {
  const { t } = useTranslation('explore');

  return (
    <>
      <HeadContainer
        title={t('meta-data.earn-title')}
        description={t('meta-data.earn-description')}
      />
      <GatesTab />
    </>
  );
}

Earn.PageLayout = ExploreLayout;
