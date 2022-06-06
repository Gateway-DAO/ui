import { TOKENS } from '@gateway/theme';

import { Box } from '@mui/material';

import { Users } from '../../../../../services/graphql/types.generated';
import { TableView } from './table-view';

type Props = {
  people: Users[];
};

export function PeopleTab({ people }: Props) {
  return (
    <Box sx={{ px: TOKENS.CONTAINER_PX, py: 4 }}>
      <TableView people={people} />
    </Box>
  );
}
