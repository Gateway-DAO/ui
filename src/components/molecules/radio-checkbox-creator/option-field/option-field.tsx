import { useEffect, useState } from 'react';

import {
  CreateGateData,
  QuizTaskDataError,
} from '@/components/templates/create-gate/schema';
import { useSnackbar } from 'notistack';
import { Controller, useFormContext } from 'react-hook-form';

import { CircleOutlined, SquareOutlined } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Stack, TextField } from '@mui/material';

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
  } = useFormContext<CreateGateData>();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      enqueueSnackbar(`Question type needs to be multiple.`, {
        variant: 'error',
      });
    }
  }, [isOpen]);

  const questionType = watch(
    `tasks.${taskId}.task_data.questions.${questionIndex}.type`
  );

  const options = watch(
    `tasks.${taskId}.task_data.questions.${questionIndex}.options`
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
            `tasks.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.value`
          )}
          error={
            !!(errors.tasks?.[taskId]?.task_data as QuizTaskDataError)
              ?.questions?.[questionIndex]?.options?.[optionIndex]?.value
          }
          helperText={
            (errors.tasks?.[taskId]?.task_data as QuizTaskDataError)
              ?.questions?.[questionIndex]?.options?.[optionIndex]?.value
              ?.message
          }
        />
      </Stack>
      <Stack direction={'row'} alignItems={'center'}>
        <Controller
          control={control}
          name={`tasks.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.correct`}
          defaultValue={false}
          render={() => (
            <>
              <CheckCircleIcon
                sx={(theme) => ({
                  cursor: 'pointer',
                  ml: '24px',
                  color: options?.[optionIndex]?.correct
                    ? theme.palette.success.light
                    : theme.palette.text.primary,
                })}
                onClick={() => {
                  if (
                    questionType === 'multiple' ||
                    options[optionIndex]?.correct === true ||
                    (questionType === 'single' &&
                      options.filter((option) => option.correct).length === 0)
                  ) {
                    return setValue(
                      `tasks.${taskId}.task_data.questions.${questionIndex}.options.${optionIndex}.correct`,
                      !options[optionIndex]?.correct
                    );
                  }
                  setIsOpen(true);
                }}
              />
            </>
          )}
        />

        {disabledRemove && (
          <CloseIcon
            sx={{ marginLeft: '24px', cursor: 'pointer' }}
            onClick={() => onRemove(optionIndex)}
          />
        )}
      </Stack>
    </Stack>
  );
}