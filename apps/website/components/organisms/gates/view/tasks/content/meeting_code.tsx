import { useState } from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const MeetingCodeContent = ({
  completed,
  updatedAt,
  completeTask,
  isLoading,
}) => {
  const [meetingCode, setMeetingCode] = useState('');
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  return (
    <Stack alignItems="start">
      <TextField
        fullWidth
        placeholder="Code"
        value={meetingCode}
        disabled={completed}
        onChange={(e) => setMeetingCode(e.target.value)}
        sx={{ margin: '20px 0' }}
      />
      {completed ? (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      ) : (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({ meeting_code: meetingCode })}
          isLoading={isLoading}
        >
          Submit
        </LoadingButton>
      )}
    </Stack>
  );
};

export default MeetingCodeContent;
