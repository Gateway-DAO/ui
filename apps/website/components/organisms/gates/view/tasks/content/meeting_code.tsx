import { useState } from 'react';

import { Button, Stack, TextField, Typography } from '@mui/material';

const MeetingCodeContent = ({ completed, updatedAt, completeTask }) => {
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
