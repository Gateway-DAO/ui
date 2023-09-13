import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';

import { Stack, Typography } from '@mui/material';

const SnapshotContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { proposal_number } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const { t } = useTranslation('gate-profile');

  return (
    <Stack marginTop={5} alignItems="start">
      <Typography
        variant="subtitle1"
        fontWeight={'bold'}
        sx={{
          wordBreak: 'break-word',
        }}
      >
        {proposal_number}
      </Typography>
      <Typography variant="caption">
        {t('tasks.snapshot.specific_proposal_number')}
      </Typography>
      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => completeTask({})}
          isLoading={isLoading}
        >
          {t('common:actions.check-snapshot')}
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          {t('tasks.completed-date', { date: formattedDate })}
        </Typography>
      )}
    </Stack>
  );
};

export default SnapshotContent;
