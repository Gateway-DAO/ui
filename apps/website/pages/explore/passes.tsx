import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { ExploreTemplate } from '../../components/templates/explore';

import PassesTab from 'apps/website/components/templates/dao-profile/tabs/passes-tab';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export default function Explore() {
  return (
    <>
      <HeadContainer />
      <DashboardTemplate
        containerProps={{
          sx: {
            pt: 2,
            overflow: 'hidden',
          },
        }}
      >
        <ExploreTemplate />
        <PassesTab />
      </DashboardTemplate>
    </>
  );
}
