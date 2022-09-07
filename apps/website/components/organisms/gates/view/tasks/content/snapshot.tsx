import { Button, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const SnapshotContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
  isAdmin,
}) => {
  const { proposal_number } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  return (
    <Stack marginTop={5} alignItems="start">
      <Typography variant="subtitle1" fontWeight={'bold'}>
        {proposal_number}
      </Typography>
      <Typography variant="caption">Specific Proposal Number</Typography>
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({})}
          isLoading={isLoading}
        >
          Check Snapshot
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default SnapshotContent;
