import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import TwitterConnectionCard from '@/components/features/gates/view/tasks/twitter/twitter-connection-card';
import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from 'react-use';

import { Twitter } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

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
          fontWeight: 400,
          fontSize: 14,
        }}
      >
        {t('tasks.twitter_tweet.description')}
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
          sx={{ mt: 1.75, ml: 1.25 }}
        >
          <Box
            sx={{
              backgroundColor: (theme) => theme.palette.grey[300],
              borderRadius: '50%',
              width: 40,
              height: 40,
            }}
          ></Box>
          <Stack direction={'column'} sx={{ ml: 1 }}>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.grey[300],
                borderRadius: 1,
                width: 100,
                height: 15,
                mb: 0.5,
              }}
            ></Box>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.grey[300],
                borderRadius: 0.5,
                width: 60,
                height: 10,
              }}
            ></Box>
          </Stack>
        </Stack>
        <Box sx={{ py: 0, px: 1.5 }}>
          <Typography
            variant="subtitle1"
            marginTop={1}
            sx={{
              color: '#212121',
              fontWeight: 400,
              fontSize: 16,
            }}
          >
            {tweet_text}
          </Typography>
        </Box>
        <Stack
          sx={{
            borderRadius: '0 0 8px 8px',
            px: 1.5,
            pt: 1,
            pb: 1.25,
            textAlign: 'right',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Twitter sx={{ color: '#1DA1F2' }} />
          {twitterKeys && !completed && (
            <Button
              href={`https://twitter.com/intent/tweet?text=${encodeURI(
                tweet_text
              )}`}
              target="_blank"
              sx={{
                background: '#1DA1F2',
                color: (theme) => theme.palette.secondary.light,
                fontSize: 12,
                py: 0.75,
                px: 2,
                lineHeight: 2,
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
        {!twitterKeys && <TwitterConnectionCard />}
      </Stack>

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ mt: 2.5 }}
          onClick={() => checkTwitterTweet.mutate()}
          isLoading={isLoading || checkTwitterTweet.isLoading}
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

export default TwitterTweetContent;
