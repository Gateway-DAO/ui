import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo, useState } from 'react';

import { TaskIcon } from '@/components/atoms/icons/task-icon';
import {
  CreateGateData,
  Parameter,
} from '@/components/features/gates/create/schema';
import TextFieldWithEmoji from '@/components/molecules/form/TextFieldWithEmoji/TextFieldWithEmoji';
import { brandColors } from '@/theme';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  alpha,
} from '@mui/material';

import { mockChains, mockEvents } from './__mock__';
import { Parameters } from './components/parameters';
import { EventAbi } from './types';

const TrackOnChainEventsTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const { t } = useTranslation('gate-new');

  const {
    register,
    setValue,
    getValues,
    getFieldState,
    watch,
    control,
    resetField,
    formState: { errors },
  } = useFormContext<CreateGateData>();

  const formValues = getValues();
  // TODO: REMOVE
  const mock: any = mockEvents;
  const mockEventsFiltered: PartialDeep<EventAbi>[] = mock.filter(
    (item: EventAbi) => item.type === 'event'
  );

  const chain = watch(`tasks.${taskId}.task_data.chain`, null);
  const address = watch(`tasks.${taskId}.task_data.contract_address`);
  const event = watch(`tasks.${taskId}.task_data.event`);
  const selectedEvent = useMemo(() => {
    return mockEventsFiltered.find((eventItem) => eventItem.name === event);
  }, [event]);

  const {
    fields: parameters,
    append,
    remove,
  } = useFieldArray({
    name: `tasks.${taskId}.task_data.parameters`,
    control,
  });

  const createParameter = (): Parameter => ({
    parameterName: null,
    operator: null,
    value: null,
  });

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

  useEffect(() => append(createParameter()), []);

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
          alignItems={'center'}
          sx={(theme) => ({
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
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
            sx={{ mr: 3, ml: { xs: 0, md: 4 }, mb: { xs: 2, md: 0 } }}
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
              label={t('tasks.track_onchain.chain')}
              id="chains"
              sx={{ maxWidth: { md: '50%', xs: '100%' } }}
              {...register(`tasks.${taskId}.task_data.chain`, {
                onChange: () => {
                  resetField(`tasks.${taskId}.task_data.contract_address`);
                },
              })}
            >
              {mockChains.map((chain) => (
                <MenuItem key={chain.value} value={chain.value}>
                  {chain.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {chain && (
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
              <Button
                size="large"
                variant="outlined"
                disabled={
                  !!getFieldState(`tasks.${taskId}.task_data.contract_address`)
                    .error || !address?.length
                }
              >
                {t('tasks.track_onchain.check_contract')}
              </Button>
            </Stack>
          )}
          <Stack>
            <FormControl>
              <InputLabel htmlFor="type">
                {t('tasks.track_onchain.event')}
              </InputLabel>
              <Select
                sx={{ maxWidth: { md: '50%', xs: '100%' } }}
                label={t('tasks.track_onchain.event')}
                id="type"
                {...register(`tasks.${taskId}.task_data.event`)}
                renderValue={(value) => {
                  return <>{value}</>;
                }}
              >
                {mockEventsFiltered.map((event) => (
                  <MenuItem key={event?.name} value={event?.name}>
                    <Stack sx={{ width: '100%' }}>
                      <Typography sx={{ display: 'block' }}>
                        {event?.name}
                      </Typography>
                      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {event?.inputs?.map((input, index) => (
                          <Stack
                            key={input?.name}
                            sx={{ flexDirection: 'row', fontSize: 12 }}
                          >
                            <span
                              style={{
                                marginRight: 6,
                                color: brandColors.purple.main,
                              }}
                            >
                              {input?.name}
                            </span>
                            <span>{input?.type}</span>
                            {event?.inputs?.length !== index + 1 && (
                              <span style={{ marginRight: 6 }}>,</span>
                            )}
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                    <Divider sx={{ mx: -3 }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        {!taskVisible && event && (
          <Divider
            sx={(theme) => ({
              margin: '48px -50px',
              [theme.breakpoints.down('sm')]: {
                margin: '24px -20px',
              },
            })}
          />
        )}
      </FormControl>
      {!taskVisible && event && (
        <Stack direction="column" alignItems="flex-start">
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Typography
              sx={{
                color: alpha(brandColors.white.main, 0.7),
                fontWeight: 600,
              }}
            >
              {t('tasks.track_onchain.parameters')}
            </Typography>

            <Button
              variant="text"
              sx={{ my: 2, alignSelf: 'flex-end' }}
              onClick={async () => append(createParameter())}
            >
              + {t('tasks.track_onchain.add_parameter')}
            </Button>
          </Stack>

          <Parameters
            inputs={selectedEvent?.inputs}
            parameters={parameters}
            taskId={taskId}
            removeParameter={remove}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default TrackOnChainEventsTask;
