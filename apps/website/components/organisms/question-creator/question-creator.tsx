import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';

import { QuestionField } from '../../molecules/add-task/quiz-task/question-field/question-field';
import { RadioCheckBoxCreator } from '../../molecules/radio-checkbox-creator/radio-checkbox-creator';
import { Question } from '../../templates/create-gate/schema';

export function QuestionCreator({
  taskId,
  questions,
  onRemove,
  ...rest
}): JSX.Element {
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
          sx={() => ({
            width: '100%',
            py: '48px',
            borderBottom: '1px solid rgba(229, 229, 229, 0.12)',
          })}
        >
          <Stack
            direction="row"
            alignItems={'center'}
            sx={(theme) => ({
              width: '100%',
              mb: '24px',
              [theme.breakpoints.down('sm')]: {
                alignItems: 'flex-start',
              },
            })}
          >
            <QuestionField questionIndex={index} taskId={taskId} />

            {questions.length > 1 && (
              <CloseIcon
                sx={{ marginLeft: '24px', cursor: 'pointer' }}
                onClick={() => onRemove(index)}
              />
            )}
          </Stack>
          <RadioCheckBoxCreator questionIndex={index} taskId={taskId} />
        </Stack>
      ))}
    </Stack>
  );
}
