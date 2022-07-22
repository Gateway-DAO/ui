import { Button, Stack, Typography } from '@mui/material';

const SnapshotContent = ({ data, completeTask }) => {
  const { proposal_number, space_id } = data;

  return (
    <Stack marginTop={5} alignItems="start">
      <Typography variant="subtitle1" fontWeight={'bold'}>
        {proposal_number}
      </Typography>
      <Typography variant="caption">Specific Proposal Number</Typography>
      <Typography variant="subtitle1" fontWeight={'bold'} marginTop={2}>
        {space_id}
      </Typography>
      <Typography variant="caption">Space ID</Typography>
      <Button
        variant="contained"
        sx={{ marginTop: '15px' }}
        onClick={() => completeTask({})}
      >
        Check Snapshot
      </Button>
    </Stack>
  );
};

export default SnapshotContent;
