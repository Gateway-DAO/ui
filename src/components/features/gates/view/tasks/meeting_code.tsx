import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';

import { Stack, TextField, Typography } from '@mui/material';

const MeetingCodeContent = ({
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const [meetingCode, setMeetingCode] = useState('');
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const { t } = useTranslation('gate-profile');

  return (
    <Stack alignItems="start">
      <TextField
        fullWidth
        placeholder="Code"
        value={meetingCode}
        disabled={completed}
        onChange={(e) => setMeetingCode(e.target.value)}
        sx={{ my: 2.5 }}
      />
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => completeTask({ meeting_code: meetingCode })}
          isLoading={isLoading}
        >
          {t('common:submit')}
        </LoadingButton>
      )}
      {completed && !!updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          {t('tasks.completed-date', { date: formattedDate })}
        </Typography>
      )}
    </Stack>
  );
};

export default MeetingCodeContent;
