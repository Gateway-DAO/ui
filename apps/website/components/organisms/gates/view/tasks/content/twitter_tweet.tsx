import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from 'react-use';

import { Twitter } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';
import TwitterConnectionCard from '../../../../../../components/organisms/tasks/twitter-connection-card';
import useTranslation from 'next-translate/useTranslation';

type TwitterTweetData = {
  tweet_posted: boolean;
};

const TwitterTweetContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { tweet_text } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [twitterKeys] = useLocalStorage<any>('twitter');
  const { t } = useTranslation('gate-profile');

  const checkTwitterTweet = useMutation(['check-twitter-tweet'], async () => {
    try {
      const twitterLocalStorage = twitterKeys;
      const response = await fetch('/api/oauth/twitter/post', {
        method: 'POST',
        body: JSON.stringify({
          accTkn: twitterLocalStorage.accTkn,
          accTknSecret: twitterLocalStorage.accTknSecret,
          source_id: twitterLocalStorage.userId,
          tweet_text: tweet_text.trim(),
        }),
      });

      const data: TwitterTweetData = await response.json();

      if (data) {
        completeTask({ twitter_tweet: data.tweet_posted });
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
        {t('tasks.twitter_tweet.description')}
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
          sx={{ m: '14px 0 0 10px' }}
        >
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.grey[300],
              borderRadius: '50%',
              width: '40px',
              height: '40px',
            }}
          ></Box>
          <Stack direction={'column'} sx={{ ml: 1 }}>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.grey[300],
                borderRadius: '8px',
                width: '100px',
                height: '15px',
                mb: '4px',
              }}
            ></Box>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.grey[300],
                borderRadius: '4px',
                width: '60px',
                height: '10px',
              }}
            ></Box>
          </Stack>
        </Stack>
        <Box
          sx={{
            padding: '0 12px',
          }}
        >
          <Typography
            variant="subtitle1"
            marginTop={1}
            sx={{
              color: '#212121',
              fontWeight: '400',
              size: '1rem',
              fontFamily: 'sans-serif',
            }}
          >
            {tweet_text}
          </Typography>
        </Box>
        <Stack
          sx={{
            borderRadius: '0 0 8px 8px',
            padding: '8px 12px 10px',
            textAlign: 'right',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Twitter sx={{ color: '#1DA1F2' }} />
          {twitterKeys && !completed && (
            <Button
              href={`https://twitter.com/intent/tweet?text=${tweet_text}`}
              target="_blank"
              sx={{
                background: '#1DA1F2',
                color: (theme) => theme.palette.secondary.light,
                fontSize: '0.75rem',
                padding: '6px 16px',
                lineHeight: '24px',
                width: 'auto',
                '&:hover': {
                  background: '#1c95db',
                },
              }}
            >
              {t('tasks.twitter_tweet.action')}
            </Button>
          )}
        </Stack>
        {!twitterKeys && (
          <TwitterConnectionCard />
        )}
      </Stack>

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '20px' }}
          onClick={() => checkTwitterTweet.mutate()}
          isLoading={isLoading || checkTwitterTweet.isLoading}
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
          {t('tasks.completed')}{formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default TwitterTweetContent;
