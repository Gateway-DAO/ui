import { useFormContext } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import { Stack, TextField } from '@mui/material';

import { CreateGateTypes } from '../../../templates/create-gate/schema';

export function QuizTask({ taskId, deleteTask }): JSX.Element {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();
  return (
    <Stack
      sx={(theme) => ({
        padding: '50px',
        border: '2px solid rgba(229, 229, 229, 0.08)',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
        borderRadius: '10px',
      })}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        marginBottom="40px"
        sx={{ position: 'relative' }}
      >
        <LooksOneIcon
          fontSize="large"
          style={{ marginRight: '30px', borderRadius: '50%' }}
        />
        <TextField
          variant="standard"
          sx={{ minWidth: '600px' }}
          label="Quiz"
          id="quiz-title"
          {...register(`tasks.data.${taskId}.title`)}
          error={!!errors.tasks?.data[taskId]?.title}
          helperText={errors.tasks?.data[taskId]?.title?.message}
        />
        <DeleteIcon
          fontSize="medium"
          sx={{ position: 'absolute', right: '0', cursor: 'pointer' }}
          onClick={() => deleteTask(taskId)}
        />
      </Stack>
    </Stack>
  );
}
