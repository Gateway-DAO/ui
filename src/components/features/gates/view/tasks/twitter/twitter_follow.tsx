import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import TwitterConnectionCard from '@/components/features/gates/view/tasks/twitter/twitter-connection-card';
import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from 'react-use';

import { Box, Button, Stack, Typography } from '@mui/material';

type TwitterFollowData = {
  twitter_follow: boolean;
};

const TwitterFollowContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [twitterKeys] = useLocalStorage<any>('twitter');
  const { t } = useTranslation('gate-profile');

  const checkTwitterFollow = useMutation(['check-twitter-follow'], async () => {
    try {
      const twitterLocalStorage = twitterKeys;
      const response = await fetch('/api/oauth/twitter/follow', {
        method: 'POST',
        body: JSON.stringify({
          accTkn: twitterLocalStorage.accTkn,
          accTknSecret: twitterLocalStorage.accTknSecret,
          source_id: twitterLocalStorage.userId,
          target_screen_name: data?.username,
        }),
      });

      const twitterData: TwitterFollowData = await response.json();

      if (twitterData) {
        completeTask({ twitter_follow: twitterData.twitter_follow });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Stack marginTop={5} alignItems="start">
      <Typography
        variant="subtitle1"
        marginBottom={2}
        sx={{
          color: (theme) => theme.palette.grey[500],
          fontWeight: 400,
          fontSize: 14,
        }}
      >
        {t('tasks.twitter_follow.description')}
      </Typography>

      <Stack
        sx={{
          background: (theme) => theme.palette.secondary.light,
          justifyContent: 'space-between',
          borderRadius: 1,
          width: '100%',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent="space-between"
          sx={{ mt: 1.75, mx: 1.25, mb: 1.5 }}
        >
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.grey[300],
              borderRadius: '50%',
              width: 40,
              height: 40,
              flexGrow: 0,
            }}
          ></Box>
          <Stack direction={'column'} sx={{ ml: 1, flexGrow: 1 }}>
            <Typography sx={{ color: '#5B7083', mb: 0.5 }}>
              {data?.username}
            </Typography>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.grey[300],
                borderRadius: 0.5,
                width: 60,
                height: 10,
              }}
            ></Box>
          </Stack>
          {!completed && (
            <Button
              href={`https://twitter.com/intent/follow?screen_name=${data?.username}`}
              target="_blank"
              sx={{
                background: '#1DA1F2',
                color: (theme) => theme.palette.secondary.light,
                fontSize: 12,
                py: 0.75,
                px: 2,
                lineHeight: 2,
                width: '100%',
                maxWidth: 90,
                flexGrow: 0,
                '&:hover': {
                  background: '#1c95db',
                },
              }}
            >
              {t('tasks.twitter_follow.action')}
            </Button>
          )}
        </Stack>
        <Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              pt: 1,
            }}
          ></Stack>
          {!twitterKeys && <TwitterConnectionCard />}
        </Stack>
      </Stack>

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ mt: 2.5 }}
          onClick={() => checkTwitterFollow.mutate()}
          isLoading={isLoading || checkTwitterFollow.isLoading}
        >
          {t('tasks.check_action')}
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2" sx={{ mt: 1 }}>
          {t('tasks.completed-date', { date: formattedDate })}
        </Typography>
      )}
    </Stack>
  );
};

export default TwitterFollowContent;
