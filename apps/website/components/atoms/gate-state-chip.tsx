import { Chip } from '@mui/material';

type GateStateChipProps = {
  published: string;
  small?: boolean;
};

const GateStateChip = ({ published, small }: GateStateChipProps) => {
  return (
    <Chip
      aria-hidden={false}
      key={published}
      variant="outlined"
      label={published === 'published' ? 'Published' : 'Unpublished'}
      color={published === 'published' ? 'success' : 'error'}
      size={small ? 'small' : 'medium'}
      sx={{
        marginRight: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
      }}
    />
  );
};

export default GateStateChip;
