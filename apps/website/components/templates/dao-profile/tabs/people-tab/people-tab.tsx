import { PartialDeep } from 'type-fest';

import { Box } from '@mui/material';

import { Users } from '../../../../../services/graphql/types.generated';
import { TableView } from './table-view';

type Props = {
  people: PartialDeep<Users>[];
};

export function PeopleTab({ people }: Props) {
  return (
    <Box sx={{ py: 4 }}>
      <TableView people={people ?? []} />
    </Box>
  );
}
