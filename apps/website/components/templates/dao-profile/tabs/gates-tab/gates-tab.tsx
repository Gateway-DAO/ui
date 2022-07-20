import Link from 'next/link';

import { useQuery } from 'react-query';

import { TOKENS } from '@gateway/theme';

import { ViewModule, ViewList } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';

import { ROUTES } from '../../../../../constants/routes';
import { usePropertyFilter } from '../../../../../hooks/use-property-filter';
import { useViewMode, ViewMode } from '../../../../../hooks/use-view-modes';
import { gqlAnonMethods } from '../../../../../services/api';
import { EmptyCard } from '../../../../atoms/empty-card';
import { ChipDropdown } from '../../../../molecules/chip-dropdown';
import { GatesCard } from '../../../../molecules/gates-card';
import { useDaoProfile } from '../../context';
import { TableView } from './table-view';

export function GatesTab() {
  const { dao, isAdmin } = useDaoProfile();
  const { view, toggleView } = useViewMode();

  const gates = useQuery(
    ['dao-gates', dao?.id],
    () => gqlAnonMethods.dao_gates_tab({ id: dao?.id }),
    { enabled: !!dao?.id }
  );

  const {
    selectedFilters,
    filteredItems: filteredGates,
    availableFilters,
    toggleFilter,
    onClear,
  } = usePropertyFilter(gates.data?.daos_by_pk?.gates ?? [], 'categories');

  return (
    <Box sx={{ py: 4 }}>
      {gates.isSuccess && gates.data.daos_by_pk.gates.length > 0 && (
        <>
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
                  md: 'repeat(4, 1fr)',
                },
                gap: 2,
                px: TOKENS.CONTAINER_PX,
              }}
            >
              {filteredGates.map((gate) => (
                <GatesCard key={`gate-${gate.id}`} {...gate} />
              ))}
            </Box>
          )}
          {view === ViewMode.table && <TableView gates={filteredGates} />}
        </>
      )}

      {gates.isSuccess && !gates.data.daos_by_pk.gates.length && (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 4, px: TOKENS.CONTAINER_PX }}
        >
          {[
            !isAdmin && (
              <EmptyCard
                key="empty"
                title="No Gates yet"
                subtitle="Follow us and get notificatons when a new Gate is created"
                disabled
                sx={{ height: 440, maxWidth: { md: '25%' } }}
              />
            ),
            isAdmin && (
              <Link key="create-gate" passHref href={ROUTES.GATE_NEW}>
                <EmptyCard
                  title="Create Gate"
                  subtitle="Create your first Gate and help talents find you"
                  component="a"
                  sx={{ height: 440, maxWidth: { md: '25%' } }}
                />
              </Link>
            ),
          ]}
        </Stack>
      )}
    </Box>
  );
}
