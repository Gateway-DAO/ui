import { useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { FaTwitter } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { useLocalStorage } from 'react-use';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../../../providers/auth';
import { LoadingButton } from '../../../../../atoms/loading-button';
import { numberFormat } from './../../../../../../components/molecules/add-task/twitter-follow-profile/twitter-follow-profile';

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
  const { gqlAuthMethods } = useAuth();
  const formattedDate = new Date(updatedAt.toLocaleString()).toLocaleString();
  const [twitterKeys] = useLocalStorage<any>('twitter');
  const [_redirectURL, setRedirectURL] = useLocalStorage('redirectURL', null, {
    raw: true,
  });

  const {
    data: twitterData,
    isLoading: isLoadingTwitterData,
    refetch,
  } = useQuery(['twitter-data'], async () => {
    try {
      const username = data.username;
      const response = await gqlAuthMethods.twitter_data({
        userName: username,
      });
      return response.get_twitter_user_data;
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    refetch();
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
          target_id: twitterData.id,
        }),
      });

      const data: TwitterFollowData = await response.json();

      if (data) {
        completeTask({ twitter_follow: data.twitter_follow });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Stack marginTop={5} alignItems="start">
      {isLoadingTwitterData && (
        <Stack
          sx={{
            background: (theme) => theme.palette.background.elevated,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            height: '250px',
            width: '100%',
          }}
        >
          <CircularProgress size={24} />
        </Stack>
      )}
      {twitterData && Object.entries(twitterData).length > 0 && (
        <Stack
          sx={{
            background: 'white',
            borderRadius: '8px',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
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
          <Stack>
            <Stack sx={{ p: 2, position: 'relative' }}>
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      display: 'flex',
                      color: '#0F1419',
                      fontWeight: 'bold',
                      size: '1.3125rem',
                      fontFamily: 'sans-serif',
                      alignItems: 'center',
                    }}
                  >
                    {twitterData?.name}
                    {twitterData.verified && (
                      <MdVerified size={20} color={'#1DA1F2'} />
                    )}
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
                </Box>
                <Box
                  sx={{
                    color: '#1B97F0',
                    fontSize: '20px',
                  }}
                >
                  <FaTwitter />
                </Box>
              </Stack>
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
              <Stack direction={'row'} alignItems={'center'}>
                <Typography
                  sx={{
                    color: '#0F1419',
                    size: '1rem',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                  }}
                >
                  {numberFormat(twitterData?.public_metrics?.following_count)}{' '}
                  <Typography component="span" sx={{ color: '#5B7083' }}>
                    Following
                  </Typography>
                </Typography>
                <Typography
                  sx={{
                    color: '#0F1419',
                    size: '1rem',
                    flexGrow: 1,
                    fontFamily: 'sans-serif',
                    fontWeight: '700',
                    ml: '19px',
                  }}
                >
                  {numberFormat(twitterData?.public_metrics?.followers_count)}{' '}
                  <Typography component="span" sx={{ color: '#5B7083' }}>
                    Followers
                  </Typography>
                </Typography>
                {twitterKeys && !completed && (
                  <Button
                    href={`https://twitter.com/intent/follow?screen_name=${twitterData?.username}`}
                    target="_blank"
                    sx={{
                      background: '#1DA1F2',
                      color: (theme) => theme.palette.secondary.light,
                      fontSize: '0.75rem',
                      padding: '6px 16px',
                      lineHeight: '24px',
                      width: '100%',
                      maxWidth: '200px',
                      '&:hover': {
                        background: '#1c95db',
                      },
                    }}
                  >
                    Follow
                  </Button>
                )}
              </Stack>
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
      )}

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
