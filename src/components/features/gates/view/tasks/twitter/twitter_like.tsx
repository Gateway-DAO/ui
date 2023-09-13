import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import TwitterConnectionCard from '@/components/features/gates/view/tasks/twitter/twitter-connection-card';
import { useMutation } from '@tanstack/react-query';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useLocalStorage } from 'react-use';

import { Box, Button, Stack, Typography } from '@mui/material';

const TwitterLikeContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { tweet_link } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [twitterKeys] = useLocalStorage<any>('twitter');
  const { t } = useTranslation('gate-profile');

  const checkForLike = useMutation(['check-twitter-retweet'], async () => {
    try {
      const twitterLocalStorage = twitterKeys;
      const response = await fetch('/api/oauth/twitter/like', {
        method: 'POST',
        body: JSON.stringify({
          accTkn: twitterLocalStorage.accTkn,
          accTknSecret: twitterLocalStorage.accTknSecret,
          tweet_link: tweet_link,
        }),
      });

      const data: any = await response.json();

      if (data) {
        completeTask({ twitter_like: data.twitter_like });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Stack marginTop={5} alignItems="start">
      <Stack
        width={'100%'}
        sx={{
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'left',
        }}
      >
        <Typography
          variant="subtitle1"
          marginBottom={2}
          sx={{
            color: (theme) => theme.palette.grey[500],
            fontWeight: 400,
            fontSize: 14,
          }}
        >
          {t('tasks.twitter_like.description')}
        </Typography>
        <Stack
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            background: (theme) => theme.palette.secondary.light,
            borderRadius: 1,
            maxWidth: 550,
          }}
        >
          <Box sx={{ pt: 0, px: 1.25, pb: 1.25 }}>
            <TwitterTweetEmbed
              tweetId={tweet_link.match(/status\/(\d+)/)[1]}
              options={{
                cards: 'hidden',
                conversation: 'none',
                display: 'flex',
                flex: 1,
                align: 'center',
                width: '100%',
              }}
            />
          </Box>
          <Stack
            sx={{
              flexDirection: 'row',
              pt: 0,
              px: 1.5,
              pb: 1.75,
            }}
          >
            {twitterKeys && !completed && (
              <Button
                href={`https://twitter.com/intent/like?tweet_id=${
                  tweet_link.match(/status\/(\d+)/)[1]
                }`}
                target="_blank"
                sx={{
                  background: '#1DA1F2',
                  color: (theme) => theme.palette.secondary.light,
                  fontSize: 12,
                  pt: 0.75,
                  px: 2,
                  lineHeight: 2,
                  width: '100%',
                  '&:hover': {
                    background: '#1c95db',
                  },
                }}
              >
                {t('tasks.twitter_like.action')}
              </Button>
            )}
          </Stack>
          {!twitterKeys && <TwitterConnectionCard maxWidth="550px" />}
        </Stack>
      </Stack>

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => checkForLike.mutate()}
          isLoading={isLoading || checkForLike.isLoading}
        >
          {t('tasks.check_action')}
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

export default TwitterLikeContent;
