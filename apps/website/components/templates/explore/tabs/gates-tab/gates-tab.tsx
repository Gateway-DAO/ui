import { useMemo } from 'react';

import { TOKENS } from '@gateway/theme';

import { Box, Stack } from '@mui/material';
import Chip from '@mui/material/Chip';

import { Gates } from '../../../../../services/graphql/types.generated';
import { GatesCard } from '../../../../molecules/gates-card';

type Props = {
  gates: Gates[];
};

export default function GatesTab({ gates }: Props) {
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
            <Chip key={filter} label={filter} />
          ))}
        </Stack>
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
        {gates.map((gate) => (
          <GatesCard key={gate.id} {...gate} />
        ))}
      </Box>
    </Box>
  );
}
