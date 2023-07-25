import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { TaskIcon } from '@/components/atoms/icons/task-icon';
import { CreateGateData } from '@/components/features/gates/create/schema';
import TextFieldWithEmoji from '@/components/molecules/form/TextFieldWithEmoji/TextFieldWithEmoji';
import { useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { mockChains } from './__mock__';

const TrackOnChainEventsTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const { t } = useTranslation('gate-new');

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<CreateGateData>();

  const formValues = getValues();

  useEffect(() => {
    if (formValues.tasks[taskId]?.title === '') {
      setValue(`tasks.${taskId}.title`, 'Untitled');
    }
    setValue(`tasks.${taskId}.task_type`, 'track_onchain');
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
          <TaskIcon
            type="track_onchain"
            sx={{ marginRight: 3, marginLeft: 4 }}
          />

          <Stack>
            <Typography variant="subtitle2">
              {t('tasks.track_onchain.title')}
            </Typography>
            <TextField
              variant="standard"
              sx={{
                minWidth: { md: '400px', xs: '110%', lg: '500px' },
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
                marginLeft: '-55px',
              },
              [theme.breakpoints.between('lg', 'xl')]: {
                marginLeft: '-55px',
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
        <Stack gap={3}>
          <TextFieldWithEmoji
            errors={errors}
            formValues={formValues}
            register={register}
            setValue={setValue}
            taskId={taskId}
            label="Task description"
            noMb
          />
          <FormControl>
            <InputLabel htmlFor="chains">
              {t('tasks.track_onchain.chain')}
            </InputLabel>
            <Select
              id="chains"
              sx={{ maxWidth: { md: '50%', xs: '100%' } }}
              {...register(`tasks.${taskId}.task_data.chain`)}
            >
              {mockChains.map((chain) => (
                <MenuItem key={chain.value} value={chain.value}>
                  {chain.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack
            direction="row"
            gap={2}
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              fullWidth
              required
              label={t('tasks.track_onchain.contract_address')}
              sx={{ flex: 1 }}
              {...register(`tasks.${taskId}.task_data.contract_address`)}
            />
            <Button size="large" variant="outlined">
              {t('tasks.track_onchain.check_contract')}
            </Button>
          </Stack>
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default TrackOnChainEventsTask;
