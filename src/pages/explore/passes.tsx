import { ExploreLayout, PassesTab } from '@/components/features/explore';
import { HeadContainer } from '@/components/molecules/head-container';

export default function Passes() {
  return (
    <>
      <HeadContainer />
      <PassesTab />
    </>
  );
}

Passes.PageLayout = ExploreLayout;
