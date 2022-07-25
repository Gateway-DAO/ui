import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { ViewModule, ViewList } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography, Chip } from '@mui/material';

import { categories, categoriesMap } from '../../../../../constants/dao';
import { usePropertyFilter } from '../../../../../hooks/use-property-filter';
import { useViewMode, ViewMode } from '../../../../../hooks/use-view-modes';
import { Daos } from '../../../../../services/graphql/types.generated';
import { ChipDropdown } from '../../../../molecules/chip-dropdown';
import { DaoCard } from '../../../../molecules/dao-card';
import { TableView } from './table-view';

interface DAOsTabProps {
  data: PartialDeep<Daos>[];
}

export function DaosTab({ data: daos }: DAOsTabProps) {
  const { view, toggleView } = useViewMode();

  const {
    selectedFilters,
    filteredItems: filteredDaos,
    availableFilters,
    toggleFilter,
    onClear,
  } = usePropertyFilter(daos ?? [], 'categories', categoriesMap);

  const { t } = useTranslation('search');

  const router = useRouter();

  return (
    <Box sx={{ py: 4, width: '100%' }}>
      {daos?.length ? (
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
      ) : (
        <Stack
          sx={{
            px: TOKENS.CONTAINER_PX,
          }}
        >
          <Box
            sx={{
              marginBottom: 4,
            }}
          >
            <Typography variant="body1" color="#FFFFFFB2">
              {t('not-found.text1')}
            </Typography>
            <Typography variant="body1" color="#FFFFFFB2">
              {t('not-found.text2.all')}
            </Typography>
          </Box>
          <Stack direction="row" flexWrap="wrap">
            {categories.map((dao, idx) => (
              <Chip
                variant="filled"
                key={'cat-dao-' + idx}
                label={dao}
                sx={{
                  marginRight: 1,
                  marginBottom: 1,
                }}
                size="medium"
                clickable
                onClick={() => router.push(`/search/${dao}`)}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
