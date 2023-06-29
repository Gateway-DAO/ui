import Link from 'next/link';

import { EmptyCard } from '@/components/molecules/cards/empty-card';
import { GatesCard } from '@/components/molecules/cards/gates-card';
import { ChipDropdown } from '@/components/molecules/form/chip-dropdown';
import { ROUTES } from '@/constants/routes';
import { usePropertyFilter } from '@/hooks/use-property-filter';
import { useViewMode, ViewMode } from '@/hooks/use-view-modes';
import { TOKENS } from '@/theme';

import { ViewModule, ViewList, Add } from '@mui/icons-material';
import { Box, Button, IconButton, Stack } from '@mui/material';
import MUICard from '@mui/material/Card';

import { useDaoProfile } from '../../context';
import { TableView } from './table-view';

export function GatesTab({
  icon,
  title,
  subtitle,
  type,
}: {
  icon: string;
  title: string;
  subtitle: string;
  type: string;
}) {
  const {
    dao,
    isAdmin,
    credentialsTaskType,
    credentialsDirectType,
    setOpenCreateQuestDialog,
    setOpenCredentialCreationDialog,
  } = useDaoProfile();

  let gates = type == 'direct' ? credentialsDirectType : credentialsTaskType;
  const { view, toggleView } = useViewMode();

  const {
    selectedFilters,
    filteredItems: filteredGates,
    availableFilters,
    toggleFilter,
    onClear,
  } = usePropertyFilter(gates?.daos_by_pk?.gates ?? [], 'categories');
  const newGateUrl = `${ROUTES.DAO_PROFILE.replace(
    '[slug]',
    dao.slug
  )}#create-quest`;

  const newGateCard = (
    <Link key="create-credential" passHref href={newGateUrl}>
      <EmptyCard
        title="Create a"
        subtitle="Create your first Credential and help talents find you"
        component="a"
        sx={{ minHeight: 440, maxWidth: { md: '25%' } }}
      />
    </Link>
  );

  return (
    <Box sx={{ py: 4 }}>
      {!!gates && gates?.daos_by_pk?.gates.length > 0 && (
        <>
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
                  <Button
                    key="create-credential"
                    sx={{ height: '100%', p: 0 }}
                    onClick={() =>
                      type === 'direct'
                        ? setOpenCredentialCreationDialog(true)
                        : setOpenCreateQuestDialog(true)
                    }
                  >
                    <EmptyCard
                      title={title}
                      subtitle={subtitle}
                      component="a"
                      icon={icon}
                      sx={{ height: '100%', width: '100%' }}
                    />
                  </Button>
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
            <TableView data={filteredGates} isGate showStatus />
          )}
        </>
      )}

      {!!gates && !gates?.daos_by_pk?.gates.length && (
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
