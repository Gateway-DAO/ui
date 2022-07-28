import { useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { CircleOutlined, SquareOutlined } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Snackbar, Stack, TextField } from '@mui/material';

import {
  CreateGateTypes,
  QuizTaskDataError,
} from '../../../templates/create-gate/schema';

type Props = {
  taskId: number;
  questionIndex: number;
  optionIndex: number;
  disabledRemove: boolean;
  onRemove: (index: number) => void;
};

export function OptionField({
  taskId,
  questionIndex,
  optionIndex,
  disabledRemove,
  onRemove,
  ...rest
}: Props): JSX.Element {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useFormContext<CreateGateTypes>();
  const [isOpen, setIsOpen] = useState(false);

  const questionType = watch(
    `tasks.data.${taskId}.task_data.questions.${questionIndex}.type`
  );

  const options = watch(
    `tasks.data.${taskId}.task_data.questions.${questionIndex}.options`
  );

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
          variant={'standard'}
          {...register(
            `tasks.data.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.value`
          )}
          error={
            !!(errors.tasks?.data[taskId]?.task_data as QuizTaskDataError)
              ?.questions?.[questionIndex]?.options?.[optionIndex]?.value
          }
          helperText={
            (errors.tasks?.data[taskId]?.task_data as QuizTaskDataError)
              ?.questions?.[questionIndex]?.options?.[optionIndex]?.value
              ?.message
          }
        />
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <Controller
          control={control}
          name={`tasks.data.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.correct`}
          defaultValue={false}
          render={({ field: { value } }) => (
            <CheckCircleIcon
              sx={(theme) => ({
                cursor: 'pointer',
                ml: '24px',
                color: value
                  ? theme.palette.success.light
                  : theme.palette.text.primary,
              })}
              onClick={() => {
                if (
                  questionType === 'multiple' ||
                  value === true ||
                  (questionType === 'single' &&
                    options.filter((option) => option.correct).length === 0)
                ) {
                  return setValue(
                    `tasks.data.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.correct`,
                    !value
                  );
                }
                setIsOpen(true);
              }}
            />
          )}
        />

        {disabledRemove && (
          <CloseIcon
            sx={{ marginLeft: '24px', cursor: 'pointer' }}
            onClick={() => onRemove(optionIndex)}
          />
        )}
      </Stack>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={() => setIsOpen(false)}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          Question type needs to be multiple.
        </Alert>
      </Snackbar>
    </Stack>
  );
}
