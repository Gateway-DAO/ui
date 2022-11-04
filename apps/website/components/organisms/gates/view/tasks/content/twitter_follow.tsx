import useTranslation from 'next-translate/useTranslation';

import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from 'react-use';

import { Box, Button, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../atoms/loading-button';
import TwitterConnectionCard from './../../../../../../components/organisms/tasks/twitter-connection-card';

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
          fontWeight: '400',
          size: '.875rem',
          fontFamily: 'sans-serif',
        }}
      >
        {t('tasks.twitter_follow.description')}
      </Typography>

      <Stack
        sx={{
          background: (theme) => theme.palette.secondary.light,
          justifyContent: 'space-between',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent="space-between"
          sx={{ m: '14px 10px 12px 10px' }}
        >
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.grey[300],
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              flexGrow: 0,
            }}
          ></Box>
          <Stack direction={'column'} sx={{ ml: 1, flexGrow: 1 }}>
            <Typography
              sx={{
                color: '#5B7083',
                size: '1rem',
                fontFamily: 'sans-serif',
                mb: '4px',
              }}
            >
              {data?.username}
            </Typography>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.grey[300],
                borderRadius: '4px',
                width: '60px',
                height: '10px',
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
                fontSize: '0.75rem',
                padding: '6px 16px',
                lineHeight: '24px',
                width: '100%',
                maxWidth: '90px',
                flexGrow: 0,
                '&:hover': {
                  background: '#1c95db',
                },
              }}
            >
              Follow
            </Button>
          )}
        </Stack>
        <Stack>
          <Stack
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: '8px',
            }}
          ></Stack>
          {!twitterKeys && <TwitterConnectionCard />}
        </Stack>
      </Stack>

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '20px' }}
          onClick={() => checkTwitterFollow.mutate()}
          isLoading={isLoading || checkTwitterFollow.isLoading}
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

export default TwitterFollowContent;
