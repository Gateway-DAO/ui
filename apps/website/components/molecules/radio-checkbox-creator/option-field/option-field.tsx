import { useEffect, useState } from 'react';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import { CircleOutlined, SquareOutlined } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Stack, TextField } from '@mui/material';

import {
  CreateGateTypes,
  Option,
  QuestionTask,
} from '../../../templates/create-gate/schema';

export function OptionField({
  taskId,
  questionIndex,
  optionIndex,
  ...rest
}): JSX.Element {
  const {
    register,
    setValue,
    watch,
    getValues,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();
  const { fields: options, remove } = useFieldArray({
    control,
    name: `tasks.data.${taskId}.task_data.questions.${questionIndex}.options`,
  });

  watch(`tasks.data.${taskId}.task_data.questions.${questionIndex}.type`);

  const questionType: string = (getValues().tasks.data[taskId] as QuestionTask)
    .task_data.questions[questionIndex].type;

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      sx={{ width: '100%', py: '17px' }}
      {...rest}
    >
      <Stack direction={'row'} alignItems={'center'} sx={{ width: '100%' }}>
        {questionType === 'multiple' ? (
          <SquareOutlined sx={{ marginRight: '14px' }} />
        ) : (
          <CircleOutlined sx={{ marginRight: '14px' }} />
        )}
        <TextField
          fullWidth
          placeholder={'Write your answer'}
          InputProps={{ disableUnderline: true }}
          required
          variant={'standard'}
          {...register(
            `tasks.data.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.value`
          )}
        />
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <Controller
          control={control}
          name={`tasks.data.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.correct`}
          defaultValue={false as never}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <CheckCircleIcon
              sx={(theme) => ({
                cursor: 'pointer',
                color: value
                  ? theme.palette.success.light
                  : theme.palette.text.primary,
              })}
              onClick={() => {
                setValue(
                  `tasks.data.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.correct`,
                  !value as never
                );

                if (
                  questionType === 'single' &&
                  (options as Option[]).filter((option) => option.correct)
                    .length > 0
                ) {
                  setValue(
                    `tasks.data.${taskId}.task_data.questions.${questionIndex}.type`,
                    'multiple' as never
                  );
                }
              }}
            />
          )}
        />

        {options.length > 1 && (
          <CloseIcon
            sx={{ marginLeft: '24px', cursor: 'pointer' }}
            onClick={() => remove(optionIndex)}
          />
        )}
      </Stack>
    </Stack>
  );
}
