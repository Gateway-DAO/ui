import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { ExploreTemplate } from '../../components/templates/explore';
import DataModelsTab from 'apps/website/components/templates/explore/tabs/data-models-tab/data-models-tab';

/** TODO: Prevent template remount when navigating between dashboard pages
 * https://nextjs.org/docs/basic-features/layouts
 * */

export default function IssueDataModels() {
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
        <DataModelsTab />
      </DashboardTemplate>
    </>
  );
}
