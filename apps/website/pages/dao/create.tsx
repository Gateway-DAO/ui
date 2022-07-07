import { TOKENS } from '@gateway/theme';

import { DashboardTemplate } from '../../components/templates/dashboard';
import { NewDAOTemplate } from '../../components/templates/new-dao';

export default function CreateDAO() {
  return <NewDAOTemplate />;
}

CreateDAO.auth = true;
