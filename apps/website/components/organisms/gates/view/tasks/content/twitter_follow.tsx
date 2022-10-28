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
import TwitterConnectionCard from './../../../../../../components/organisms/tasks/twitter-connection-card';
import useTranslation from 'next-translate/useTranslation';

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
  const { t } = useTranslation('gate-profile');

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
                    {t('tasks.twitter_follow.following')}
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
                    {t('tasks.twitter_follow.followers')}
                  </Typography>
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '8px',
                }}
              >
                <Box
                  sx={{
                    color: '#1B97F0',
                    fontSize: '20px',
                    marginTop: '10px',
                  }}
                >
                  <FaTwitter />
                </Box>
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
                      maxWidth: '90px',
                      '&:hover': {
                        background: '#1c95db',
                      },
                    }}
                  >
                    {t('tasks.twitter_follow.action')}
                  </Button>
                )}
              </Stack>
            </Stack>
            {!twitterKeys && (
              <TwitterConnectionCard />
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

export default TwitterFollowContent;
