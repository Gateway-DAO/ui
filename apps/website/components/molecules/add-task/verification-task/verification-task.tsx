import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import {
  CreateGateTypes,
  VerificationCodeDataError,
} from '../../../templates/create-gate/schema';

const VerificationCodeTask = ({ taskId, deleteTask }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateGateTypes>();

  useEffect(() => {
    setValue(`tasks.data.${taskId}.title`, 'Untitled Task');
  }, [setValue, taskId]);

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
        <IconButton
          sx={{ position: 'absolute', right: '0', cursor: 'pointer' }}
        >
          <DeleteIcon fontSize="large" onClick={() => deleteTask(taskId)} />
        </IconButton>
      </Stack>
      <FormControl>
        <TextField
          required
          multiline
          minRows={3}
          label="Task Description"
          id="file-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data?.[taskId]?.description}
          helperText={errors.tasks?.data?.[taskId]?.description?.message}
          sx={{ marginBottom: '60px' }}
        />
        <TextField
          required
          label="Verification Code"
          {...register(`tasks.data.${taskId}.task_data.code`)}
          error={
            !!(
              errors.tasks?.data?.[taskId]
                ?.task_data as VerificationCodeDataError
            )?.code
          }
          helperText={
            (
              errors.tasks?.data?.[taskId]
                ?.task_data as VerificationCodeDataError
            )?.code?.message
          }
        />
      </FormControl>
    </Stack>
  );
};

export default VerificationCodeTask;
