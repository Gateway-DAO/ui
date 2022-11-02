import { useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { Alert, Button, Snackbar, Stack } from '@mui/material';

import { CreateGateData, Option } from '../../templates/create-gate/schema';
import { OptionField } from './option-field/option-field';

export function RadioCheckBoxCreator({
  questionIndex,
  taskId,
}: {
  questionIndex: number;
  taskId: number;
}): JSX.Element {
  const [maxAlert, setMaxAlert] = useState(false);
  const { control } = useFormContext<CreateGateData>();

  const DEFAULT_OPTION: Option = {
    value: '',
    correct: false,
    order: 0,
  };

  const {
    fields: options,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `tasks.data.${taskId}.task_data.questions.${questionIndex}.options`,
  });

  const setDefaultOption = (): Option => {
    const opt = DEFAULT_OPTION;
    opt.order = Math.max(...options.map((o) => o.order)) + 1;
    return opt;
  };

  const onRemoveOption = (index: number) => {
    remove(index);
  };

  return (
    <Stack alignItems={'flex-start'} sx={{ width: '100%' }}>
      {options.map((_option, index) => (
        <OptionField
          key={index}
          taskId={taskId}
          disabledRemove={options.length > 1}
          questionIndex={questionIndex}
          optionIndex={index}
          onRemove={onRemoveOption}
        />
      ))}
      <Button
        variant="text"
        sx={{ display: 'inline-block', px: 0 }}
        onClick={() => {
          if (options.length < 5) {
            setMaxAlert(false);
            return append(setDefaultOption());
          }
          setMaxAlert(true);
        }}
      >
        Add option
      </Button>
      <Snackbar
        open={maxAlert}
        autoHideDuration={3000}
        onClose={() => setMaxAlert(false)}
      >
        <Alert severity="warning" sx={{ width: '100%' }}>
          You can only add up to 5 options
        </Alert>
      </Snackbar>
    </Stack>
  );
}
