import { DaosTab, ExploreLayout } from '@/components/features/explore';
import { HeadContainer } from '@/components/molecules/head-container';

export default function Organizations() {
  return (
    <>
      <HeadContainer />
      <DaosTab />
    </>
  );
}

Organizations.PageLayout = ExploreLayout;
