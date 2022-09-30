import { useMutation } from '@tanstack/react-query';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useLocalStorage } from 'react-use';

import { Box, Button, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

const TwitterRetweetContent = ({
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
  const [_redirectURL, setRedirectURL] = useLocalStorage('redirectURL', null, {
    raw: true,
  });

  const connectTwitter = useMutation(['connect-twitter'], async () => {
    try {
      const response = await fetch('/api/oauth/twitter/login');
      const data = await response.json();
      setRedirectURL(window.location.href);
      if (data.confirmed) {
        window.location.href = data.callbackURL;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  const checkForRetweet = useMutation(['check-twitter-retweet'], async () => {
    try {
      const twitterLocalStorage = twitterKeys;
      const response = await fetch('/api/oauth/twitter/retweet', {
        method: 'POST',
        body: JSON.stringify({
          accTkn: twitterLocalStorage.accTkn,
          accTknSecret: twitterLocalStorage.accTknSecret,
          tweet_link: tweet_link,
        }),
      });

      const data: any = await response.json();

      if (data) {
        completeTask({ twitter_retweet: data.twitter_retweet });
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
          borderRadius: '8px',
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
            fontWeight: '400',
            size: '.875rem',
            fontFamily: 'sans-serif',
          }}
        >
          You must retweet the post
        </Typography>
        <Stack sx={{ width: '100%', justifyContent: 'flex-start' }}>
          <TwitterTweetEmbed
            tweetId={tweet_link.split('/').at(-1)}
            options={{
              cards: 'hidden',
              conversation: 'none',
              display: 'flex',
              flex: 1,
              align: 'center',
              width: '100%',
            }}
          />
        </Stack>
        {twitterKeys && (
          <Button
            href={`https://twitter.com/intent/retweet?tweet_id=${tweet_link
              .split('/')
              .at(-1)}`}
            target="_blank"
            sx={{
              background: '#1DA1F2',
              color: (theme) => theme.palette.secondary.light,
              fontSize: '0.75rem',
              padding: '6px 16px',
              lineHeight: '24px',
              width: '100%',
              maxWidth: '550px',
              '&:hover': {
                background: '#1c95db',
              },
            }}
          >
            Retweet
          </Button>
        )}
        {!twitterKeys && (
          <Stack
            sx={{
              position: 'relative',
              background: '#1B97F0',
              p: 2,
              mt: 1,
              borderRadius: '8px',
              width: '100%',
              maxWidth: '550px',
            }}
          >
            <Stack
              direction={'row'}
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                verticalAlign: 'middle',
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: '600', mb: 1 }}>
                  Connect your account
                </Typography>
                <Typography sx={{ flexGrow: 1, opacity: 0.7 }}>
                  To complete this task, you need to authorize Gateway access
                  your Twitter account.
                </Typography>
              </Box>
              <Button
                onClick={() => connectTwitter.mutate()}
                sx={{
                  background: (theme) => theme.palette.grey[300],
                  color: 'black',
                  fontSize: '0.75rem',
                  padding: '6px 16px',
                  whiteSpace: 'nowrap',
                  lineHeight: '24px',
                  minWidth: '145px',
                  marginLeft: '15px',
                  boxShadow: '#444 1px 1px 2px',
                  flexGrow: 0,
                  '&:hover': {
                    background: (theme) => theme.palette.grey[400],
                  },
                }}
              >
                Connect Twitter
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => checkForRetweet.mutate()}
          isLoading={isLoading || checkForRetweet.isLoading}
        >
          VERIFY
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography color="#c5ffe3" variant="subtitle2">
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default TwitterRetweetContent;
