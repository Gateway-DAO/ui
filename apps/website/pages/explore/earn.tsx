import { HeadContainer } from '../../components/molecules/head-container';
import { DashboardTemplate } from '../../components/templates/dashboard';
import { ExploreTemplate, GatesTab } from '../../components/templates/explore';

export default function Earn() {
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
        <GatesTab />
      </DashboardTemplate>
    </>
  );
}
