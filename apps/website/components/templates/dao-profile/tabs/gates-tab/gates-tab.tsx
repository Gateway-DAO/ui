import Link from 'next/link';

import { useQuery } from 'react-query';

import { TOKENS } from '@gateway/theme';

import { ViewModule, ViewList, Add } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';
import MUICard from '@mui/material/Card';

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
  const newGateUrl = `${ROUTES.GATE_NEW}?dao=${dao?.id}`;

  const newGateCard = (
    <Link key="create-gate" passHref href={newGateUrl}>
      <EmptyCard
        title="Create Gate"
        subtitle="Create your first Gate and help talents find you"
        component="a"
        sx={{ minHeight: 440, maxWidth: { md: '25%' } }}
      />
    </Link>
  );

  return (
    <Box sx={{ py: 4 }}>
      {gates.isSuccess && gates.data.daos_by_pk.gates.length > 0 && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 4, px: TOKENS.CONTAINER_PX }}
          >
            <Stack alignItems="flex-start" direction="row" gap={1.5}>
              {isAdmin && (
                <Link passHref href={newGateUrl}>
                  <Button variant="contained" startIcon={<Add />} size="small">
                    Create a Gate
                  </Button>
                </Link>
              )}
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
              {isAdmin && (
                <MUICard sx={{ position: 'relative' }}>
                  <Link key="create-gate" passHref href={newGateUrl}>
                    <EmptyCard
                      title="Create Gate"
                      subtitle="Keep engaging your team"
                      component="a"
                      sx={{ height: '100%', width: '100%' }}
                    />
                  </Link>
                </MUICard>
              )}

              {filteredGates.map((gate) => (
                <GatesCard
                  key={`gate-${gate.id}`}
                  {...gate}
                  dao={dao}
                  showStatus={isAdmin}
                />
              ))}
            </Box>
          )}
          {view === ViewMode.table && (
            <TableView gates={filteredGates} isGate showStatus />
          )}
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
            isAdmin && newGateCard,
          ]}
        </Stack>
      )}
    </Box>
  );
}
