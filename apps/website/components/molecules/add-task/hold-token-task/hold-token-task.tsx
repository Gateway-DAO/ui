import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import {
  CreateGateTypes,
  HoldTokenDataError,
} from '../../../templates/create-gate/schema';
import { mockChains } from './__mock__';

const HoldTokenTask = ({ taskId, deleteTask }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateGateTypes>();

  useEffect(() => {
    setValue(`tasks.data.${taskId}.task_type`, 'token_hold');
  }, [taskId, setValue]);

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
          number={1}
          sx={(theme) => ({
            mr: theme.spacing(3.75),
            [theme.breakpoints.down('sm')]: { mr: theme.spacing(2.5) },
          })}
        />
        <Stack>
          <Typography variant="subtitle2">Hold Token</Typography>
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
        <FormControl>
          <InputLabel htmlFor="chains">Chain</InputLabel>
          <Select
            id="chains"
            sx={{ maxWidth: '50%' }}
            {...register(`tasks.data.${taskId}.task_data.chain`)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {mockChains.map((chain) => (
              <MenuItem key={chain.value} value={chain.value}>
                {chain.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          label="Token address"
          sx={{ marginTop: '15px', maxWidth: '50%' }}
          {...register(`tasks.data.${taskId}.task_data.token_address`)}
          error={
            !!(errors.tasks?.data[taskId]?.task_data as HoldTokenDataError)
              ?.token_address
          }
          helperText={
            (errors.tasks?.data[taskId]?.task_data as HoldTokenDataError)
              ?.token_address?.message
          }
        />
        <TextField
          required
          label="Quantity"
          sx={{ marginTop: '15px', maxWidth: '50%' }}
          {...register(`tasks.data.${taskId}.task_data.quantity`)}
          error={
            !!(errors.tasks?.data[taskId]?.task_data as HoldTokenDataError)
              ?.quantity
          }
          helperText={
            (errors.tasks?.data[taskId]?.task_data as HoldTokenDataError)
              ?.quantity?.message
          }
        />
      </FormControl>
    </Stack>
  );
};

export default HoldTokenTask;
