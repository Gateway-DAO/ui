import { useEffect, useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  FormControl,
  IconButton,
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
    setValue(`tasks.data.${taskId}.title`, 'Untitled Task');
    setValue(`tasks.data.${taskId}.task_type`, 'token_hold');
  }, [taskId, setValue]);

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
            <Typography variant="subtitle2">Hold Token</Typography>
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
          label="Task Description"
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
        <FormControl>
          <InputLabel htmlFor="chains">Chain</InputLabel>
          <Select
            id="chains"
            sx={{ maxWidth: { md: '50%', xs: '100%' } }}
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
          sx={{ marginTop: '15px', maxWidth: { md: '50%', xs: '100%' } }}
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
          sx={{ marginTop: '15px', maxWidth: { md: '50%', xs: '100%' } }}
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
