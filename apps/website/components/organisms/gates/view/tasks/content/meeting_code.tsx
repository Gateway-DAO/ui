import { useState } from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';

const MeetingCodeContent = ({
  completed,
  updatedAt,
  completeTask,
  readOnly,
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
      {!readOnly && (
        <Button
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({ meeting_code: meetingCode })}
        >
          Submit
        </Button>
      )}
      {completed && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default MeetingCodeContent;
