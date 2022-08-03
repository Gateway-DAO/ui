import { PartialDeep } from 'type-fest';

import { BoxProps } from '@mui/material/Box';

import { Daos } from '../../../services/graphql/types.generated';

export type DashboardTemplateProps = {
  currentDao?: PartialDeep<Daos>;
  containerProps?: BoxProps<'main'>;
  showExplore?: boolean;
};
