import useTranslation from 'next-translate/useTranslation';
import { useEffect, useMemo, useState } from 'react';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import { TaskIcon } from '@/components/atoms/icons/task-icon';
import {
  CreateGateData,
  Parameter,
  TrackOnChainEventsDataError,
} from '@/components/features/gates/create/schema';
import TextFieldWithEmoji from '@/components/molecules/form/TextFieldWithEmoji/TextFieldWithEmoji';
import { query } from '@/constants/queries';
import { brandColors } from '@/theme';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useToggle } from 'react-use';

import { Error, ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  alpha,
} from '@mui/material';

import { mockChains } from './__mock__';
import { Parameters } from './components/parameters';
import { EventAbi } from './types';

const TrackOnChainEventsTask = ({ dragAndDrop, taskId, deleteTask }) => {
  const { t } = useTranslation('gate-new');

  const { enqueueSnackbar } = useSnackbar();

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

  const chain = watch(`tasks.${taskId}.task_data.chain`, null);
  const contract_address = watch(`tasks.${taskId}.task_data.contract_address`);
  const ABI = watch(`tasks.${taskId}.task_data.abi`);
  const event = watch(`tasks.${taskId}.task_data.event`);

  const [taskVisible, setTaskVisible] = useState(true);
  const [taskIsMoving, setTaskIsMoving] = useState(true);
  const [getContractInfo, toggleGetContractInfo] = useToggle(false);
  const [displayInputABI, toggleDisplayInputABI] = useToggle(false);
  const [ABIWithValidEvent, toggleABIWithValidEvent] = useToggle(true);
  const [displayEvent, setDisplayEvent] = useState(false);
  const [ABIErrorMessage, setABIErrorMessage] = useState('');

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
    type: null,
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

  const { data: contractInfo, isFetching: isLoadingContractInfo } = useQuery(
    [query.web3_contract_information, chain, contract_address],
    async () => {
      const res = await fetch(
        `/api/track_onchain?chain=${chain}&contract_address=${contract_address}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await res.json();
      return result.ABI;
    },
    {
      onError: (error) => {
        console.log(error);
        toggleGetContractInfo();
      },
      onSuccess: (data) => {
        const validABI = validateABI(data);

        if (validABI) {
          setValue(`tasks.${taskId}.task_data.abi`, data);
          setDisplayEvent(true);
        } else {
          resetField(`tasks.${taskId}.task_data.abi`);
          toggleABIWithValidEvent(false);
          toggleDisplayInputABI(true);
        }
        toggleGetContractInfo();
      },
      enabled: !!getContractInfo && !!contract_address,
    }
  );

  const filteredEvents = useMemo(() => {
    if (ABIWithValidEvent && ABI) {
      try {
        const abi = JSON.parse(ABI);
        return abi.filter((item: EventAbi) => item.type === 'event');
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    return [];
  }, [contractInfo, ABIWithValidEvent]);

  const selectedEvent = useMemo(() => {
    if (filteredEvents?.length > 0) {
      return filteredEvents.find((eventItem) => eventItem.name === event);
    }
    return [];
  }, [filteredEvents, event]);

  const validateABI = (ABI: string | any): boolean => {
    if (Object.keys(ABI).length === 0 && ABI.constructor === Object) {
      setABIErrorMessage(t('tasks.track_onchain.unverified_contract_message'));
      return false;
    }
    const objABI: EventAbi[] = JSON.parse(ABI);
    if (objABI.findIndex((item) => item.type === 'event') < 0) {
      setABIErrorMessage(t('tasks.track_onchain.invalid_abi_message'));
      return false;
    }
    return true;
  };

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
                  resetField(`tasks.${taskId}.task_data.event`);
                  setDisplayEvent(false);
                  toggleDisplayInputABI(false);
                  toggleABIWithValidEvent(true);
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
              justifyContent="flex-start"
              alignItems="center"
            >
              <TextField
                fullWidth
                disabled={isLoadingContractInfo}
                required
                label={t('tasks.track_onchain.contract_address')}
                sx={{ flex: 1 }}
                {...register(`tasks.${taskId}.task_data.contract_address`)}
              />
              <LoadingButton
                size="large"
                variant="outlined"
                disabled={
                  !!getFieldState(`tasks.${taskId}.task_data.contract_address`)
                    .error || !contract_address?.length
                }
                isLoading={isLoadingContractInfo}
                onClick={() => {
                  resetField(`tasks.${taskId}.task_data.abi`);
                  resetField(`tasks.${taskId}.task_data.event`);
                  resetField(`tasks.${taskId}.task_data.parameters`);
                  setDisplayEvent(false);
                  toggleDisplayInputABI(false);
                  toggleGetContractInfo(true);
                }}
              >
                {t('tasks.track_onchain.check_contract')}
              </LoadingButton>
            </Stack>
          )}
          {contract_address && displayInputABI && (
            <Stack gap={2}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Error color="error" />
                <Typography variant="body2" color="#eb8e9d">
                  {ABIErrorMessage}
                </Typography>
              </Box>
              <Stack
                direction="row"
                gap={2}
                justifyContent="flex-start"
                alignItems="center"
              >
                <TextField
                  fullWidth
                  required
                  multiline
                  sx={{ flex: 1 }}
                  label={t('tasks.track_onchain.abi')}
                  helperText={t('tasks.track_onchain.abi_helper_text')}
                  {...register(`tasks.${taskId}.task_data.abi`)}
                />
                <LoadingButton
                  size="large"
                  variant="outlined"
                  sx={{ flex: 0.17 }}
                  disabled={!ABI?.length}
                  onClick={() => {
                    const validABI = validateABI(ABI);
                    if (validABI) {
                      setDisplayEvent(false);
                      resetField(`tasks.${taskId}.task_data.event`);
                      resetField(`tasks.${taskId}.task_data.parameters`);
                      toggleABIWithValidEvent(true);
                      setDisplayEvent(true);
                    } else {
                      enqueueSnackbar(t('tasks.track_onchain.invalid_abi'), {
                        variant: 'error',
                      });
                    }
                  }}
                >
                  {t('tasks.track_onchain.check_abi')}
                </LoadingButton>
              </Stack>
            </Stack>
          )}
          {ABI && ABIWithValidEvent && displayEvent && (
            <Stack>
              <FormControl>
                <InputLabel htmlFor="type">
                  {t('tasks.track_onchain.event')}
                </InputLabel>
                <Select
                  sx={{ maxWidth: { md: '50%', xs: '572px' } }}
                  label={t('tasks.track_onchain.event')}
                  error={
                    !!(
                      errors.tasks?.[taskId]
                        ?.task_data as TrackOnChainEventsDataError
                    )?.event
                  }
                  id="type"
                  {...register(`tasks.${taskId}.task_data.event`, {
                    onChange: () => {
                      resetField(`tasks.${taskId}.task_data.parameters`);
                      append(createParameter());
                    },
                  })}
                  renderValue={(value) => {
                    return <>{value}</>;
                  }}
                >
                  {filteredEvents.map((event) => (
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
                {!displayInputABI && (
                  <FormHelperText>
                    {t('tasks.track_onchain.event_helper')}
                    <Link
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDisplayInputABI(true);
                        resetField(`tasks.${taskId}.task_data.event`);
                        resetField(`tasks.${taskId}.task_data.parameters`);
                        toggleABIWithValidEvent(false);
                      }}
                    >
                      {t('tasks.track_onchain.event_helper_link')}
                    </Link>
                  </FormHelperText>
                )}
                {!!(
                  errors.tasks?.[taskId]
                    ?.task_data as TrackOnChainEventsDataError
                )?.event && (
                  <FormHelperText sx={{ color: brandColors.red.light }}>
                    {
                      (
                        errors.tasks?.[taskId]
                          ?.task_data as TrackOnChainEventsDataError
                      )?.event?.message
                    }
                  </FormHelperText>
                )}
              </FormControl>
            </Stack>
          )}
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
