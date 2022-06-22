import { Box } from '@mui/material';

import { ExploreProps } from '../../types';
import { TableView } from './table-view';

type Props = {
  people: ExploreProps['people'];
};

export function PeopleTab({ people }: Props) {
  return (
    <Box sx={{ py: 4 }}>
      <TableView people={people} />
    </Box>
  );
}
