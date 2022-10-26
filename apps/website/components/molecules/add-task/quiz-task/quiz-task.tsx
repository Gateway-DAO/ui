import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

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
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { CircleWithNumber } from '../../../atoms/circle-with-number';
import { QuestionCreator } from '../../../organisms/question-creator/question-creator';
import {
  CreateGateTypes,
  QuizTaskDataError,
} from '../../../templates/create-gate/schema';

// Time Period (minutes)
export enum TimePeriod {
  IMMEDIATELY = 0,
  FIFTEEN_MINUTES = 15,
  THIRTY_MINUTES = 30,
  ONE_HOUR = 1,
  ONE_DAY = 1440,
  ONE_WEEK = 10080,
  ONE_MONTH = 302400,
  NEVER = -1,
}

export const createQuestion = (order = 0) => ({
  order,
  question: '',
  type: 'single',
  options: [{ value: '', correct: false, order: 0 }],
});

export function QuizTask({
  dragAndDrop,
  taskId,
  deleteTask,
}: {
  dragAndDrop: boolean;
  taskId: number;
  deleteTask: (taskId) => void;
}): JSX.Element {
  const { t } = useTranslation('gate-new');
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();

  const formValues = getValues();

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    name: `tasks.data.${taskId}.task_data.questions`,
    control,
  });

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (formValues.tasks.data[taskId]?.title === '') {
      setValue(`tasks.data.${taskId}.title`, 'Untitled Requirement');
    }
  }, [setValue, taskId, formValues.tasks.data]);

  useEffect(() => {
    setTaskVisible(dragAndDrop);
    setTaskIsMoving(dragAndDrop);
  }, [dragAndDrop]);

  useEffect(() => {
    errorOptionIsNecessary();
  }, [errors, questions]);

  const [taskVisible, setTaskVisible] = useState(false);
  const [taskIsMoving, setTaskIsMoving] = useState(false);
  const onRemoveQuestion = (index: number) => remove(index);

  const errorOptionIsNecessary = () => {
    if (
      (errors?.tasks?.data?.[taskId]?.task_data as QuizTaskDataError)?.questions
    ) {
      enqueueSnackbar(
        (errors.tasks?.data?.[taskId]?.task_data as QuizTaskDataError)
          ?.questions?.[questions.length - 1]?.options?.message,
        {
          variant: 'error',
        }
      );
    }
  };

  return (
    <Stack
      sx={(theme) => ({
        border: '2px solid rgba(229, 229, 229, 0.08)',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), ${theme.palette.background.paper}`,
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
          pl: taskIsMoving ? '20px' : '0',
        },
      })}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        margin={'50px'}
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            margin: '20px',
          },
        })}
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
          <TextField
            variant="standard"
            label="Quiz"
            id="quiz-title"
            required
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
            {...register(`tasks.data.${taskId}.title`)}
            error={!!errors.tasks?.data?.[taskId]?.title}
            helperText={errors.tasks?.data?.[taskId]?.title?.message}
          />
        </Stack>
        {!taskIsMoving && (
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
        )}
      </Stack>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          margin: '0 50px',
          [theme.breakpoints.down('sm')]: {
            margin: '0 20px',
          },
        })}
        style={!taskVisible ? {} : { display: 'none' }}
      >
        <TextField
          multiline
          maxRows={4}
          minRows={3}
          fullWidth
          required
          label="Requirement Description"
          id="quiz-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data?.[taskId]?.description}
          helperText={errors.tasks?.data?.[taskId]?.description?.message}
          sx={{
            '& fieldset legend span': {
              marginRight: '10px',
            },
          }}
        />
        <QuestionCreator
          questions={questions}
          onRemove={onRemoveQuestion}
          taskId={taskId}
        />
        <Divider
          sx={(theme) => ({
            margin: '0 -50px',
            [theme.breakpoints.down('sm')]: {
              margin: '0 -20px',
            },
          })}
        />
      </Box>
      <Stack
        alignItems={'flex-start'}
        sx={{ paddingTop: !taskVisible ? '30px' : 0 }}
      >
        {!taskVisible && (
          <Stack
            direction="column"
            alignItems="baseline"
            sx={(theme) => ({
              padding: '0 50px',
              width: '100%',
              [theme.breakpoints.down('sm')]: {
                padding: '0 20px',
              },
            })}
          >
            <Button
              variant="text"
              sx={{ px: 0, marginBottom: '30px' }}
              onClick={async () => {
                const isValid = await trigger(
                  `tasks.data.${taskId}.task_data.questions`
                );
                if (isValid) {
                  return append(
                    createQuestion(
                      Math.max(...questions.map((o) => o.order)) + 1
                    )
                  );
                } else {
                  errorOptionIsNecessary();
                }
              }}
            >
              {t('tasks.quiz.addQuestion')}
            </Button>
            <Divider
              sx={(theme) => ({
                margin: '0 -50px',
                width: 'calc(100% + 100px)',
                [theme.breakpoints.down('sm')]: {
                  margin: '0 -20px',
                  width: 'calc(100% + 40px)',
                },
              })}
            />
          </Stack>
        )}
        {questions.length > 1 && !taskVisible && (
          <Stack
            direction="column"
            sx={(theme) => ({
              width: '100%',
              padding: '50px',
              background: `linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.07) 100%), ${theme.palette.background.default}`,
              borderRadius: '0 0 8px 8px',
              [theme.breakpoints.down('sm')]: {
                padding: '30px 20px 50px',
              },
            })}
          >
            <Typography variant="h6">
              {t('tasks.quiz.settingsTitle')}
            </Typography>
            <>
              <Stack
                sx={[
                  {
                    mt: '24px',
                    mb: '48px',
                  },
                ]}
              >
                <Typography>
                  {t('tasks.quiz.settingsHowManyQuestionsTitle')}
                </Typography>
                <Typography
                  sx={(theme) => ({ color: theme.palette.text.secondary })}
                >
                  {t('tasks.quiz.settingsHowManyQuestionsDescription')}
                </Typography>
              </Stack>

              <Controller
                control={control}
                name={`tasks.data.${taskId}.task_data.pass_score`}
                defaultValue={1}
                rules={{ required: true, min: 1, max: questions.length }}
                render={({
                  field: { onChange, value, ...props },
                  fieldState: { error },
                }) => {
                  return (
                    <Slider
                      key={`slider-${props.name}`}
                      {...props}
                      size="medium"
                      min={1}
                      value={value}
                      sx={{ mx: '10px', width: 'calc(100% - 10px)' }}
                      max={questions.length > 0 ? questions.length : 1}
                      onChange={onChange}
                      marks
                      onError={() => error?.message}
                      aria-label="Medium"
                      valueLabelDisplay="on"
                    />
                  );
                }}
              />
              <Divider
                sx={{ margin: '50px -50px 0', width: 'calc(100% + 100px)' }}
              />
            </>
            <Stack>
              <Stack sx={{ mt: '48px' }}>
                <Typography>
                  {t('tasks.quiz.settingsRetryAfterTitle')}
                </Typography>
                <Typography
                  sx={(theme) => ({
                    color: theme.palette.text.secondary,
                    mb: 2,
                  })}
                >
                  {t('tasks.quiz.settingsRetryAfterDescription')}
                </Typography>
                <FormControl>
                  <InputLabel htmlFor="time_period">
                    {t('tasks.quiz.timePeriodAction')}
                  </InputLabel>
                  <Select
                    label={t('tasks.quiz.timePeriodAction')}
                    defaultValue={
                      formValues?.tasks?.data[taskId]?.task_data['time_period']
                        ? formValues?.tasks?.data[taskId]?.task_data[
                            'time_period'
                          ]
                        : ''
                    }
                    datatype="number"
                    id="time_period"
                    sx={{ maxWidth: { md: '50%', xs: '100%' } }}
                    error={
                      !!(
                        errors.tasks?.data?.[taskId]
                          ?.task_data as QuizTaskDataError
                      )?.time_period
                    }
                    {...register(`tasks.data.${taskId}.task_data.time_period`)}
                  >
                    <MenuItem value={TimePeriod.IMMEDIATELY}>
                      {t('tasks.quiz.timePeriodImmediately')}
                    </MenuItem>
                    <MenuItem value={TimePeriod.FIFTEEN_MINUTES}>
                      {t('tasks.quiz.timePeriodFifteenMinutes')}
                    </MenuItem>
                    <MenuItem value={TimePeriod.THIRTY_MINUTES}>
                      {t('tasks.quiz.timePeriodThirtyMinutes')}
                    </MenuItem>
                    <MenuItem value={TimePeriod.ONE_HOUR}>
                      {t('tasks.quiz.timePeriodOneHour')}
                    </MenuItem>
                    <MenuItem value={TimePeriod.ONE_DAY}>
                      {t('tasks.quiz.timePeriodOneDay')}
                    </MenuItem>
                    <MenuItem value={TimePeriod.NEVER}>
                      {t('tasks.quiz.timePeriodNever')}
                    </MenuItem>
                  </Select>
                  {!!(
                    errors.tasks?.data?.[taskId]?.task_data as QuizTaskDataError
                  )?.time_period && (
                    <Typography
                      color={(theme) => theme.palette.error.main}
                      sx={{ mt: '5px' }}
                    >
                      {
                        errors.tasks?.data?.[taskId]?.task_data?.['time_period']
                          ?.message
                      }
                    </Typography>
                  )}
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
