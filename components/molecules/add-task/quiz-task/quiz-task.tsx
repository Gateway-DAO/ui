import useTranslation from 'next-translate/useTranslation';
import { ChangeEvent, useEffect, useState } from 'react';

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
  OutlinedInput,
  Select,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { TaskIcon } from '../../../atoms/task-icon';
import { QuestionCreator } from '../../../organisms/question-creator/question-creator';
import {
  CreateGateData,
  QuizTaskDataError,
} from '../../../templates/create-gate/schema';
import TextFieldWithEmoji from '../../form/TextFieldWithEmoji/TextFieldWithEmoji';

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

export enum LimitPeriod {
  UNLIMITED = null,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FIVE = 5,
  TEN = 10,
}

export enum values {
  ATTEMPT_LIMIT = 'attempt_limit',
  RETRY_PERIOD = 'time_period',
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
  } = useFormContext<CreateGateData>();

  const formValues = getValues();

  const {
    fields: questions,
    append,
    remove,
    swap,
    update,
    move,
  } = useFieldArray({
    name: `tasks.${taskId}.task_data.questions`,
    control,
  });

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (formValues.tasks[taskId]?.title === '') {
      setValue(`tasks.${taskId}.title`, 'Untitled Requirement');
    }
  }, [setValue, taskId, formValues.tasks]);

  useEffect(() => {
    setTaskVisible(dragAndDrop);
    setTaskIsMoving(dragAndDrop);
  }, [dragAndDrop]);

  const [taskVisible, setTaskVisible] = useState(true);
  const [taskIsMoving, setTaskIsMoving] = useState(true);

  const errorOptionIsNecessary = () => {
    if (
      (errors.tasks?.[taskId]?.task_data as QuizTaskDataError)?.questions?.[
        questions.length - 1
      ]?.options?.message
    ) {
      enqueueSnackbar(
        (errors.tasks?.[taskId]?.task_data as QuizTaskDataError)?.questions?.[
          questions.length - 1
        ]?.options?.message,
        {
          variant: 'error',
        }
      );
    }
  };
  const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    '&.MuiToggleButton-root': {
      fontWeight: 700,
      minWidth: '64px',
      color: '#FFFFFF',
    },
    '&.Mui-selected , &.Mui-selected:hover': {
      border: '2px solid #9A53FF',
    },
  }));

  const claimLimitValues = [
    {
      label: t('tasks.quiz.timePeriodImmediately'),
      value: TimePeriod.IMMEDIATELY,
    },
    {
      label: t('tasks.quiz.timePeriodFifteenMinutes'),
      value: TimePeriod.FIFTEEN_MINUTES,
    },
    {
      label: t('tasks.quiz.timePeriodThirtyMinutes'),
      value: TimePeriod.THIRTY_MINUTES,
    },
    {
      label: t('tasks.quiz.timePeriodOneHour'),
      value: TimePeriod.ONE_HOUR,
    },
    {
      label: t('tasks.quiz.timePeriodOneDay'),
      value: TimePeriod.ONE_DAY,
    },
    {
      label: t('tasks.quiz.timePeriodNever'),
      value: TimePeriod.NEVER,
    },
  ];
  const attemptLimitValues = [
    {
      label: t('tasks.quiz.attemptLimitUnlimited'),
      value: LimitPeriod.UNLIMITED,
    },
    {
      label: t('tasks.quiz.attemptLimitOne'),
      value: LimitPeriod.ONE,
    },
    {
      label: t('tasks.quiz.attemptLimitTwo'),
      value: LimitPeriod.TWO,
    },
    {
      label: t('tasks.quiz.attemptLimitThree'),
      value: LimitPeriod.THREE,
    },
    {
      label: t('tasks.quiz.attemptLimitFive'),
      value: LimitPeriod.FIVE,
    },
    {
      label: t('tasks.quiz.attemptLimitTen'),
      value: LimitPeriod.TEN,
    },
  ];

  const quizSettings = [
    {
      name: t('tasks.quiz.quizAttemptLimitTittle'),
      description: t('tasks.quiz.quizAttemptLimitDescription'),
      options: attemptLimitValues,
      defaultValue: LimitPeriod.UNLIMITED,
      formName: values.ATTEMPT_LIMIT,
    },
    {
      name: t('tasks.quiz.quizRetryAfterTittle'),
      description: t('tasks.quiz.quizRetryAfterDescription'),
      options: claimLimitValues,
      defaultValue: TimePeriod.IMMEDIATELY,
      formName: values.RETRY_PERIOD,
    },
  ];

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
          <TaskIcon type="quiz" sx={{ marginRight: 3, marginLeft: 4 }} />
          <Stack>
            <Typography variant="subtitle2">Quiz</Typography>
            <TextField
              variant="standard"
              id="quiz-title"
              required
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
        <TextFieldWithEmoji
          errors={errors}
          formValues={formValues}
          register={register}
          setValue={setValue}
          taskId={taskId}
        />
        <QuestionCreator
          questions={questions}
          taskId={taskId}
          removeQuestion={remove}
          swapQuestion={swap}
          updateQuestion={update}
          moveQuestion={move}
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
                  `tasks.${taskId}.task_data.questions`
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
                position: 'relative',
                left: '-50px',
                width: 'calc(100% + 100px)',
                [theme.breakpoints.down('sm')]: {
                  margin: '0 -20px',
                  width: 'calc(100% + 40px)',
                },
              })}
            />
          </Stack>
        )}
        {!taskVisible && (
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
            {questions.length > 1 && (
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
                  name={`tasks.${taskId}.task_data.pass_score`}
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
            )}
            <Stack>
              {quizSettings.map((setting) => (
                <Stack sx={{ mt: '48px', mb: '48px' }} key={setting.name}>
                  <FormControl>
                    <div>
                      <Typography gutterBottom variant="body1">
                        {setting.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        gutterBottom
                        color="text.secondary"
                        marginBottom={4}
                      >
                        {setting.description}
                      </Typography>
                      <Controller
                        name={`tasks.${taskId}.task_data.${setting.formName}`}
                        control={control}
                        defaultValue={setting.defaultValue}
                        render={({ field: { onChange, value, ref } }) => {
                          return (
                            <FormControl>
                              <Stack
                                direction={'row'}
                                sx={{
                                  flexDirection: { xs: 'column', md: 'row' },
                                }}
                                gap={2}
                              >
                                <>
                                  {setting.options.map((btn) => {
                                    return (
                                      <StyledToggleButton
                                        aria-label={btn.label}
                                        key={btn.value}
                                        value={btn.value}
                                        color="primary"
                                        size={'medium'}
                                        sx={{
                                          px: 3,
                                        }}
                                        selected={value === btn.value}
                                        onClick={() => {
                                          onChange(btn.value);
                                        }}
                                      >
                                        {btn.label}
                                      </StyledToggleButton>
                                    );
                                  })}
                                </>
                              </Stack>
                            </FormControl>
                          );
                        }}
                      />
                    </div>
                    {!!(errors.tasks?.[taskId]?.task_data as QuizTaskDataError)
                      ?.attempt_limit && (
                      <Typography
                        color={(theme) => theme.palette.error.main}
                        sx={{ mt: '5px' }}
                      >
                        {
                          errors.tasks?.[taskId]?.task_data?.[
                            `${setting.formName}`
                          ]?.message
                        }
                      </Typography>
                    )}
                  </FormControl>
                </Stack>
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
