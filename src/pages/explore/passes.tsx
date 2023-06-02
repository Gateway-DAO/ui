import useTranslation from 'next-translate/useTranslation';

import { ExploreLayout, PassesTab } from '@/components/features/explore';
import { HeadContainer } from '@/components/molecules/head-container';

export default function Passes() {
  const { t } = useTranslation('explore');

  return (
    <>
      <HeadContainer
        title={t('meta-data.passes-title')}
        description={t('meta-data.passes-description')}
      />
      <PassesTab />
    </>
  );
}

Passes.PageLayout = ExploreLayout;
