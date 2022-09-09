import { useQuery } from '@tanstack/react-query';

import { Box, CircularProgress } from '@mui/material';

import { gqlAnonMethods } from '../../../../../services/api';
import { TableView } from './table-view';

export function PeopleTab() {
  const { data: people, isLoading } = useQuery(['people-tab'], async () => {
    return (await gqlAnonMethods.people_tab()).people;
  });
  return (
    <Box sx={{ py: 4 }}>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableView people={people ?? []} />
      )}
    </Box>
  );
}
