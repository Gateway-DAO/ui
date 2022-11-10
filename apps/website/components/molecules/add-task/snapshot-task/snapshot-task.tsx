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
  RadioGroup,
  Radio,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import {
  CreateGateData,
  SnapshotDataError,
} from '../../../templates/create-gate/schema';

const SnapshotTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    watch,
    control,
    setError,
    clearErrors,
  } = useFormContext<CreateGateData>();

  const formValues = getValues();

  useEffect(() => {
    if (formValues.tasks[taskId]?.title === '') {
      setValue(`tasks.${taskId}.title`, 'Untitled Requirement');
    }
    setValue(`tasks.${taskId}.task_type`, 'snapshot');
  }, [taskId, setValue, formValues.tasks]);

  useEffect(() => {
    setTaskVisible(dragAndDrop);
    setTaskIsMoving(dragAndDrop);
  }, [dragAndDrop]);

  const [taskVisible, setTaskVisible] = useState(false);
  const [taskIsMoving, setTaskIsMoving] = useState(false);

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
          label="Task Requirement"
          id="task-description"
          {...register(`tasks.${taskId}.description`)}
          error={!!errors.tasks?.[taskId]?.description}
          helperText={errors.tasks?.[taskId]?.description?.message}
          sx={{
            marginBottom: 8,
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
        />

        <FormLabel sx={{ mb: 1 }}>Verify if user</FormLabel>

        <RadioGroup
          name={`tasks.${taskId}.task_data.type`}
          row
          defaultValue={'vote'}
          sx={{ ml: 1 }}
        >
          <FormControlLabel
            value="proposal"
            control={<Radio />}
            label="Created Proposal"
            {...register(`tasks.${taskId}.task_data.type`)}
          />
          <FormControlLabel
            value="vote"
            control={<Radio />}
            label="Voted for Proposal"
            {...register(`tasks.${taskId}.task_data.type`)}
          />
        </RadioGroup>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          marginTop={2}
        >
          <Stack direction="column" order={{ xs: 1, md: 0 }}>
            <TextField
              required
              label="Specific Proposal Number"
              sx={{ minWidth: { md: '50%', xs: '100%' } }}
              {...register(`tasks.${taskId}.task_data.proposal_number`)}
              error={
                !!(errors.tasks?.[taskId]?.task_data as SnapshotDataError)
                  ?.proposal_number
              }
              helperText={
                (errors.tasks?.[taskId]?.task_data as SnapshotDataError)
                  ?.proposal_number?.message
              }
            />
            {!(errors.tasks?.[taskId]?.task_data as SnapshotDataError)
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
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default SnapshotTask;
