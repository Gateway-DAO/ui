import { Daos } from '@/services/hasura/types';
import { PartialDeep } from 'type-fest';

import { BoxProps } from '@mui/material/Box';

export type DashboardTemplateProps = {
  currentDao?: PartialDeep<Daos>;
  containerProps?: BoxProps<'main'>;
  showExplore?: boolean;
};
