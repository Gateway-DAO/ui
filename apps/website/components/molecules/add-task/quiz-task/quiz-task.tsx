import { useState } from 'react';

import { QuestionCreator } from 'apps/website/components/organisms/question-creator/question-creator';
import { useFormContext } from 'react-hook-form';

import { MotionBox } from '@gateway/ui';

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

import { CreateGateTypes } from '../../../templates/create-gate/schema';
import { RadioCheckBoxCreator } from '../../radio-checkbox-creator/radio-checkbox-creator';

export function QuizTask({ taskId, deleteTask }): JSX.Element {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();
  const [taskVisible, setTaskVisible] = useState(false);
  const [questions, setQuestions] = useState<any[]>([
    { question: '', type: 'single' },
  ]);

  const questionChange = (index, key, value) => {
    const arr = [...questions];
    arr[index][key] = value;
    setQuestions(arr);
  };
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
      <MotionBox
        sx={{
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
          pb: '48px',
        }}
        animate={taskVisible ? 'open' : 'close'}
        variants={{
          open: { maxHeight: '500px', transitionDuration: '250ms' },
          close: { maxHeight: '0', transitionDuration: '250ms' },
        }}
      >
        <TextField
          multiline
          maxRows={4}
          minRows={3}
          label="Task description"
          id="quiz-description"
          {...register(`tasks.data.${taskId}.description`)}
          error={!!errors.tasks?.data[taskId]?.description}
          helperText={errors.tasks?.data[taskId]?.description?.message}
        />
        <QuestionCreator
          questions={questions}
          onQuestionFieldChange={questionChange}
          onSelectChange={questionChange}
        />
      </MotionBox>
      <Stack alignItems={'flex-start'} sx={{ paddingTop: '30px' }}>
        <Button
          variant="text"
          onClick={() =>
            setQuestions([...questions, { value: '', type: 'single' }])
          }
        >
          Add question
        </Button>
        <Stack>
          <Typography>
            How many questions necessary to pass the quiz?
          </Typography>
          <Typography>The quantity that user must answer correctly</Typography>
        </Stack>
        <Slider
          size="medium"
          defaultValue={1}
          min={0}
          max={1}
          aria-label="Medium"
          valueLabelDisplay="on"
        />
      </Stack>
    </Stack>
  );
}
