import useTranslation from 'next-translate/useTranslation';

import { ExploreLayout, DataModelsTab } from '@/components/features/explore';
import { HeadContainer } from '@/components/molecules/head-container';

export function getStaticProps() {
  return {
    notFound: true,
  };
}
export default function Earn() {
  const { t } = useTranslation('explore');

  return (
    <>
      <HeadContainer
        title={t('meta-data.issue-title')}
        description={t('meta-data.issue-description')}
      />
      <DataModelsTab />
    </>
  );
}

Earn.PageLayout = ExploreLayout;
