import { useEffect, useState, useRef } from 'react';

import normalizeUrl from 'normalize-url';
import { Controller, useFormContext } from 'react-hook-form';
import { setErrorMap } from 'zod';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  FormLabel,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import {
  CreateGateTypes,
  SnapshotDataError,
} from '../../../templates/create-gate/schema';

const SnapshotTask = ({ taskId, deleteTask }) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    watch,
    control,
    setError,
    clearErrors,
  } = useFormContext<CreateGateTypes>();

  const formValues = getValues();

  useEffect(() => {
    if (formValues.tasks.data[taskId]?.title === '') {
      setValue(`tasks.data.${taskId}.title`, 'Untitled Requirement');
    }
    setValue(`tasks.data.${taskId}.task_type`, 'snapshot');
  }, [taskId, setValue, formValues.tasks.data]);

  const [taskVisible, setTaskVisible] = useState(false);

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
            <Typography variant="subtitle2">Snapshot Governance</Typography>
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
              id="task-title"
              {...register(`tasks.data.${taskId}.title`)}
              error={!!errors.tasks?.data[taskId]?.title}
              helperText={errors.tasks?.data[taskId]?.title?.message}
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
          label="Task Requirement"
          id="task-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data[taskId]?.description}
          helperText={errors.tasks?.data[taskId]?.description?.message}
          sx={{
            marginBottom: '60px',
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
        />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Stack direction="column" order={{ xs: 1, md: 0 }}>
            <TextField
              required
              label="Specific Proposal Number"
              sx={{ minWidth: { md: '50%', xs: '100%' } }}
              {...register(`tasks.data.${taskId}.task_data.proposal_number`)}
              error={
                !!(errors.tasks?.data[taskId]?.task_data as SnapshotDataError)
                  ?.proposal_number
              }
              helperText={
                (errors.tasks?.data[taskId]?.task_data as SnapshotDataError)
                  ?.proposal_number?.message
              }
            />
            {!(errors.tasks?.data[taskId]?.task_data as SnapshotDataError)
              ?.proposal_number && (
              <Typography
                variant="caption"
                marginTop={(theme) => theme.spacing(1)}
              >
                Pro tip: paste a Snapshot URL directly into the box to extract
                the proposal number
              </Typography>
            )}
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginBottom: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="body2">Created Proposal</Typography>
            <Controller
              control={control}
              defaultValue="proposal"
              name={`tasks.data.${taskId}.task_data.type`}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Switch
                  value={value == 'vote'}
                  onChange={(e) => {
                    const type = e.target.checked ? 'vote' : 'proposal';
                    setValue(`tasks.data.${taskId}.task_data.type`, type);
                  }}
                />
              )}
            />
            <Typography variant="body2">Voted for Proposal</Typography>
          </Stack>
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default SnapshotTask;
