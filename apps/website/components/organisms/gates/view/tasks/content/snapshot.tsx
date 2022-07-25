import { Button, Stack, Typography } from '@mui/material';

const SnapshotContent = ({ data, completed, updatedAt, completeTask }) => {
  const { proposal_number, space_id } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

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
      {completed ? (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      ) : (
        <Button
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({})}
        >
          Check Snapshot
        </Button>
      )}
    </Stack>
  );
};

export default SnapshotContent;
