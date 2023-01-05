import { useQuery } from '@tanstack/react-query';

import { TOKENS } from '@gateway/theme';

import { ViewModule, ViewList } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Stack } from '@mui/material';

import { categoriesMap } from '../../../../../constants/dao';
import { usePropertyFilter } from '../../../../../hooks/use-property-filter';
import { useViewMode, ViewMode } from '../../../../../hooks/use-view-modes';
import { gqlAnonMethods } from '../../../../../services/hasura/api';
import { ChipDropdown } from '../../../../molecules/chip-dropdown';
import { DaoCard } from '../../../../molecules/dao-card';
import { TableView } from './table-view';

export function DaosTab() {
  const { view, toggleView } = useViewMode();
  /* TODO: !!!!!!!!!!!! WRITE PAGINATION!!!!!!!!!!!!!! */
  const { data: daos, isLoading } = useQuery(['daos-tab'], async () => {
    return (await gqlAnonMethods.daos_tab()).daos;
  });

  const {
    selectedFilters,
    filteredItems: filteredDaos,
    availableFilters,
    toggleFilter,
    onClear,
  } = usePropertyFilter(daos ?? [], 'categories', categoriesMap);

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
            key="daos-tab-filters"
          >
            <ChipDropdown
              label="Categories"
              values={availableFilters}
              selected={selectedFilters}
              onToggle={toggleFilter}
              onClear={onClear}
            />
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
        </>
      )}
    </Box>
  );
}
