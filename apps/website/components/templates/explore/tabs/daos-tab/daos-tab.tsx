import { TOKENS } from '@gateway/theme';

import { ViewModule, ViewList } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';

import { usePropertyFilter } from '../../../../../hooks/use-property-filter';
import { useViewMode, ViewMode } from '../../../../../hooks/use-view-modes';
import { ChipDropdown } from '../../../../molecules/chip-dropdown';
import { DaoCard } from '../../../../molecules/dao-card';
import { ExploreProps } from '../../types';
import { TableView } from './table-view';

type Props = {
  daos: ExploreProps['daos'];
};

export function DaosTab({ daos }: Props) {
  const { view, toggleView } = useViewMode();
  const {
    selectedFilters,
    filteredItems: filteredDaos,
    availableFilters,
    toggleFilter,
    onClear,
  } = usePropertyFilter(daos, 'categories');

  return (
    <Box sx={{ py: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 4, px: TOKENS.CONTAINER_PX }}
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
            },
            gap: 2,
            px: TOKENS.CONTAINER_PX,
          }}
        >
          {filteredDaos.map((dao) => (
            <DaoCard key={`dao-${dao.id}`} {...dao} />
          ))}
        </Box>
      )}
      {view === ViewMode.table && <TableView daos={filteredDaos} />}
    </Box>
  );
}
