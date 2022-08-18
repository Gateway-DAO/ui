import { useEffect, useState } from 'react';

import { Chip } from '@mui/material';

type GateStateChipProps = {
  published: string;
  small?: boolean;
};

const GateStateChip = ({ published, small }: GateStateChipProps) => {
  const [chipColor, setChipColor] = useState('');
  const [chipLabel, setChipLabel] = useState('');

  useEffect(() => {
    setChipColor(published === ('published' || 'paused') ? 'green' : 'red');
    setChipLabel(
      published === ('published' || 'paused') ? 'Published' : 'Unpublished'
    );
  }, [published]);

  return (
    <Chip
      aria-hidden={false}
      key={published}
      variant="outlined"
      label={chipLabel}
      size={small ? 'small' : 'medium'}
      sx={{
        color: chipColor,
        borderColor: chipColor,
        marginRight: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    />
  );
};

export default GateStateChip;
