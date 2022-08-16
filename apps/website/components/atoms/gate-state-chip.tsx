import { Chip } from '@mui/material';

const GateStateChip = ({ published }) => {
  const chipColor = published === ('published' || 'paused') ? 'green' : 'red';
  const chipLabel =
    published === ('published' || 'paused') ? 'Published' : 'Unpublished';
  return (
    <Chip
      aria-hidden={false}
      key={published}
      variant="outlined"
      label={chipLabel}
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
