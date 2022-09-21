import { useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { MdVerified } from 'react-icons/md';
import { useLocalStorage } from 'react-use';

import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

import { LoadingButton } from '../../../../../../components/atoms/loading-button';
import { useAuth } from '../../../../../../providers/auth';

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
  isAdmin,
}) => {
  const { gqlAuthMethods } = useAuth();
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [twitterKeys] = useLocalStorage<any>('twitter');
  const [_redirectURL, setRedirectURL] = useLocalStorage('redirectURL', null, {
    raw: true,
  });

  const { data: twitterData } = useQuery(['twitter-data'], async () => {
    try {
      const username = data.username;
      const response = await gqlAuthMethods.twitter_data({
        userName: username,
      });
      return response.get_twitter_user_data;
    } catch (error) {
      throw Error(error);
    }
  });

  const connectTwitter = useQuery(
    ['connect-twitter'],
    async () => {
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
    },
    {
      enabled: false,
    }
  );

  const checkTwitterFollow = useQuery(
    ['check-twitter-follow'],
    async () => {
      try {
        const twitterLocalStorage = twitterKeys;
        const response = await fetch('/api/oauth/twitter/follow', {
          method: 'POST',
          body: JSON.stringify({
            accTkn: twitterLocalStorage.accTkn,
            accTknSecret: twitterLocalStorage.accTknSecret,
            source_id: twitterLocalStorage.userId,
            target_id: twitterData.id,
          }),
        });

        const data: TwitterFollowData = await response.json();

        if (data.twitter_follow) {
          completeTask({ twitter_follow: data.twitter_follow });
        }
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: false,
    }
  );

  const numberFormat = (value: number) => {
    if (value < 10000) {
      return value;
    } else if (value < 1000000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else if (value < 1000000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
  };

  return (
    <Stack marginTop={5} alignItems="start">
      {twitterData && (
        <Stack
          sx={{
            background: 'white',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              background: '#CFD9DE',
              position: 'absolute',
              top: 0,
              zIndex: 0,
              height: 106,
              width: '100%',
            }}
          />
          <Avatar
            src={twitterData?.profile_image_url}
            alt={twitterData?.name}
            sx={{
              height: '96px',
              width: '96px',
              ml: 2,
              mt: 7,
              border: '4px solid white',
            }}
            variant="circular"
          />
          {twitterData?.verified}
          <Stack>
            <Stack sx={{ p: 2 }}>
              <Typography
                sx={{
                  color: '#0F1419',
                  fontWeight: 'bold',
                  size: '1.3125rem',
                  fontFamily: 'sans-serif',
                }}
              >
                {twitterData?.name}
              </Typography>
              <Typography
                sx={{
                  color: '#5B7083',
                  size: '1rem',
                  fontFamily: 'sans-serif',
                }}
              >
                {`@${twitterData?.username}`}
              </Typography>
              {twitterData?.verified && <MdVerified color="#1DA1F2" />}
              <Typography
                sx={{
                  color: '#0F1419',
                  size: '1rem',
                  mt: 1,
                  mb: 1,
                  fontWeight: '500',
                  fontFamily: 'sans-serif',
                }}
              >
                {twitterData?.description}
              </Typography>
              <Stack direction={'row'}>
                <Typography
                  sx={{
                    color: '#0F1419',
                    size: '1rem',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                  }}
                >
                  {numberFormat(twitterData?.public_metrics.following_count)}{' '}
                  <Typography component="span" sx={{ color: '#5B7083' }}>
                    Following
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    color: '#0F1419',
                    size: '1rem',
                    fontFamily: 'sans-serif',
                    fontWeight: '700',
                    ml: '19px',
                  }}
                >
                  {numberFormat(twitterData?.public_metrics.followers_count)}{' '}
                  <Typography component="span" sx={{ color: '#5B7083' }}>
                    Followers
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
            {!twitterKeys && (
              <Stack sx={{ position: 'relative', background: '#1B97F0', p: 2 }}>
                <Typography sx={{ fontWeight: '600', mb: 1 }}>
                  Connect your account
                </Typography>
                <Stack
                  direction={'row'}
                  sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Typography>
                    To complete this task, you need to authorize Gateway access
                    your Twitter account.
                  </Typography>
                  <Button
                    onClick={() => connectTwitter.refetch()}
                    sx={{
                      background: (theme) => theme.palette.secondary.main,
                      color: 'black',
                      fontSize: '0.75rem',
                      padding: '6px 16px',
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

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '15px' }}
          onClick={() => checkTwitterFollow.refetch()}
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

export default TwitterFollowContent;
