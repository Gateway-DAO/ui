import useTranslation from 'next-translate/useTranslation';

import { HeadContainer } from '../../components/molecules/head-container';
import { ExploreLayout, PassesTab } from '../../components/templates/explore';

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
