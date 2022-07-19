import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, Stack } from '@mui/material';

import { CreateGateTypes, Option } from '../../templates/create-gate/schema';
import { OptionField } from './option-field/option-field';

export function RadioCheckBoxCreator({
  questionIndex,
  taskId,
}: {
  questionIndex: number;
  taskId: number;
}): JSX.Element {
  const { control } = useFormContext<CreateGateTypes>();

  const DEFAULT_OPTION: Option = {
    value: '',
    correct: false,
  };
  const { fields: options, append } = useFieldArray({
    control,
    name: `tasks.data.${taskId}.task_data.questions.${questionIndex}.options`,
  });

  return (
    <Stack alignItems={'flex-start'} sx={{ width: '100%' }}>
      {options.map((option, index) => (
        <OptionField
          key={index}
          taskId={taskId}
          questionIndex={questionIndex}
          optionIndex={index}
        />
      ))}
      <Button
        variant="text"
        sx={{ display: 'inline-block', px: 0 }}
        onClick={() => append(DEFAULT_OPTION)}
      >
        Add option
      </Button>
    </Stack>
  );
}
