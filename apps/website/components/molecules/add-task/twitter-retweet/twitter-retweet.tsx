import dynamic from 'next/dynamic';
import { ChangeEvent, useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import {
  CreateGateTypes,
  TwitterRetweetDataError,
} from '../../../templates/create-gate/schema';

const TwitterRetweetTask = ({ taskId, deleteTask }) => {
  const {
    register,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useFormContext<CreateGateTypes>();

  const formValues = getValues();

  useEffect(() => {
    if (formValues.tasks.data[taskId]?.title === '') {
      setValue(`tasks.data.${taskId}.title`, 'Untitled Task');
    }
  }, [setValue, taskId, formValues.tasks.data]);

  const [taskVisible, setTaskVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tweetLink, setTweetLink] = useState('');

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
          value={tweetLink}
          {...register(`tasks.data.${taskId}.task_data.tweet_link`)}
          error={
            !!(errors.tasks?.data[taskId]?.task_data as TwitterRetweetDataError)
              ?.tweet_link
          }
          helperText={
            (errors.tasks?.data[taskId]?.task_data as TwitterRetweetDataError)
              ?.tweet_link?.message
          }
          onChange={(event) => {
            clearErrors(`tasks.data.${taskId}.task_data.tweet_link`);
            setTweetLink(event.target.value);
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
                {isLoading && <CircularProgress size={20} />}
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Stack>
  );
};

export default TwitterRetweetTask;
