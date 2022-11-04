import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { FaTwitter } from 'react-icons/fa';
import { useLocalStorage } from 'react-use';

import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
} from '@mui/material';

import { LoadingButton } from '../../../../../atoms/loading-button';

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
        You must follow the profile
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
              flexGrow: 0
            }}
          ></Box>
          <Stack direction={'column'} sx={{ ml: 1, flexGrow: 1 }}>
            <Typography
              sx={{
                color: '#5B7083',
                size: '1rem',
                fontFamily: 'sans-serif',
                mb: '4px'
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
          >

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
                    To complete this task, you need to authorize Gateway
                    access your Twitter account.
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
      </Stack>

      {!readOnly && !completed && twitterKeys && (
        <LoadingButton
          variant="contained"
          sx={{ marginTop: '20px' }}
          onClick={() => checkTwitterFollow.mutate()}
          isLoading={isLoading || checkTwitterFollow.isLoading}
        >
          VERIFY
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

export default TwitterFollowContent;
