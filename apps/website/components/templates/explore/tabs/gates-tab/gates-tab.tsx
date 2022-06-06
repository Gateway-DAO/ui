import { TOKENS } from '@gateway/theme';

import { AutoAwesomeMosaic, ViewList } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

import { Gates } from '../../../../../services/graphql/types.generated';
import { GatesCard } from '../../../../molecules/gates-card';
import { usePropertyFilter } from '../use-property-filter';
import { useViewMode, ViewMode } from '../use-view-modes';
import { TableView } from './table-view';

type Props = {
  gates: Gates[];
};

export default function GatesTab({ gates }: Props) {
  const { view, toggleView } = useViewMode();
  const {
    selectedFilters,
    filteredItems: filteredGates,
    availableFilters,
    toggleFilter,
  } = usePropertyFilter(gates, 'categories');

  return (
    <Box sx={{ px: TOKENS.CONTAINER_PX, py: 4 }}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 4 }}>
        <Stack direction="row" gap={1.5}>
          {availableFilters.map((filter) => {
            const isActive = selectedFilters.includes(filter);
            console.log(filter, isActive);
            return (
              <Chip
                key={`gates-tab-filter-${filter}`}
                label={filter}
                {...(isActive
                  ? { onDelete: () => toggleFilter(filter) }
                  : { onClick: () => toggleFilter(filter) })}
              />
            );
          })}
        </Stack>
        <IconButton
          type="button"
          onClick={toggleView}
          color="secondary"
          aria-label="Toggle View"
        >
          {view === ViewMode.grid ? <ViewList /> : <AutoAwesomeMosaic />}
        </IconButton>
      </Stack>
      {view === ViewMode.grid && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              md: 'repeat(4, 1fr)',
            },
            gap: 2,
          }}
        >
          {filteredGates.map((gate) => (
            <GatesCard key={`gate-${gate.id}`} {...gate} />
          ))}
        </Box>
      )}
      {view === ViewMode.table && <TableView gates={filteredGates} />}
    </Box>
  );
}
