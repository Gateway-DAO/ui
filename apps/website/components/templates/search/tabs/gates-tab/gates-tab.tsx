import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { ViewModule, ViewList } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material';

import { CATEGORIES } from '../../../../../constants/categories';
import { usePropertyFilter } from '../../../../../hooks/use-property-filter';
import { useViewMode, ViewMode } from '../../../../../hooks/use-view-modes';
import { Gates } from '../../../../../services/graphql/types.generated';
import { ChipDropdown } from '../../../../molecules/chip-dropdown';
import { GatesCard } from '../../../../molecules/gates-card';
import { TableView } from './table-view';

interface GatesTabProps {
  data: PartialDeep<Gates>[];
}

export function GatesTab({ data: gates }: GatesTabProps) {
  const { view, toggleView } = useViewMode();

  const {
    selectedFilters,
    filteredItems: filteredGates,
    availableFilters,
    toggleFilter,
    onClear,
  } = usePropertyFilter(gates ?? [], 'categories');

  const { t } = useTranslation('search');

  const router = useRouter();

  return (
    <Box sx={{ py: 4, width: '100%' }}>
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
      {gates?.length ? (
        <>
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
              {filteredGates.map((gate) => (
                <GatesCard key={`gate-${gate.id}`} {...gate} />
              ))}
            </Box>
          )}
          {view === ViewMode.table && <TableView gates={filteredGates} />}
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
            {CATEGORIES.GATES.map((dao, idx) => (
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
