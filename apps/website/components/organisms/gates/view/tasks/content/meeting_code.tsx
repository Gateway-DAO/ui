import { useState } from 'react';

import { Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const MeetingCodeContent = ({
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
  isAdmin,
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
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({ meeting_code: meetingCode })}
          isLoading={isLoading}
        >
          Submit
        </LoadingButton>
      )}
      {completed && !!updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default MeetingCodeContent;
