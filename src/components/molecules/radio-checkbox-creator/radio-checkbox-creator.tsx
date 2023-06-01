import { useEffect, useState } from 'react';

import {
  CreateGateData,
  Option,
} from '@/components/features/gates/create/schema';
import { useSnackbar } from 'notistack';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, Stack } from '@mui/material';

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
  const { enqueueSnackbar } = useSnackbar();

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
    name: `tasks.${taskId}.task_data.questions.${questionIndex}.options`,
  });

  const setDefaultOption = (): Option => {
    const opt = DEFAULT_OPTION;
    opt.order = Math.max(...options.map((o) => o.order)) + 1;
    return opt;
  };

  const onRemoveOption = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (maxAlert) {
      enqueueSnackbar(`You can only add up to 5 options`, {
        variant: 'error',
      });
    }
  }, [maxAlert]);

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
    </Stack>
  );
}
