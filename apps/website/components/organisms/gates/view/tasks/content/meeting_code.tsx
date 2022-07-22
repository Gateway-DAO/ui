import { useState } from 'react';

import { Button, Stack, TextField } from '@mui/material';

const MeetingCodeContent = ({ completeTask }) => {
  const [meetingCode, setMeetingCode] = useState('');

  return (
    <Stack alignItems="start">
      <TextField
        fullWidth
        placeholder="Meeting Code"
        value={meetingCode}
        onChange={(e) => setMeetingCode(e.target.value)}
        sx={{ marginTop: '20px' }}
      />
      <Button
        variant="contained"
        sx={{ marginTop: '15px' }}
        onClick={() => completeTask({ meeting_code: meetingCode })}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default MeetingCodeContent;
