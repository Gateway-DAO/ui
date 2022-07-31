import { Button, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const SnapshotContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  isLoading,
}) => {
  const { proposal_number } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  return (
    <Stack marginTop={5} alignItems="start">
      <Typography variant="subtitle1" fontWeight={'bold'}>
        {proposal_number}
      </Typography>
      <Typography variant="caption">Specific Proposal Number</Typography>
      {completed ? (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      ) : (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({})}
          isLoading={isLoading}
        >
          Check Snapshot
        </LoadingButton>
      )}
    </Stack>
  );
};

export default SnapshotContent;
