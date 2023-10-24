import { ExploreLayout, DataModelsTab } from '@/components/features/explore';
import { HeadContainer } from '@/components/molecules/head-container';

export default function Earn() {
  return (
    <>
      <HeadContainer />
      <DataModelsTab />
    </>
  );
}

Earn.PageLayout = ExploreLayout;
