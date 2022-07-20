import { Stack, Typography } from '@mui/material';

const SnapshotContent = ({ data }) => {
  const { proposal_number, space_id } = data;

  return (
    <Stack marginTop={5}>
      <Typography variant="subtitle1" fontWeight={'bold'}>
        {proposal_number}
      </Typography>
      <Typography variant="caption">Specific Proposal Number</Typography>
      <Typography variant="subtitle1" fontWeight={'bold'} marginTop={2}>
        {space_id}
      </Typography>
      <Typography variant="caption">Space ID</Typography>
    </Stack>
  );
};

export default SnapshotContent;
