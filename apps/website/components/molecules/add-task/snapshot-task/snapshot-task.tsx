import { useEffect, useRef } from 'react';

import normalizeUrl from 'normalize-url';
import { Controller, useFormContext } from 'react-hook-form';
import { setErrorMap } from 'zod';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  FormControl,
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
    formState: { errors },
    watch,
    control,
    setError,
    clearErrors,
  } = useFormContext<CreateGateTypes>();

  useEffect(() => {
    setValue(`tasks.data.${taskId}.task_type`, 'snapshot');
  }, [taskId, setValue]);

  return (
    <Stack
      sx={{
        padding: { md: '50px', xs: '16px' },
        border: '2px solid rgba(229, 229, 229, 0.08)',
        borderRadius: '10px',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        marginBottom="40px"
        sx={{ position: 'relative' }}
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
            sx={{
              minWidth: { md: '600px', xs: '100%' },
              maxWidth: { md: '100%', xs: '100%' },
            }}
            id="task-title"
            {...register(`tasks.data.${taskId}.title`)}
            error={!!errors.tasks?.data[taskId]?.title}
            helperText={errors.tasks?.data[taskId]?.title?.message}
          />
        </Stack>
        <DeleteIcon
          fontSize="large"
          sx={{
            position: 'absolute',
            right: '0',
            cursor: 'pointer',
            color: 'rgba(255, 255, 255, 0.56)',
            fontSize: { xs: '26px' },
          }}
          onClick={() => deleteTask(taskId)}
        />
      </Stack>
      <FormControl>
        <TextField
          required
          multiline
          minRows={3}
          label="Task Description"
          id="task-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data[taskId]?.description}
          helperText={errors.tasks?.data[taskId]?.description?.message}
          sx={{ marginBottom: '60px' }}
        />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Stack direction="column" order={{ xs: 1, md: 0 }}>
            <TextField
              required
              label="Specific Proposal Number"
              sx={{ maxWidth: { md: '50%', xs: '100%' } }}
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
