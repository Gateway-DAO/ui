import { useCallback, useEffect, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  CircularProgress,
  debounce,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useAuth } from '../../../../providers/auth';
import { CircleWithNumber } from '../../../atoms/circle-with-number';
import {
  CreateGateTypes,
  TwitterRetweetDataError,
} from '../../../templates/create-gate/schema';

const TwitterRetweetTask = ({ taskId, deleteTask }) => {
  const { gqlAuthMethods } = useAuth();
  const {
    register,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<CreateGateTypes>();

  const [taskVisible, setTaskVisible] = useState(false);
  const formValues = getValues();

  useEffect(() => {
    if (formValues.tasks.data[taskId]?.title === '') {
      setValue(`tasks.data.${taskId}.title`, 'Untitled Task');
    }
  }, [setValue, taskId, formValues.tasks.data]);

  const {
    mutate: getTwitterMutateTweet,
    data: twitterTweet,
    isLoading: isTwitterLoading,
  } = useMutation(['twitter-tweet'], async () => {
    try {
      const tweetLink = getValues(`tasks.data.${taskId}.task_data.tweet_link`);
      const tweetId = tweetLink.split('/').at(-1);
      const response = await gqlAuthMethods.twitter_tweet({
        id: tweetId,
      });
      return response.get_twitter_tweet;
    } catch (error) {
      if (error.message.includes('User is protected')) {
        return setError(`tasks.data.${taskId}.task_data.tweet_link`, {
          message: 'Tweet is protected',
        });
      }
      return setError(`tasks.data.${taskId}.task_data.tweet_link`, {
        message: 'Tweet not found',
      });
    }
  });

  const delayedQueryTweet = useCallback(
    debounce(() => getTwitterMutateTweet(), 500),
    []
  );

  const onHandleChangeTweet = () => {
    delayedQueryTweet();
  };

  return (
    <Stack
      sx={(theme) => ({
        padding: '50px',
        border: '2px solid rgba(229, 229, 229, 0.08)',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
          padding: '20px',
        },
      })}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        marginBottom={!taskVisible ? '40px' : 0}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          sx={{ width: '100%', mr: '20px' }}
        >
          <CircleWithNumber
            number={taskId + 1}
            sx={(theme) => ({
              mr: theme.spacing(3.75),
              [theme.breakpoints.down('sm')]: { mr: theme.spacing(2.5) },
            })}
          />
          <Stack>
            <Typography variant="subtitle2">Verification Code</Typography>
            <TextField
              variant="standard"
              autoFocus
              sx={{
                minWidth: { md: '600px', xs: '110%' },
                maxWidth: { xs: '100%', md: '110%' },
              }}
              InputProps={{
                style: {
                  fontSize: '20px',
                  fontWeight: 'bolder',
                },
                disableUnderline: true,
                sx: {
                  '&.Mui-focused': {
                    borderBottom: '2px solid #9A53FF',
                  },
                },
              }}
              id="file-title"
              {...register(`tasks.data.${taskId}.title`)}
              error={!!errors.tasks?.data?.[taskId]?.title}
              helperText={errors.tasks?.data?.[taskId]?.title?.message}
            />
          </Stack>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => deleteTask(taskId)}
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              cursor: 'pointer',
              marginRight: '20px',
              '&:hover': {
                color: theme.palette.text.primary,
              },
            })}
          >
            <DeleteIcon fontSize="medium" />
          </IconButton>
          {taskVisible ? (
            <IconButton
              onClick={() => setTaskVisible(false)}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              })}
            >
              <ExpandMore fontSize="medium" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setTaskVisible(true)}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              })}
            >
              <ExpandLess fontSize="medium" />
            </IconButton>
          )}
        </Box>
      </Stack>
      <FormControl style={!taskVisible ? {} : { display: 'none' }}>
        <TextField
          required
          multiline
          minRows={3}
          label="Task Description"
          id="file-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data?.[taskId]?.description}
          helperText={errors.tasks?.data?.[taskId]?.description?.message}
          sx={{
            marginBottom: '60px',
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
        />
        <Typography variant="body2" sx={{ marginBottom: { xs: 1, md: 4 } }}>
          The user must retweet the post
        </Typography>
        <TextField
          required
          label="Tweet Link"
          id="tweet-link"
          {...register(`tasks.data.${taskId}.task_data.tweet_link`, {
            onChange: () => onHandleChangeTweet(),
          })}
          error={
            !!(errors.tasks?.data[taskId]?.task_data as TwitterRetweetDataError)
              ?.tweet_link
          }
          helperText={
            (errors.tasks?.data[taskId]?.task_data as TwitterRetweetDataError)
              ?.tweet_link?.message
          }
          sx={{
            marginBottom: '10px',
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
          inputProps={{
            maxLength: 280,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {isTwitterLoading && <CircularProgress size={20} />}
              </InputAdornment>
            ),
          }}
        />
        {twitterTweet && Object.entries(twitterTweet).length > 0 && (
          <Stack sx={{ width: '100%', justifyContent: 'flex-start' }}>
            <TwitterTweetEmbed
              tweetId={getValues(`tasks.data.${taskId}.task_data.tweet_link`)
                ?.split('/')
                .at(-1)}
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
        )}
      </FormControl>
    </Stack>
  );
};

export default TwitterRetweetTask;
