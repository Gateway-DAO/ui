import { PartialDeep } from 'type-fest';

import { BoxProps } from '@mui/material/Box';

import { Daos } from '@/services/hasura/types';

export type DashboardTemplateProps = {
  currentDao?: PartialDeep<Daos>;
  containerProps?: BoxProps<'main'>;
  showExplore?: boolean;
};
