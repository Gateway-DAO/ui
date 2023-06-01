import { useCallback, useEffect, useState } from 'react';

import { TaskIcon } from '@/components/atoms/task-icon';
import {
  CreateGateData,
  TwitterLikeDataError,
} from '@/components/features/gates/create/schema';
import TextFieldWithEmoji from '@/components/molecules/form/TextFieldWithEmoji/TextFieldWithEmoji';
import { useAuth } from '@/providers/auth';
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

const TwitterLikeTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const { gqlAuthMethods } = useAuth();
  const {
    register,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useFormContext<CreateGateData>();

  const formValues = getValues();

  useEffect(() => {
    if (formValues.tasks[taskId]?.title === '') {
      setValue(`tasks.${taskId}.title`, 'Untitled Task');
    }
  }, [setValue, taskId, formValues.tasks]);

  useEffect(() => {
    setTaskVisible(dragAndDrop);
    setTaskIsMoving(dragAndDrop);
  }, [dragAndDrop]);

  const [taskVisible, setTaskVisible] = useState(true);
  const [taskIsMoving, setTaskIsMoving] = useState(true);

  const {
    mutate: getTwitterMutateTweet,
    data: twitterTweet,
    isLoading: isTwitterLoading,
  } = useMutation(['twitter-tweet'], async () => {
    try {
      const tweetLink = getValues(`tasks.${taskId}.task_data.tweet_link`);
      const tweetId = tweetLink.split('/').at(-1);
      const response = await gqlAuthMethods.twitter_tweet({
        id: tweetId,
      });
      return response.get_twitter_tweet;
    } catch (error) {
      if (error.message.includes('User is protected')) {
        return setError(`tasks.${taskId}.task_data.tweet_link`, {
          message: 'Tweet is protected',
        });
      }
      return setError(`tasks.${taskId}.task_data.tweet_link`, {
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
          padding: taskIsMoving ? '20px 20px 20px 40px' : '20px',
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
          sx={(theme) => ({
            width: '100%',
            mr: '20px',
            [theme.breakpoints.between('md', 'lg')]: {
              margin: '-22px',
            },
            [theme.breakpoints.between('lg', 'xl')]: {
              margin: '-22px',
            },
          })}
        >
          <TaskIcon
            type="twitter_retweet"
            sx={{ marginRight: 3, marginLeft: 4 }}
          />
          <Stack>
            <Typography variant="subtitle2">Like Post</Typography>
            <TextField
              variant="standard"
              sx={{
                minWidth: { md: '400px', xs: '110%', lg: '500px' },
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
              {...register(`tasks.${taskId}.title`)}
              error={!!errors.tasks?.[taskId]?.title}
              helperText={errors.tasks?.[taskId]?.title?.message}
            />
          </Stack>
        </Stack>
        {!taskIsMoving && (
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              [theme.breakpoints.between('md', 'lg')]: {
                marginLeft: '-55px',
              },
              [theme.breakpoints.between('lg', 'xl')]: {
                marginLeft: '-55px',
              },
            })}
          >
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
        )}
      </Stack>
      <FormControl style={!taskVisible ? {} : { display: 'none' }}>
        <TextFieldWithEmoji
          errors={errors}
          formValues={formValues}
          register={register}
          setValue={setValue}
          taskId={taskId}
        />
        <Typography variant="body2" sx={{ marginBottom: { xs: 1, md: 4 } }}>
          The user must Like the post
        </Typography>
        <TextField
          required
          label="Tweet Link"
          id="tweet-link"
          {...register(`tasks.${taskId}.task_data.tweet_link`, {
            onChange: () => onHandleChangeTweet(),
          })}
          error={
            !!(errors.tasks?.[taskId]?.task_data as TwitterLikeDataError)
              ?.tweet_link
          }
          helperText={
            (errors.tasks?.[taskId]?.task_data as TwitterLikeDataError)
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
              tweetId={getValues(`tasks.${taskId}.task_data.tweet_link`)
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
export default TwitterLikeTask;
