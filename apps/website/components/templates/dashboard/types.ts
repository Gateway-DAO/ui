import { BoxProps } from '@mui/material/Box';

import { Daos } from '../../../services/graphql/types.generated';

export type DashboardTemplateProps = {
  followingDaos?: Daos[];
  currentDao?: Daos;
  containerProps?: BoxProps<'main'>;
  showExplore?: boolean;
};
