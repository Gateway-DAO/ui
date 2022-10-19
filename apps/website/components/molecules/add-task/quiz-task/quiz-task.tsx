import { useEffect, useState } from 'react';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Snackbar,
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

// Time Period (hours)
export enum TimePeriod {
  IMMEDIATELY = 0,
  ONE_HOUR = 1,
  ONE_DAY = 24,
  ONE_WEEK = 168,
  ONE_MONTH = 720,
  NEVER = -1,
}

export const TimePeriodTitle = {
  [TimePeriod.IMMEDIATELY]: 'Immediately',
  [TimePeriod.ONE_HOUR]: '1 Hour',
  [TimePeriod.ONE_DAY]: '1 day',
  [TimePeriod.ONE_WEEK]: '1 Week',
  [TimePeriod.ONE_MONTH]: '1 Month',
  [TimePeriod.NEVER]: 'Never',
};

export const createQuestion = (order = 0) => ({
  order,
  question: '',
  type: 'single',
  options: [{ value: '', correct: false }],
});

export function QuizTask({
  taskId,
  deleteTask,
}: {
  taskId: number;
  deleteTask: (taskId) => void;
}): JSX.Element {
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();

  const formValues = getValues();

  const [taskVisible, setTaskVisible] = useState(false);

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({
    name: `tasks.data.${taskId}.task_data.questions`,
    control,
  });

  useEffect(() => {
    if (formValues.tasks.data[taskId]?.title === '') {
      setValue(`tasks.data.${taskId}.title`, 'Untitled Requirement');
    }
  }, [setValue, taskId, formValues.tasks.data]);

  const onRemoveQuestion = (index: number) => remove(index);

  return (
    <Stack
      sx={(theme) => ({
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
        margin={'50px 50px 0'}
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '0 50px',
        }}
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
        <Divider sx={{ margin: '0 -50px' }} />
      </Box>
      <Stack
        alignItems={'flex-start'}
        sx={{ paddingTop: !taskVisible ? '30px' : 0 }}
      >
        {!taskVisible && (
          <Stack
            direction="column"
            alignItems="baseline"
            sx={{ padding: '0 50px', width: '100%' }}
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
                }
              }}
            >
              Add question
            </Button>
            <Divider sx={{ margin: '0 -50px', width: 'calc(100% + 100px)' }} />
          </Stack>
        )}
        <Stack
          direction="column"
          sx={(theme) => ({
            width: '100%',
            padding: '50px',
            background: theme.palette.background.light,
          })}
        >
          <Typography variant="h6">Settings</Typography>
          {questions.length > 1 && !taskVisible && (
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
                  How many questions necessary to pass the quiz?
                </Typography>
                <Typography
                  sx={(theme) => ({ color: theme.palette.text.secondary })}
                >
                  The quantity that user must answer correctly
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
          )}
          <Stack>
            <Stack sx={{ mt: '48px' }}>
              <Typography>Retry after</Typography>
              <Typography
                sx={(theme) => ({ color: theme.palette.text.secondary, mb: 2 })}
              >
                The users will be able to retry after a time period
              </Typography>
              <FormControl>
                <Select
                  defaultValue={TimePeriod.ONE_HOUR}
                  id="time_period"
                  sx={{ maxWidth: { md: '50%', xs: '100%' } }}
                  {...register(`tasks.data.${taskId}.task_data.time_period`)}
                >
                  <MenuItem value={TimePeriod.IMMEDIATELY}>
                    {TimePeriodTitle[TimePeriod.IMMEDIATELY]}
                  </MenuItem>
                  <MenuItem value={TimePeriod.ONE_HOUR}>
                    {TimePeriodTitle[TimePeriod.ONE_HOUR]}
                  </MenuItem>
                  <MenuItem value={TimePeriod.ONE_DAY}>
                    {TimePeriodTitle[TimePeriod.ONE_DAY]}
                  </MenuItem>
                  <MenuItem value={TimePeriod.ONE_WEEK}>
                    {TimePeriodTitle[TimePeriod.ONE_WEEK]}
                  </MenuItem>
                  <MenuItem value={TimePeriod.NEVER}>
                    {TimePeriodTitle[TimePeriod.NEVER]}
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Snackbar
        open={
          !!(errors?.tasks?.data?.[taskId]?.task_data as QuizTaskDataError)
            ?.questions
        }
        autoHideDuration={3000}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {
            (errors.tasks?.data?.[taskId]?.task_data as QuizTaskDataError)
              ?.questions?.[questions.length - 1]?.options?.message
          }
        </Alert>
      </Snackbar>
    </Stack>
  );
}
