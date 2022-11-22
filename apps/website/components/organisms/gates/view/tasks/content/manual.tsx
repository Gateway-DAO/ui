import useTranslation from 'next-translate/useTranslation';

import { useMutation } from '@tanstack/react-query';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../atoms/loading-button';

type ManualData = {
  manual: boolean;
};

const ManualContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { t } = useTranslation('gate-profile');
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();

  const checkManual = useMutation(['check-twitter-follow'], async () => {
    try {
      const response = await fetch('/api/oauth/twitter/follow', {
        method: 'POST',
        body: JSON.stringify({
          target_screen_name: data?.username,
        }),
      });

      const twitterData: ManualData = await response.json();

      if (twitterData) {
        completeTask({ manual: twitterData.manual });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Stack marginTop={5} alignItems="start">
      <Stack
        sx={{
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent="space-between"
          gap={2}
        >
          {!completed && (
            <>
              <TextField
                required
                label="Submit the link address"
                id="submit-link-address"
                sx={{ flexGrow: 1 }}
              />
              <Button size="large" variant="contained">
                {t('tasks.manual.action')}
              </Button>
            </>
          )}
        </Stack>
      </Stack>

      {!readOnly && !completed && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '20px' }}
          onClick={() => checkManual.mutate()}
          isLoading={isLoading || checkManual.isLoading}
        >
          {t('tasks.check_action')}
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography
          color="#c5ffe3"
          variant="subtitle2"
          sx={{ marginTop: '8px' }}
        >
          {t('tasks.completed')}
          {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default ManualContent;
