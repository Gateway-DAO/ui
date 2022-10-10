import { useMutation } from '@tanstack/react-query';
import { useLocalStorage } from 'react-use';

import { Twitter } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';

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
        You must post the tweet
      </Typography>
      <Stack
        sx={{
          background: (theme) => theme.palette.secondary.light,
          justifyContent: 'space-between',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            padding: '0 12px',
          }}
        >
          <Typography
            variant="subtitle1"
            marginTop={2}
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
              Tweet
            </Button>
          )}
        </Stack>
        {!twitterKeys && (
          <Stack
            sx={{
              position: 'relative',
              background: '#1B97F0',
              p: 2,
              borderRadius: '0 0 8px 8px',
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
          sx={{ marginTop: '20px' }}
          onClick={() => checkTwitterTweet.mutate()}
          isLoading={isLoading || checkTwitterTweet.isLoading}
        >
          Verify
        </LoadingButton>
      )}
      {completed && updatedAt && (
        <Typography
          color="#c5ffe3"
          variant="subtitle2"
          sx={{ marginTop: '8px' }}
        >
          Task completed at {formattedDate}
        </Typography>
      )}
    </Stack>
  );
};

export default TwitterTweetContent;
