import { DashboardTemplate } from '../components/templates/dashboard';
import { ProfileTemplate } from '../components/templates/profile';

export default function Profile() {
  return (
    <DashboardTemplate showExplore={false}>
      <ProfileTemplate />
    </DashboardTemplate>
  );
}
