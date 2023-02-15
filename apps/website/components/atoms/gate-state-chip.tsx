import { Chip, ChipProps } from '@mui/material';

type GateStateChipProps = ChipProps & {
  published: string;
  small?: boolean;
};

const GateStateChip = ({ published, small }: GateStateChipProps) => {
  return (
    <Chip
      aria-hidden={false}
      variant="outlined"
      label={published === 'published' ? 'Published' : 'Unpublished'}
      color={published === 'published' ? 'success' : 'error'}
      size={small ? 'small' : 'medium'}
      sx={{
        marginRight: (theme) => theme.spacing(1),
        marginBottom: '8px',
      }}
    />
  );
};

export default GateStateChip;
