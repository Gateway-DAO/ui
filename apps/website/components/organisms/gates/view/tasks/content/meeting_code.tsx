import { useState } from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';

const MeetingCodeContent = ({ completed, updatedAt, completeTask }) => {
  const [meetingCode, setMeetingCode] = useState('');

  return (
    <Stack alignItems="start">
      <TextField
        fullWidth
        placeholder="Meeting Code"
        value={meetingCode}
        disabled={completed}
        onChange={(e) => setMeetingCode(e.target.value)}
        sx={{ margin: '20px 0' }}
      />
      {completed ? (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {updatedAt}
        </Typography>
      ) : (
        <Button
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({ meeting_code: meetingCode })}
        >
          Submit
        </Button>
      )}
    </Stack>
  );
};

export default MeetingCodeContent;
