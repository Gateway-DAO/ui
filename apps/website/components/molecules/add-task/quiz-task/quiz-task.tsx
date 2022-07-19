import { useEffect, useState } from 'react';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import {
  Box,
  Button,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { QuestionCreator } from '../../../organisms/question-creator/question-creator';
import {
  CreateGateTypes,
  Question,
} from '../../../templates/create-gate/schema';

export function QuizTask({ taskId, deleteTask }): JSX.Element {
  const DEFAULT_QUESTION: Question = {
    question: '',
    type: 'single',
    options: [{ value: '', correct: false }],
  };

  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();

  const [taskVisible, setTaskVisible] = useState(false);

  const { fields: questions, append } = useFieldArray({
    name: `tasks.data.${taskId}.task_data.questions`,
    control,
  });

  useEffect(() => {
    const taskData = getValues().tasks.data[taskId].task_data;
    if ('questions' in taskData && taskData.questions.length === 0) {
      setValue(`tasks.data.${taskId}.task_type`, 'quiz');
      setValue(`tasks.data.${taskId}.task_data.questions`, [DEFAULT_QUESTION]);
    }
  }, [taskId, questions]);

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
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <LooksOneIcon fontSize="large" style={{ marginRight: '35px' }} />
          <TextField
            variant="standard"
            sx={{ minWidth: '600px' }}
            label="Quiz"
            required
            id="quiz-title"
            {...register(`tasks.data.${taskId}.title`)}
            error={!!errors.tasks?.data[taskId]?.title}
            helperText={errors.tasks?.data[taskId]?.title?.message}
          />
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DeleteIcon
            fontSize="medium"
            sx={(theme) => ({
              color: theme.palette.text.secondary,
              cursor: 'pointer',
              marginRight: '20px',
              '&:hover': {
                color: theme.palette.text.primary,
              },
            })}
            onClick={() => deleteTask(taskId)}
          />
          {taskVisible ? (
            <ExpandLess
              fontSize="large"
              onClick={() => setTaskVisible(false)}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                cursor: 'pointer',
                marginRight: '20px',
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              })}
            />
          ) : (
            <ExpandMore
              fontSize="large"
              onClick={() => setTaskVisible(true)}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
                cursor: 'pointer',
                marginRight: '20px',
                '&:hover': {
                  color: theme.palette.text.primary,
                },
              })}
            />
          )}
        </Box>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
        }}
        style={!taskVisible ? {} : { display: 'none' }}
      >
        <TextField
          multiline
          maxRows={4}
          minRows={3}
          fullWidth
          required
          label="Task description"
          id="quiz-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data[taskId]?.description}
          helperText={errors.tasks?.data[taskId]?.description?.message}
        />
        <QuestionCreator questions={questions} taskId={taskId} />
      </Box>
      <Stack alignItems={'flex-start'} sx={{ paddingTop: '30px' }}>
        <Button
          variant="text"
          sx={{ px: 0 }}
          onClick={() => append(DEFAULT_QUESTION)}
        >
          Add question
        </Button>
        <Stack sx={{ mt: '24px', mb: '48px' }}>
          <Typography>
            How many questions necessary to pass the quiz?
          </Typography>
          <Typography>The quantity that user must answer correctly</Typography>
        </Stack>
        <Controller
          control={control}
          name={`tasks.data.${taskId}.task_data.pass_score`}
          defaultValue={1}
          rules={{ required: true, min: 1, max: questions.length }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Slider
              size="medium"
              min={1}
              max={questions.length}
              onChange={onChange}
              onError={() => error?.message}
              value={value}
              aria-label="Medium"
              valueLabelDisplay="on"
            />
          )}
        />
      </Stack>
    </Stack>
  );
}
