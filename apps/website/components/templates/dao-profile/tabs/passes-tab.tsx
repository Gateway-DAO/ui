import { TOKENS } from '@gateway/theme';

import { Box } from '@mui/material';

import { ROUTES } from '../../../../constants/routes';
import { useViewMode, ViewMode } from '../../../../hooks/use-view-modes';
import { LoyaltyProgramCard } from '../../../molecules/loyalty-program-card/loyalty-program-card';
import { useDaoProfile } from '../context';
import { TableView } from './gates-tab/table-view';

export default function PassesTab(): JSX.Element {
  const { loyaltyPrograms } = useDaoProfile();
  const { view } = useViewMode();

  return (
    <Box sx={{ py: 4 }}>
      {!!loyaltyPrograms && loyaltyPrograms.length > 0 && (
        <>
          {/* <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 4, px: TOKENS.CONTAINER_PX }}
          >
            <Stack alignItems="flex-start" direction="row" gap={1.5}></Stack>
            <IconButton
              type="button"
              onClick={toggleView}
              color="secondary"
              aria-label="Toggle View"
            >
              {view === ViewMode.grid ? <ViewList /> : <ViewModule />}
            </IconButton>
          </Stack> */}
          {view === ViewMode.grid && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
                px: TOKENS.CONTAINER_PX,
              }}
            >
              {loyaltyPrograms.map((program) => (
                <LoyaltyProgramCard
                  href={ROUTES.LOYALTY_PROGRAM.replace('[id]', program.id)}
                  {...program}
                  key={program.id}
                />
              ))}
            </Box>
          )}
          {view === ViewMode.table && (
            <TableView data={loyaltyPrograms} isGate showStatus />
          )}
        </>
      )}
    </Box>
  );
}
