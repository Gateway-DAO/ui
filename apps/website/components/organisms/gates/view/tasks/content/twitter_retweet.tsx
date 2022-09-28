import { useMutation, useQuery } from '@tanstack/react-query';
import { FaTwitter } from 'react-icons/fa';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useLocalStorage } from 'react-use';

import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';
import { useAuth } from '../../../../../../providers/auth';

const TwitterRetweetContent = ({
  data,
  completed,
  updatedAt,
  completeTask,
  readOnly,
  isLoading,
}) => {
  const { gqlAuthMethods } = useAuth();
  const { tweet_link } = data;
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [twitterKeys] = useLocalStorage<any>('twitter');
  const [_redirectURL, setRedirectURL] = useLocalStorage('redirectURL', null, {
    raw: true,
  });

  const { data: tweetData, isLoading: isLoadingTweetData } = useQuery(
    ['twitter-data'],
    async () => {
      try {
        const id = tweet_link.split('/').at(-1);
        const response = await gqlAuthMethods.twitter_tweet({
          id,
        });
        return response.get_twitter_tweet;
      } catch (error) {
        console.log(error);
      }
    }
  );

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

      if (data.twitter_retweet) {
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
          alignItems: 'center',
        }}
      >
        <Stack sx={{ width: '100%' }}>
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
        {tweetData && (
          <Stack
            sx={{
              background: 'white',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Stack>
              {!twitterKeys && (
                <Stack
                  sx={{ position: 'relative', background: '#1B97F0', p: 2 }}
                >
                  <Typography sx={{ fontWeight: '600', mb: 1 }}>
                    Connect your account
                  </Typography>
                  <Stack
                    direction={'row'}
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>
                      To complete this task, you need to authorize Gateway
                      access your Twitter account.
                    </Typography>
                    <Button
                      onClick={() => connectTwitter.mutate()}
                      sx={{
                        background: (theme) => theme.palette.secondary.main,
                        color: 'black',
                        fontSize: '0.75rem',
                        padding: '6px 16px',
                        ml: 2,
                        lineHeight: '24px',
                        '&:hover': {
                          background: (theme) => theme.palette.text.secondary,
                        },
                      }}
                    >
                      Connect Twitter
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        )}
      </Stack>

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => checkForRetweet.mutate()}
          isLoading={isLoading}
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
