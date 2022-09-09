import Link from 'next/link';

import { useQuery } from 'react-query';

import { TOKENS } from '@gateway/theme';

import { ViewModule, ViewList, Add } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';
import MUICard from '@mui/material/Card';

import { ROUTES } from '../../../../../constants/routes';
import { usePropertyFilter } from '../../../../../hooks/use-property-filter';
import { useViewMode, ViewMode } from '../../../../../hooks/use-view-modes';
import { useAuth } from '../../../../../providers/auth';
import { EmptyCard } from '../../../../atoms/empty-card';
import { ChipDropdown } from '../../../../molecules/chip-dropdown';
import { GatesCard } from '../../../../molecules/gates-card';
import { useDaoProfile } from '../../context';
import { TableView } from './table-view';

export function GatesTab() {
  const { gqlAuthMethods } = useAuth();
  const { dao, isAdmin } = useDaoProfile();
  const { view, toggleView } = useViewMode();

  const gates = useQuery(
    ['dao-gates', dao?.id],
    () => gqlAuthMethods.dao_gates_tab({ id: dao?.id }),
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
    <Link key="create-credential" passHref href={newGateUrl}>
      <EmptyCard
        title="Create Credential"
        subtitle="Create your first Credential and help talents find you"
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
                    Create a Credential
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
                  <Link key="create-credential" passHref href={newGateUrl}>
                    <EmptyCard
                      title="Create Credential"
                      subtitle="Engage with your community"
                      component="a"
                      sx={{ height: '100%', width: '100%' }}
                    />
                  </Link>
                </MUICard>
              )}

              {filteredGates.map((gate) => (
                <GatesCard
                  key={`credential-${gate.id}`}
                  {...gate}
                  dao={dao}
                  showStatus={isAdmin}
                  showOptions
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
                title="No Credentials yet"
                subtitle="Follow us and get notificatons when a new Credential is created"
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
