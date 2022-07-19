import { useEffect } from 'react';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';

import {
  CreateGateTypes,
  QuizTaskDataError,
} from '../../../../templates/create-gate/schema';

export function QuestionField({ question, questionIndex, taskId }) {
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

  questions[questionIndex].options.map((option, index) =>
    watch(
      `tasks.data.${taskId}.task_data.questions.${questionIndex}.options.${index}.correct`
    )
  );

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        variant="outlined"
        label="Question"
        id={`question-textfield${questionIndex}`}
        sx={{ flex: 1 }}
        defaultValue={''}
        required
        name={`tasks.data.${taskId}.task_data.questions.${questionIndex}.question`}
        {...register(
          `tasks.data.${taskId}.task_data.questions.${questionIndex}.question`,
          { value: question.question as never }
        )}
      />
      <Controller
        control={control}
        name={`tasks.data.${taskId}.task_data.questions.${questionIndex}.type`}
        defaultValue={'single' as never}
        rules={{ required: true }}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <FormControl sx={{ minWidth: '272px', marginLeft: '16px' }}>
            <InputLabel id={`question-label${questionIndex}`}>Type</InputLabel>
            <Select
              variant="outlined"
              label="Type"
              labelId={`question-select-label${questionIndex}`}
              value={value}
              error={
                !!(errors.tasks?.data[taskId]?.task_data as QuizTaskDataError)
                  ?.questions[questionIndex].type
              }
              onChange={(event) => {
                if (
                  event.target.value === 'single' &&
                  questions[questionIndex].options.filter(
                    (option) => option.correct
                  ).length > 1
                ) {
                  questions[questionIndex].options
                    .filter((option) => option.correct)
                    .map((option, index) =>
                      setValue(
                        `tasks.data.${taskId}.task_data.questions.${questionIndex}.options.${index}.correct`,
                        false as never
                      )
                    );
                }
                onChange(event);
              }}
            >
              <MenuItem value={'single'}>Single answer</MenuItem>
              <MenuItem value={'multiple'}>Multiple answers</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </Stack>
  );
}
