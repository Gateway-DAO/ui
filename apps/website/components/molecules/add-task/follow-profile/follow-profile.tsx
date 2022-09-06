import { useCallback, useEffect, useState } from 'react';

import debounce from 'lodash/debounce';
import { useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { gqlAnonMethods } from '../../../../services/api';
import { CircleWithNumber } from '../../../atoms/circle-with-number';
import {
  CreateGateTypes,
  TwitterFollowData,
  TwitterFollowDataError,
} from '../../../templates/create-gate/schema';

interface TwitterData {
  username?: string;
  name?: string;
  profile_image_url?: string;
  description?: string;
  followers?: number;
  following?: number;
  verified?: boolean;
}

export const FollowProfile = ({ taskId, deleteTask }) => {
  const [taskVisible, setTaskVisible] = useState(false);
  const [twitterData, setTwitterData] = useState<TwitterData>({});
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();

  useEffect(() => {
    setValue(`tasks.data.${taskId}.title`, 'Untitled Task');
  }, [setValue, taskId]);

  const getTwitterData = async () => {
    setLoading(true);
    const username = getValues(`tasks.data.${taskId}.task_data.username`);
    const response = await gqlAnonMethods.twitter_data({ username: username });
    console.log(response);
    setLoading(false);

    return setTwitterData(response.get_twitter_user_data);
  };

  const delayedQuery = useCallback(
    debounce(() => getTwitterData(), 500),
    []
  );

  const onHandleChange = () => {
    delayedQuery();
    setTwitterData({});
  };

  const numberFormat = (value) => {
    if (value < 10000) {
      return value;
    } else if (value < 1000000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else if (value < 1000000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
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
            <Typography variant="subtitle2">Follow Profile</Typography>
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
              id="follow-profile-title"
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
          id="follow-profile-description"
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
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
            mb: (theme) => theme.spacing(4),
          }}
        >
          The user must follow the profile
        </Typography>
        <Stack sx={{ position: 'relative' }}>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
              position: 'absolute',
              top: '15px',
              left: '15px',
            }}
          >
            https://twitter.com/
          </Typography>
          <Stack sx={{ position: 'relative' }}>
            {loading && (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  top: '15px',
                  right: '12px',
                }}
                size={24}
              />
            )}
            <TextField
              required
              InputLabelProps={{ shrink: true }}
              label="username"
              {...register(`tasks.data.${taskId}.task_data.username`, {
                onChange: () => onHandleChange(),
              })}
              maxRows={60}
              id="follow-profile-username"
              error={
                !!(errors.tasks?.data?.[taskId]?.task_data as TwitterFollowData)
                  ?.username
              }
              helperText={
                (
                  errors.tasks?.data?.[taskId]
                    ?.task_data as TwitterFollowDataError
                )?.username?.message
              }
              sx={{
                marginBottom: '60px',
                '& fieldset legend span': {
                  marginRight: '10px',
                },
                input: {
                  paddingLeft: '173px',
                },
              }}
            />
          </Stack>

          {Object.entries(twitterData).length > 0 && (
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
                    {numberFormat(twitterData?.following)}{' '}
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
                    {numberFormat(twitterData?.followers)}{' '}
                    <Typography component="span" sx={{ color: '#5B7083' }}>
                      Followers
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
      </FormControl>
    </Stack>
  );
};
