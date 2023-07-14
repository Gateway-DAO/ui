import useTranslation from 'next-translate/useTranslation';

import { CreateOrgCard } from '@/components/molecules/cards/create-org-card';
import { DaoCard } from '@/components/molecules/cards/dao-card';
import { ChipDropdown } from '@/components/molecules/form/chip-dropdown';
import OrgSignupDialog from '@/components/features/org/signup/dialog-structure';
import { categoriesMap } from '@/constants/dao';
import { usePropertyFilter } from '@/hooks/use-property-filter';
import { useViewMode, ViewMode } from '@/hooks/use-view-modes';
import { useAuth } from '@/providers/auth';
import { hasuraApi } from '@/services/hasura/api';
import { TOKENS } from '@/theme';
import { useQuery } from '@tanstack/react-query';
import { useToggle } from 'react-use';

import { ViewModule, ViewList } from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Stack } from '@mui/material';

import { TableView } from './table-view';

export function DaosTab() {
  const { t } = useTranslation('common');
  const [openSignUpOrgDialog, setSignUpOrgDialog] = useToggle(false);
  const { view, toggleView } = useViewMode();
  const { token, me } = useAuth();
  /* TODO: !!!!!!!!!!!! WRITE PAGINATION!!!!!!!!!!!!!! */
  const { data: daos, isLoading } = useQuery(['daos_tab'], async () => {
    return (await hasuraApi(token).daos_tab()).daos;
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
          <OrgSignupDialog
            open={openSignUpOrgDialog}
            toggleDialog={setSignUpOrgDialog}
          />
          <Stack sx={{ px: TOKENS.CONTAINER_PX }}>
            {/* TODO: Remove auth validation after finish login page */}
            {me && (
              <CreateOrgCard
                title={t('org-creation-card.title')}
                description={t('org-creation-card.description')}
                buttonLabel={t('org-creation-card.action')}
                buttonAction={() => setSignUpOrgDialog(true)}
              />
            )}
            <Stack
              direction="row"
              justifyContent="space-between"
              key="daos-tab-filters"
              sx={{ mb: 4 }}
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
