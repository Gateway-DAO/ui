import { useMemo, useState } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Button, Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

import { Gates } from '../../../../../services/graphql/types.generated';
import { GatesCard } from '../../../../molecules/gates-card';
import { TableView } from './table-view';

type Props = {
  gates: Gates[];
};

enum ViewMode {
  grid,
  table,
}

export default function GatesTab({ gates }: Props) {
  const [view, setView] = useState<ViewMode>(ViewMode.table);
  const toggleView = () => {
    setView((oldView) =>
      oldView === ViewMode.grid ? ViewMode.table : ViewMode.grid
    );
  };
  const filters = useMemo(
    () =>
      gates.reduce(
        (set, gate) => (gate.categories ? set.add(gate.categories) : set),
        new Set<string>()
      ),
    [gates]
  );

  return (
    <Box sx={{ px: TOKENS.CONTAINER_PX, py: 4 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={1.5}>
          {Array.from(filters).map((filter) => (
            <Chip key={`filter-gate-${filter}`} label={filter} />
          ))}
        </Stack>
        <Button type="button" onClick={toggleView}>
          Toggle View
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            md: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        {view === ViewMode.grid &&
          gates.map((gate) => <GatesCard key={`gate-${gate.id}`} {...gate} />)}
        {view === ViewMode.table && <TableView gates={gates} />}
      </Box>
    </Box>
  );
}
