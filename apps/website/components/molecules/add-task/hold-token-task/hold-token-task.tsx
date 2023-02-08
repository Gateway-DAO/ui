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

import { TaskIcon } from '../../../atoms/task-icon';
import {
  CreateGateData,
  HoldTokenDataError,
} from '../../../templates/create-gate/schema';
import { mockChains } from './__mock__';

const HoldTokenTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<CreateGateData>();

  const formValues = getValues();

  useEffect(() => {
    if (formValues.tasks[taskId]?.title === '') {
      setValue(`tasks.${taskId}.title`, 'Untitled Requirement');
    }
    setValue(`tasks.${taskId}.task_type`, 'token_hold');
  }, [taskId, setValue, formValues.tasks]);

  useEffect(() => {
    setTaskVisible(dragAndDrop);
    setTaskIsMoving(dragAndDrop);
  }, [dragAndDrop]);

  const [taskVisible, setTaskVisible] = useState(true);
  const [taskIsMoving, setTaskIsMoving] = useState(true);

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
          sx={(theme) => ({
            width: '100%',
            mr: '20px',
            [theme.breakpoints.between('md', 'lg')]: {
              margin: '-22px',
            },
            [theme.breakpoints.between('lg', 'xl')]: {
              margin: '-22px',
            },
          })}
        >
          <TaskIcon type="token_hold" sx={{ marginRight: 3 }} />
          <Stack>
            <Typography variant="subtitle2">Hold Token</Typography>
            <TextField
              variant="standard"
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
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              [theme.breakpoints.between('md', 'lg')]: {
                margin: '-30px',
              },
              [theme.breakpoints.between('lg', 'xl')]: {
                margin: '-30px',
              },
            })}
          >
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
            {...register(`tasks.${taskId}.task_data.chain`)}
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
          {...register(`tasks.${taskId}.task_data.token_address`)}
          error={
            !!(errors.tasks?.[taskId]?.task_data as HoldTokenDataError)
              ?.token_address
          }
          helperText={
            (errors.tasks?.[taskId]?.task_data as HoldTokenDataError)
              ?.token_address?.message
          }
        />
        <TextField
          required
          label="Quantity"
          sx={{ marginTop: '15px', maxWidth: { md: '50%', xs: '100%' } }}
          {...register(`tasks.${taskId}.task_data.quantity`, {
            min: 0,
            valueAsNumber: true,
          })}
          type="number"
          error={
            !!(errors.tasks?.[taskId]?.task_data as HoldTokenDataError)
              ?.quantity
          }
          helperText={
            (errors.tasks?.[taskId]?.task_data as HoldTokenDataError)?.quantity
              ?.message
          }
        />
      </FormControl>
    </Stack>
  );
};

export default HoldTokenTask;
