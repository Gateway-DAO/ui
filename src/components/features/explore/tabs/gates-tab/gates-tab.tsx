import { GatesCard } from '@/components/molecules/cards/gates-card';
import { ChipDropdown } from '@/components/molecules/form/chip-dropdown';
import { usePropertyFilter } from '@/hooks/use-property-filter';
import { useViewMode, ViewMode } from '@/hooks/use-view-modes';
import { useAuth } from '@/providers/auth';
import { TOKENS } from '@/theme';
import { useQuery } from '@tanstack/react-query';

import { ViewModule, ViewList } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Stack } from '@mui/material';

import { TableView } from './table-view';

export function GatesTab() {
  const { hasuraUserService } = useAuth();
  const { view, toggleView } = useViewMode();
  const { data: gates, isLoading } = useQuery(['gates-tab'], async () => {
    return (await hasuraUserService.gates_tab()).gates;
  });

  const {
    selectedFilters,
    filteredItems: filteredGates,
    availableFilters,
    toggleFilter,
    onClear,
  } = usePropertyFilter(gates ?? [], 'categories');

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
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 4, px: TOKENS.CONTAINER_PX }}
            key="gates-tab-filters"
          >
            <Stack direction="row" gap={1.5}>
              <ChipDropdown
                label="Categories"
                values={availableFilters}
                selected={selectedFilters}
                onToggle={toggleFilter}
                onClear={onClear}
              />
            </Stack>
            <IconButton
              type="button"
              onClick={toggleView}
              color="secondary"
              aria-label="Toggle View"
            >
              {view === ViewMode.grid ? <ViewList /> : <ViewModule />}
            </IconButton>
          </Stack>
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
              {filteredGates
                .filter((gate) => gate.published === 'published')
                .map((gate) => (
                  <GatesCard
                    key={`gate-${gate.id}`}
                    {...gate}
                    showStatus={false}
                  />
                ))}
            </Box>
          )}
          {view === ViewMode.table && <TableView gates={filteredGates} />}
        </>
      )}
    </Box>
  );
}
