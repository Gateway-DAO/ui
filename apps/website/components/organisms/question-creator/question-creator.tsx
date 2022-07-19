import { useFieldArray, useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';

import { QuestionField } from '../../molecules/add-task/quiz-task/question-field/question-field';
import { RadioCheckBoxCreator } from '../../molecules/radio-checkbox-creator/radio-checkbox-creator';
import { CreateGateTypes, Question } from '../../templates/create-gate/schema';

export function QuestionCreator({ taskId, ...rest }): JSX.Element {
  const { control } = useFormContext<CreateGateTypes>();

  const { fields: questions, remove } = useFieldArray({
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
            sx={(theme) => ({
              width: '100%',
              mb: '24px',
              [theme.breakpoints.down('sm')]: { flexDirection: 'column' },
            })}
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
