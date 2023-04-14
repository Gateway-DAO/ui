import { useQuery } from '@tanstack/react-query';

import { TOKENS } from '@gateway/theme';

import { Box, CircularProgress } from '@mui/material';

import { query } from '../../../../constants/queries';
import { ROUTES } from '../../../../constants/routes';
import { ViewMode, useViewMode } from '../../../../hooks/use-view-modes';
import { gqlAnonMethods } from '../../../../services/hasura/api';
import { LoyaltyProgramCard } from '../../../molecules/loyalty-program-card/loyalty-program-card';
import { TableView } from '../../dao-profile/tabs/gates-tab/table-view';

export default function PassesTab(): JSX.Element {
  const { view } = useViewMode();

  const { data: passes, isLoading } = useQuery([query.passes], async () => {
    return (await gqlAnonMethods.loyalty_programs()).loyalty_program;
  });
  return (
    <Box sx={{ py: 4 }}>
      {isLoading ? (
        <Box
          key="loading"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {view === ViewMode.grid && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: 2,
                px: TOKENS.CONTAINER_PX,
              }}
            >
              {passes.map((program) => (
                <LoyaltyProgramCard
                  href={ROUTES.LOYALTY_PROGRAM.replace('[id]', program.id)}
                  {...program}
                  key={program.id}
                />
              ))}
            </Box>
          )}
          {view === ViewMode.table && (
            <TableView data={passes} isGate showStatus />
          )}
        </>
      )}
    </Box>
  );
}
