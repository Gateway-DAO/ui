import { useEffect, useRef, useState } from 'react';

import { EmojiStyle } from 'emoji-picker-react';
import { useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { TaskIcon } from '../../../../components/atoms/task-icon';
import {
  CreateGateData,
  TwitterTweetDataError,
} from '../../../templates/create-gate/schema';
import { EmojiPicker, EmojiPickerProps } from '../../form/emoji-picker';

const TwitterTweetTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<CreateGateData>();

  const formValues = getValues();
  const tweetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formValues.tasks[taskId]?.title === '') {
      setValue(`tasks.${taskId}.title`, 'Untitled Task');
    }
  }, [setValue, taskId, formValues.tasks]);

  const [taskVisible, setTaskVisible] = useState(true);
  const [taskIsMoving, setTaskIsMoving] = useState(true);
  const [emoji, setEmoji] = useState('');
  const [tweetText, setTweetText] = useState(
    formValues.tasks[taskId]?.task_data['tweet_text']
      ? formValues.tasks[taskId]?.task_data['tweet_text']
      : ''
  );

  useEffect(() => {
    if (
      tweetRef?.current?.selectionStart > 0 &&
      tweetRef?.current?.selectionStart < tweetText.length
    ) {
      const firstPart = tweetText.substring(
        0,
        tweetRef?.current?.selectionStart
      );
      const secondPart = tweetText.substring(
        tweetRef?.current?.selectionStart,
        tweetText.length
      );
      setTweetText(firstPart + emoji + secondPart);
      setValue(
        `tasks.${taskId}.task_data.tweet_text`,
        firstPart + emoji + secondPart
      );
    } else {
      setTweetText(tweetText + emoji);
      setValue(`tasks.${taskId}.task_data.tweet_text`, tweetText + emoji);
    }
  }, [emoji]);

  useEffect(() => {
    setTaskVisible(dragAndDrop);
    setTaskIsMoving(dragAndDrop);
  }, [dragAndDrop]);

  const emojiProps: EmojiPickerProps = {
    onEmoji: setEmoji,
    emojiStyle: EmojiStyle.TWITTER,
    boxSxProps: {
      position: 'absolute',
      top: '142px',
      left: '10px',
      zIndex: '2',
    },
    pickerSxProps: {
      position: 'absolute',
      left: { xs: '-40px', md: '0' },
    },
    iconColor: '#9B96A0',
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
          <TaskIcon type="twitter_tweet" sx={{ marginRight: 3 }} />
          <Stack>
            <Typography variant="subtitle2">Post Tweet</Typography>
            <TextField
              variant="standard"
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
              {...register(`tasks.${taskId}.title`)}
              error={!!errors.tasks?.[taskId]?.title}
              helperText={errors.tasks?.[taskId]?.title?.message}
            />
          </Stack>
        </Stack>
        {!taskIsMoving && (
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
        )}
      </Stack>
      <FormControl style={!taskVisible ? {} : { display: 'none' }}>
        <TextField
          required
          multiline
          minRows={3}
          label="Task Description"
          id="file-description"
          {...register(`tasks.${taskId}.description`)}
          error={!!errors.tasks?.[taskId]?.description}
          helperText={errors.tasks?.[taskId]?.description?.message}
          sx={{
            marginBottom: '60px',
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
        />
        <Typography variant="body2" sx={{ marginBottom: { xs: 1, md: 4 } }}>
          The user must post the tweet
        </Typography>
        <TextField
          required
          multiline
          maxLength={280}
          label="Tweet Text"
          id="tweet-text"
          value={tweetText}
          inputRef={tweetRef}
          {...register(`tasks.${taskId}.task_data.tweet_text`)}
          error={
            !!(errors.tasks?.[taskId]?.task_data as TwitterTweetDataError)
              ?.tweet_text
          }
          helperText={
            (errors.tasks?.[taskId]?.task_data as TwitterTweetDataError)
              ?.tweet_text?.message
          }
          onChange={(event) => {
            setTweetText(event.target.value);
          }}
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
                {tweetText.length < 279 && <EmojiPicker {...emojiProps} />}
              </InputAdornment>
            ),
          }}
        />
        <Typography
          variant="body2"
          style={{
            fontSize: '12px',
          }}
        >
          {tweetText.length}/280
        </Typography>
      </FormControl>
    </Stack>
  );
};
export default TwitterTweetTask;
