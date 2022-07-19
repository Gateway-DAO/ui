import { useEffect } from 'react';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import { QuestionField } from '../../molecules/add-task/quiz-task/question-field/question-field';
import { RadioCheckBoxCreator } from '../../molecules/radio-checkbox-creator/radio-checkbox-creator';
import { CreateGateTypes, Question } from '../../templates/create-gate/schema';

export function QuestionCreator({ taskId, ...rest }): JSX.Element {
  const {
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
    control,
    watch,
  } = useFormContext<CreateGateTypes>();

  const {
    fields: questions,
    remove,
    update,
  } = useFieldArray({
    name: `tasks.data.${taskId}.task_data.questions`,
    control,
  });

  return (
    <Stack
      alignItems={'flex-start'}
      sx={{
        width: '100%',
      }}
      {...rest}
    >
      {questions.map((question: Question, index: number) => (
        <Stack
          key={question.id}
          sx={{
            width: '100%',
            py: '48px',
            borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
          }}
        >
          <Stack
            direction="row"
            alignItems={'center'}
            sx={{ width: '100%', mb: '24px' }}
          >
            <QuestionField
              question={question}
              questionIndex={index}
              taskId={taskId}
            />

            {questions.length > 1 && (
              <CloseIcon
                sx={{ marginLeft: '24px', cursor: 'pointer' }}
                onClick={() => remove(index)}
              />
            )}
          </Stack>
          <RadioCheckBoxCreator questionIndex={index} taskId={taskId} />
        </Stack>
      ))}
    </Stack>
  );
}
