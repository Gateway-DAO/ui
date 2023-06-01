import useTranslation from 'next-translate/useTranslation';

import { HeadContainer } from '@/components/molecules/head-container';
import { GatesTab, ExploreLayout } from '@/components/features/explore';

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
