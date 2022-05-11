/* TODO: Gap using values */

import { DashboardTemplate } from '../components/templates/dashboard';
import { NewUserTemplate } from '../components/templates/new-user';

export default function NewUser() {
  return (
    <DashboardTemplate showExplore={false}>
      <NewUserTemplate />
    </DashboardTemplate>
  );
}
