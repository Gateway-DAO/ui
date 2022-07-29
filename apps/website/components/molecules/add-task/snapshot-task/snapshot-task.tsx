import { useEffect, useRef } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

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
  } = useFormContext<CreateGateTypes>();

  useEffect(() => {
    setValue(`tasks.data.${taskId}.task_type`, 'snapshot');
  }, [taskId, setValue]);

  console.log(watch(`tasks.data.${taskId}.task_data`));

  return (
    <Stack
      sx={{
        padding: '50px',
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
            sx={{ minWidth: '600px' }}
            id="task-title"
            {...register(`tasks.data.${taskId}.title`)}
            error={!!errors.tasks?.data[taskId]?.title}
            helperText={errors.tasks?.data[taskId]?.title?.message}
          />
        </Stack>
        <DeleteIcon
          fontSize="large"
          sx={{ position: 'absolute', right: '0', cursor: 'pointer' }}
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
        <Stack direction="row" justifyContent="space-between">
          <TextField
            required
            label="Specific proposal number"
            sx={{ maxWidth: '50%' }}
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
          <Stack direction="row" alignItems="center">
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
